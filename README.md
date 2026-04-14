# 🧠 TextIR – Text-Guided Image Restoration

TextIR is a deep learning project that restores low-quality images using text guidance.  
It combines Diffusion Models and CLIP to generate high-quality images that match both visual input and semantic meaning.


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
