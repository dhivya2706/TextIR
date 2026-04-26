import sys
import torch
from PIL import Image
from torchvision import transforms
from transformers import CLIPProcessor, CLIPModel
from diffusers import StableDiffusionInstructPix2PixPipeline
import warnings

warnings.filterwarnings("ignore", category=FutureWarning)

input_path = sys.argv[1]
output_path = sys.argv[2]
mask_path = sys.argv[3]
prompt = sys.argv[4] if len(sys.argv) > 4 else "complete image"

device = "cuda" if torch.cuda.is_available() else "cpu"
dtype = torch.float16 if device == "cuda" else torch.float32

image = Image.open(input_path).convert("RGB").resize((256,256))
mask = Image.open(mask_path).convert("L").resize((256,256))

to_tensor = transforms.ToTensor()
to_pil = transforms.ToPILImage()

img = to_tensor(image).unsqueeze(0).to(device)
mask = to_tensor(mask).unsqueeze(0).to(device)

Id = img * mask

clip_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32").to(device)
clip_processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

inputs = clip_processor(text=[prompt], return_tensors="pt").to(device)
c = clip_model.get_text_features(**inputs)

from model import Encoder, Generator, Fusion, StyleMapping

encoder = Encoder().to(device)
generator = Generator().to(device)
fusion = Fusion(512,[256,128,64]).to(device)
mapper = StyleMapping().to(device)

encoder.load_state_dict(torch.load("encoder.pth", map_location=device))
generator.load_state_dict(torch.load("generator.pth", map_location=device))
fusion.load_state_dict(torch.load("fusion.pth", map_location=device))
mapper.load_state_dict(torch.load("mapper.pth", map_location=device))

encoder.eval(); generator.eval(); fusion.eval(); mapper.eval()

with torch.no_grad():
    w = mapper(c)
    fw = fusion(c)
    feats = encoder(Id)
    out = generator(feats, w.unbind(1), fw)

intermediate = to_pil(out[0].cpu()).resize((512,512))

pipe = StableDiffusionInstructPix2PixPipeline.from_pretrained(
    "timbrooks/instruct-pix2pix",
    torch_dtype=dtype,
    safety_checker=None
).to(device)

pipe.enable_attention_slicing()

final = pipe(
    prompt=prompt,
    image=intermediate,
    num_inference_steps=30,
    image_guidance_scale=1.5,
    guidance_scale=7
).images[0]

final.save(output_path)

print("done")