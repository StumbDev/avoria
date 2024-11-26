from PIL import Image
import potrace
import numpy as np

def png_to_svg(input_file: str, output_file: str):
    # Open and convert image to grayscale
    img = Image.open(input_file).convert("L")
    
    # Convert image to black and white (binary) for tracing
    bw_threshold = 128
    img = img.point(lambda p: p > bw_threshold and 255)
    img_array = np.array(img, dtype=np.uint8)
    
    # Convert to bitmap
    bmp = potrace.Bitmap(img_array)
    
    # Create the path from the bitmap
    path = bmp.trace()
    
    # Write the SVG output
    with open(output_file, "w") as svg_file:
        svg_file.write('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n')
        svg_file.write('<svg xmlns="http://www.w3.org/2000/svg" version="1.1">\n')
        
        for curve in path:
            svg_file.write('<path d="')
            for segment in curve:
                if segment.is_corner:
                    svg_file.write(f"M {segment.c[0][0]} {segment.c[0][1]} ")
                else:
                    svg_file.write(f"C {segment.c[0][0]} {segment.c[0][1]}, ")
            svg_file.write('" fill="red" stroke="none"/>\n')
        
        svg_file.write('</svg>')

# Input and output file paths
input_file = "image.png"  # Path to your input PNG
output_file = "output.svg"  # Path to save the output SVG

png_to_svg(input_file, output_file)
print(f"SVG saved to {output_file}")
