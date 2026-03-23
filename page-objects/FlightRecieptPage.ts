import { Page } from '@playwright/test';

export default class FlightRecieptPage {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async processRecieptPage() {

        await this.page.waitForTimeout(1000);
        const downloadPromise = this.page.waitForEvent('download');
        await this.page.getByText('download Download Invoice').click();
        await this.page.waitForTimeout(400);
        const download = await downloadPromise;

    }

}   