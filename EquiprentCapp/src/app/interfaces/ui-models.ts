export class Menu {
    Icon?: string;
    Items?: MenuArray;
    Label: string;
    Permissions?: number[];
    RouterLink?: string[];
}

export class MenuArray extends Array<Menu> {
    public getItemsForLabel(label: string): MenuArray | undefined {
        return this.find(m => m.Label == label)?.Items;
    }
}

export interface SelectOption {
    IsSelected: boolean;
    Name: string;
    Value: string | number;
}