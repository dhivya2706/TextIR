import sys
import torch
from PIL import Image
from torchvision import transforms
from transformers import CLIPProcessor, CLIPModel

input_path = sys.argv[1]
output_path = sys.argv[2]
prompt = sys.argv[3] if len(sys.argv) > 3 else "natural colors"

device = "cuda" if torch.cuda.is_available() else "cpu"

image = Image.open(input_path).convert("L").resize((256,256))
to_tensor = transforms.ToTensor()
to_pil = transforms.ToPILImage()

gray = to_tensor(image).unsqueeze(0).to(device)
Id = gray.repeat(1,3,1,1)

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

# ---- save ----
result = to_pil(out[0].cpu()).resize((512,512))
result.save(output_path)

print("done")