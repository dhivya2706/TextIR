🚀 TextIR: Text-Guided Image Restoration Framework

📌 Full Project Overview
TextIR is a deep learning-based image restoration system that reconstructs degraded images using text guidance. The model integrates:
-A CNN Encoder for extracting hierarchical features
-A StyleGAN-inspired Generator for reconstruction
-A Fusion Module for adaptive feature blending
-A CLIP-based conditioning mechanism to align image and text semantics

The system supports three major restoration tasks:
🔵 Super Resolution
🔴 Inpainting
🟡 Colorization

✨ Key Features
✅ Text-guided image restoration
✅ Multi-task support (SR, Inpainting, Colorization)
✅ Style-based generation (StyleGAN2-inspired)
✅ Adaptive feature fusion (learned weights)
✅ CLIP-based semantic conditioning
✅ End-to-end trainable pipeline
✅ React-compatible inference (via Python scripts)

🛠️ Technologies Used
🔹 Core Frameworks
        PyTorch
        Torchvision
🔹 Models & Libraries  
        CLIP ViT-B/32
        Transformers
🔹 Image Processing
        OpenCV
        Pillow
		
🔁 System Workflow
🧠 Training Pipeline
Ground Truth Image (I_gt)
        ↓
Apply Degradation → I_d
        ↓
Encoder → Multi-scale features (f₀ … fₗ)
        ↓
CLIP Image Encoder → c
        ↓
Style Mapping → w
        ↓
Fusion Module → α
        ↓
Generator (StyleConv + skip fusion)
        ↓
Restored Image → I_r

🚀 Inference Pipeline
Degraded Image (I_d) + Text Prompt
        ↓
CLIP Text Encoder → c
        ↓
Style Mapping → w
        ↓
Fusion Module → α
        ↓
Generator
        ↓
Restored Image (I_r)

⚙️ Algorithms
🧪 Training Algorithm
for each batch:
    I_gt ← load image
    I_d ← degrade(I_gt)

    c ← CLIP_image(I_gt)

    w ← StyleMapping(c)
    α ← Fusion(c)

    features ← Encoder(I_d)
    I_r ← Generator(features, w, α)

    update Discriminator
    update Generator using:
        adversarial + clip + L1 loss

🚀 Inference Algorithm
Input: degraded image I_d, text prompt

c ← CLIP_text(prompt)

w ← StyleMapping(c)
α ← Fusion(c)

features ← Encoder(I_d)
I_r ← Generator(features, w, α)

return restored image

