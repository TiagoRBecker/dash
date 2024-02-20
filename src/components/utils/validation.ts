import * as z from "zod";

export const user = z.object({
  name: z.string().min(1, { message: "Necessário  preencher o campo nome" }),
  email: z
    .string()
    .email({ message: "Insira um email válido" })
    .min(1, { message: "Necessário  preencher o email" }),
  phone: z.string().min(11, {
    message: "Necessário  preencher o campo telefone com 11 dígitos",
  }),
  profession: z.string().min(1, {
    message: "Necessário  preencher o campo Creci",
  }),
  password: z.string().min(6, {
    message: "Necessário  preencher o campo Senha",
  }),
});
export const article = z.object({
  name: z.string().min(1, { message: "Campo Obrigatorio" }),
  volume: z.string().min(1, { message: "Campo Obrigatorio" }),
  author: z.string().min(1, { message: "Campo Obrigatorio" }),
  company: z.string().min(1, { message: "Campo Obrigatorio" }),
  status: z.enum(['free', 'recommended',"most-read","trend"]),
  description: z.string().min(1, { message: "Campo Obrigatorio" }),
  capa_name: z.string().min(1, { message: "Campo Obrigatorio" }),
  categoryId: z.any().refine(
    (value) => {
      return value !== "" && value !== null;
    },
    { message: "Selecione uma opção válida" }
  ),

  articleId: z.any().refine(
    (value) => {
      return value !== "" && value !== null;
    },
    { message: "Selecione uma opção válida" }
  ),
  magazineId: z.any().refine(
    (value) => {
      return value !== "" && value !== null;
    },
    { message: "Selecione uma opção válida" }
  ),
});
export const magazine = z.object({
  name: z.string().min(1, { message: "Campo Obrigatorio" }),
  volume: z.string().min(1, { message: "Campo Obrigatorio" }),
  author: z.string().min(1, { message: "Campo Obrigatorio" }),
  company: z.string().min(1, { message: "Campo Obrigatorio" }),
  capa_name: z.string().min(1, { message: "Campo Obrigatorio" }),
  price: z.any().refine(
    (value) => {
      return value !== "" && value !== null;
    },
    { message: "Selecione uma opção válida" }
  ),
  description: z.string().min(1, { message: "Campo Obrigatorio" }),
  categoryId: z.any().refine(
    (value) => {
      return value !== "" && value !== null;
    },
    { message: "Selecione uma opção válida" }
  ),
  employeeId: z.optional(z.any()),

  articleId: z.any().refine(
    (value) => {
      return value !== "" && value !== null;
    },
    { message: "Selecione uma opção válida" }
  ),
  
});

export const login = z.object({
  email: z
    .string()
    .email({ message: "Insira um email válido." })
    .min(1, { message: "Campo Obrigatorio" }),
  password: z.string().min(6, { message: "Campo Obrigatorio" }),
});
export const filter = z.object({
  categories: z.string().refine(
    (value) => {
      return value !== "" && value !== null;
    },
    { message: "Selecione uma opção válida" }
  ),
  city: z.string().refine(
    (value) => {
      return value !== "" && value !== null;
    },
    { message: "Selecione uma opção válida" }
  ),
  district: z.string().refine(
    (value) => {
      return value !== "" && value !== null;
    },
    { message: "Selecione uma opção válida" }
  ),
  bedrooms: z.string().optional(),
  suite: z.string().optional(),
  garage: z.string().optional(),

  rangePricelow: z.string().refine(
    (value) => {
      return value !== "" && value !== null;
    },
    { message: "Selecione uma opção válida" }
  ),
  rangePriceHigh: z.string().refine(
    (value) => {
      return value !== "" && value !== null;
    },
    { message: "Selecione uma opção válida" }
  ),
});
export type Login = z.infer<typeof login>;
export type User = z.infer<typeof user>;
export type Article = z.infer<typeof article>;
export type Magazine = z.infer<typeof magazine>;
export type Filter = z.infer<typeof filter>;

/*
  code       String
  descript   String
  price      Float
  bedrooms   String
  UF         String
  city       String
  district   String
  catId      Int
  meters     String
  garage     String
  suite      String
  categories Categories @relation(fields: [catId], references: [id])
  images     String[]
  createAt   DateTime   @default(now())
  updateAt   DateTime?
  User       User?      @relation(fields: [userId], references: [id])
  userId     Int?
  */
