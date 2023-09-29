export class Menu {
    Icon?: string;
    Items?: Menu[];
    Label: string;
    Permissions?: number[];
    RouterLink?: string[];
}

export interface SelectOption {
    IsSelected: boolean;
    Name: string;
    Value: number | string;
}