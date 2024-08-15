import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import styles from './WebpartAccessSiteWebPart.module.scss';

export interface IWebpartAccessSiteWebPartProps {
}

export default class WebpartAccessSiteWebPart extends BaseClientSideWebPart<IWebpartAccessSiteWebPartProps> {

  private sp: SPFI;
  private jobs: any[] = [];

  protected onInit(): Promise<void> {
    this.sp = spfi().using(SPFx(this.context));
    this.getJobs();
    return super.onInit();
  }

  public render(): void {

    let jobsHtml = '<ol>';
    this.jobs.forEach(job => {
      jobsHtml += `<li>${job['Title']}</li>`
    });
    jobsHtml += '</ol>';

    this.domElement.innerHTML = `
    <div class="${ styles.webpartAccessSite }">
      <h3>
        <button id="addJob">Add Job</button>
      </h3>
      ${ this.jobs.length > 0 ? jobsHtml : 'No jobs to display.' }
    </div>`;

    this.attachButtonClickHandler();
  }

  private async getJobs(): Promise<void>  {
    this.jobs = await this.sp.web.lists.getByTitle("Job Postings").items();
    console.log(this.jobs);

    this.render();
  }

  private async addJob(title: string, description: string): Promise<void> {
    const job = await this.sp.web.lists.getByTitle("Job Postings").items.add({
      Title: title,
      Description: description
    });
    console.log(job);

    this.getJobs();
  }

  private attachButtonClickHandler(): void {
    const button = this.domElement.querySelector('#addJob');
    if (button) {
      const timeNow = Date.now().toString();
      button.addEventListener('click', () => this.addJob(timeNow, `Added job on ${timeNow}`));
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
