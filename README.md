
# 🚀 TextIR: Text-Guided Image Restoration Framework

## 📌 Full Project Overview

TextIR is a **deep learning-based image restoration framework** that reconstructs degraded images using **textual guidance**. The model leverages a combination of convolutional feature extraction, style-based generation, and multimodal semantic alignment.

The architecture integrates:

* A **CNN Encoder** for hierarchical feature extraction
* A **StyleGAN2-inspired Generator** for high-quality reconstruction
* A **Fusion Module** for adaptive feature blending
* A **CLIP-based conditioning mechanism** to align image and text semantics

---

## 🎯 Supported Tasks

The system supports three major restoration tasks:

* 🔵 **Super Resolution** – Enhancing low-resolution images
* 🔴 **Inpainting** – Filling missing or corrupted regions
* 🟡 **Colorization** – Converting grayscale images to color

---

## ✨ Key Features

* ✅ Text-guided image restoration
* ✅ Multi-task learning (SR, Inpainting, Colorization)
* ✅ Style-based generation (inspired by StyleGAN2)
* ✅ Adaptive feature fusion with learned weights
* ✅ CLIP-based multimodal conditioning
* ✅ End-to-end trainable architecture
* ✅ React-compatible inference via Python scripts

---

## 🛠️ Technologies Used

### 🔹 Core Frameworks

* PyTorch
* Torchvision

### 🔹 Models & Libraries

* CLIP (ViT-B/32)
* Transformers (Hugging Face)

### 🔹 Image Processing

* OpenCV
* Pillow

---

## 🔁 System Workflow

---

### 🧠 Training Pipeline

```text
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
```

---

### 🚀 Inference Pipeline

```text
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
```

---

## ⚙️ Algorithms

---

### 🧪 Training Algorithm

```text
for each batch:
    I_gt ← load image
    I_d ← degrade(I_gt)

    c ← CLIP_image(I_gt)

    w ← StyleMapping(c)
    α ← Fusion(c)

    features ← Encoder(I_d)
    I_r ← Generator(features, w, α)

    # Update Discriminator
    update Discriminator using adversarial loss

    # Update Generator
    update Generator using:
        adversarial loss + CLIP loss + L1 loss
```

---

### 🚀 Inference Algorithm

```text
Input: degraded image I_d, text prompt

c ← CLIP_text(prompt)

w ← StyleMapping(c)
α ← Fusion(c)

features ← Encoder(I_d)
I_r ← Generator(features, w, α)

return restored image
```

---

## 📐 Mathematical Formulation

---

### 🔹 Conditional Mapping

Training:
[
c = E_I(I_{gt})
]

Inference:
[
c = E_T(\text{text})
]

---

### 🔹 Style Mapping

[
w = \text{Reshape}(\text{FC}(c))
]

---

### 🔹 Feature Fusion

[
\alpha = \text{MLP}(c)
]

[
x_i = \alpha_i^{enc} \cdot f_{l-i} + \alpha_i^{gen} \cdot g_i
]

---

### 🔹 Objective Function

[
L_G = L_{adv} + \lambda_{clip} L_{clip} + \lambda_{L1} L_{L1}
]

---

### 🔹 Final Model

[
I_r = G(I_d, c)
]



Just tell me 👍
