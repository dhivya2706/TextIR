# 🧠 TextIR – Text-Guided Image Restoration

🔷 Overview
This project implements a text-guided image restoration framework inspired by modern conditional generative models. The system restores degraded images using:
- A CNN Encoder for feature extraction
- A Style-modulated Generator (StyleGAN2-inspired)
- A Fusion module for adaptive feature blending
- A CLIP-based conditioning mechanism for aligning image-text semantics
  
## 🚀 Features
- 🖼️ Restore low-resolution and noisy images
- ✨ Text-guided enhancement (user-controlled output)
- 🤖 Uses Stable Diffusion for image generation
- 🔗 CLIP-based text-image alignment
- 📈 Produces high-quality, realistic outputs


## 🏗️ Model Architecture
- Diffusion Model (Stable Diffusion) → Image restoration & generation  
- CLIP Model → Text and image alignment  
- CNN Backbone → Feature extraction  


## 🔄 Workflow
1. Input low-resolution image  
2. Provide text prompt  
3. Extract features from image  
4. Encode text using CLIP  
5. Apply diffusion-based restoration  
6. Generate enhanced high-resolution image  


## 🛠️ Tech Stack
- Python  
- PyTorch  
- Hugging Face Diffusers  
- Transformers (CLIP)  
- OpenCV / PIL  
