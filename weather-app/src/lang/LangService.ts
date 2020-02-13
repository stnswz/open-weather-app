import {ILang} from "./../app/definitions/ILang";
import {lang} from "../app/constants/lang";
import {langDE} from "./langDE";
import {langEN} from "./langEN";

export class LangService {

    private static store: any;

    public static setStore(store:any): void {
        this.store = store;
    }

    public static getLang(): string {
        return this.store.getState().appState.language;
    }

    public static getLangObject():ILang {
        const selectedLang:string = this.store.getState().appState.language;
        return selectedLang === lang.DE ? langDE : langEN;
    }

}