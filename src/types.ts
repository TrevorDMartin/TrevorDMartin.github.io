export interface Show {
    date: string;
    venue: string;
    location: string;
}

export interface PressItem {
    outlet: string;
    quote: string;
}

export interface NavLink {
    label: string;
    href: string;
}

export interface SocialLink {
    platform: string;
    url: string;
    ariaLabel: string;
}