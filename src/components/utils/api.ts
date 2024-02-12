export const baseURL = "https://3887-2804-4b0-11b0-4800-d419-c775-9b29-9699.ngrok-free.app"

class Categories  {
  
  async getCategories(){
    const getCat = await fetch(`${baseURL}/categories`,{
      method:"GET"
    })
    const response = await getCat.json()
    return response
  }
  async getOneCategory(slug:string){
    const getCat = await fetch(`${baseURL}/category/${slug}`,{
      method:"GET"
    })
    const response = await getCat.json()
    return response
  }
}
const CategoriesApi = new Categories();
export default CategoriesApi;
