🔁 Overall Workflow
🧠 Training Phase
Ground Truth Image (I_gt)
        ↓
Apply Degradation → I_d
        ↓
Encoder → multi-scale features (f₀ … fₗ)
        ↓
CLIP Image Encoder → c = E_I(I_gt)
        ↓
Style Mapping → w
        ↓
Fusion Module → α (feature weights)
        ↓
Generator (StyleConv + skip fusion)
        ↓
Restored Image → I_r
🧠 Inference Phase
Degraded Image (I_d) + Text Prompt
        ↓
CLIP Text Encoder → c = E_T(text)
        ↓
Style Mapping → w
        ↓
Fusion Module → α
        ↓
Generator
        ↓
Restored Image (I_r)
🧩 Core Components & Formulations
🔹 1. Conditional Embedding (CLIP)

Training:

c=E
I
	​

(I
gt
	​

)

Inference:

c=E
T
	​

(text)
🔹 2. Style Mapping

The conditional embedding is transformed into style codes:

w=Reshape(FC(c))
w∈R
L×d
One style vector per generator layer
🔹 3. Style Modulated Convolution (StyleConv)

Each convolution is modulated using style vector w:

Modulation:
W
^
=W⋅(s+1)
Demodulation:
W
^
′
=
∑
W
^
2
+ϵ
	​

W
^
	​

Convolution:
y=Conv(x,
W
^
′
)
🔹 4. Generator (Multi-layer)
g
i
	​

={
StyleConv(f
l
	​

,w
i
	​

),
StyleConv(StyleConv(↑
2
	​

(x
i−1
	​

),w
i
1
	​

),w
i
2
	​

),
	​

i=0
i>0
	​

↑
2
	​

 = 2× upsampling
🔹 5. Feature Fusion (Key Contribution)

Fusion weights computed from condition:

α=MLP(c)

Split into:

α
i
enc
	​

,α
i
gen
	​


Normalize:

α=
α
1
2
	​

+α
2
2
	​

+ϵ
	​

∣α∣
	​


Final fusion:

x
i
	​

=α
i
enc
	​

⋅f
l−i
	​

+α
i
gen
	​

⋅g
i
	​

🎯 Degradation Models
🔵 Super Resolution
I
d
	​

=Upsample(Downsample(I
gt
	​

))
🔴 Inpainting
I
d
	​

=I
gt
	​

⊙M
M = random mask
⊙ = element-wise multiplication
🟡 Colorization

Convert RGB → LAB:

I
d
	​

=L channel only
📉 Loss Functions
🔹 1. Adversarial Loss
Discriminator:
L
adv,D
	​

=E[log(1+e
−D(I
gt
	​

)
)+log(1+e
D(G(I
d
	​

,c))
)]
Generator:
L
adv,G
	​

=E[log(1+e
−D(G(I
d
	​

,c))
)]
🔹 2. CLIP Loss
L
clip
	​

=1−
∥E
I
	​

(I
r
	​

)∥∥E
I
	​

(I
gt
	​

)∥
E
I
	​

(I
r
	​

)⋅E
I
	​

(I
gt
	​

)
	​

🔹 3. Reconstruction Loss
L
L1
	​

=∥I
r
	​

−I
gt
	​

∥
1
	​

🔹 Final Objective
L
G
	​

=L
adv,G
	​

+λ
clip
	​

L
clip
	​

+λ
L1
	​

L
L1
	​

⚙️ Algorithm
🧪 Training Algorithm
for each batch:
    I_gt ← load image
    I_d ← degrade(I_gt)

    c ← CLIP_image(I_gt)

    w ← StyleMapping(c)
    α ← Fusion(c)

    features ← Encoder(I_d)
    I_r ← Generator(features, w, α)

    # Update Discriminator
    L_D ← adversarial loss
    update D

    # Update Generator
    L_G ← adv + clip + L1
    update Generator, Encoder, Fusion
🚀 Inference Algorithm
Input: degraded image I_d, text prompt

c ← CLIP_text(prompt)

w ← StyleMapping(c)
α ← Fusion(c)

features ← Encoder(I_d)
I_r ← Generator(features, w, α)

return restored image
