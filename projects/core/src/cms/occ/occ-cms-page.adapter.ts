import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageType } from '../../occ/occ-models/index';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { PageContext } from '../../routing/index';
import { CmsPageAdapter } from '../connectors/page/cms-page.adapter';
import { CMS_PAGE_NORMALIZE } from '../connectors/page/converters';
import { ConverterService } from '../../util/converter.service';
import { CmsStructureModel } from '../model/page.model';

@Injectable()
export class OccCmsPageAdapter implements CmsPageAdapter {
  protected headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(
    pageContext: PageContext,
    fields?: string
  ): Observable<CmsStructureModel> {
    // load page by Id
    if (pageContext.type === undefined) {
      return this.http
        .get(
          this.occEndpoints.getUrl('page', {
            id: pageContext.id,
            fields: fields ? fields : 'DEFAULT',
          }),
          {
            headers: this.headers,
          }
        )
        .pipe(this.converter.pipeable(CMS_PAGE_NORMALIZE));
    }

    // load page by PageContext
    const httpParams = this.getPagesRequestParams(pageContext);
    return this.http
      .get(this.getPagesEndpoint(httpParams, fields), {
        headers: this.headers,
      })
      .pipe(this.converter.pipeable(CMS_PAGE_NORMALIZE));
  }

  private getPagesEndpoint(
    params: {
      [key: string]: string;
    },
    fields?: string
  ): string {
    fields = fields ? fields : 'DEFAULT';
    return this.occEndpoints.getUrl('pages', { fields }, params);
  }

  private getPagesRequestParams(
    pageContext: PageContext
  ): { [key: string]: any } {
    let httpParams = {};

    // smartedit preview page is loaded by previewToken which added by interceptor
    if (pageContext.id !== 'smartedit-preview') {
      httpParams = { pageType: pageContext.type };

      if (pageContext.type === PageType.CONTENT_PAGE) {
        httpParams['pageLabelOrId'] = pageContext.id;
      } else {
        httpParams['code'] = pageContext.id;
      }
    }
    return httpParams;
  }
}
