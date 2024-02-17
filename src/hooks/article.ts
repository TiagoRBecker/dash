import Swal from "sweetalert2";
import { baseURL } from "@/components/utils/api";
//Hook responsavel por fazer a logica de cadastrar e editar os colaboradores
class ArticleService {
    private baseURL: string;

    constructor() {
      this.baseURL = baseURL ;
    }
    async getArticles(setArticles:any,setLoading:any) {
    const get = await fetch(`${this?.baseURL}/articles`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (get.status === 200) {
      const response = await get.json();
      setArticles(response);
      setLoading(false);
      return;
    }
  };
   async  getCategories (setCategories:any,setLoading:any) {
    const getCat = await fetch(`${this.baseURL}/categories`, {
      method: "GET",
    });
    const response = await getCat.json();
    setCategories(response);
    setLoading(false)
    return
  };
  async getArticleById  (slug:any,setValue:any,setLoading:any)  {
    const getArticle = await fetch(`${this.baseURL}/article-edit/${slug}`, {
      method: "GET",
    });
    const response = await getArticle.json();
    Object.keys(response).forEach((key: any) => {
      setValue(key, response[key] as any);
    });
    setLoading(false);
    return;
  };
   filterCategory(categories:any,selectCat:string){
     const filterCat = categories.filter(
        (name: any) => Number(name.id) === Number(selectCat)
      );
      return filterCat
  }
   upload = async (e: React.ChangeEvent<HTMLInputElement>,setLoading:any,setAvatar:any) => {
    setLoading(true);
    const files = e.target.files as any;
    if (files) {
      // Se um arquivo foi fornecido, atualize a URL
      setAvatar(files[0]);
      setLoading(false);
    }

    return;
  };
   clearAvatar = (setAvatar:any) => {
    setAvatar("");
  };
    uploadPdf = (e: React.ChangeEvent<HTMLInputElement>,setUrl:any,setLoading:any) => {
    const files = e.target.files as any;
    if (files) {
      // Se um arquivo foi fornecido, atualize a URL
      setUrl(files[0]);
      setLoading(false);
    }
  };
    clearPdf = (setUrl:any) => {
    setUrl("");
  };

}
 const ArticleController = new ArticleService()
export default ArticleController;