from diffusers import StableDiffusionPipeline, EulerDiscreteScheduler
import torch

model_id = "stabilityai/stable-diffusion-2"

# Use the Euler scheduler here instead
scheduler = EulerDiscreteScheduler.from_pretrained(model_id, subfolder="scheduler")
pipe = StableDiffusionPipeline.from_pretrained(model_id, scheduler=scheduler, torch_dtype=torch.float16)
pipe = pipe.to("cuda")

def get_image(prompt):
    image = pipe(prompt).images[0]

    return image

if __name__ == '__main__':
    # image = get_image("a man walking on the street in New York City in illustration styles.")
    # image.save("./a_man_walking_on_the_street.jpg")

    image = get_image("illustration image representing the situation: 'a man say hello to his new classmates'")
    image.save("./test.jpg")