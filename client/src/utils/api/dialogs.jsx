import { axios } from "../../core";

export default {
    getAll: () => axios.get("/dialogs"),
    create: ({ partner, text, ad }) => axios.post("/dialogs", { partner, text, ad })
};