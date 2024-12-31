import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function Form() {
  async function uploadImage(formData: FormData) {
    const imageFile = formData.get("image") as File;
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
    });
    revalidatePath("/");
    return blob;
  }

  return (
    <div>
    <form ={uploadImage}>
      <label htmlFor="image">Image</label>
      <input type="file" id="image" name="image" required />
      <button>Upload</button>
    </form>
    </div>
  );
}
