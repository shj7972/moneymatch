from PIL import Image
import sys
import os

def resize_image(input_path, output_path, width, height):
    try:
        with Image.open(input_path) as img:
            # Resize exactly to target dimensions
            resized_img = img.resize((width, height), Image.Resampling.LANCZOS)
            resized_img.save(output_path)
            print(f"Successfully resized to {output_path}")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    input_file = r"C:/Users/seohy/.gemini/antigravity/brain/3d33b494-26d3-40cb-97e6-c9876825596f/uploaded_media_1769518419905.png"
    output_file = r"c:/Users/seohy/workspace_antigravity/money-match/public/banner_link_234x60.png"
    resize_image(input_file, output_file, 234, 60)
