import SiteRoutes from "../lib/site-routes";

export default class ButtonLinkModel
{
    text: string;
    link: string;

    constructor(text: string = "Button text", link: string = SiteRoutes.getBaseRoute())
    {
        this.text = text;
        this.link = link;
    }
}