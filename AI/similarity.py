import os
import numpy as np
from PIL import Image
from tensorflow.keras.preprocessing import image

import matplotlib
matplotlib.use('Agg')  # Set the backend to 'Agg' to prevent window opening
import matplotlib.pyplot as plt
import matplotlib.image as mpimg

from keras.applications.vgg16 import VGG16
from sklearn.metrics.pairwise import cosine_similarity

vgg16 = VGG16(weights='imagenet', include_top=False,
              pooling='max', input_shape=(224, 224, 3))

# print the summary of the model's architecture.
# vgg16.summary()

for model_layer in vgg16.layers:
  model_layer.trainable = False

def load_image(image_path):
    """
        -----------------------------------------------------
        Process the image provided.
        - Resize the image
        -----------------------------------------------------
        return resized image
    """

    input_image = Image.open(image_path)
    resized_image = input_image.resize((224, 224))

    return resized_image

def get_image_embeddings(object_image : image):

    """
      -----------------------------------------------------
      convert image into 3d array and add additional dimension for model input
      -----------------------------------------------------
      return embeddings of the given image
    """

    image_array = np.expand_dims(image.img_to_array(object_image), axis = 0)
    image_embedding = vgg16.predict(image_array)

    return image_embedding

def get_similarity_score(first_image : str, second_image : str):
    """
        -----------------------------------------------------
        Takes image array and computes its embedding using VGG16 model.
        -----------------------------------------------------
        return embedding of the image

    """

    first_image = load_image(first_image)
    second_image = load_image(second_image)

    first_image_vector = get_image_embeddings(first_image)
    second_image_vector = get_image_embeddings(second_image)

    similarity_score = cosine_similarity(first_image_vector, second_image_vector).reshape(1,)

    return similarity_score

def show_image(image_path):
  image = mpimg.imread(image_path)
  imgplot = plt.imshow(image)
  plt.savefig('temp.png')  # Save the figure to a file instead of showing
  plt.close()

# define the path of the images
image1 = './content/1.jpg'
image2 = './content/2.jpg'

# use the show_image function to plot the images
show_image(image1), show_image(image2)

similarity_score = get_similarity_score(image1, image2)
print(similarity_score)

# # define the path of the images
super = './content/super.jpg'

show_image(image1), show_image(super)

similarity_score = get_similarity_score(image1, super)

print(similarity_score)

# Delete the temporary image file
os.remove('temp.png')

# Workflow => 


# TODO make a route in express to store the source image and the nft that have been already minted (Graqhql)

# similarity page should be done 
# on this page we need to show the fractionnal nft and in subsection we need to list all the similar nft
# on a page similare nft should be listed 





# 1. Load an image 
# 2. Compare it to a list of image
# 4.else return the one best matching (close to 0.8 => 0.999)

