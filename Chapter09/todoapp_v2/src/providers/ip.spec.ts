import { async, TestBed, inject } from '@angular/core/testing';
import { IP } from './ip';
import { Headers, Http, HttpModule, BaseRequestOptions, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

// https://kendaleiv.com/angular-2-mockbackend-service-testing-template-using-testbed/
describe('Service: IPService', () => {
  let service;
  let http;

  const mockResponse = {
    ip: '11:22:33:44'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        IP
      ]
    })
  }));

  it('should construct', async(inject(
    [IP, MockBackend], (ipService, mockBackend) => {
      expect(ipService).toBeDefined();
    })));

  it('should get IP equal to `11:22:33:44`', async(inject(
    [IP, MockBackend], (ipService, mockBackend) => {

      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
      });

      const result = ipService.get();

      result.subscribe((res) => {
        expect(res.json()).toEqual({
          ip: '11:22:33:44'
        });
      });
    })));
});