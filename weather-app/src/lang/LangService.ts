export class LangService {

    private static store: any;

    public static setStore(store:any): void {
        this.store = store;
    }

    public static getLang(): any {
        return this.store.getState().weatherState.selectedIndex;
    }

}