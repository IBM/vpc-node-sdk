/**
 * (C) Copyright IBM Corp. 2021.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, unitTestUtils } = core;

const VpcV1 = require('../../dist/vpc/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://us-south.iaas.cloud.ibm.com/v1',
  version: 'testString',
};

const vpcService = new VpcV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(vpcService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

// used for the service construction tests
let requiredGlobals;
beforeEach(() => {
  // these are changed when passed into the factory/constructor, so re-init
  requiredGlobals = {
    version: 'testString',
  };
});

describe('VpcV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = VpcV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(VpcV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(VpcV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(VpcV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = VpcV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(VpcV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new VpcV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new VpcV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(VpcV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new VpcV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(service.version);
        expect(serviceObj.generation).toEqual(service.generation);
      });
    });
  });
  describe('listVpcs', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listVpcs
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const classicAccess = true;
        const params = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          classicAccess: classicAccess,
        };

        const listVpcsResult = vpcService.listVpcs(params);

        // all methods should return a Promise
        expectToBePromise(listVpcsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(options.qs['classic_access']).toEqual(classicAccess);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVpcs(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listVpcs({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createVpc', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createVpc
        const addressPrefixManagement = 'manual';
        const classicAccess = false;
        const name = 'my-vpc';
        const resourceGroup = resourceGroupIdentityModel;
        const params = {
          addressPrefixManagement: addressPrefixManagement,
          classicAccess: classicAccess,
          name: name,
          resourceGroup: resourceGroup,
        };

        const createVpcResult = vpcService.createVpc(params);

        // all methods should return a Promise
        expectToBePromise(createVpcResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['address_prefix_management']).toEqual(addressPrefixManagement);
        expect(options.body['classic_access']).toEqual(classicAccess);
        expect(options.body['name']).toEqual(name);
        expect(options.body['resource_group']).toEqual(resourceGroup);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createVpc(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.createVpc({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('deleteVpc', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteVpc
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteVpcResult = vpcService.deleteVpc(params);

        // all methods should return a Promise
        expectToBePromise(deleteVpcResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteVpc(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteVpc({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteVpcPromise = vpcService.deleteVpc();
        expectToBePromise(deleteVpcPromise);

        deleteVpcPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getVpc', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getVpc
        const id = 'testString';
        const params = {
          id: id,
        };

        const getVpcResult = vpcService.getVpc(params);

        // all methods should return a Promise
        expectToBePromise(getVpcResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpc(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getVpc({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getVpcPromise = vpcService.getVpc();
        expectToBePromise(getVpcPromise);

        getVpcPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateVpc', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateVpc
        const id = 'testString';
        const name = 'my-vpc';
        const params = {
          id: id,
          name: name,
        };

        const updateVpcResult = vpcService.updateVpc(params);

        // all methods should return a Promise
        expectToBePromise(updateVpcResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateVpc(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateVpc({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateVpcPromise = vpcService.updateVpc();
        expectToBePromise(updateVpcPromise);

        updateVpcPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getVpcDefaultNetworkAcl', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getVpcDefaultNetworkAcl
        const id = 'testString';
        const params = {
          id: id,
        };

        const getVpcDefaultNetworkAclResult = vpcService.getVpcDefaultNetworkAcl(params);

        // all methods should return a Promise
        expectToBePromise(getVpcDefaultNetworkAclResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{id}/default_network_acl', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpcDefaultNetworkAcl(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getVpcDefaultNetworkAcl({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getVpcDefaultNetworkAclPromise = vpcService.getVpcDefaultNetworkAcl();
        expectToBePromise(getVpcDefaultNetworkAclPromise);

        getVpcDefaultNetworkAclPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getVpcDefaultRoutingTable', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getVpcDefaultRoutingTable
        const id = 'testString';
        const params = {
          id: id,
        };

        const getVpcDefaultRoutingTableResult = vpcService.getVpcDefaultRoutingTable(params);

        // all methods should return a Promise
        expectToBePromise(getVpcDefaultRoutingTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{id}/default_routing_table', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpcDefaultRoutingTable(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getVpcDefaultRoutingTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getVpcDefaultRoutingTablePromise = vpcService.getVpcDefaultRoutingTable();
        expectToBePromise(getVpcDefaultRoutingTablePromise);

        getVpcDefaultRoutingTablePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getVpcDefaultSecurityGroup', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getVpcDefaultSecurityGroup
        const id = 'testString';
        const params = {
          id: id,
        };

        const getVpcDefaultSecurityGroupResult = vpcService.getVpcDefaultSecurityGroup(params);

        // all methods should return a Promise
        expectToBePromise(getVpcDefaultSecurityGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{id}/default_security_group', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpcDefaultSecurityGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getVpcDefaultSecurityGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getVpcDefaultSecurityGroupPromise = vpcService.getVpcDefaultSecurityGroup();
        expectToBePromise(getVpcDefaultSecurityGroupPromise);

        getVpcDefaultSecurityGroupPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listVpcAddressPrefixes', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listVpcAddressPrefixes
        const vpcId = 'testString';
        const start = 'testString';
        const limit = 1;
        const params = {
          vpcId: vpcId,
          start: start,
          limit: limit,
        };

        const listVpcAddressPrefixesResult = vpcService.listVpcAddressPrefixes(params);

        // all methods should return a Promise
        expectToBePromise(listVpcAddressPrefixesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{vpc_id}/address_prefixes', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.path['vpc_id']).toEqual(vpcId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVpcAddressPrefixes(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listVpcAddressPrefixes({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listVpcAddressPrefixesPromise = vpcService.listVpcAddressPrefixes();
        expectToBePromise(listVpcAddressPrefixesPromise);

        listVpcAddressPrefixesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createVpcAddressPrefix', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ZoneIdentityByName
      const zoneIdentityModel = {
        name: 'us-south-1',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createVpcAddressPrefix
        const vpcId = 'testString';
        const cidr = '10.0.0.0/24';
        const zone = zoneIdentityModel;
        const isDefault = true;
        const name = 'my-address-prefix-2';
        const params = {
          vpcId: vpcId,
          cidr: cidr,
          zone: zone,
          isDefault: isDefault,
          name: name,
        };

        const createVpcAddressPrefixResult = vpcService.createVpcAddressPrefix(params);

        // all methods should return a Promise
        expectToBePromise(createVpcAddressPrefixResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{vpc_id}/address_prefixes', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['cidr']).toEqual(cidr);
        expect(options.body['zone']).toEqual(zone);
        expect(options.body['is_default']).toEqual(isDefault);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpc_id']).toEqual(vpcId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const cidr = '10.0.0.0/24';
        const zone = zoneIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          cidr,
          zone,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createVpcAddressPrefix(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createVpcAddressPrefix({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createVpcAddressPrefixPromise = vpcService.createVpcAddressPrefix();
        expectToBePromise(createVpcAddressPrefixPromise);

        createVpcAddressPrefixPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteVpcAddressPrefix', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteVpcAddressPrefix
        const vpcId = 'testString';
        const id = 'testString';
        const params = {
          vpcId: vpcId,
          id: id,
        };

        const deleteVpcAddressPrefixResult = vpcService.deleteVpcAddressPrefix(params);

        // all methods should return a Promise
        expectToBePromise(deleteVpcAddressPrefixResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{vpc_id}/address_prefixes/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpc_id']).toEqual(vpcId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteVpcAddressPrefix(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteVpcAddressPrefix({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteVpcAddressPrefixPromise = vpcService.deleteVpcAddressPrefix();
        expectToBePromise(deleteVpcAddressPrefixPromise);

        deleteVpcAddressPrefixPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getVpcAddressPrefix', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getVpcAddressPrefix
        const vpcId = 'testString';
        const id = 'testString';
        const params = {
          vpcId: vpcId,
          id: id,
        };

        const getVpcAddressPrefixResult = vpcService.getVpcAddressPrefix(params);

        // all methods should return a Promise
        expectToBePromise(getVpcAddressPrefixResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{vpc_id}/address_prefixes/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpc_id']).toEqual(vpcId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpcAddressPrefix(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getVpcAddressPrefix({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getVpcAddressPrefixPromise = vpcService.getVpcAddressPrefix();
        expectToBePromise(getVpcAddressPrefixPromise);

        getVpcAddressPrefixPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateVpcAddressPrefix', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateVpcAddressPrefix
        const vpcId = 'testString';
        const id = 'testString';
        const isDefault = false;
        const name = 'my-address-prefix-2';
        const params = {
          vpcId: vpcId,
          id: id,
          isDefault: isDefault,
          name: name,
        };

        const updateVpcAddressPrefixResult = vpcService.updateVpcAddressPrefix(params);

        // all methods should return a Promise
        expectToBePromise(updateVpcAddressPrefixResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{vpc_id}/address_prefixes/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['is_default']).toEqual(isDefault);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpc_id']).toEqual(vpcId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateVpcAddressPrefix(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateVpcAddressPrefix({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateVpcAddressPrefixPromise = vpcService.updateVpcAddressPrefix();
        expectToBePromise(updateVpcAddressPrefixPromise);

        updateVpcAddressPrefixPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listVpcRoutes', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listVpcRoutes
        const vpcId = 'testString';
        const zoneName = 'testString';
        const start = 'testString';
        const limit = 1;
        const params = {
          vpcId: vpcId,
          zoneName: zoneName,
          start: start,
          limit: limit,
        };

        const listVpcRoutesResult = vpcService.listVpcRoutes(params);

        // all methods should return a Promise
        expectToBePromise(listVpcRoutesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{vpc_id}/routes', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['zone.name']).toEqual(zoneName);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.path['vpc_id']).toEqual(vpcId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVpcRoutes(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listVpcRoutes({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listVpcRoutesPromise = vpcService.listVpcRoutes();
        expectToBePromise(listVpcRoutesPromise);

        listVpcRoutesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createVpcRoute', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ZoneIdentityByName
      const zoneIdentityModel = {
        name: 'us-south-1',
      };

      // RouteNextHopPrototypeRouteNextHopIP
      const routeNextHopPrototypeModel = {
        address: '192.168.3.4',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createVpcRoute
        const vpcId = 'testString';
        const destination = '192.168.3.0/24';
        const zone = zoneIdentityModel;
        const action = 'delegate';
        const name = 'my-route-2';
        const nextHop = routeNextHopPrototypeModel;
        const params = {
          vpcId: vpcId,
          destination: destination,
          zone: zone,
          action: action,
          name: name,
          nextHop: nextHop,
        };

        const createVpcRouteResult = vpcService.createVpcRoute(params);

        // all methods should return a Promise
        expectToBePromise(createVpcRouteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{vpc_id}/routes', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['destination']).toEqual(destination);
        expect(options.body['zone']).toEqual(zone);
        expect(options.body['action']).toEqual(action);
        expect(options.body['name']).toEqual(name);
        expect(options.body['next_hop']).toEqual(nextHop);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpc_id']).toEqual(vpcId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const destination = '192.168.3.0/24';
        const zone = zoneIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          destination,
          zone,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createVpcRoute(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createVpcRoute({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createVpcRoutePromise = vpcService.createVpcRoute();
        expectToBePromise(createVpcRoutePromise);

        createVpcRoutePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteVpcRoute', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteVpcRoute
        const vpcId = 'testString';
        const id = 'testString';
        const params = {
          vpcId: vpcId,
          id: id,
        };

        const deleteVpcRouteResult = vpcService.deleteVpcRoute(params);

        // all methods should return a Promise
        expectToBePromise(deleteVpcRouteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{vpc_id}/routes/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpc_id']).toEqual(vpcId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteVpcRoute(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteVpcRoute({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteVpcRoutePromise = vpcService.deleteVpcRoute();
        expectToBePromise(deleteVpcRoutePromise);

        deleteVpcRoutePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getVpcRoute', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getVpcRoute
        const vpcId = 'testString';
        const id = 'testString';
        const params = {
          vpcId: vpcId,
          id: id,
        };

        const getVpcRouteResult = vpcService.getVpcRoute(params);

        // all methods should return a Promise
        expectToBePromise(getVpcRouteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{vpc_id}/routes/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpc_id']).toEqual(vpcId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpcRoute(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getVpcRoute({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getVpcRoutePromise = vpcService.getVpcRoute();
        expectToBePromise(getVpcRoutePromise);

        getVpcRoutePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateVpcRoute', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateVpcRoute
        const vpcId = 'testString';
        const id = 'testString';
        const name = 'my-route-2';
        const params = {
          vpcId: vpcId,
          id: id,
          name: name,
        };

        const updateVpcRouteResult = vpcService.updateVpcRoute(params);

        // all methods should return a Promise
        expectToBePromise(updateVpcRouteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{vpc_id}/routes/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpc_id']).toEqual(vpcId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateVpcRoute(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateVpcRoute({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateVpcRoutePromise = vpcService.updateVpcRoute();
        expectToBePromise(updateVpcRoutePromise);

        updateVpcRoutePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listVpcRoutingTables', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listVpcRoutingTables
        const vpcId = 'testString';
        const start = 'testString';
        const limit = 1;
        const isDefault = true;
        const params = {
          vpcId: vpcId,
          start: start,
          limit: limit,
          isDefault: isDefault,
        };

        const listVpcRoutingTablesResult = vpcService.listVpcRoutingTables(params);

        // all methods should return a Promise
        expectToBePromise(listVpcRoutingTablesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{vpc_id}/routing_tables', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['is_default']).toEqual(isDefault);
        expect(options.path['vpc_id']).toEqual(vpcId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVpcRoutingTables(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listVpcRoutingTables({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listVpcRoutingTablesPromise = vpcService.listVpcRoutingTables();
        expectToBePromise(listVpcRoutingTablesPromise);

        listVpcRoutingTablesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createVpcRoutingTable', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RouteNextHopPrototypeRouteNextHopIP
      const routeNextHopPrototypeModel = {
        address: '192.168.3.4',
      };

      // ZoneIdentityByName
      const zoneIdentityModel = {
        name: 'us-south-1',
      };

      // RoutePrototype
      const routePrototypeModel = {
        action: 'delegate',
        destination: '192.168.3.0/24',
        name: 'my-route-2',
        next_hop: routeNextHopPrototypeModel,
        zone: zoneIdentityModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createVpcRoutingTable
        const vpcId = 'testString';
        const name = 'my-routing-table-2';
        const routeDirectLinkIngress = true;
        const routeTransitGatewayIngress = true;
        const routeVpcZoneIngress = true;
        const routes = [routePrototypeModel];
        const params = {
          vpcId: vpcId,
          name: name,
          routeDirectLinkIngress: routeDirectLinkIngress,
          routeTransitGatewayIngress: routeTransitGatewayIngress,
          routeVpcZoneIngress: routeVpcZoneIngress,
          routes: routes,
        };

        const createVpcRoutingTableResult = vpcService.createVpcRoutingTable(params);

        // all methods should return a Promise
        expectToBePromise(createVpcRoutingTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{vpc_id}/routing_tables', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['route_direct_link_ingress']).toEqual(routeDirectLinkIngress);
        expect(options.body['route_transit_gateway_ingress']).toEqual(routeTransitGatewayIngress);
        expect(options.body['route_vpc_zone_ingress']).toEqual(routeVpcZoneIngress);
        expect(options.body['routes']).toEqual(routes);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpc_id']).toEqual(vpcId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createVpcRoutingTable(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createVpcRoutingTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createVpcRoutingTablePromise = vpcService.createVpcRoutingTable();
        expectToBePromise(createVpcRoutingTablePromise);

        createVpcRoutingTablePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteVpcRoutingTable', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteVpcRoutingTable
        const vpcId = 'testString';
        const id = 'testString';
        const params = {
          vpcId: vpcId,
          id: id,
        };

        const deleteVpcRoutingTableResult = vpcService.deleteVpcRoutingTable(params);

        // all methods should return a Promise
        expectToBePromise(deleteVpcRoutingTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{vpc_id}/routing_tables/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpc_id']).toEqual(vpcId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteVpcRoutingTable(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteVpcRoutingTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteVpcRoutingTablePromise = vpcService.deleteVpcRoutingTable();
        expectToBePromise(deleteVpcRoutingTablePromise);

        deleteVpcRoutingTablePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getVpcRoutingTable', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getVpcRoutingTable
        const vpcId = 'testString';
        const id = 'testString';
        const params = {
          vpcId: vpcId,
          id: id,
        };

        const getVpcRoutingTableResult = vpcService.getVpcRoutingTable(params);

        // all methods should return a Promise
        expectToBePromise(getVpcRoutingTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{vpc_id}/routing_tables/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpc_id']).toEqual(vpcId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpcRoutingTable(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getVpcRoutingTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getVpcRoutingTablePromise = vpcService.getVpcRoutingTable();
        expectToBePromise(getVpcRoutingTablePromise);

        getVpcRoutingTablePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateVpcRoutingTable', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateVpcRoutingTable
        const vpcId = 'testString';
        const id = 'testString';
        const name = 'my-routing-table-2';
        const routeDirectLinkIngress = true;
        const routeTransitGatewayIngress = true;
        const routeVpcZoneIngress = true;
        const params = {
          vpcId: vpcId,
          id: id,
          name: name,
          routeDirectLinkIngress: routeDirectLinkIngress,
          routeTransitGatewayIngress: routeTransitGatewayIngress,
          routeVpcZoneIngress: routeVpcZoneIngress,
        };

        const updateVpcRoutingTableResult = vpcService.updateVpcRoutingTable(params);

        // all methods should return a Promise
        expectToBePromise(updateVpcRoutingTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpcs/{vpc_id}/routing_tables/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['route_direct_link_ingress']).toEqual(routeDirectLinkIngress);
        expect(options.body['route_transit_gateway_ingress']).toEqual(routeTransitGatewayIngress);
        expect(options.body['route_vpc_zone_ingress']).toEqual(routeVpcZoneIngress);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpc_id']).toEqual(vpcId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateVpcRoutingTable(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateVpcRoutingTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateVpcRoutingTablePromise = vpcService.updateVpcRoutingTable();
        expectToBePromise(updateVpcRoutingTablePromise);

        updateVpcRoutingTablePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listVpcRoutingTableRoutes', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listVpcRoutingTableRoutes
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const start = 'testString';
        const limit = 1;
        const params = {
          vpcId: vpcId,
          routingTableId: routingTableId,
          start: start,
          limit: limit,
        };

        const listVpcRoutingTableRoutesResult = vpcService.listVpcRoutingTableRoutes(params);

        // all methods should return a Promise
        expectToBePromise(listVpcRoutingTableRoutesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/vpcs/{vpc_id}/routing_tables/{routing_table_id}/routes',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.path['vpc_id']).toEqual(vpcId);
        expect(options.path['routing_table_id']).toEqual(routingTableId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          routingTableId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVpcRoutingTableRoutes(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listVpcRoutingTableRoutes({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listVpcRoutingTableRoutesPromise = vpcService.listVpcRoutingTableRoutes();
        expectToBePromise(listVpcRoutingTableRoutesPromise);

        listVpcRoutingTableRoutesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createVpcRoutingTableRoute', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ZoneIdentityByName
      const zoneIdentityModel = {
        name: 'us-south-1',
      };

      // RouteNextHopPrototypeRouteNextHopIP
      const routeNextHopPrototypeModel = {
        address: '192.168.3.4',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createVpcRoutingTableRoute
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const destination = '192.168.3.0/24';
        const zone = zoneIdentityModel;
        const action = 'delegate';
        const name = 'my-route-2';
        const nextHop = routeNextHopPrototypeModel;
        const params = {
          vpcId: vpcId,
          routingTableId: routingTableId,
          destination: destination,
          zone: zone,
          action: action,
          name: name,
          nextHop: nextHop,
        };

        const createVpcRoutingTableRouteResult = vpcService.createVpcRoutingTableRoute(params);

        // all methods should return a Promise
        expectToBePromise(createVpcRoutingTableRouteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/vpcs/{vpc_id}/routing_tables/{routing_table_id}/routes',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['destination']).toEqual(destination);
        expect(options.body['zone']).toEqual(zone);
        expect(options.body['action']).toEqual(action);
        expect(options.body['name']).toEqual(name);
        expect(options.body['next_hop']).toEqual(nextHop);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpc_id']).toEqual(vpcId);
        expect(options.path['routing_table_id']).toEqual(routingTableId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const destination = '192.168.3.0/24';
        const zone = zoneIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          routingTableId,
          destination,
          zone,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createVpcRoutingTableRoute(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createVpcRoutingTableRoute({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createVpcRoutingTableRoutePromise = vpcService.createVpcRoutingTableRoute();
        expectToBePromise(createVpcRoutingTableRoutePromise);

        createVpcRoutingTableRoutePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteVpcRoutingTableRoute', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteVpcRoutingTableRoute
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const id = 'testString';
        const params = {
          vpcId: vpcId,
          routingTableId: routingTableId,
          id: id,
        };

        const deleteVpcRoutingTableRouteResult = vpcService.deleteVpcRoutingTableRoute(params);

        // all methods should return a Promise
        expectToBePromise(deleteVpcRoutingTableRouteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/vpcs/{vpc_id}/routing_tables/{routing_table_id}/routes/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpc_id']).toEqual(vpcId);
        expect(options.path['routing_table_id']).toEqual(routingTableId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          routingTableId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteVpcRoutingTableRoute(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteVpcRoutingTableRoute({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteVpcRoutingTableRoutePromise = vpcService.deleteVpcRoutingTableRoute();
        expectToBePromise(deleteVpcRoutingTableRoutePromise);

        deleteVpcRoutingTableRoutePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getVpcRoutingTableRoute', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getVpcRoutingTableRoute
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const id = 'testString';
        const params = {
          vpcId: vpcId,
          routingTableId: routingTableId,
          id: id,
        };

        const getVpcRoutingTableRouteResult = vpcService.getVpcRoutingTableRoute(params);

        // all methods should return a Promise
        expectToBePromise(getVpcRoutingTableRouteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/vpcs/{vpc_id}/routing_tables/{routing_table_id}/routes/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpc_id']).toEqual(vpcId);
        expect(options.path['routing_table_id']).toEqual(routingTableId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          routingTableId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpcRoutingTableRoute(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getVpcRoutingTableRoute({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getVpcRoutingTableRoutePromise = vpcService.getVpcRoutingTableRoute();
        expectToBePromise(getVpcRoutingTableRoutePromise);

        getVpcRoutingTableRoutePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateVpcRoutingTableRoute', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateVpcRoutingTableRoute
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const id = 'testString';
        const name = 'my-route-2';
        const params = {
          vpcId: vpcId,
          routingTableId: routingTableId,
          id: id,
          name: name,
        };

        const updateVpcRoutingTableRouteResult = vpcService.updateVpcRoutingTableRoute(params);

        // all methods should return a Promise
        expectToBePromise(updateVpcRoutingTableRouteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/vpcs/{vpc_id}/routing_tables/{routing_table_id}/routes/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpc_id']).toEqual(vpcId);
        expect(options.path['routing_table_id']).toEqual(routingTableId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpcId,
          routingTableId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateVpcRoutingTableRoute(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateVpcRoutingTableRoute({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateVpcRoutingTableRoutePromise = vpcService.updateVpcRoutingTableRoute();
        expectToBePromise(updateVpcRoutingTableRoutePromise);

        updateVpcRoutingTableRoutePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listSubnets', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listSubnets
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const routingTableId = 'testString';
        const routingTableName = 'testString';
        const params = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          routingTableId: routingTableId,
          routingTableName: routingTableName,
        };

        const listSubnetsResult = vpcService.listSubnets(params);

        // all methods should return a Promise
        expectToBePromise(listSubnetsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/subnets', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(options.qs['routing_table.id']).toEqual(routingTableId);
        expect(options.qs['routing_table.name']).toEqual(routingTableName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listSubnets(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listSubnets({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createSubnet', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // NetworkACLIdentityById
      const networkAclIdentityModel = {
        id: 'a4e28308-8ee7-46ab-8108-9f881f22bdbf',
      };

      // PublicGatewayIdentityById
      const publicGatewayIdentityModel = {
        id: 'dc5431ef-1fc6-4861-adc9-a59d077d1241',
      };

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      // RoutingTableIdentityById
      const routingTableIdentityModel = {
        id: '6885e83f-03b2-4603-8a86-db2a0f55c840',
      };

      // VPCIdentityById
      const vpcIdentityModel = {
        id: '4727d842-f94f-4a2d-824a-9bc9b02c523b',
      };

      // ZoneIdentityByName
      const zoneIdentityModel = {
        name: 'us-south-1',
      };

      // SubnetPrototypeSubnetByTotalCount
      const subnetPrototypeModel = {
        ip_version: 'ipv4',
        name: 'my-subnet',
        network_acl: networkAclIdentityModel,
        public_gateway: publicGatewayIdentityModel,
        resource_group: resourceGroupIdentityModel,
        routing_table: routingTableIdentityModel,
        vpc: vpcIdentityModel,
        total_ipv4_address_count: 256,
        zone: zoneIdentityModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createSubnet
        const subnetPrototype = subnetPrototypeModel;
        const params = {
          subnetPrototype: subnetPrototype,
        };

        const createSubnetResult = vpcService.createSubnet(params);

        // all methods should return a Promise
        expectToBePromise(createSubnetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/subnets', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(subnetPrototype);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const subnetPrototype = subnetPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          subnetPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createSubnet(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createSubnet({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createSubnetPromise = vpcService.createSubnet();
        expectToBePromise(createSubnetPromise);

        createSubnetPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteSubnet', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteSubnet
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteSubnetResult = vpcService.deleteSubnet(params);

        // all methods should return a Promise
        expectToBePromise(deleteSubnetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/subnets/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteSubnet(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteSubnet({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteSubnetPromise = vpcService.deleteSubnet();
        expectToBePromise(deleteSubnetPromise);

        deleteSubnetPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSubnet', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSubnet
        const id = 'testString';
        const params = {
          id: id,
        };

        const getSubnetResult = vpcService.getSubnet(params);

        // all methods should return a Promise
        expectToBePromise(getSubnetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/subnets/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getSubnet(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getSubnet({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSubnetPromise = vpcService.getSubnet();
        expectToBePromise(getSubnetPromise);

        getSubnetPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateSubnet', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // NetworkACLIdentityById
      const networkAclIdentityModel = {
        id: 'a4e28308-8ee7-46ab-8108-9f881f22bdbf',
      };

      // PublicGatewayIdentityById
      const publicGatewayIdentityModel = {
        id: 'dc5431ef-1fc6-4861-adc9-a59d077d1241',
      };

      // RoutingTableIdentityById
      const routingTableIdentityModel = {
        id: '6885e83f-03b2-4603-8a86-db2a0f55c840',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateSubnet
        const id = 'testString';
        const name = 'my-subnet';
        const networkAcl = networkAclIdentityModel;
        const publicGateway = publicGatewayIdentityModel;
        const routingTable = routingTableIdentityModel;
        const params = {
          id: id,
          name: name,
          networkAcl: networkAcl,
          publicGateway: publicGateway,
          routingTable: routingTable,
        };

        const updateSubnetResult = vpcService.updateSubnet(params);

        // all methods should return a Promise
        expectToBePromise(updateSubnetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/subnets/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['network_acl']).toEqual(networkAcl);
        expect(options.body['public_gateway']).toEqual(publicGateway);
        expect(options.body['routing_table']).toEqual(routingTable);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateSubnet(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateSubnet({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateSubnetPromise = vpcService.updateSubnet();
        expectToBePromise(updateSubnetPromise);

        updateSubnetPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSubnetNetworkAcl', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSubnetNetworkAcl
        const id = 'testString';
        const params = {
          id: id,
        };

        const getSubnetNetworkAclResult = vpcService.getSubnetNetworkAcl(params);

        // all methods should return a Promise
        expectToBePromise(getSubnetNetworkAclResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/subnets/{id}/network_acl', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getSubnetNetworkAcl(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getSubnetNetworkAcl({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSubnetNetworkAclPromise = vpcService.getSubnetNetworkAcl();
        expectToBePromise(getSubnetNetworkAclPromise);

        getSubnetNetworkAclPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('replaceSubnetNetworkAcl', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // NetworkACLIdentityById
      const networkAclIdentityModel = {
        id: 'a4e28308-8ee7-46ab-8108-9f881f22bdbf',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation replaceSubnetNetworkAcl
        const id = 'testString';
        const networkAclIdentity = networkAclIdentityModel;
        const params = {
          id: id,
          networkAclIdentity: networkAclIdentity,
        };

        const replaceSubnetNetworkAclResult = vpcService.replaceSubnetNetworkAcl(params);

        // all methods should return a Promise
        expectToBePromise(replaceSubnetNetworkAclResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/subnets/{id}/network_acl', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(networkAclIdentity);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const networkAclIdentity = networkAclIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          networkAclIdentity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.replaceSubnetNetworkAcl(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.replaceSubnetNetworkAcl({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const replaceSubnetNetworkAclPromise = vpcService.replaceSubnetNetworkAcl();
        expectToBePromise(replaceSubnetNetworkAclPromise);

        replaceSubnetNetworkAclPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('unsetSubnetPublicGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation unsetSubnetPublicGateway
        const id = 'testString';
        const params = {
          id: id,
        };

        const unsetSubnetPublicGatewayResult = vpcService.unsetSubnetPublicGateway(params);

        // all methods should return a Promise
        expectToBePromise(unsetSubnetPublicGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/subnets/{id}/public_gateway', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.unsetSubnetPublicGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.unsetSubnetPublicGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const unsetSubnetPublicGatewayPromise = vpcService.unsetSubnetPublicGateway();
        expectToBePromise(unsetSubnetPublicGatewayPromise);

        unsetSubnetPublicGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSubnetPublicGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSubnetPublicGateway
        const id = 'testString';
        const params = {
          id: id,
        };

        const getSubnetPublicGatewayResult = vpcService.getSubnetPublicGateway(params);

        // all methods should return a Promise
        expectToBePromise(getSubnetPublicGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/subnets/{id}/public_gateway', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getSubnetPublicGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getSubnetPublicGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSubnetPublicGatewayPromise = vpcService.getSubnetPublicGateway();
        expectToBePromise(getSubnetPublicGatewayPromise);

        getSubnetPublicGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('setSubnetPublicGateway', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PublicGatewayIdentityById
      const publicGatewayIdentityModel = {
        id: 'dc5431ef-1fc6-4861-adc9-a59d077d1241',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation setSubnetPublicGateway
        const id = 'testString';
        const publicGatewayIdentity = publicGatewayIdentityModel;
        const params = {
          id: id,
          publicGatewayIdentity: publicGatewayIdentity,
        };

        const setSubnetPublicGatewayResult = vpcService.setSubnetPublicGateway(params);

        // all methods should return a Promise
        expectToBePromise(setSubnetPublicGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/subnets/{id}/public_gateway', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(publicGatewayIdentity);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const publicGatewayIdentity = publicGatewayIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          publicGatewayIdentity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.setSubnetPublicGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.setSubnetPublicGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const setSubnetPublicGatewayPromise = vpcService.setSubnetPublicGateway();
        expectToBePromise(setSubnetPublicGatewayPromise);

        setSubnetPublicGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSubnetRoutingTable', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSubnetRoutingTable
        const id = 'testString';
        const params = {
          id: id,
        };

        const getSubnetRoutingTableResult = vpcService.getSubnetRoutingTable(params);

        // all methods should return a Promise
        expectToBePromise(getSubnetRoutingTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/subnets/{id}/routing_table', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getSubnetRoutingTable(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getSubnetRoutingTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSubnetRoutingTablePromise = vpcService.getSubnetRoutingTable();
        expectToBePromise(getSubnetRoutingTablePromise);

        getSubnetRoutingTablePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('replaceSubnetRoutingTable', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RoutingTableIdentityById
      const routingTableIdentityModel = {
        id: '1a15dca5-7e33-45e1-b7c5-bc690e569531',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation replaceSubnetRoutingTable
        const id = 'testString';
        const routingTableIdentity = routingTableIdentityModel;
        const params = {
          id: id,
          routingTableIdentity: routingTableIdentity,
        };

        const replaceSubnetRoutingTableResult = vpcService.replaceSubnetRoutingTable(params);

        // all methods should return a Promise
        expectToBePromise(replaceSubnetRoutingTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/subnets/{id}/routing_table', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(routingTableIdentity);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const routingTableIdentity = routingTableIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          routingTableIdentity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.replaceSubnetRoutingTable(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.replaceSubnetRoutingTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const replaceSubnetRoutingTablePromise = vpcService.replaceSubnetRoutingTable();
        expectToBePromise(replaceSubnetRoutingTablePromise);

        replaceSubnetRoutingTablePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listSubnetReservedIps', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listSubnetReservedIps
        const subnetId = 'testString';
        const start = 'testString';
        const limit = 1;
        const sort = 'name';
        const params = {
          subnetId: subnetId,
          start: start,
          limit: limit,
          sort: sort,
        };

        const listSubnetReservedIpsResult = vpcService.listSubnetReservedIps(params);

        // all methods should return a Promise
        expectToBePromise(listSubnetReservedIpsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/subnets/{subnet_id}/reserved_ips', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['sort']).toEqual(sort);
        expect(options.path['subnet_id']).toEqual(subnetId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const subnetId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          subnetId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listSubnetReservedIps(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listSubnetReservedIps({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listSubnetReservedIpsPromise = vpcService.listSubnetReservedIps();
        expectToBePromise(listSubnetReservedIpsPromise);

        listSubnetReservedIpsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createSubnetReservedIp', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ReservedIPTargetPrototypeEndpointGatewayIdentityEndpointGatewayIdentityById
      const reservedIpTargetPrototypeModel = {
        id: 'd7cc5196-9864-48c4-82d8-3f30da41fcc5',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createSubnetReservedIp
        const subnetId = 'testString';
        const autoDelete = false;
        const name = 'my-reserved-ip';
        const target = reservedIpTargetPrototypeModel;
        const params = {
          subnetId: subnetId,
          autoDelete: autoDelete,
          name: name,
          target: target,
        };

        const createSubnetReservedIpResult = vpcService.createSubnetReservedIp(params);

        // all methods should return a Promise
        expectToBePromise(createSubnetReservedIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/subnets/{subnet_id}/reserved_ips', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['auto_delete']).toEqual(autoDelete);
        expect(options.body['name']).toEqual(name);
        expect(options.body['target']).toEqual(target);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['subnet_id']).toEqual(subnetId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const subnetId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          subnetId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createSubnetReservedIp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createSubnetReservedIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createSubnetReservedIpPromise = vpcService.createSubnetReservedIp();
        expectToBePromise(createSubnetReservedIpPromise);

        createSubnetReservedIpPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteSubnetReservedIp', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteSubnetReservedIp
        const subnetId = 'testString';
        const id = 'testString';
        const params = {
          subnetId: subnetId,
          id: id,
        };

        const deleteSubnetReservedIpResult = vpcService.deleteSubnetReservedIp(params);

        // all methods should return a Promise
        expectToBePromise(deleteSubnetReservedIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/subnets/{subnet_id}/reserved_ips/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['subnet_id']).toEqual(subnetId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const subnetId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          subnetId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteSubnetReservedIp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteSubnetReservedIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteSubnetReservedIpPromise = vpcService.deleteSubnetReservedIp();
        expectToBePromise(deleteSubnetReservedIpPromise);

        deleteSubnetReservedIpPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSubnetReservedIp', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSubnetReservedIp
        const subnetId = 'testString';
        const id = 'testString';
        const params = {
          subnetId: subnetId,
          id: id,
        };

        const getSubnetReservedIpResult = vpcService.getSubnetReservedIp(params);

        // all methods should return a Promise
        expectToBePromise(getSubnetReservedIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/subnets/{subnet_id}/reserved_ips/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['subnet_id']).toEqual(subnetId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const subnetId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          subnetId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getSubnetReservedIp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getSubnetReservedIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSubnetReservedIpPromise = vpcService.getSubnetReservedIp();
        expectToBePromise(getSubnetReservedIpPromise);

        getSubnetReservedIpPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateSubnetReservedIp', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateSubnetReservedIp
        const subnetId = 'testString';
        const id = 'testString';
        const autoDelete = false;
        const name = 'my-reserved-ip';
        const params = {
          subnetId: subnetId,
          id: id,
          autoDelete: autoDelete,
          name: name,
        };

        const updateSubnetReservedIpResult = vpcService.updateSubnetReservedIp(params);

        // all methods should return a Promise
        expectToBePromise(updateSubnetReservedIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/subnets/{subnet_id}/reserved_ips/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['auto_delete']).toEqual(autoDelete);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['subnet_id']).toEqual(subnetId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const subnetId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          subnetId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateSubnetReservedIp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateSubnetReservedIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateSubnetReservedIpPromise = vpcService.updateSubnetReservedIp();
        expectToBePromise(updateSubnetReservedIpPromise);

        updateSubnetReservedIpPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listImages', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listImages
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const name = 'testString';
        const visibility = 'private';
        const params = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          name: name,
          visibility: visibility,
        };

        const listImagesResult = vpcService.listImages(params);

        // all methods should return a Promise
        expectToBePromise(listImagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/images', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(options.qs['name']).toEqual(name);
        expect(options.qs['visibility']).toEqual(visibility);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listImages(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listImages({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createImage', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      // EncryptionKeyIdentityByCRN
      const encryptionKeyIdentityModel = {
        crn:
          'crn:v1:bluemix:public:kms:us-south:a/dffc98a0f1f0f95f6613b3b752286b87:e4a29d1a-2ef0-42a6-8fd2-350deb1c647e:key:5437653b-c4b1-447f-9646-b2a2a4cd6179',
      };

      // ImageFilePrototype
      const imageFilePrototypeModel = {
        href: 'cos://us-south/my-bucket/my-image.qcow2',
      };

      // OperatingSystemIdentityByName
      const operatingSystemIdentityModel = {
        name: 'debian-9-amd64',
      };

      // ImagePrototypeImageByFile
      const imagePrototypeModel = {
        name: 'my-image',
        resource_group: resourceGroupIdentityModel,
        encrypted_data_key: 'testString',
        encryption_key: encryptionKeyIdentityModel,
        file: imageFilePrototypeModel,
        operating_system: operatingSystemIdentityModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createImage
        const imagePrototype = imagePrototypeModel;
        const params = {
          imagePrototype: imagePrototype,
        };

        const createImageResult = vpcService.createImage(params);

        // all methods should return a Promise
        expectToBePromise(createImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/images', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(imagePrototype);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const imagePrototype = imagePrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          imagePrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createImage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createImagePromise = vpcService.createImage();
        expectToBePromise(createImagePromise);

        createImagePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteImage', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteImage
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteImageResult = vpcService.deleteImage(params);

        // all methods should return a Promise
        expectToBePromise(deleteImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/images/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteImage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteImagePromise = vpcService.deleteImage();
        expectToBePromise(deleteImagePromise);

        deleteImagePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getImage', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getImage
        const id = 'testString';
        const params = {
          id: id,
        };

        const getImageResult = vpcService.getImage(params);

        // all methods should return a Promise
        expectToBePromise(getImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/images/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getImage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getImagePromise = vpcService.getImage();
        expectToBePromise(getImagePromise);

        getImagePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateImage', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateImage
        const id = 'testString';
        const name = 'my-image';
        const params = {
          id: id,
          name: name,
        };

        const updateImageResult = vpcService.updateImage(params);

        // all methods should return a Promise
        expectToBePromise(updateImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/images/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateImage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateImagePromise = vpcService.updateImage();
        expectToBePromise(updateImagePromise);

        updateImagePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listOperatingSystems', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listOperatingSystems
        const start = 'testString';
        const limit = 1;
        const params = {
          start: start,
          limit: limit,
        };

        const listOperatingSystemsResult = vpcService.listOperatingSystems(params);

        // all methods should return a Promise
        expectToBePromise(listOperatingSystemsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/operating_systems', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listOperatingSystems(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listOperatingSystems({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getOperatingSystem', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getOperatingSystem
        const name = 'testString';
        const params = {
          name: name,
        };

        const getOperatingSystemResult = vpcService.getOperatingSystem(params);

        // all methods should return a Promise
        expectToBePromise(getOperatingSystemResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/operating_systems/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['name']).toEqual(name);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getOperatingSystem(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getOperatingSystem({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getOperatingSystemPromise = vpcService.getOperatingSystem();
        expectToBePromise(getOperatingSystemPromise);

        getOperatingSystemPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listKeys', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listKeys
        const resourceGroupId = 'testString';
        const params = {
          resourceGroupId: resourceGroupId,
        };

        const listKeysResult = vpcService.listKeys(params);

        // all methods should return a Promise
        expectToBePromise(listKeysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/keys', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['resource_group.id']).toEqual(resourceGroupId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listKeys(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listKeys({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createKey', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createKey
        const publicKey =
          'AAAAB3NzaC1yc2EAAAADAQABAAABAQDDGe50Bxa5T5NDddrrtbx2Y4/VGbiCgXqnBsYToIUKoFSHTQl5IX3PasGnneKanhcLwWz5M5MoCRvhxTp66NKzIfAz7r+FX9rxgR+ZgcM253YAqOVeIpOU408simDZKriTlN8kYsXL7P34tsWuAJf4MgZtJAQxous/2byetpdCv8ddnT4X3ltOg9w+LqSCPYfNivqH00Eh7S1Ldz7I8aw5WOp5a+sQFP/RbwfpwHp+ny7DfeIOokcuI42tJkoBn7UsLTVpCSmXr2EDRlSWe/1M/iHNRBzaT3CK0+SwZWd2AEjePxSnWKNGIEUJDlUYp7hKhiQcgT5ZAnWU121oc5En';
        const name = 'my-key';
        const resourceGroup = resourceGroupIdentityModel;
        const type = 'rsa';
        const params = {
          publicKey: publicKey,
          name: name,
          resourceGroup: resourceGroup,
          type: type,
        };

        const createKeyResult = vpcService.createKey(params);

        // all methods should return a Promise
        expectToBePromise(createKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/keys', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['public_key']).toEqual(publicKey);
        expect(options.body['name']).toEqual(name);
        expect(options.body['resource_group']).toEqual(resourceGroup);
        expect(options.body['type']).toEqual(type);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const publicKey =
          'AAAAB3NzaC1yc2EAAAADAQABAAABAQDDGe50Bxa5T5NDddrrtbx2Y4/VGbiCgXqnBsYToIUKoFSHTQl5IX3PasGnneKanhcLwWz5M5MoCRvhxTp66NKzIfAz7r+FX9rxgR+ZgcM253YAqOVeIpOU408simDZKriTlN8kYsXL7P34tsWuAJf4MgZtJAQxous/2byetpdCv8ddnT4X3ltOg9w+LqSCPYfNivqH00Eh7S1Ldz7I8aw5WOp5a+sQFP/RbwfpwHp+ny7DfeIOokcuI42tJkoBn7UsLTVpCSmXr2EDRlSWe/1M/iHNRBzaT3CK0+SwZWd2AEjePxSnWKNGIEUJDlUYp7hKhiQcgT5ZAnWU121oc5En';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          publicKey,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createKey(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createKeyPromise = vpcService.createKey();
        expectToBePromise(createKeyPromise);

        createKeyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteKey', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteKey
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteKeyResult = vpcService.deleteKey(params);

        // all methods should return a Promise
        expectToBePromise(deleteKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/keys/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteKey(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteKeyPromise = vpcService.deleteKey();
        expectToBePromise(deleteKeyPromise);

        deleteKeyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getKey', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getKey
        const id = 'testString';
        const params = {
          id: id,
        };

        const getKeyResult = vpcService.getKey(params);

        // all methods should return a Promise
        expectToBePromise(getKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/keys/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getKey(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getKeyPromise = vpcService.getKey();
        expectToBePromise(getKeyPromise);

        getKeyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateKey', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateKey
        const id = 'testString';
        const name = 'my-key';
        const params = {
          id: id,
          name: name,
        };

        const updateKeyResult = vpcService.updateKey(params);

        // all methods should return a Promise
        expectToBePromise(updateKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/keys/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateKey(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateKeyPromise = vpcService.updateKey();
        expectToBePromise(updateKeyPromise);

        updateKeyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listInstanceProfiles', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listInstanceProfiles
        const params = {};

        const listInstanceProfilesResult = vpcService.listInstanceProfiles(params);

        // all methods should return a Promise
        expectToBePromise(listInstanceProfilesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance/profiles', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceProfiles(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listInstanceProfiles({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getInstanceProfile', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getInstanceProfile
        const name = 'testString';
        const params = {
          name: name,
        };

        const getInstanceProfileResult = vpcService.getInstanceProfile(params);

        // all methods should return a Promise
        expectToBePromise(getInstanceProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance/profiles/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['name']).toEqual(name);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceProfile(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getInstanceProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getInstanceProfilePromise = vpcService.getInstanceProfile();
        expectToBePromise(getInstanceProfilePromise);

        getInstanceProfilePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listInstanceTemplates', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listInstanceTemplates
        const params = {};

        const listInstanceTemplatesResult = vpcService.listInstanceTemplates(params);

        // all methods should return a Promise
        expectToBePromise(listInstanceTemplatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance/templates', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceTemplates(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listInstanceTemplates({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createInstanceTemplate', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // KeyIdentityById
      const keyIdentityModel = {
        id: '363f6d70-0000-0001-0000-00000013b96c',
      };

      // SecurityGroupIdentityById
      const securityGroupIdentityModel = {
        id: 'be5df5ca-12a0-494b-907e-aa6ec2bfa271',
      };

      // SubnetIdentityById
      const subnetIdentityModel = {
        id: '7ec86020-1c6e-4889-b3f0-a15f2e50f87e',
      };

      // NetworkInterfacePrototype
      const networkInterfacePrototypeModel = {
        allow_ip_spoofing: true,
        name: 'my-network-interface',
        primary_ipv4_address: '10.0.0.5',
        security_groups: [securityGroupIdentityModel],
        subnet: subnetIdentityModel,
      };

      // InstancePlacementTargetPrototypeDedicatedHostIdentityDedicatedHostIdentityById
      const instancePlacementTargetPrototypeModel = {
        id: '1e09281b-f177-46fb-baf1-bc152b2e391a',
      };

      // InstanceProfileIdentityByName
      const instanceProfileIdentityModel = {
        name: 'bx2-2x8',
      };

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      // VolumeAttachmentVolumePrototypeInstanceContextVolumeIdentityVolumeIdentityById
      const volumeAttachmentVolumePrototypeInstanceContextModel = {
        id: '1a6b7274-678d-4dfb-8981-c71dd9d4daa5',
      };

      // VolumeAttachmentPrototypeInstanceContext
      const volumeAttachmentPrototypeInstanceContextModel = {
        delete_volume_on_instance_delete: true,
        name: 'my-volume-attachment',
        volume: volumeAttachmentVolumePrototypeInstanceContextModel,
      };

      // VPCIdentityById
      const vpcIdentityModel = {
        id: 'dc201ab2-8536-4904-86a8-084d84582133',
      };

      // EncryptionKeyIdentityByCRN
      const encryptionKeyIdentityModel = {
        crn:
          'crn:v1:bluemix:public:kms:us-south:a/dffc98a0f1f0f95f6613b3b752286b87:e4a29d1a-2ef0-42a6-8fd2-350deb1c647e:key:5437653b-c4b1-447f-9646-b2a2a4cd6179',
      };

      // VolumeProfileIdentityByName
      const volumeProfileIdentityModel = {
        name: 'general-purpose',
      };

      // VolumePrototypeInstanceByImageContext
      const volumePrototypeInstanceByImageContextModel = {
        capacity: 100,
        encryption_key: encryptionKeyIdentityModel,
        iops: 10000,
        name: 'my-volume',
        profile: volumeProfileIdentityModel,
      };

      // VolumeAttachmentPrototypeInstanceByImageContext
      const volumeAttachmentPrototypeInstanceByImageContextModel = {
        delete_volume_on_instance_delete: true,
        name: 'my-volume-attachment',
        volume: volumePrototypeInstanceByImageContextModel,
      };

      // ImageIdentityById
      const imageIdentityModel = {
        id: '3f9a2d96-830e-4100-9b4c-663225a3f872',
      };

      // ZoneIdentityByName
      const zoneIdentityModel = {
        name: 'us-south-1',
      };

      // InstanceTemplatePrototypeInstanceByImage
      const instanceTemplatePrototypeModel = {
        keys: [keyIdentityModel],
        name: 'my-instance-template',
        network_interfaces: [networkInterfacePrototypeModel],
        placement_target: instancePlacementTargetPrototypeModel,
        profile: instanceProfileIdentityModel,
        resource_group: resourceGroupIdentityModel,
        user_data: 'testString',
        volume_attachments: [volumeAttachmentPrototypeInstanceContextModel],
        vpc: vpcIdentityModel,
        boot_volume_attachment: volumeAttachmentPrototypeInstanceByImageContextModel,
        image: imageIdentityModel,
        primary_network_interface: networkInterfacePrototypeModel,
        zone: zoneIdentityModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createInstanceTemplate
        const instanceTemplatePrototype = instanceTemplatePrototypeModel;
        const params = {
          instanceTemplatePrototype: instanceTemplatePrototype,
        };

        const createInstanceTemplateResult = vpcService.createInstanceTemplate(params);

        // all methods should return a Promise
        expectToBePromise(createInstanceTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance/templates', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(instanceTemplatePrototype);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceTemplatePrototype = instanceTemplatePrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceTemplatePrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstanceTemplate(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createInstanceTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createInstanceTemplatePromise = vpcService.createInstanceTemplate();
        expectToBePromise(createInstanceTemplatePromise);

        createInstanceTemplatePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteInstanceTemplate', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteInstanceTemplate
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteInstanceTemplateResult = vpcService.deleteInstanceTemplate(params);

        // all methods should return a Promise
        expectToBePromise(deleteInstanceTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance/templates/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceTemplate(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteInstanceTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteInstanceTemplatePromise = vpcService.deleteInstanceTemplate();
        expectToBePromise(deleteInstanceTemplatePromise);

        deleteInstanceTemplatePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getInstanceTemplate', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getInstanceTemplate
        const id = 'testString';
        const params = {
          id: id,
        };

        const getInstanceTemplateResult = vpcService.getInstanceTemplate(params);

        // all methods should return a Promise
        expectToBePromise(getInstanceTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance/templates/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceTemplate(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getInstanceTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getInstanceTemplatePromise = vpcService.getInstanceTemplate();
        expectToBePromise(getInstanceTemplatePromise);

        getInstanceTemplatePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateInstanceTemplate', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateInstanceTemplate
        const id = 'testString';
        const name = 'my-instance-template';
        const params = {
          id: id,
          name: name,
        };

        const updateInstanceTemplateResult = vpcService.updateInstanceTemplate(params);

        // all methods should return a Promise
        expectToBePromise(updateInstanceTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance/templates/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstanceTemplate(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateInstanceTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateInstanceTemplatePromise = vpcService.updateInstanceTemplate();
        expectToBePromise(updateInstanceTemplatePromise);

        updateInstanceTemplatePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listInstances', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listInstances
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const name = 'testString';
        const vpcId = 'testString';
        const vpcCrn = 'testString';
        const vpcName = 'testString';
        const params = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          name: name,
          vpcId: vpcId,
          vpcCrn: vpcCrn,
          vpcName: vpcName,
        };

        const listInstancesResult = vpcService.listInstances(params);

        // all methods should return a Promise
        expectToBePromise(listInstancesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(options.qs['name']).toEqual(name);
        expect(options.qs['vpc.id']).toEqual(vpcId);
        expect(options.qs['vpc.crn']).toEqual(vpcCrn);
        expect(options.qs['vpc.name']).toEqual(vpcName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstances(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listInstances({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createInstance', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // KeyIdentityById
      const keyIdentityModel = {
        id: '363f6d70-0000-0001-0000-00000013b96c',
      };

      // SecurityGroupIdentityById
      const securityGroupIdentityModel = {
        id: 'be5df5ca-12a0-494b-907e-aa6ec2bfa271',
      };

      // SubnetIdentityById
      const subnetIdentityModel = {
        id: '7ec86020-1c6e-4889-b3f0-a15f2e50f87e',
      };

      // NetworkInterfacePrototype
      const networkInterfacePrototypeModel = {
        allow_ip_spoofing: true,
        name: 'my-network-interface',
        primary_ipv4_address: '10.0.0.5',
        security_groups: [securityGroupIdentityModel],
        subnet: subnetIdentityModel,
      };

      // InstancePlacementTargetPrototypeDedicatedHostIdentityDedicatedHostIdentityById
      const instancePlacementTargetPrototypeModel = {
        id: '0787-8c2a09be-ee18-4af2-8ef4-6a6060732221',
      };

      // InstanceProfileIdentityByName
      const instanceProfileIdentityModel = {
        name: 'bx2-2x8',
      };

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      // VolumeProfileIdentityByName
      const volumeProfileIdentityModel = {
        name: '5iops-tier',
      };

      // EncryptionKeyIdentityByCRN
      const encryptionKeyIdentityModel = {
        crn: 'crn:[...]',
      };

      // VolumeAttachmentVolumePrototypeInstanceContextVolumePrototypeInstanceContextVolumePrototypeInstanceContextVolumeByCapacity
      const volumeAttachmentVolumePrototypeInstanceContextModel = {
        iops: 10000,
        name: 'my-data-volume',
        profile: volumeProfileIdentityModel,
        capacity: 1000,
        encryption_key: encryptionKeyIdentityModel,
      };

      // VolumeAttachmentPrototypeInstanceContext
      const volumeAttachmentPrototypeInstanceContextModel = {
        delete_volume_on_instance_delete: true,
        name: 'my-volume-attachment',
        volume: volumeAttachmentVolumePrototypeInstanceContextModel,
      };

      // VPCIdentityById
      const vpcIdentityModel = {
        id: 'f0aae929-7047-46d1-92e1-9102b07a7f6f',
      };

      // VolumePrototypeInstanceByImageContext
      const volumePrototypeInstanceByImageContextModel = {
        capacity: 100,
        encryption_key: encryptionKeyIdentityModel,
        iops: 10000,
        name: 'my-boot-volume',
        profile: volumeProfileIdentityModel,
      };

      // VolumeAttachmentPrototypeInstanceByImageContext
      const volumeAttachmentPrototypeInstanceByImageContextModel = {
        delete_volume_on_instance_delete: true,
        name: 'my-volume-attachment',
        volume: volumePrototypeInstanceByImageContextModel,
      };

      // ImageIdentityById
      const imageIdentityModel = {
        id: '9aaf3bcb-dcd7-4de7-bb60-24e39ff9d366',
      };

      // ZoneIdentityByName
      const zoneIdentityModel = {
        name: 'us-south-1',
      };

      // InstancePrototypeInstanceByImage
      const instancePrototypeModel = {
        keys: [keyIdentityModel],
        name: 'my-instance',
        network_interfaces: [networkInterfacePrototypeModel],
        placement_target: instancePlacementTargetPrototypeModel,
        profile: instanceProfileIdentityModel,
        resource_group: resourceGroupIdentityModel,
        user_data: 'testString',
        volume_attachments: [volumeAttachmentPrototypeInstanceContextModel],
        vpc: vpcIdentityModel,
        boot_volume_attachment: volumeAttachmentPrototypeInstanceByImageContextModel,
        image: imageIdentityModel,
        primary_network_interface: networkInterfacePrototypeModel,
        zone: zoneIdentityModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createInstance
        const instancePrototype = instancePrototypeModel;
        const params = {
          instancePrototype: instancePrototype,
        };

        const createInstanceResult = vpcService.createInstance(params);

        // all methods should return a Promise
        expectToBePromise(createInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(instancePrototype);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instancePrototype = instancePrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instancePrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstance(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createInstancePromise = vpcService.createInstance();
        expectToBePromise(createInstancePromise);

        createInstancePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteInstance', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteInstance
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteInstanceResult = vpcService.deleteInstance(params);

        // all methods should return a Promise
        expectToBePromise(deleteInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstance(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteInstancePromise = vpcService.deleteInstance();
        expectToBePromise(deleteInstancePromise);

        deleteInstancePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getInstance', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getInstance
        const id = 'testString';
        const params = {
          id: id,
        };

        const getInstanceResult = vpcService.getInstance(params);

        // all methods should return a Promise
        expectToBePromise(getInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstance(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getInstancePromise = vpcService.getInstance();
        expectToBePromise(getInstancePromise);

        getInstancePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateInstance', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // InstancePatchProfileInstanceProfileIdentityByName
      const instancePatchProfileModel = {
        name: 'bc1-4x16',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateInstance
        const id = 'testString';
        const name = 'my-instance';
        const profile = instancePatchProfileModel;
        const params = {
          id: id,
          name: name,
          profile: profile,
        };

        const updateInstanceResult = vpcService.updateInstance(params);

        // all methods should return a Promise
        expectToBePromise(updateInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['profile']).toEqual(profile);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstance(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateInstancePromise = vpcService.updateInstance();
        expectToBePromise(updateInstancePromise);

        updateInstancePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getInstanceInitialization', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getInstanceInitialization
        const id = 'testString';
        const params = {
          id: id,
        };

        const getInstanceInitializationResult = vpcService.getInstanceInitialization(params);

        // all methods should return a Promise
        expectToBePromise(getInstanceInitializationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances/{id}/initialization', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceInitialization(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getInstanceInitialization({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getInstanceInitializationPromise = vpcService.getInstanceInitialization();
        expectToBePromise(getInstanceInitializationPromise);

        getInstanceInitializationPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createInstanceAction', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createInstanceAction
        const instanceId = 'testString';
        const type = 'reboot';
        const force = true;
        const params = {
          instanceId: instanceId,
          type: type,
          force: force,
        };

        const createInstanceActionResult = vpcService.createInstanceAction(params);

        // all methods should return a Promise
        expectToBePromise(createInstanceActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances/{instance_id}/actions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['type']).toEqual(type);
        expect(options.body['force']).toEqual(force);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_id']).toEqual(instanceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const type = 'reboot';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstanceAction(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createInstanceAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createInstanceActionPromise = vpcService.createInstanceAction();
        expectToBePromise(createInstanceActionPromise);

        createInstanceActionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createInstanceConsoleAccessToken', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createInstanceConsoleAccessToken
        const instanceId = 'testString';
        const consoleType = 'serial';
        const force = false;
        const params = {
          instanceId: instanceId,
          consoleType: consoleType,
          force: force,
        };

        const createInstanceConsoleAccessTokenResult = vpcService.createInstanceConsoleAccessToken(
          params
        );

        // all methods should return a Promise
        expectToBePromise(createInstanceConsoleAccessTokenResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances/{instance_id}/console_access_token', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['console_type']).toEqual(consoleType);
        expect(options.body['force']).toEqual(force);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_id']).toEqual(instanceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const consoleType = 'serial';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          consoleType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstanceConsoleAccessToken(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createInstanceConsoleAccessToken({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createInstanceConsoleAccessTokenPromise = vpcService.createInstanceConsoleAccessToken();
        expectToBePromise(createInstanceConsoleAccessTokenPromise);

        createInstanceConsoleAccessTokenPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listInstanceDisks', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listInstanceDisks
        const instanceId = 'testString';
        const params = {
          instanceId: instanceId,
        };

        const listInstanceDisksResult = vpcService.listInstanceDisks(params);

        // all methods should return a Promise
        expectToBePromise(listInstanceDisksResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances/{instance_id}/disks', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_id']).toEqual(instanceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceDisks(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listInstanceDisks({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listInstanceDisksPromise = vpcService.listInstanceDisks();
        expectToBePromise(listInstanceDisksPromise);

        listInstanceDisksPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getInstanceDisk', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getInstanceDisk
        const instanceId = 'testString';
        const id = 'testString';
        const params = {
          instanceId: instanceId,
          id: id,
        };

        const getInstanceDiskResult = vpcService.getInstanceDisk(params);

        // all methods should return a Promise
        expectToBePromise(getInstanceDiskResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances/{instance_id}/disks/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_id']).toEqual(instanceId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceDisk(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getInstanceDisk({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getInstanceDiskPromise = vpcService.getInstanceDisk();
        expectToBePromise(getInstanceDiskPromise);

        getInstanceDiskPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateInstanceDisk', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateInstanceDisk
        const instanceId = 'testString';
        const id = 'testString';
        const name = 'my-instance-disk-updated';
        const params = {
          instanceId: instanceId,
          id: id,
          name: name,
        };

        const updateInstanceDiskResult = vpcService.updateInstanceDisk(params);

        // all methods should return a Promise
        expectToBePromise(updateInstanceDiskResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances/{instance_id}/disks/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_id']).toEqual(instanceId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstanceDisk(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateInstanceDisk({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateInstanceDiskPromise = vpcService.updateInstanceDisk();
        expectToBePromise(updateInstanceDiskPromise);

        updateInstanceDiskPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listInstanceNetworkInterfaces', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listInstanceNetworkInterfaces
        const instanceId = 'testString';
        const params = {
          instanceId: instanceId,
        };

        const listInstanceNetworkInterfacesResult = vpcService.listInstanceNetworkInterfaces(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listInstanceNetworkInterfacesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances/{instance_id}/network_interfaces', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_id']).toEqual(instanceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceNetworkInterfaces(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listInstanceNetworkInterfaces({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listInstanceNetworkInterfacesPromise = vpcService.listInstanceNetworkInterfaces();
        expectToBePromise(listInstanceNetworkInterfacesPromise);

        listInstanceNetworkInterfacesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createInstanceNetworkInterface', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SubnetIdentityById
      const subnetIdentityModel = {
        id: '7ec86020-1c6e-4889-b3f0-a15f2e50f87e',
      };

      // SecurityGroupIdentityById
      const securityGroupIdentityModel = {
        id: 'be5df5ca-12a0-494b-907e-aa6ec2bfa271',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createInstanceNetworkInterface
        const instanceId = 'testString';
        const subnet = subnetIdentityModel;
        const allowIpSpoofing = true;
        const name = 'my-network-interface';
        const primaryIpv4Address = '10.0.0.5';
        const securityGroups = [securityGroupIdentityModel];
        const params = {
          instanceId: instanceId,
          subnet: subnet,
          allowIpSpoofing: allowIpSpoofing,
          name: name,
          primaryIpv4Address: primaryIpv4Address,
          securityGroups: securityGroups,
        };

        const createInstanceNetworkInterfaceResult = vpcService.createInstanceNetworkInterface(
          params
        );

        // all methods should return a Promise
        expectToBePromise(createInstanceNetworkInterfaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances/{instance_id}/network_interfaces', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['subnet']).toEqual(subnet);
        expect(options.body['allow_ip_spoofing']).toEqual(allowIpSpoofing);
        expect(options.body['name']).toEqual(name);
        expect(options.body['primary_ipv4_address']).toEqual(primaryIpv4Address);
        expect(options.body['security_groups']).toEqual(securityGroups);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_id']).toEqual(instanceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const subnet = subnetIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          subnet,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstanceNetworkInterface(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createInstanceNetworkInterface({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createInstanceNetworkInterfacePromise = vpcService.createInstanceNetworkInterface();
        expectToBePromise(createInstanceNetworkInterfacePromise);

        createInstanceNetworkInterfacePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteInstanceNetworkInterface', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteInstanceNetworkInterface
        const instanceId = 'testString';
        const id = 'testString';
        const params = {
          instanceId: instanceId,
          id: id,
        };

        const deleteInstanceNetworkInterfaceResult = vpcService.deleteInstanceNetworkInterface(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteInstanceNetworkInterfaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances/{instance_id}/network_interfaces/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_id']).toEqual(instanceId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceNetworkInterface(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteInstanceNetworkInterface({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteInstanceNetworkInterfacePromise = vpcService.deleteInstanceNetworkInterface();
        expectToBePromise(deleteInstanceNetworkInterfacePromise);

        deleteInstanceNetworkInterfacePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getInstanceNetworkInterface', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getInstanceNetworkInterface
        const instanceId = 'testString';
        const id = 'testString';
        const params = {
          instanceId: instanceId,
          id: id,
        };

        const getInstanceNetworkInterfaceResult = vpcService.getInstanceNetworkInterface(params);

        // all methods should return a Promise
        expectToBePromise(getInstanceNetworkInterfaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances/{instance_id}/network_interfaces/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_id']).toEqual(instanceId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceNetworkInterface(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getInstanceNetworkInterface({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getInstanceNetworkInterfacePromise = vpcService.getInstanceNetworkInterface();
        expectToBePromise(getInstanceNetworkInterfacePromise);

        getInstanceNetworkInterfacePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateInstanceNetworkInterface', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateInstanceNetworkInterface
        const instanceId = 'testString';
        const id = 'testString';
        const allowIpSpoofing = true;
        const name = 'my-network-interface-1';
        const params = {
          instanceId: instanceId,
          id: id,
          allowIpSpoofing: allowIpSpoofing,
          name: name,
        };

        const updateInstanceNetworkInterfaceResult = vpcService.updateInstanceNetworkInterface(
          params
        );

        // all methods should return a Promise
        expectToBePromise(updateInstanceNetworkInterfaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances/{instance_id}/network_interfaces/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['allow_ip_spoofing']).toEqual(allowIpSpoofing);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_id']).toEqual(instanceId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstanceNetworkInterface(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateInstanceNetworkInterface({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateInstanceNetworkInterfacePromise = vpcService.updateInstanceNetworkInterface();
        expectToBePromise(updateInstanceNetworkInterfacePromise);

        updateInstanceNetworkInterfacePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listInstanceNetworkInterfaceFloatingIps', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listInstanceNetworkInterfaceFloatingIps
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const params = {
          instanceId: instanceId,
          networkInterfaceId: networkInterfaceId,
        };

        const listInstanceNetworkInterfaceFloatingIpsResult = vpcService.listInstanceNetworkInterfaceFloatingIps(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listInstanceNetworkInterfaceFloatingIpsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/instances/{instance_id}/network_interfaces/{network_interface_id}/floating_ips',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_id']).toEqual(instanceId);
        expect(options.path['network_interface_id']).toEqual(networkInterfaceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          networkInterfaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceNetworkInterfaceFloatingIps(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listInstanceNetworkInterfaceFloatingIps({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listInstanceNetworkInterfaceFloatingIpsPromise = vpcService.listInstanceNetworkInterfaceFloatingIps();
        expectToBePromise(listInstanceNetworkInterfaceFloatingIpsPromise);

        listInstanceNetworkInterfaceFloatingIpsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('removeInstanceNetworkInterfaceFloatingIp', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation removeInstanceNetworkInterfaceFloatingIp
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const params = {
          instanceId: instanceId,
          networkInterfaceId: networkInterfaceId,
          id: id,
        };

        const removeInstanceNetworkInterfaceFloatingIpResult = vpcService.removeInstanceNetworkInterfaceFloatingIp(
          params
        );

        // all methods should return a Promise
        expectToBePromise(removeInstanceNetworkInterfaceFloatingIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/instances/{instance_id}/network_interfaces/{network_interface_id}/floating_ips/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_id']).toEqual(instanceId);
        expect(options.path['network_interface_id']).toEqual(networkInterfaceId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          networkInterfaceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.removeInstanceNetworkInterfaceFloatingIp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.removeInstanceNetworkInterfaceFloatingIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const removeInstanceNetworkInterfaceFloatingIpPromise = vpcService.removeInstanceNetworkInterfaceFloatingIp();
        expectToBePromise(removeInstanceNetworkInterfaceFloatingIpPromise);

        removeInstanceNetworkInterfaceFloatingIpPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getInstanceNetworkInterfaceFloatingIp', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getInstanceNetworkInterfaceFloatingIp
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const params = {
          instanceId: instanceId,
          networkInterfaceId: networkInterfaceId,
          id: id,
        };

        const getInstanceNetworkInterfaceFloatingIpResult = vpcService.getInstanceNetworkInterfaceFloatingIp(
          params
        );

        // all methods should return a Promise
        expectToBePromise(getInstanceNetworkInterfaceFloatingIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/instances/{instance_id}/network_interfaces/{network_interface_id}/floating_ips/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_id']).toEqual(instanceId);
        expect(options.path['network_interface_id']).toEqual(networkInterfaceId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          networkInterfaceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceNetworkInterfaceFloatingIp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getInstanceNetworkInterfaceFloatingIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getInstanceNetworkInterfaceFloatingIpPromise = vpcService.getInstanceNetworkInterfaceFloatingIp();
        expectToBePromise(getInstanceNetworkInterfaceFloatingIpPromise);

        getInstanceNetworkInterfaceFloatingIpPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addInstanceNetworkInterfaceFloatingIp', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addInstanceNetworkInterfaceFloatingIp
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const params = {
          instanceId: instanceId,
          networkInterfaceId: networkInterfaceId,
          id: id,
        };

        const addInstanceNetworkInterfaceFloatingIpResult = vpcService.addInstanceNetworkInterfaceFloatingIp(
          params
        );

        // all methods should return a Promise
        expectToBePromise(addInstanceNetworkInterfaceFloatingIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/instances/{instance_id}/network_interfaces/{network_interface_id}/floating_ips/{id}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_id']).toEqual(instanceId);
        expect(options.path['network_interface_id']).toEqual(networkInterfaceId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          networkInterfaceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.addInstanceNetworkInterfaceFloatingIp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.addInstanceNetworkInterfaceFloatingIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const addInstanceNetworkInterfaceFloatingIpPromise = vpcService.addInstanceNetworkInterfaceFloatingIp();
        expectToBePromise(addInstanceNetworkInterfaceFloatingIpPromise);

        addInstanceNetworkInterfaceFloatingIpPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listInstanceVolumeAttachments', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listInstanceVolumeAttachments
        const instanceId = 'testString';
        const params = {
          instanceId: instanceId,
        };

        const listInstanceVolumeAttachmentsResult = vpcService.listInstanceVolumeAttachments(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listInstanceVolumeAttachmentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances/{instance_id}/volume_attachments', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_id']).toEqual(instanceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceVolumeAttachments(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listInstanceVolumeAttachments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listInstanceVolumeAttachmentsPromise = vpcService.listInstanceVolumeAttachments();
        expectToBePromise(listInstanceVolumeAttachmentsPromise);

        listInstanceVolumeAttachmentsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createInstanceVolumeAttachment', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // VolumeIdentityById
      const volumeIdentityModel = {
        id: '1a6b7274-678d-4dfb-8981-c71dd9d4daa5',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createInstanceVolumeAttachment
        const instanceId = 'testString';
        const volume = volumeIdentityModel;
        const deleteVolumeOnInstanceDelete = true;
        const name = 'my-volume-attachment';
        const params = {
          instanceId: instanceId,
          volume: volume,
          deleteVolumeOnInstanceDelete: deleteVolumeOnInstanceDelete,
          name: name,
        };

        const createInstanceVolumeAttachmentResult = vpcService.createInstanceVolumeAttachment(
          params
        );

        // all methods should return a Promise
        expectToBePromise(createInstanceVolumeAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances/{instance_id}/volume_attachments', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['volume']).toEqual(volume);
        expect(options.body['delete_volume_on_instance_delete']).toEqual(
          deleteVolumeOnInstanceDelete
        );
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_id']).toEqual(instanceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const volume = volumeIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          volume,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstanceVolumeAttachment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createInstanceVolumeAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createInstanceVolumeAttachmentPromise = vpcService.createInstanceVolumeAttachment();
        expectToBePromise(createInstanceVolumeAttachmentPromise);

        createInstanceVolumeAttachmentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteInstanceVolumeAttachment', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteInstanceVolumeAttachment
        const instanceId = 'testString';
        const id = 'testString';
        const params = {
          instanceId: instanceId,
          id: id,
        };

        const deleteInstanceVolumeAttachmentResult = vpcService.deleteInstanceVolumeAttachment(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteInstanceVolumeAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances/{instance_id}/volume_attachments/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_id']).toEqual(instanceId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceVolumeAttachment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteInstanceVolumeAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteInstanceVolumeAttachmentPromise = vpcService.deleteInstanceVolumeAttachment();
        expectToBePromise(deleteInstanceVolumeAttachmentPromise);

        deleteInstanceVolumeAttachmentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getInstanceVolumeAttachment', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getInstanceVolumeAttachment
        const instanceId = 'testString';
        const id = 'testString';
        const params = {
          instanceId: instanceId,
          id: id,
        };

        const getInstanceVolumeAttachmentResult = vpcService.getInstanceVolumeAttachment(params);

        // all methods should return a Promise
        expectToBePromise(getInstanceVolumeAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances/{instance_id}/volume_attachments/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_id']).toEqual(instanceId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceVolumeAttachment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getInstanceVolumeAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getInstanceVolumeAttachmentPromise = vpcService.getInstanceVolumeAttachment();
        expectToBePromise(getInstanceVolumeAttachmentPromise);

        getInstanceVolumeAttachmentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateInstanceVolumeAttachment', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateInstanceVolumeAttachment
        const instanceId = 'testString';
        const id = 'testString';
        const deleteVolumeOnInstanceDelete = true;
        const name = 'my-volume-attachment';
        const params = {
          instanceId: instanceId,
          id: id,
          deleteVolumeOnInstanceDelete: deleteVolumeOnInstanceDelete,
          name: name,
        };

        const updateInstanceVolumeAttachmentResult = vpcService.updateInstanceVolumeAttachment(
          params
        );

        // all methods should return a Promise
        expectToBePromise(updateInstanceVolumeAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instances/{instance_id}/volume_attachments/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['delete_volume_on_instance_delete']).toEqual(
          deleteVolumeOnInstanceDelete
        );
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_id']).toEqual(instanceId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstanceVolumeAttachment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateInstanceVolumeAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateInstanceVolumeAttachmentPromise = vpcService.updateInstanceVolumeAttachment();
        expectToBePromise(updateInstanceVolumeAttachmentPromise);

        updateInstanceVolumeAttachmentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listInstanceGroups', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listInstanceGroups
        const start = 'testString';
        const limit = 1;
        const params = {
          start: start,
          limit: limit,
        };

        const listInstanceGroupsResult = vpcService.listInstanceGroups(params);

        // all methods should return a Promise
        expectToBePromise(listInstanceGroupsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance_groups', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceGroups(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listInstanceGroups({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createInstanceGroup', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // InstanceTemplateIdentityById
      const instanceTemplateIdentityModel = {
        id: 'a6b1a881-2ce8-41a3-80fc-36316a73f803',
      };

      // SubnetIdentityById
      const subnetIdentityModel = {
        id: '7ec86020-1c6e-4889-b3f0-a15f2e50f87e',
      };

      // LoadBalancerIdentityById
      const loadBalancerIdentityModel = {
        id: 'dd754295-e9e0-4c9d-bf6c-58fbc59e5727',
      };

      // LoadBalancerPoolIdentityById
      const loadBalancerPoolIdentityModel = {
        id: '70294e14-4e61-11e8-bcf4-0242ac110004',
      };

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createInstanceGroup
        const instanceTemplate = instanceTemplateIdentityModel;
        const subnets = [subnetIdentityModel];
        const applicationPort = 22;
        const loadBalancer = loadBalancerIdentityModel;
        const loadBalancerPool = loadBalancerPoolIdentityModel;
        const membershipCount = 10;
        const name = 'my-instance-group';
        const resourceGroup = resourceGroupIdentityModel;
        const params = {
          instanceTemplate: instanceTemplate,
          subnets: subnets,
          applicationPort: applicationPort,
          loadBalancer: loadBalancer,
          loadBalancerPool: loadBalancerPool,
          membershipCount: membershipCount,
          name: name,
          resourceGroup: resourceGroup,
        };

        const createInstanceGroupResult = vpcService.createInstanceGroup(params);

        // all methods should return a Promise
        expectToBePromise(createInstanceGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance_groups', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['instance_template']).toEqual(instanceTemplate);
        expect(options.body['subnets']).toEqual(subnets);
        expect(options.body['application_port']).toEqual(applicationPort);
        expect(options.body['load_balancer']).toEqual(loadBalancer);
        expect(options.body['load_balancer_pool']).toEqual(loadBalancerPool);
        expect(options.body['membership_count']).toEqual(membershipCount);
        expect(options.body['name']).toEqual(name);
        expect(options.body['resource_group']).toEqual(resourceGroup);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceTemplate = instanceTemplateIdentityModel;
        const subnets = [subnetIdentityModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceTemplate,
          subnets,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstanceGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createInstanceGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createInstanceGroupPromise = vpcService.createInstanceGroup();
        expectToBePromise(createInstanceGroupPromise);

        createInstanceGroupPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteInstanceGroup', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteInstanceGroup
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteInstanceGroupResult = vpcService.deleteInstanceGroup(params);

        // all methods should return a Promise
        expectToBePromise(deleteInstanceGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance_groups/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteInstanceGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteInstanceGroupPromise = vpcService.deleteInstanceGroup();
        expectToBePromise(deleteInstanceGroupPromise);

        deleteInstanceGroupPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getInstanceGroup', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getInstanceGroup
        const id = 'testString';
        const params = {
          id: id,
        };

        const getInstanceGroupResult = vpcService.getInstanceGroup(params);

        // all methods should return a Promise
        expectToBePromise(getInstanceGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance_groups/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getInstanceGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getInstanceGroupPromise = vpcService.getInstanceGroup();
        expectToBePromise(getInstanceGroupPromise);

        getInstanceGroupPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateInstanceGroup', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // InstanceTemplateIdentityById
      const instanceTemplateIdentityModel = {
        id: 'a6b1a881-2ce8-41a3-80fc-36316a73f803',
      };

      // LoadBalancerIdentityById
      const loadBalancerIdentityModel = {
        id: 'dd754295-e9e0-4c9d-bf6c-58fbc59e5727',
      };

      // LoadBalancerPoolIdentityById
      const loadBalancerPoolIdentityModel = {
        id: '70294e14-4e61-11e8-bcf4-0242ac110004',
      };

      // SubnetIdentityById
      const subnetIdentityModel = {
        id: '7ec86020-1c6e-4889-b3f0-a15f2e50f87e',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateInstanceGroup
        const id = 'testString';
        const applicationPort = 22;
        const instanceTemplate = instanceTemplateIdentityModel;
        const loadBalancer = loadBalancerIdentityModel;
        const loadBalancerPool = loadBalancerPoolIdentityModel;
        const membershipCount = 10;
        const name = 'my-instance-group';
        const subnets = [subnetIdentityModel];
        const params = {
          id: id,
          applicationPort: applicationPort,
          instanceTemplate: instanceTemplate,
          loadBalancer: loadBalancer,
          loadBalancerPool: loadBalancerPool,
          membershipCount: membershipCount,
          name: name,
          subnets: subnets,
        };

        const updateInstanceGroupResult = vpcService.updateInstanceGroup(params);

        // all methods should return a Promise
        expectToBePromise(updateInstanceGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance_groups/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['application_port']).toEqual(applicationPort);
        expect(options.body['instance_template']).toEqual(instanceTemplate);
        expect(options.body['load_balancer']).toEqual(loadBalancer);
        expect(options.body['load_balancer_pool']).toEqual(loadBalancerPool);
        expect(options.body['membership_count']).toEqual(membershipCount);
        expect(options.body['name']).toEqual(name);
        expect(options.body['subnets']).toEqual(subnets);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstanceGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateInstanceGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateInstanceGroupPromise = vpcService.updateInstanceGroup();
        expectToBePromise(updateInstanceGroupPromise);

        updateInstanceGroupPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteInstanceGroupLoadBalancer', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteInstanceGroupLoadBalancer
        const instanceGroupId = 'testString';
        const params = {
          instanceGroupId: instanceGroupId,
        };

        const deleteInstanceGroupLoadBalancerResult = vpcService.deleteInstanceGroupLoadBalancer(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteInstanceGroupLoadBalancerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance_groups/{instance_group_id}/load_balancer', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceGroupLoadBalancer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteInstanceGroupLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteInstanceGroupLoadBalancerPromise = vpcService.deleteInstanceGroupLoadBalancer();
        expectToBePromise(deleteInstanceGroupLoadBalancerPromise);

        deleteInstanceGroupLoadBalancerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listInstanceGroupManagers', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listInstanceGroupManagers
        const instanceGroupId = 'testString';
        const start = 'testString';
        const limit = 1;
        const params = {
          instanceGroupId: instanceGroupId,
          start: start,
          limit: limit,
        };

        const listInstanceGroupManagersResult = vpcService.listInstanceGroupManagers(params);

        // all methods should return a Promise
        expectToBePromise(listInstanceGroupManagersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance_groups/{instance_group_id}/managers', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceGroupManagers(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listInstanceGroupManagers({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listInstanceGroupManagersPromise = vpcService.listInstanceGroupManagers();
        expectToBePromise(listInstanceGroupManagersPromise);

        listInstanceGroupManagersPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createInstanceGroupManager', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // InstanceGroupManagerPrototypeInstanceGroupManagerAutoScalePrototype
      const instanceGroupManagerPrototypeModel = {
        management_enabled: true,
        name: 'my-instance-group-manager',
        aggregation_window: 120,
        cooldown: 210,
        manager_type: 'autoscale',
        max_membership_count: 10,
        min_membership_count: 10,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createInstanceGroupManager
        const instanceGroupId = 'testString';
        const instanceGroupManagerPrototype = instanceGroupManagerPrototypeModel;
        const params = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerPrototype: instanceGroupManagerPrototype,
        };

        const createInstanceGroupManagerResult = vpcService.createInstanceGroupManager(params);

        // all methods should return a Promise
        expectToBePromise(createInstanceGroupManagerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance_groups/{instance_group_id}/managers', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(instanceGroupManagerPrototype);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerPrototype = instanceGroupManagerPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          instanceGroupManagerPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstanceGroupManager(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createInstanceGroupManager({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createInstanceGroupManagerPromise = vpcService.createInstanceGroupManager();
        expectToBePromise(createInstanceGroupManagerPromise);

        createInstanceGroupManagerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteInstanceGroupManager', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteInstanceGroupManager
        const instanceGroupId = 'testString';
        const id = 'testString';
        const params = {
          instanceGroupId: instanceGroupId,
          id: id,
        };

        const deleteInstanceGroupManagerResult = vpcService.deleteInstanceGroupManager(params);

        // all methods should return a Promise
        expectToBePromise(deleteInstanceGroupManagerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance_groups/{instance_group_id}/managers/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceGroupManager(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteInstanceGroupManager({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteInstanceGroupManagerPromise = vpcService.deleteInstanceGroupManager();
        expectToBePromise(deleteInstanceGroupManagerPromise);

        deleteInstanceGroupManagerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getInstanceGroupManager', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getInstanceGroupManager
        const instanceGroupId = 'testString';
        const id = 'testString';
        const params = {
          instanceGroupId: instanceGroupId,
          id: id,
        };

        const getInstanceGroupManagerResult = vpcService.getInstanceGroupManager(params);

        // all methods should return a Promise
        expectToBePromise(getInstanceGroupManagerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance_groups/{instance_group_id}/managers/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceGroupManager(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getInstanceGroupManager({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getInstanceGroupManagerPromise = vpcService.getInstanceGroupManager();
        expectToBePromise(getInstanceGroupManagerPromise);

        getInstanceGroupManagerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateInstanceGroupManager', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateInstanceGroupManager
        const instanceGroupId = 'testString';
        const id = 'testString';
        const aggregationWindow = 120;
        const cooldown = 210;
        const managementEnabled = true;
        const maxMembershipCount = 10;
        const minMembershipCount = 10;
        const name = 'my-instance-group-manager';
        const params = {
          instanceGroupId: instanceGroupId,
          id: id,
          aggregationWindow: aggregationWindow,
          cooldown: cooldown,
          managementEnabled: managementEnabled,
          maxMembershipCount: maxMembershipCount,
          minMembershipCount: minMembershipCount,
          name: name,
        };

        const updateInstanceGroupManagerResult = vpcService.updateInstanceGroupManager(params);

        // all methods should return a Promise
        expectToBePromise(updateInstanceGroupManagerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance_groups/{instance_group_id}/managers/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['aggregation_window']).toEqual(aggregationWindow);
        expect(options.body['cooldown']).toEqual(cooldown);
        expect(options.body['management_enabled']).toEqual(managementEnabled);
        expect(options.body['max_membership_count']).toEqual(maxMembershipCount);
        expect(options.body['min_membership_count']).toEqual(minMembershipCount);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstanceGroupManager(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateInstanceGroupManager({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateInstanceGroupManagerPromise = vpcService.updateInstanceGroupManager();
        expectToBePromise(updateInstanceGroupManagerPromise);

        updateInstanceGroupManagerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listInstanceGroupManagerActions', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listInstanceGroupManagerActions
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const start = 'testString';
        const limit = 1;
        const params = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          start: start,
          limit: limit,
        };

        const listInstanceGroupManagerActionsResult = vpcService.listInstanceGroupManagerActions(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listInstanceGroupManagerActionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/actions',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
        expect(options.path['instance_group_manager_id']).toEqual(instanceGroupManagerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          instanceGroupManagerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceGroupManagerActions(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listInstanceGroupManagerActions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listInstanceGroupManagerActionsPromise = vpcService.listInstanceGroupManagerActions();
        expectToBePromise(listInstanceGroupManagerActionsPromise);

        listInstanceGroupManagerActionsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createInstanceGroupManagerAction', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // InstanceGroupManagerScheduledActionGroupPrototype
      const instanceGroupManagerScheduledActionGroupPrototypeModel = {
        membership_count: 10,
      };

      // InstanceGroupManagerActionPrototypeScheduledActionPrototypeByRunAtByGroup
      const instanceGroupManagerActionPrototypeModel = {
        name: 'my-instance-group-manager-action',
        run_at: '2019-01-01T12:00:00.000Z',
        group: instanceGroupManagerScheduledActionGroupPrototypeModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createInstanceGroupManagerAction
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const instanceGroupManagerActionPrototype = instanceGroupManagerActionPrototypeModel;
        const params = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          instanceGroupManagerActionPrototype: instanceGroupManagerActionPrototype,
        };

        const createInstanceGroupManagerActionResult = vpcService.createInstanceGroupManagerAction(
          params
        );

        // all methods should return a Promise
        expectToBePromise(createInstanceGroupManagerActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/actions',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(instanceGroupManagerActionPrototype);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
        expect(options.path['instance_group_manager_id']).toEqual(instanceGroupManagerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const instanceGroupManagerActionPrototype = instanceGroupManagerActionPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          instanceGroupManagerId,
          instanceGroupManagerActionPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstanceGroupManagerAction(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createInstanceGroupManagerAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createInstanceGroupManagerActionPromise = vpcService.createInstanceGroupManagerAction();
        expectToBePromise(createInstanceGroupManagerActionPromise);

        createInstanceGroupManagerActionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteInstanceGroupManagerAction', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteInstanceGroupManagerAction
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const params = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          id: id,
        };

        const deleteInstanceGroupManagerActionResult = vpcService.deleteInstanceGroupManagerAction(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteInstanceGroupManagerActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/actions/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
        expect(options.path['instance_group_manager_id']).toEqual(instanceGroupManagerId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          instanceGroupManagerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceGroupManagerAction(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteInstanceGroupManagerAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteInstanceGroupManagerActionPromise = vpcService.deleteInstanceGroupManagerAction();
        expectToBePromise(deleteInstanceGroupManagerActionPromise);

        deleteInstanceGroupManagerActionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getInstanceGroupManagerAction', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getInstanceGroupManagerAction
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const params = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          id: id,
        };

        const getInstanceGroupManagerActionResult = vpcService.getInstanceGroupManagerAction(
          params
        );

        // all methods should return a Promise
        expectToBePromise(getInstanceGroupManagerActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/actions/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
        expect(options.path['instance_group_manager_id']).toEqual(instanceGroupManagerId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          instanceGroupManagerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceGroupManagerAction(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getInstanceGroupManagerAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getInstanceGroupManagerActionPromise = vpcService.getInstanceGroupManagerAction();
        expectToBePromise(getInstanceGroupManagerActionPromise);

        getInstanceGroupManagerActionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateInstanceGroupManagerAction', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // InstanceGroupManagerScheduledActionGroupPatch
      const instanceGroupManagerScheduledActionGroupPatchModel = {
        membership_count: 10,
      };

      // InstanceGroupManagerScheduledActionByManagerPatchManagerAutoScalePatch
      const instanceGroupManagerScheduledActionByManagerPatchManagerModel = {
        max_membership_count: 10,
        min_membership_count: 10,
      };

      // InstanceGroupManagerActionPatchScheduledActionPatch
      const instanceGroupManagerActionPatchModel = {
        name: 'my-instance-group-manager-action',
        cron_spec: '*/5 1,2,3 * * *',
        group: instanceGroupManagerScheduledActionGroupPatchModel,
        manager: instanceGroupManagerScheduledActionByManagerPatchManagerModel,
        run_at: '2019-01-01T12:00:00.000Z',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateInstanceGroupManagerAction
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const instanceGroupManagerActionPatch = instanceGroupManagerActionPatchModel;
        const params = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          id: id,
          instanceGroupManagerActionPatch: instanceGroupManagerActionPatch,
        };

        const updateInstanceGroupManagerActionResult = vpcService.updateInstanceGroupManagerAction(
          params
        );

        // all methods should return a Promise
        expectToBePromise(updateInstanceGroupManagerActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/actions/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(instanceGroupManagerActionPatch);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
        expect(options.path['instance_group_manager_id']).toEqual(instanceGroupManagerId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const instanceGroupManagerActionPatch = instanceGroupManagerActionPatchModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          instanceGroupManagerId,
          id,
          instanceGroupManagerActionPatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstanceGroupManagerAction(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateInstanceGroupManagerAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateInstanceGroupManagerActionPromise = vpcService.updateInstanceGroupManagerAction();
        expectToBePromise(updateInstanceGroupManagerActionPromise);

        updateInstanceGroupManagerActionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listInstanceGroupManagerPolicies', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listInstanceGroupManagerPolicies
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const start = 'testString';
        const limit = 1;
        const params = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          start: start,
          limit: limit,
        };

        const listInstanceGroupManagerPoliciesResult = vpcService.listInstanceGroupManagerPolicies(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listInstanceGroupManagerPoliciesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/policies',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
        expect(options.path['instance_group_manager_id']).toEqual(instanceGroupManagerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          instanceGroupManagerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceGroupManagerPolicies(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listInstanceGroupManagerPolicies({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listInstanceGroupManagerPoliciesPromise = vpcService.listInstanceGroupManagerPolicies();
        expectToBePromise(listInstanceGroupManagerPoliciesPromise);

        listInstanceGroupManagerPoliciesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createInstanceGroupManagerPolicy', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // InstanceGroupManagerPolicyPrototypeInstanceGroupManagerTargetPolicyPrototype
      const instanceGroupManagerPolicyPrototypeModel = {
        name: 'my-instance-group-manager-policy',
        metric_type: 'cpu',
        metric_value: 38,
        policy_type: 'target',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createInstanceGroupManagerPolicy
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const instanceGroupManagerPolicyPrototype = instanceGroupManagerPolicyPrototypeModel;
        const params = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          instanceGroupManagerPolicyPrototype: instanceGroupManagerPolicyPrototype,
        };

        const createInstanceGroupManagerPolicyResult = vpcService.createInstanceGroupManagerPolicy(
          params
        );

        // all methods should return a Promise
        expectToBePromise(createInstanceGroupManagerPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/policies',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(instanceGroupManagerPolicyPrototype);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
        expect(options.path['instance_group_manager_id']).toEqual(instanceGroupManagerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const instanceGroupManagerPolicyPrototype = instanceGroupManagerPolicyPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          instanceGroupManagerId,
          instanceGroupManagerPolicyPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstanceGroupManagerPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createInstanceGroupManagerPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createInstanceGroupManagerPolicyPromise = vpcService.createInstanceGroupManagerPolicy();
        expectToBePromise(createInstanceGroupManagerPolicyPromise);

        createInstanceGroupManagerPolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteInstanceGroupManagerPolicy', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteInstanceGroupManagerPolicy
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const params = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          id: id,
        };

        const deleteInstanceGroupManagerPolicyResult = vpcService.deleteInstanceGroupManagerPolicy(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteInstanceGroupManagerPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/policies/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
        expect(options.path['instance_group_manager_id']).toEqual(instanceGroupManagerId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          instanceGroupManagerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceGroupManagerPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteInstanceGroupManagerPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteInstanceGroupManagerPolicyPromise = vpcService.deleteInstanceGroupManagerPolicy();
        expectToBePromise(deleteInstanceGroupManagerPolicyPromise);

        deleteInstanceGroupManagerPolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getInstanceGroupManagerPolicy', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getInstanceGroupManagerPolicy
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const params = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          id: id,
        };

        const getInstanceGroupManagerPolicyResult = vpcService.getInstanceGroupManagerPolicy(
          params
        );

        // all methods should return a Promise
        expectToBePromise(getInstanceGroupManagerPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/policies/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
        expect(options.path['instance_group_manager_id']).toEqual(instanceGroupManagerId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          instanceGroupManagerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceGroupManagerPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getInstanceGroupManagerPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getInstanceGroupManagerPolicyPromise = vpcService.getInstanceGroupManagerPolicy();
        expectToBePromise(getInstanceGroupManagerPolicyPromise);

        getInstanceGroupManagerPolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateInstanceGroupManagerPolicy', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateInstanceGroupManagerPolicy
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const metricType = 'cpu';
        const metricValue = 38;
        const name = 'my-instance-group-manager-policy';
        const params = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          id: id,
          metricType: metricType,
          metricValue: metricValue,
          name: name,
        };

        const updateInstanceGroupManagerPolicyResult = vpcService.updateInstanceGroupManagerPolicy(
          params
        );

        // all methods should return a Promise
        expectToBePromise(updateInstanceGroupManagerPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/policies/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['metric_type']).toEqual(metricType);
        expect(options.body['metric_value']).toEqual(metricValue);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
        expect(options.path['instance_group_manager_id']).toEqual(instanceGroupManagerId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          instanceGroupManagerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstanceGroupManagerPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateInstanceGroupManagerPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateInstanceGroupManagerPolicyPromise = vpcService.updateInstanceGroupManagerPolicy();
        expectToBePromise(updateInstanceGroupManagerPolicyPromise);

        updateInstanceGroupManagerPolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteInstanceGroupMemberships', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteInstanceGroupMemberships
        const instanceGroupId = 'testString';
        const params = {
          instanceGroupId: instanceGroupId,
        };

        const deleteInstanceGroupMembershipsResult = vpcService.deleteInstanceGroupMemberships(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteInstanceGroupMembershipsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance_groups/{instance_group_id}/memberships', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceGroupMemberships(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteInstanceGroupMemberships({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteInstanceGroupMembershipsPromise = vpcService.deleteInstanceGroupMemberships();
        expectToBePromise(deleteInstanceGroupMembershipsPromise);

        deleteInstanceGroupMembershipsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listInstanceGroupMemberships', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listInstanceGroupMemberships
        const instanceGroupId = 'testString';
        const start = 'testString';
        const limit = 1;
        const params = {
          instanceGroupId: instanceGroupId,
          start: start,
          limit: limit,
        };

        const listInstanceGroupMembershipsResult = vpcService.listInstanceGroupMemberships(params);

        // all methods should return a Promise
        expectToBePromise(listInstanceGroupMembershipsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance_groups/{instance_group_id}/memberships', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceGroupMemberships(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listInstanceGroupMemberships({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listInstanceGroupMembershipsPromise = vpcService.listInstanceGroupMemberships();
        expectToBePromise(listInstanceGroupMembershipsPromise);

        listInstanceGroupMembershipsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteInstanceGroupMembership', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteInstanceGroupMembership
        const instanceGroupId = 'testString';
        const id = 'testString';
        const params = {
          instanceGroupId: instanceGroupId,
          id: id,
        };

        const deleteInstanceGroupMembershipResult = vpcService.deleteInstanceGroupMembership(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteInstanceGroupMembershipResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/instance_groups/{instance_group_id}/memberships/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceGroupMembership(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteInstanceGroupMembership({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteInstanceGroupMembershipPromise = vpcService.deleteInstanceGroupMembership();
        expectToBePromise(deleteInstanceGroupMembershipPromise);

        deleteInstanceGroupMembershipPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getInstanceGroupMembership', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getInstanceGroupMembership
        const instanceGroupId = 'testString';
        const id = 'testString';
        const params = {
          instanceGroupId: instanceGroupId,
          id: id,
        };

        const getInstanceGroupMembershipResult = vpcService.getInstanceGroupMembership(params);

        // all methods should return a Promise
        expectToBePromise(getInstanceGroupMembershipResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/instance_groups/{instance_group_id}/memberships/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceGroupMembership(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getInstanceGroupMembership({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getInstanceGroupMembershipPromise = vpcService.getInstanceGroupMembership();
        expectToBePromise(getInstanceGroupMembershipPromise);

        getInstanceGroupMembershipPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateInstanceGroupMembership', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateInstanceGroupMembership
        const instanceGroupId = 'testString';
        const id = 'testString';
        const name = 'my-instance-group-membership';
        const params = {
          instanceGroupId: instanceGroupId,
          id: id,
          name: name,
        };

        const updateInstanceGroupMembershipResult = vpcService.updateInstanceGroupMembership(
          params
        );

        // all methods should return a Promise
        expectToBePromise(updateInstanceGroupMembershipResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/instance_groups/{instance_group_id}/memberships/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['instance_group_id']).toEqual(instanceGroupId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstanceGroupMembership(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateInstanceGroupMembership({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateInstanceGroupMembershipPromise = vpcService.updateInstanceGroupMembership();
        expectToBePromise(updateInstanceGroupMembershipPromise);

        updateInstanceGroupMembershipPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listDedicatedHostGroups', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listDedicatedHostGroups
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const zoneName = 'testString';
        const params = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          zoneName: zoneName,
        };

        const listDedicatedHostGroupsResult = vpcService.listDedicatedHostGroups(params);

        // all methods should return a Promise
        expectToBePromise(listDedicatedHostGroupsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/dedicated_host/groups', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(options.qs['zone.name']).toEqual(zoneName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listDedicatedHostGroups(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listDedicatedHostGroups({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createDedicatedHostGroup', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ZoneIdentityByName
      const zoneIdentityModel = {
        name: 'us-south-1',
      };

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createDedicatedHostGroup
        const _class = 'mx2';
        const family = 'balanced';
        const zone = zoneIdentityModel;
        const name = 'testString';
        const resourceGroup = resourceGroupIdentityModel;
        const params = {
          _class: _class,
          family: family,
          zone: zone,
          name: name,
          resourceGroup: resourceGroup,
        };

        const createDedicatedHostGroupResult = vpcService.createDedicatedHostGroup(params);

        // all methods should return a Promise
        expectToBePromise(createDedicatedHostGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/dedicated_host/groups', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['class']).toEqual(_class);
        expect(options.body['family']).toEqual(family);
        expect(options.body['zone']).toEqual(zone);
        expect(options.body['name']).toEqual(name);
        expect(options.body['resource_group']).toEqual(resourceGroup);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createDedicatedHostGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.createDedicatedHostGroup({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('deleteDedicatedHostGroup', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteDedicatedHostGroup
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteDedicatedHostGroupResult = vpcService.deleteDedicatedHostGroup(params);

        // all methods should return a Promise
        expectToBePromise(deleteDedicatedHostGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/dedicated_host/groups/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteDedicatedHostGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteDedicatedHostGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteDedicatedHostGroupPromise = vpcService.deleteDedicatedHostGroup();
        expectToBePromise(deleteDedicatedHostGroupPromise);

        deleteDedicatedHostGroupPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDedicatedHostGroup', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDedicatedHostGroup
        const id = 'testString';
        const params = {
          id: id,
        };

        const getDedicatedHostGroupResult = vpcService.getDedicatedHostGroup(params);

        // all methods should return a Promise
        expectToBePromise(getDedicatedHostGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/dedicated_host/groups/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getDedicatedHostGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getDedicatedHostGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDedicatedHostGroupPromise = vpcService.getDedicatedHostGroup();
        expectToBePromise(getDedicatedHostGroupPromise);

        getDedicatedHostGroupPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateDedicatedHostGroup', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateDedicatedHostGroup
        const id = 'testString';
        const name = 'my-host-group-modified';
        const params = {
          id: id,
          name: name,
        };

        const updateDedicatedHostGroupResult = vpcService.updateDedicatedHostGroup(params);

        // all methods should return a Promise
        expectToBePromise(updateDedicatedHostGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/dedicated_host/groups/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateDedicatedHostGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateDedicatedHostGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateDedicatedHostGroupPromise = vpcService.updateDedicatedHostGroup();
        expectToBePromise(updateDedicatedHostGroupPromise);

        updateDedicatedHostGroupPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listDedicatedHostProfiles', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listDedicatedHostProfiles
        const start = 'testString';
        const limit = 1;
        const params = {
          start: start,
          limit: limit,
        };

        const listDedicatedHostProfilesResult = vpcService.listDedicatedHostProfiles(params);

        // all methods should return a Promise
        expectToBePromise(listDedicatedHostProfilesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/dedicated_host/profiles', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listDedicatedHostProfiles(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listDedicatedHostProfiles({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getDedicatedHostProfile', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDedicatedHostProfile
        const name = 'testString';
        const params = {
          name: name,
        };

        const getDedicatedHostProfileResult = vpcService.getDedicatedHostProfile(params);

        // all methods should return a Promise
        expectToBePromise(getDedicatedHostProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/dedicated_host/profiles/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['name']).toEqual(name);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getDedicatedHostProfile(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getDedicatedHostProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDedicatedHostProfilePromise = vpcService.getDedicatedHostProfile();
        expectToBePromise(getDedicatedHostProfilePromise);

        getDedicatedHostProfilePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listDedicatedHosts', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listDedicatedHosts
        const dedicatedHostGroupId = 'testString';
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const zoneName = 'testString';
        const params = {
          dedicatedHostGroupId: dedicatedHostGroupId,
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          zoneName: zoneName,
        };

        const listDedicatedHostsResult = vpcService.listDedicatedHosts(params);

        // all methods should return a Promise
        expectToBePromise(listDedicatedHostsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/dedicated_hosts', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['dedicated_host_group.id']).toEqual(dedicatedHostGroupId);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(options.qs['zone.name']).toEqual(zoneName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listDedicatedHosts(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listDedicatedHosts({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createDedicatedHost', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // DedicatedHostProfileIdentityByName
      const dedicatedHostProfileIdentityModel = {
        name: 'm-62x496',
      };

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      // DedicatedHostGroupIdentityById
      const dedicatedHostGroupIdentityModel = {
        id: '0c8eccb4-271c-4518-956c-32bfce5cf83b',
      };

      // DedicatedHostPrototypeDedicatedHostByGroup
      const dedicatedHostPrototypeModel = {
        instance_placement_enabled: true,
        name: 'my-host',
        profile: dedicatedHostProfileIdentityModel,
        resource_group: resourceGroupIdentityModel,
        group: dedicatedHostGroupIdentityModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createDedicatedHost
        const dedicatedHostPrototype = dedicatedHostPrototypeModel;
        const params = {
          dedicatedHostPrototype: dedicatedHostPrototype,
        };

        const createDedicatedHostResult = vpcService.createDedicatedHost(params);

        // all methods should return a Promise
        expectToBePromise(createDedicatedHostResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/dedicated_hosts', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(dedicatedHostPrototype);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dedicatedHostPrototype = dedicatedHostPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          dedicatedHostPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createDedicatedHost(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createDedicatedHost({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createDedicatedHostPromise = vpcService.createDedicatedHost();
        expectToBePromise(createDedicatedHostPromise);

        createDedicatedHostPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listDedicatedHostDisks', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listDedicatedHostDisks
        const dedicatedHostId = 'testString';
        const params = {
          dedicatedHostId: dedicatedHostId,
        };

        const listDedicatedHostDisksResult = vpcService.listDedicatedHostDisks(params);

        // all methods should return a Promise
        expectToBePromise(listDedicatedHostDisksResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/dedicated_hosts/{dedicated_host_id}/disks', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['dedicated_host_id']).toEqual(dedicatedHostId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dedicatedHostId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          dedicatedHostId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listDedicatedHostDisks(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listDedicatedHostDisks({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listDedicatedHostDisksPromise = vpcService.listDedicatedHostDisks();
        expectToBePromise(listDedicatedHostDisksPromise);

        listDedicatedHostDisksPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDedicatedHostDisk', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDedicatedHostDisk
        const dedicatedHostId = 'testString';
        const id = 'testString';
        const params = {
          dedicatedHostId: dedicatedHostId,
          id: id,
        };

        const getDedicatedHostDiskResult = vpcService.getDedicatedHostDisk(params);

        // all methods should return a Promise
        expectToBePromise(getDedicatedHostDiskResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/dedicated_hosts/{dedicated_host_id}/disks/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['dedicated_host_id']).toEqual(dedicatedHostId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dedicatedHostId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          dedicatedHostId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getDedicatedHostDisk(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getDedicatedHostDisk({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDedicatedHostDiskPromise = vpcService.getDedicatedHostDisk();
        expectToBePromise(getDedicatedHostDiskPromise);

        getDedicatedHostDiskPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateDedicatedHostDisk', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateDedicatedHostDisk
        const dedicatedHostId = 'testString';
        const id = 'testString';
        const name = 'my-disk-updated';
        const params = {
          dedicatedHostId: dedicatedHostId,
          id: id,
          name: name,
        };

        const updateDedicatedHostDiskResult = vpcService.updateDedicatedHostDisk(params);

        // all methods should return a Promise
        expectToBePromise(updateDedicatedHostDiskResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/dedicated_hosts/{dedicated_host_id}/disks/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['dedicated_host_id']).toEqual(dedicatedHostId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dedicatedHostId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          dedicatedHostId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateDedicatedHostDisk(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateDedicatedHostDisk({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateDedicatedHostDiskPromise = vpcService.updateDedicatedHostDisk();
        expectToBePromise(updateDedicatedHostDiskPromise);

        updateDedicatedHostDiskPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteDedicatedHost', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteDedicatedHost
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteDedicatedHostResult = vpcService.deleteDedicatedHost(params);

        // all methods should return a Promise
        expectToBePromise(deleteDedicatedHostResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/dedicated_hosts/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteDedicatedHost(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteDedicatedHost({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteDedicatedHostPromise = vpcService.deleteDedicatedHost();
        expectToBePromise(deleteDedicatedHostPromise);

        deleteDedicatedHostPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDedicatedHost', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDedicatedHost
        const id = 'testString';
        const params = {
          id: id,
        };

        const getDedicatedHostResult = vpcService.getDedicatedHost(params);

        // all methods should return a Promise
        expectToBePromise(getDedicatedHostResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/dedicated_hosts/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getDedicatedHost(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getDedicatedHost({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDedicatedHostPromise = vpcService.getDedicatedHost();
        expectToBePromise(getDedicatedHostPromise);

        getDedicatedHostPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateDedicatedHost', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateDedicatedHost
        const id = 'testString';
        const instancePlacementEnabled = true;
        const name = 'my-host';
        const params = {
          id: id,
          instancePlacementEnabled: instancePlacementEnabled,
          name: name,
        };

        const updateDedicatedHostResult = vpcService.updateDedicatedHost(params);

        // all methods should return a Promise
        expectToBePromise(updateDedicatedHostResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/dedicated_hosts/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['instance_placement_enabled']).toEqual(instancePlacementEnabled);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateDedicatedHost(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateDedicatedHost({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateDedicatedHostPromise = vpcService.updateDedicatedHost();
        expectToBePromise(updateDedicatedHostPromise);

        updateDedicatedHostPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listVolumeProfiles', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listVolumeProfiles
        const start = 'testString';
        const limit = 1;
        const params = {
          start: start,
          limit: limit,
        };

        const listVolumeProfilesResult = vpcService.listVolumeProfiles(params);

        // all methods should return a Promise
        expectToBePromise(listVolumeProfilesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/volume/profiles', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVolumeProfiles(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listVolumeProfiles({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getVolumeProfile', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getVolumeProfile
        const name = 'testString';
        const params = {
          name: name,
        };

        const getVolumeProfileResult = vpcService.getVolumeProfile(params);

        // all methods should return a Promise
        expectToBePromise(getVolumeProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/volume/profiles/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['name']).toEqual(name);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVolumeProfile(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getVolumeProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getVolumeProfilePromise = vpcService.getVolumeProfile();
        expectToBePromise(getVolumeProfilePromise);

        getVolumeProfilePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listVolumes', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listVolumes
        const start = 'testString';
        const limit = 1;
        const name = 'testString';
        const zoneName = 'testString';
        const params = {
          start: start,
          limit: limit,
          name: name,
          zoneName: zoneName,
        };

        const listVolumesResult = vpcService.listVolumes(params);

        // all methods should return a Promise
        expectToBePromise(listVolumesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/volumes', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['name']).toEqual(name);
        expect(options.qs['zone.name']).toEqual(zoneName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVolumes(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listVolumes({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createVolume', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // VolumeProfileIdentityByName
      const volumeProfileIdentityModel = {
        name: '5iops-tier',
      };

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      // ZoneIdentityByName
      const zoneIdentityModel = {
        name: 'us-south-1',
      };

      // EncryptionKeyIdentityByCRN
      const encryptionKeyIdentityModel = {
        crn:
          'crn:v1:bluemix:public:kms:us-south:a/dffc98a0f1f0f95f6613b3b752286b87:e4a29d1a-2ef0-42a6-8fd2-350deb1c647e:key:5437653b-c4b1-447f-9646-b2a2a4cd6179',
      };

      // VolumePrototypeVolumeByCapacity
      const volumePrototypeModel = {
        iops: 10000,
        name: 'my-volume',
        profile: volumeProfileIdentityModel,
        resource_group: resourceGroupIdentityModel,
        zone: zoneIdentityModel,
        capacity: 100,
        encryption_key: encryptionKeyIdentityModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createVolume
        const volumePrototype = volumePrototypeModel;
        const params = {
          volumePrototype: volumePrototype,
        };

        const createVolumeResult = vpcService.createVolume(params);

        // all methods should return a Promise
        expectToBePromise(createVolumeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/volumes', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(volumePrototype);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const volumePrototype = volumePrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          volumePrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createVolume(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createVolume({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createVolumePromise = vpcService.createVolume();
        expectToBePromise(createVolumePromise);

        createVolumePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteVolume', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteVolume
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteVolumeResult = vpcService.deleteVolume(params);

        // all methods should return a Promise
        expectToBePromise(deleteVolumeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/volumes/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteVolume(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteVolume({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteVolumePromise = vpcService.deleteVolume();
        expectToBePromise(deleteVolumePromise);

        deleteVolumePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getVolume', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getVolume
        const id = 'testString';
        const params = {
          id: id,
        };

        const getVolumeResult = vpcService.getVolume(params);

        // all methods should return a Promise
        expectToBePromise(getVolumeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/volumes/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVolume(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getVolume({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getVolumePromise = vpcService.getVolume();
        expectToBePromise(getVolumePromise);

        getVolumePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateVolume', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateVolume
        const id = 'testString';
        const name = 'my-volume';
        const params = {
          id: id,
          name: name,
        };

        const updateVolumeResult = vpcService.updateVolume(params);

        // all methods should return a Promise
        expectToBePromise(updateVolumeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/volumes/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateVolume(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateVolume({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateVolumePromise = vpcService.updateVolume();
        expectToBePromise(updateVolumePromise);

        updateVolumePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listRegions', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listRegions
        const params = {};

        const listRegionsResult = vpcService.listRegions(params);

        // all methods should return a Promise
        expectToBePromise(listRegionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/regions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listRegions(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listRegions({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getRegion', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getRegion
        const name = 'testString';
        const params = {
          name: name,
        };

        const getRegionResult = vpcService.getRegion(params);

        // all methods should return a Promise
        expectToBePromise(getRegionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/regions/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['name']).toEqual(name);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getRegion(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getRegion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getRegionPromise = vpcService.getRegion();
        expectToBePromise(getRegionPromise);

        getRegionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listRegionZones', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listRegionZones
        const regionName = 'testString';
        const params = {
          regionName: regionName,
        };

        const listRegionZonesResult = vpcService.listRegionZones(params);

        // all methods should return a Promise
        expectToBePromise(listRegionZonesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/regions/{region_name}/zones', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['region_name']).toEqual(regionName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const regionName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          regionName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listRegionZones(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listRegionZones({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listRegionZonesPromise = vpcService.listRegionZones();
        expectToBePromise(listRegionZonesPromise);

        listRegionZonesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getRegionZone', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getRegionZone
        const regionName = 'testString';
        const name = 'testString';
        const params = {
          regionName: regionName,
          name: name,
        };

        const getRegionZoneResult = vpcService.getRegionZone(params);

        // all methods should return a Promise
        expectToBePromise(getRegionZoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/regions/{region_name}/zones/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['region_name']).toEqual(regionName);
        expect(options.path['name']).toEqual(name);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const regionName = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          regionName,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getRegionZone(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getRegionZone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getRegionZonePromise = vpcService.getRegionZone();
        expectToBePromise(getRegionZonePromise);

        getRegionZonePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listPublicGateways', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listPublicGateways
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const params = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
        };

        const listPublicGatewaysResult = vpcService.listPublicGateways(params);

        // all methods should return a Promise
        expectToBePromise(listPublicGatewaysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/public_gateways', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['resource_group.id']).toEqual(resourceGroupId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listPublicGateways(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listPublicGateways({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createPublicGateway', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // VPCIdentityById
      const vpcIdentityModel = {
        id: '4727d842-f94f-4a2d-824a-9bc9b02c523b',
      };

      // ZoneIdentityByName
      const zoneIdentityModel = {
        name: 'us-south-1',
      };

      // PublicGatewayFloatingIPPrototypeFloatingIPIdentityFloatingIPIdentityById
      const publicGatewayFloatingIpPrototypeModel = {
        id: '39300233-9995-4806-89a5-3c1b6eb88689',
      };

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createPublicGateway
        const vpc = vpcIdentityModel;
        const zone = zoneIdentityModel;
        const floatingIp = publicGatewayFloatingIpPrototypeModel;
        const name = 'my-public-gateway';
        const resourceGroup = resourceGroupIdentityModel;
        const params = {
          vpc: vpc,
          zone: zone,
          floatingIp: floatingIp,
          name: name,
          resourceGroup: resourceGroup,
        };

        const createPublicGatewayResult = vpcService.createPublicGateway(params);

        // all methods should return a Promise
        expectToBePromise(createPublicGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/public_gateways', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['vpc']).toEqual(vpc);
        expect(options.body['zone']).toEqual(zone);
        expect(options.body['floating_ip']).toEqual(floatingIp);
        expect(options.body['name']).toEqual(name);
        expect(options.body['resource_group']).toEqual(resourceGroup);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpc = vpcIdentityModel;
        const zone = zoneIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpc,
          zone,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createPublicGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createPublicGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createPublicGatewayPromise = vpcService.createPublicGateway();
        expectToBePromise(createPublicGatewayPromise);

        createPublicGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deletePublicGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deletePublicGateway
        const id = 'testString';
        const params = {
          id: id,
        };

        const deletePublicGatewayResult = vpcService.deletePublicGateway(params);

        // all methods should return a Promise
        expectToBePromise(deletePublicGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/public_gateways/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deletePublicGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deletePublicGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deletePublicGatewayPromise = vpcService.deletePublicGateway();
        expectToBePromise(deletePublicGatewayPromise);

        deletePublicGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getPublicGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getPublicGateway
        const id = 'testString';
        const params = {
          id: id,
        };

        const getPublicGatewayResult = vpcService.getPublicGateway(params);

        // all methods should return a Promise
        expectToBePromise(getPublicGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/public_gateways/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getPublicGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getPublicGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getPublicGatewayPromise = vpcService.getPublicGateway();
        expectToBePromise(getPublicGatewayPromise);

        getPublicGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updatePublicGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updatePublicGateway
        const id = 'testString';
        const name = 'my-public-gateway';
        const params = {
          id: id,
          name: name,
        };

        const updatePublicGatewayResult = vpcService.updatePublicGateway(params);

        // all methods should return a Promise
        expectToBePromise(updatePublicGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/public_gateways/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updatePublicGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updatePublicGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updatePublicGatewayPromise = vpcService.updatePublicGateway();
        expectToBePromise(updatePublicGatewayPromise);

        updatePublicGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listFloatingIps', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listFloatingIps
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const params = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
        };

        const listFloatingIpsResult = vpcService.listFloatingIps(params);

        // all methods should return a Promise
        expectToBePromise(listFloatingIpsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/floating_ips', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['resource_group.id']).toEqual(resourceGroupId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listFloatingIps(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listFloatingIps({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createFloatingIp', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      // ZoneIdentityByName
      const zoneIdentityModel = {
        name: 'us-south-1',
      };

      // FloatingIPPrototypeFloatingIPByZone
      const floatingIpPrototypeModel = {
        name: 'my-floating-ip',
        resource_group: resourceGroupIdentityModel,
        zone: zoneIdentityModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createFloatingIp
        const floatingIpPrototype = floatingIpPrototypeModel;
        const params = {
          floatingIpPrototype: floatingIpPrototype,
        };

        const createFloatingIpResult = vpcService.createFloatingIp(params);

        // all methods should return a Promise
        expectToBePromise(createFloatingIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/floating_ips', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(floatingIpPrototype);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const floatingIpPrototype = floatingIpPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          floatingIpPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createFloatingIp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createFloatingIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createFloatingIpPromise = vpcService.createFloatingIp();
        expectToBePromise(createFloatingIpPromise);

        createFloatingIpPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteFloatingIp', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteFloatingIp
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteFloatingIpResult = vpcService.deleteFloatingIp(params);

        // all methods should return a Promise
        expectToBePromise(deleteFloatingIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/floating_ips/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteFloatingIp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteFloatingIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteFloatingIpPromise = vpcService.deleteFloatingIp();
        expectToBePromise(deleteFloatingIpPromise);

        deleteFloatingIpPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getFloatingIp', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getFloatingIp
        const id = 'testString';
        const params = {
          id: id,
        };

        const getFloatingIpResult = vpcService.getFloatingIp(params);

        // all methods should return a Promise
        expectToBePromise(getFloatingIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/floating_ips/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getFloatingIp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getFloatingIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getFloatingIpPromise = vpcService.getFloatingIp();
        expectToBePromise(getFloatingIpPromise);

        getFloatingIpPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateFloatingIp', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // FloatingIPPatchTargetNetworkInterfaceIdentityNetworkInterfaceIdentityById
      const floatingIpPatchTargetNetworkInterfaceIdentityModel = {
        id: '69e55145-cc7d-4d8e-9e1f-cc3fb60b1793',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateFloatingIp
        const id = 'testString';
        const name = 'my-floating-ip';
        const target = floatingIpPatchTargetNetworkInterfaceIdentityModel;
        const params = {
          id: id,
          name: name,
          target: target,
        };

        const updateFloatingIpResult = vpcService.updateFloatingIp(params);

        // all methods should return a Promise
        expectToBePromise(updateFloatingIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/floating_ips/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['target']).toEqual(target);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateFloatingIp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateFloatingIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateFloatingIpPromise = vpcService.updateFloatingIp();
        expectToBePromise(updateFloatingIpPromise);

        updateFloatingIpPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listNetworkAcls', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listNetworkAcls
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const params = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
        };

        const listNetworkAclsResult = vpcService.listNetworkAcls(params);

        // all methods should return a Promise
        expectToBePromise(listNetworkAclsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/network_acls', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['resource_group.id']).toEqual(resourceGroupId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listNetworkAcls(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listNetworkAcls({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createNetworkAcl', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      // VPCIdentityById
      const vpcIdentityModel = {
        id: 'f0aae929-7047-46d1-92e1-9102b07a7f6f',
      };

      // NetworkACLRulePrototypeNetworkACLContextNetworkACLRuleProtocolAll
      const networkAclRulePrototypeNetworkAclContextModel = {
        action: 'allow',
        destination: '192.168.3.2/32',
        direction: 'inbound',
        name: 'my-rule-2',
        source: '192.168.3.2/32',
        protocol: 'all',
      };

      // NetworkACLPrototypeNetworkACLByRules
      const networkAclPrototypeModel = {
        name: 'my-network-acl',
        resource_group: resourceGroupIdentityModel,
        vpc: vpcIdentityModel,
        rules: [networkAclRulePrototypeNetworkAclContextModel],
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createNetworkAcl
        const networkAclPrototype = networkAclPrototypeModel;
        const params = {
          networkAclPrototype: networkAclPrototype,
        };

        const createNetworkAclResult = vpcService.createNetworkAcl(params);

        // all methods should return a Promise
        expectToBePromise(createNetworkAclResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/network_acls', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(networkAclPrototype);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createNetworkAcl(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.createNetworkAcl({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('deleteNetworkAcl', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteNetworkAcl
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteNetworkAclResult = vpcService.deleteNetworkAcl(params);

        // all methods should return a Promise
        expectToBePromise(deleteNetworkAclResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/network_acls/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteNetworkAcl(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteNetworkAcl({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteNetworkAclPromise = vpcService.deleteNetworkAcl();
        expectToBePromise(deleteNetworkAclPromise);

        deleteNetworkAclPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getNetworkAcl', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getNetworkAcl
        const id = 'testString';
        const params = {
          id: id,
        };

        const getNetworkAclResult = vpcService.getNetworkAcl(params);

        // all methods should return a Promise
        expectToBePromise(getNetworkAclResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/network_acls/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getNetworkAcl(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getNetworkAcl({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getNetworkAclPromise = vpcService.getNetworkAcl();
        expectToBePromise(getNetworkAclPromise);

        getNetworkAclPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateNetworkAcl', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateNetworkAcl
        const id = 'testString';
        const name = 'my-network-acl';
        const params = {
          id: id,
          name: name,
        };

        const updateNetworkAclResult = vpcService.updateNetworkAcl(params);

        // all methods should return a Promise
        expectToBePromise(updateNetworkAclResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/network_acls/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateNetworkAcl(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateNetworkAcl({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateNetworkAclPromise = vpcService.updateNetworkAcl();
        expectToBePromise(updateNetworkAclPromise);

        updateNetworkAclPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listNetworkAclRules', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listNetworkAclRules
        const networkAclId = 'testString';
        const start = 'testString';
        const limit = 1;
        const direction = 'inbound';
        const params = {
          networkAclId: networkAclId,
          start: start,
          limit: limit,
          direction: direction,
        };

        const listNetworkAclRulesResult = vpcService.listNetworkAclRules(params);

        // all methods should return a Promise
        expectToBePromise(listNetworkAclRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/network_acls/{network_acl_id}/rules', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['direction']).toEqual(direction);
        expect(options.path['network_acl_id']).toEqual(networkAclId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const networkAclId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          networkAclId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listNetworkAclRules(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listNetworkAclRules({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listNetworkAclRulesPromise = vpcService.listNetworkAclRules();
        expectToBePromise(listNetworkAclRulesPromise);

        listNetworkAclRulesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createNetworkAclRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // NetworkACLRuleBeforePrototypeNetworkACLRuleIdentityById
      const networkAclRuleBeforePrototypeModel = {
        id: '8daca77a-4980-4d33-8f3e-7038797be8f9',
      };

      // NetworkACLRulePrototypeNetworkACLRuleProtocolICMP
      const networkAclRulePrototypeModel = {
        action: 'allow',
        before: networkAclRuleBeforePrototypeModel,
        destination: '192.168.3.2/32',
        direction: 'inbound',
        name: 'my-rule-2',
        source: '192.168.3.2/32',
        code: 0,
        protocol: 'icmp',
        type: 8,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createNetworkAclRule
        const networkAclId = 'testString';
        const networkAclRulePrototype = networkAclRulePrototypeModel;
        const params = {
          networkAclId: networkAclId,
          networkAclRulePrototype: networkAclRulePrototype,
        };

        const createNetworkAclRuleResult = vpcService.createNetworkAclRule(params);

        // all methods should return a Promise
        expectToBePromise(createNetworkAclRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/network_acls/{network_acl_id}/rules', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(networkAclRulePrototype);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['network_acl_id']).toEqual(networkAclId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const networkAclId = 'testString';
        const networkAclRulePrototype = networkAclRulePrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          networkAclId,
          networkAclRulePrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createNetworkAclRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createNetworkAclRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createNetworkAclRulePromise = vpcService.createNetworkAclRule();
        expectToBePromise(createNetworkAclRulePromise);

        createNetworkAclRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteNetworkAclRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteNetworkAclRule
        const networkAclId = 'testString';
        const id = 'testString';
        const params = {
          networkAclId: networkAclId,
          id: id,
        };

        const deleteNetworkAclRuleResult = vpcService.deleteNetworkAclRule(params);

        // all methods should return a Promise
        expectToBePromise(deleteNetworkAclRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/network_acls/{network_acl_id}/rules/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['network_acl_id']).toEqual(networkAclId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const networkAclId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          networkAclId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteNetworkAclRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteNetworkAclRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteNetworkAclRulePromise = vpcService.deleteNetworkAclRule();
        expectToBePromise(deleteNetworkAclRulePromise);

        deleteNetworkAclRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getNetworkAclRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getNetworkAclRule
        const networkAclId = 'testString';
        const id = 'testString';
        const params = {
          networkAclId: networkAclId,
          id: id,
        };

        const getNetworkAclRuleResult = vpcService.getNetworkAclRule(params);

        // all methods should return a Promise
        expectToBePromise(getNetworkAclRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/network_acls/{network_acl_id}/rules/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['network_acl_id']).toEqual(networkAclId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const networkAclId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          networkAclId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getNetworkAclRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getNetworkAclRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getNetworkAclRulePromise = vpcService.getNetworkAclRule();
        expectToBePromise(getNetworkAclRulePromise);

        getNetworkAclRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateNetworkAclRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // NetworkACLRuleBeforePatchNetworkACLRuleIdentityById
      const networkAclRuleBeforePatchModel = {
        id: '8daca77a-4980-4d33-8f3e-7038797be8f9',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateNetworkAclRule
        const networkAclId = 'testString';
        const id = 'testString';
        const action = 'allow';
        const before = networkAclRuleBeforePatchModel;
        const code = 0;
        const destination = '192.168.3.2/32';
        const destinationPortMax = 22;
        const destinationPortMin = 22;
        const direction = 'inbound';
        const name = 'my-rule-2';
        const source = '192.168.3.2/32';
        const sourcePortMax = 65535;
        const sourcePortMin = 49152;
        const type = 8;
        const params = {
          networkAclId: networkAclId,
          id: id,
          action: action,
          before: before,
          code: code,
          destination: destination,
          destinationPortMax: destinationPortMax,
          destinationPortMin: destinationPortMin,
          direction: direction,
          name: name,
          source: source,
          sourcePortMax: sourcePortMax,
          sourcePortMin: sourcePortMin,
          type: type,
        };

        const updateNetworkAclRuleResult = vpcService.updateNetworkAclRule(params);

        // all methods should return a Promise
        expectToBePromise(updateNetworkAclRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/network_acls/{network_acl_id}/rules/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['action']).toEqual(action);
        expect(options.body['before']).toEqual(before);
        expect(options.body['code']).toEqual(code);
        expect(options.body['destination']).toEqual(destination);
        expect(options.body['destination_port_max']).toEqual(destinationPortMax);
        expect(options.body['destination_port_min']).toEqual(destinationPortMin);
        expect(options.body['direction']).toEqual(direction);
        expect(options.body['name']).toEqual(name);
        expect(options.body['source']).toEqual(source);
        expect(options.body['source_port_max']).toEqual(sourcePortMax);
        expect(options.body['source_port_min']).toEqual(sourcePortMin);
        expect(options.body['type']).toEqual(type);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['network_acl_id']).toEqual(networkAclId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const networkAclId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          networkAclId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateNetworkAclRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateNetworkAclRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateNetworkAclRulePromise = vpcService.updateNetworkAclRule();
        expectToBePromise(updateNetworkAclRulePromise);

        updateNetworkAclRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listSecurityGroups', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listSecurityGroups
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const vpcId = 'testString';
        const vpcCrn = 'testString';
        const vpcName = 'testString';
        const params = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          vpcId: vpcId,
          vpcCrn: vpcCrn,
          vpcName: vpcName,
        };

        const listSecurityGroupsResult = vpcService.listSecurityGroups(params);

        // all methods should return a Promise
        expectToBePromise(listSecurityGroupsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/security_groups', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(options.qs['vpc.id']).toEqual(vpcId);
        expect(options.qs['vpc.crn']).toEqual(vpcCrn);
        expect(options.qs['vpc.name']).toEqual(vpcName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listSecurityGroups(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listSecurityGroups({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createSecurityGroup', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // VPCIdentityById
      const vpcIdentityModel = {
        id: '4727d842-f94f-4a2d-824a-9bc9b02c523b',
      };

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      // SecurityGroupRuleRemotePrototypeIP
      const securityGroupRuleRemotePrototypeModel = {
        address: '192.168.3.4',
      };

      // SecurityGroupRulePrototypeSecurityGroupRuleProtocolICMP
      const securityGroupRulePrototypeModel = {
        direction: 'inbound',
        ip_version: 'ipv4',
        remote: securityGroupRuleRemotePrototypeModel,
        code: 0,
        protocol: 'icmp',
        type: 8,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createSecurityGroup
        const vpc = vpcIdentityModel;
        const name = 'my-security-group';
        const resourceGroup = resourceGroupIdentityModel;
        const rules = [securityGroupRulePrototypeModel];
        const params = {
          vpc: vpc,
          name: name,
          resourceGroup: resourceGroup,
          rules: rules,
        };

        const createSecurityGroupResult = vpcService.createSecurityGroup(params);

        // all methods should return a Promise
        expectToBePromise(createSecurityGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/security_groups', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['vpc']).toEqual(vpc);
        expect(options.body['name']).toEqual(name);
        expect(options.body['resource_group']).toEqual(resourceGroup);
        expect(options.body['rules']).toEqual(rules);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpc = vpcIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpc,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createSecurityGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createSecurityGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createSecurityGroupPromise = vpcService.createSecurityGroup();
        expectToBePromise(createSecurityGroupPromise);

        createSecurityGroupPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteSecurityGroup', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteSecurityGroup
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteSecurityGroupResult = vpcService.deleteSecurityGroup(params);

        // all methods should return a Promise
        expectToBePromise(deleteSecurityGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/security_groups/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteSecurityGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteSecurityGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteSecurityGroupPromise = vpcService.deleteSecurityGroup();
        expectToBePromise(deleteSecurityGroupPromise);

        deleteSecurityGroupPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSecurityGroup', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSecurityGroup
        const id = 'testString';
        const params = {
          id: id,
        };

        const getSecurityGroupResult = vpcService.getSecurityGroup(params);

        // all methods should return a Promise
        expectToBePromise(getSecurityGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/security_groups/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getSecurityGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getSecurityGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSecurityGroupPromise = vpcService.getSecurityGroup();
        expectToBePromise(getSecurityGroupPromise);

        getSecurityGroupPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateSecurityGroup', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateSecurityGroup
        const id = 'testString';
        const name = 'my-security-group';
        const params = {
          id: id,
          name: name,
        };

        const updateSecurityGroupResult = vpcService.updateSecurityGroup(params);

        // all methods should return a Promise
        expectToBePromise(updateSecurityGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/security_groups/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateSecurityGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateSecurityGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateSecurityGroupPromise = vpcService.updateSecurityGroup();
        expectToBePromise(updateSecurityGroupPromise);

        updateSecurityGroupPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listSecurityGroupNetworkInterfaces', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listSecurityGroupNetworkInterfaces
        const securityGroupId = 'testString';
        const start = 'testString';
        const limit = 1;
        const params = {
          securityGroupId: securityGroupId,
          start: start,
          limit: limit,
        };

        const listSecurityGroupNetworkInterfacesResult = vpcService.listSecurityGroupNetworkInterfaces(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listSecurityGroupNetworkInterfacesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/security_groups/{security_group_id}/network_interfaces',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.path['security_group_id']).toEqual(securityGroupId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          securityGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listSecurityGroupNetworkInterfaces(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listSecurityGroupNetworkInterfaces({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listSecurityGroupNetworkInterfacesPromise = vpcService.listSecurityGroupNetworkInterfaces();
        expectToBePromise(listSecurityGroupNetworkInterfacesPromise);

        listSecurityGroupNetworkInterfacesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('removeSecurityGroupNetworkInterface', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation removeSecurityGroupNetworkInterface
        const securityGroupId = 'testString';
        const id = 'testString';
        const params = {
          securityGroupId: securityGroupId,
          id: id,
        };

        const removeSecurityGroupNetworkInterfaceResult = vpcService.removeSecurityGroupNetworkInterface(
          params
        );

        // all methods should return a Promise
        expectToBePromise(removeSecurityGroupNetworkInterfaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/security_groups/{security_group_id}/network_interfaces/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['security_group_id']).toEqual(securityGroupId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          securityGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.removeSecurityGroupNetworkInterface(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.removeSecurityGroupNetworkInterface({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const removeSecurityGroupNetworkInterfacePromise = vpcService.removeSecurityGroupNetworkInterface();
        expectToBePromise(removeSecurityGroupNetworkInterfacePromise);

        removeSecurityGroupNetworkInterfacePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSecurityGroupNetworkInterface', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSecurityGroupNetworkInterface
        const securityGroupId = 'testString';
        const id = 'testString';
        const params = {
          securityGroupId: securityGroupId,
          id: id,
        };

        const getSecurityGroupNetworkInterfaceResult = vpcService.getSecurityGroupNetworkInterface(
          params
        );

        // all methods should return a Promise
        expectToBePromise(getSecurityGroupNetworkInterfaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/security_groups/{security_group_id}/network_interfaces/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['security_group_id']).toEqual(securityGroupId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          securityGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getSecurityGroupNetworkInterface(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getSecurityGroupNetworkInterface({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSecurityGroupNetworkInterfacePromise = vpcService.getSecurityGroupNetworkInterface();
        expectToBePromise(getSecurityGroupNetworkInterfacePromise);

        getSecurityGroupNetworkInterfacePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addSecurityGroupNetworkInterface', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addSecurityGroupNetworkInterface
        const securityGroupId = 'testString';
        const id = 'testString';
        const params = {
          securityGroupId: securityGroupId,
          id: id,
        };

        const addSecurityGroupNetworkInterfaceResult = vpcService.addSecurityGroupNetworkInterface(
          params
        );

        // all methods should return a Promise
        expectToBePromise(addSecurityGroupNetworkInterfaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/security_groups/{security_group_id}/network_interfaces/{id}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['security_group_id']).toEqual(securityGroupId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          securityGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.addSecurityGroupNetworkInterface(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.addSecurityGroupNetworkInterface({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const addSecurityGroupNetworkInterfacePromise = vpcService.addSecurityGroupNetworkInterface();
        expectToBePromise(addSecurityGroupNetworkInterfacePromise);

        addSecurityGroupNetworkInterfacePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listSecurityGroupRules', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listSecurityGroupRules
        const securityGroupId = 'testString';
        const params = {
          securityGroupId: securityGroupId,
        };

        const listSecurityGroupRulesResult = vpcService.listSecurityGroupRules(params);

        // all methods should return a Promise
        expectToBePromise(listSecurityGroupRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/security_groups/{security_group_id}/rules', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['security_group_id']).toEqual(securityGroupId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          securityGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listSecurityGroupRules(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listSecurityGroupRules({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listSecurityGroupRulesPromise = vpcService.listSecurityGroupRules();
        expectToBePromise(listSecurityGroupRulesPromise);

        listSecurityGroupRulesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createSecurityGroupRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SecurityGroupRuleRemotePrototypeIP
      const securityGroupRuleRemotePrototypeModel = {
        address: '192.168.3.4',
      };

      // SecurityGroupRulePrototypeSecurityGroupRuleProtocolICMP
      const securityGroupRulePrototypeModel = {
        direction: 'inbound',
        ip_version: 'ipv4',
        remote: securityGroupRuleRemotePrototypeModel,
        code: 0,
        protocol: 'icmp',
        type: 8,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createSecurityGroupRule
        const securityGroupId = 'testString';
        const securityGroupRulePrototype = securityGroupRulePrototypeModel;
        const params = {
          securityGroupId: securityGroupId,
          securityGroupRulePrototype: securityGroupRulePrototype,
        };

        const createSecurityGroupRuleResult = vpcService.createSecurityGroupRule(params);

        // all methods should return a Promise
        expectToBePromise(createSecurityGroupRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/security_groups/{security_group_id}/rules', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(securityGroupRulePrototype);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['security_group_id']).toEqual(securityGroupId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const securityGroupRulePrototype = securityGroupRulePrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          securityGroupId,
          securityGroupRulePrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createSecurityGroupRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createSecurityGroupRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createSecurityGroupRulePromise = vpcService.createSecurityGroupRule();
        expectToBePromise(createSecurityGroupRulePromise);

        createSecurityGroupRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteSecurityGroupRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteSecurityGroupRule
        const securityGroupId = 'testString';
        const id = 'testString';
        const params = {
          securityGroupId: securityGroupId,
          id: id,
        };

        const deleteSecurityGroupRuleResult = vpcService.deleteSecurityGroupRule(params);

        // all methods should return a Promise
        expectToBePromise(deleteSecurityGroupRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/security_groups/{security_group_id}/rules/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['security_group_id']).toEqual(securityGroupId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          securityGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteSecurityGroupRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteSecurityGroupRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteSecurityGroupRulePromise = vpcService.deleteSecurityGroupRule();
        expectToBePromise(deleteSecurityGroupRulePromise);

        deleteSecurityGroupRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSecurityGroupRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSecurityGroupRule
        const securityGroupId = 'testString';
        const id = 'testString';
        const params = {
          securityGroupId: securityGroupId,
          id: id,
        };

        const getSecurityGroupRuleResult = vpcService.getSecurityGroupRule(params);

        // all methods should return a Promise
        expectToBePromise(getSecurityGroupRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/security_groups/{security_group_id}/rules/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['security_group_id']).toEqual(securityGroupId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          securityGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getSecurityGroupRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getSecurityGroupRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSecurityGroupRulePromise = vpcService.getSecurityGroupRule();
        expectToBePromise(getSecurityGroupRulePromise);

        getSecurityGroupRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateSecurityGroupRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SecurityGroupRuleRemotePatchIP
      const securityGroupRuleRemotePatchModel = {
        address: '192.168.3.4',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateSecurityGroupRule
        const securityGroupId = 'testString';
        const id = 'testString';
        const code = 0;
        const direction = 'inbound';
        const ipVersion = 'ipv4';
        const portMax = 22;
        const portMin = 22;
        const remote = securityGroupRuleRemotePatchModel;
        const type = 8;
        const params = {
          securityGroupId: securityGroupId,
          id: id,
          code: code,
          direction: direction,
          ipVersion: ipVersion,
          portMax: portMax,
          portMin: portMin,
          remote: remote,
          type: type,
        };

        const updateSecurityGroupRuleResult = vpcService.updateSecurityGroupRule(params);

        // all methods should return a Promise
        expectToBePromise(updateSecurityGroupRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/security_groups/{security_group_id}/rules/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['code']).toEqual(code);
        expect(options.body['direction']).toEqual(direction);
        expect(options.body['ip_version']).toEqual(ipVersion);
        expect(options.body['port_max']).toEqual(portMax);
        expect(options.body['port_min']).toEqual(portMin);
        expect(options.body['remote']).toEqual(remote);
        expect(options.body['type']).toEqual(type);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['security_group_id']).toEqual(securityGroupId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          securityGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateSecurityGroupRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateSecurityGroupRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateSecurityGroupRulePromise = vpcService.updateSecurityGroupRule();
        expectToBePromise(updateSecurityGroupRulePromise);

        updateSecurityGroupRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listSecurityGroupTargets', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listSecurityGroupTargets
        const securityGroupId = 'testString';
        const start = 'testString';
        const limit = 1;
        const params = {
          securityGroupId: securityGroupId,
          start: start,
          limit: limit,
        };

        const listSecurityGroupTargetsResult = vpcService.listSecurityGroupTargets(params);

        // all methods should return a Promise
        expectToBePromise(listSecurityGroupTargetsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/security_groups/{security_group_id}/targets', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.path['security_group_id']).toEqual(securityGroupId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          securityGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listSecurityGroupTargets(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listSecurityGroupTargets({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listSecurityGroupTargetsPromise = vpcService.listSecurityGroupTargets();
        expectToBePromise(listSecurityGroupTargetsPromise);

        listSecurityGroupTargetsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteSecurityGroupTargetBinding', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteSecurityGroupTargetBinding
        const securityGroupId = 'testString';
        const id = 'testString';
        const params = {
          securityGroupId: securityGroupId,
          id: id,
        };

        const deleteSecurityGroupTargetBindingResult = vpcService.deleteSecurityGroupTargetBinding(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteSecurityGroupTargetBindingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/security_groups/{security_group_id}/targets/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['security_group_id']).toEqual(securityGroupId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          securityGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteSecurityGroupTargetBinding(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteSecurityGroupTargetBinding({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteSecurityGroupTargetBindingPromise = vpcService.deleteSecurityGroupTargetBinding();
        expectToBePromise(deleteSecurityGroupTargetBindingPromise);

        deleteSecurityGroupTargetBindingPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSecurityGroupTarget', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSecurityGroupTarget
        const securityGroupId = 'testString';
        const id = 'testString';
        const params = {
          securityGroupId: securityGroupId,
          id: id,
        };

        const getSecurityGroupTargetResult = vpcService.getSecurityGroupTarget(params);

        // all methods should return a Promise
        expectToBePromise(getSecurityGroupTargetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/security_groups/{security_group_id}/targets/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['security_group_id']).toEqual(securityGroupId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          securityGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getSecurityGroupTarget(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getSecurityGroupTarget({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSecurityGroupTargetPromise = vpcService.getSecurityGroupTarget();
        expectToBePromise(getSecurityGroupTargetPromise);

        getSecurityGroupTargetPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createSecurityGroupTargetBinding', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createSecurityGroupTargetBinding
        const securityGroupId = 'testString';
        const id = 'testString';
        const params = {
          securityGroupId: securityGroupId,
          id: id,
        };

        const createSecurityGroupTargetBindingResult = vpcService.createSecurityGroupTargetBinding(
          params
        );

        // all methods should return a Promise
        expectToBePromise(createSecurityGroupTargetBindingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/security_groups/{security_group_id}/targets/{id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['security_group_id']).toEqual(securityGroupId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          securityGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createSecurityGroupTargetBinding(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createSecurityGroupTargetBinding({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createSecurityGroupTargetBindingPromise = vpcService.createSecurityGroupTargetBinding();
        expectToBePromise(createSecurityGroupTargetBindingPromise);

        createSecurityGroupTargetBindingPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listIkePolicies', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listIkePolicies
        const start = 'testString';
        const limit = 1;
        const params = {
          start: start,
          limit: limit,
        };

        const listIkePoliciesResult = vpcService.listIkePolicies(params);

        // all methods should return a Promise
        expectToBePromise(listIkePoliciesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ike_policies', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listIkePolicies(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listIkePolicies({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createIkePolicy', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createIkePolicy
        const authenticationAlgorithm = 'md5';
        const dhGroup = 2;
        const encryptionAlgorithm = 'triple_des';
        const ikeVersion = 1;
        const keyLifetime = 28800;
        const name = 'my-ike-policy';
        const resourceGroup = resourceGroupIdentityModel;
        const params = {
          authenticationAlgorithm: authenticationAlgorithm,
          dhGroup: dhGroup,
          encryptionAlgorithm: encryptionAlgorithm,
          ikeVersion: ikeVersion,
          keyLifetime: keyLifetime,
          name: name,
          resourceGroup: resourceGroup,
        };

        const createIkePolicyResult = vpcService.createIkePolicy(params);

        // all methods should return a Promise
        expectToBePromise(createIkePolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ike_policies', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['authentication_algorithm']).toEqual(authenticationAlgorithm);
        expect(options.body['dh_group']).toEqual(dhGroup);
        expect(options.body['encryption_algorithm']).toEqual(encryptionAlgorithm);
        expect(options.body['ike_version']).toEqual(ikeVersion);
        expect(options.body['key_lifetime']).toEqual(keyLifetime);
        expect(options.body['name']).toEqual(name);
        expect(options.body['resource_group']).toEqual(resourceGroup);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const authenticationAlgorithm = 'md5';
        const dhGroup = 2;
        const encryptionAlgorithm = 'triple_des';
        const ikeVersion = 1;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          authenticationAlgorithm,
          dhGroup,
          encryptionAlgorithm,
          ikeVersion,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createIkePolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createIkePolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createIkePolicyPromise = vpcService.createIkePolicy();
        expectToBePromise(createIkePolicyPromise);

        createIkePolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteIkePolicy', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteIkePolicy
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteIkePolicyResult = vpcService.deleteIkePolicy(params);

        // all methods should return a Promise
        expectToBePromise(deleteIkePolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ike_policies/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteIkePolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteIkePolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteIkePolicyPromise = vpcService.deleteIkePolicy();
        expectToBePromise(deleteIkePolicyPromise);

        deleteIkePolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getIkePolicy', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getIkePolicy
        const id = 'testString';
        const params = {
          id: id,
        };

        const getIkePolicyResult = vpcService.getIkePolicy(params);

        // all methods should return a Promise
        expectToBePromise(getIkePolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ike_policies/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getIkePolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getIkePolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getIkePolicyPromise = vpcService.getIkePolicy();
        expectToBePromise(getIkePolicyPromise);

        getIkePolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateIkePolicy', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateIkePolicy
        const id = 'testString';
        const authenticationAlgorithm = 'md5';
        const dhGroup = 2;
        const encryptionAlgorithm = 'triple_des';
        const ikeVersion = 1;
        const keyLifetime = 28800;
        const name = 'my-ike-policy';
        const params = {
          id: id,
          authenticationAlgorithm: authenticationAlgorithm,
          dhGroup: dhGroup,
          encryptionAlgorithm: encryptionAlgorithm,
          ikeVersion: ikeVersion,
          keyLifetime: keyLifetime,
          name: name,
        };

        const updateIkePolicyResult = vpcService.updateIkePolicy(params);

        // all methods should return a Promise
        expectToBePromise(updateIkePolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ike_policies/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['authentication_algorithm']).toEqual(authenticationAlgorithm);
        expect(options.body['dh_group']).toEqual(dhGroup);
        expect(options.body['encryption_algorithm']).toEqual(encryptionAlgorithm);
        expect(options.body['ike_version']).toEqual(ikeVersion);
        expect(options.body['key_lifetime']).toEqual(keyLifetime);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateIkePolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateIkePolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateIkePolicyPromise = vpcService.updateIkePolicy();
        expectToBePromise(updateIkePolicyPromise);

        updateIkePolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listIkePolicyConnections', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listIkePolicyConnections
        const id = 'testString';
        const params = {
          id: id,
        };

        const listIkePolicyConnectionsResult = vpcService.listIkePolicyConnections(params);

        // all methods should return a Promise
        expectToBePromise(listIkePolicyConnectionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ike_policies/{id}/connections', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listIkePolicyConnections(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listIkePolicyConnections({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listIkePolicyConnectionsPromise = vpcService.listIkePolicyConnections();
        expectToBePromise(listIkePolicyConnectionsPromise);

        listIkePolicyConnectionsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listIpsecPolicies', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listIpsecPolicies
        const start = 'testString';
        const limit = 1;
        const params = {
          start: start,
          limit: limit,
        };

        const listIpsecPoliciesResult = vpcService.listIpsecPolicies(params);

        // all methods should return a Promise
        expectToBePromise(listIpsecPoliciesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ipsec_policies', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listIpsecPolicies(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listIpsecPolicies({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createIpsecPolicy', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createIpsecPolicy
        const authenticationAlgorithm = 'md5';
        const encryptionAlgorithm = 'triple_des';
        const pfs = 'disabled';
        const keyLifetime = 3600;
        const name = 'my-ipsec-policy';
        const resourceGroup = resourceGroupIdentityModel;
        const params = {
          authenticationAlgorithm: authenticationAlgorithm,
          encryptionAlgorithm: encryptionAlgorithm,
          pfs: pfs,
          keyLifetime: keyLifetime,
          name: name,
          resourceGroup: resourceGroup,
        };

        const createIpsecPolicyResult = vpcService.createIpsecPolicy(params);

        // all methods should return a Promise
        expectToBePromise(createIpsecPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ipsec_policies', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['authentication_algorithm']).toEqual(authenticationAlgorithm);
        expect(options.body['encryption_algorithm']).toEqual(encryptionAlgorithm);
        expect(options.body['pfs']).toEqual(pfs);
        expect(options.body['key_lifetime']).toEqual(keyLifetime);
        expect(options.body['name']).toEqual(name);
        expect(options.body['resource_group']).toEqual(resourceGroup);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const authenticationAlgorithm = 'md5';
        const encryptionAlgorithm = 'triple_des';
        const pfs = 'disabled';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          authenticationAlgorithm,
          encryptionAlgorithm,
          pfs,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createIpsecPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createIpsecPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createIpsecPolicyPromise = vpcService.createIpsecPolicy();
        expectToBePromise(createIpsecPolicyPromise);

        createIpsecPolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteIpsecPolicy', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteIpsecPolicy
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteIpsecPolicyResult = vpcService.deleteIpsecPolicy(params);

        // all methods should return a Promise
        expectToBePromise(deleteIpsecPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ipsec_policies/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteIpsecPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteIpsecPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteIpsecPolicyPromise = vpcService.deleteIpsecPolicy();
        expectToBePromise(deleteIpsecPolicyPromise);

        deleteIpsecPolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getIpsecPolicy', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getIpsecPolicy
        const id = 'testString';
        const params = {
          id: id,
        };

        const getIpsecPolicyResult = vpcService.getIpsecPolicy(params);

        // all methods should return a Promise
        expectToBePromise(getIpsecPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ipsec_policies/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getIpsecPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getIpsecPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getIpsecPolicyPromise = vpcService.getIpsecPolicy();
        expectToBePromise(getIpsecPolicyPromise);

        getIpsecPolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateIpsecPolicy', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateIpsecPolicy
        const id = 'testString';
        const authenticationAlgorithm = 'md5';
        const encryptionAlgorithm = 'triple_des';
        const keyLifetime = 3600;
        const name = 'my-ipsec-policy';
        const pfs = 'disabled';
        const params = {
          id: id,
          authenticationAlgorithm: authenticationAlgorithm,
          encryptionAlgorithm: encryptionAlgorithm,
          keyLifetime: keyLifetime,
          name: name,
          pfs: pfs,
        };

        const updateIpsecPolicyResult = vpcService.updateIpsecPolicy(params);

        // all methods should return a Promise
        expectToBePromise(updateIpsecPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ipsec_policies/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['authentication_algorithm']).toEqual(authenticationAlgorithm);
        expect(options.body['encryption_algorithm']).toEqual(encryptionAlgorithm);
        expect(options.body['key_lifetime']).toEqual(keyLifetime);
        expect(options.body['name']).toEqual(name);
        expect(options.body['pfs']).toEqual(pfs);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateIpsecPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateIpsecPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateIpsecPolicyPromise = vpcService.updateIpsecPolicy();
        expectToBePromise(updateIpsecPolicyPromise);

        updateIpsecPolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listIpsecPolicyConnections', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listIpsecPolicyConnections
        const id = 'testString';
        const params = {
          id: id,
        };

        const listIpsecPolicyConnectionsResult = vpcService.listIpsecPolicyConnections(params);

        // all methods should return a Promise
        expectToBePromise(listIpsecPolicyConnectionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ipsec_policies/{id}/connections', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listIpsecPolicyConnections(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listIpsecPolicyConnections({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listIpsecPolicyConnectionsPromise = vpcService.listIpsecPolicyConnections();
        expectToBePromise(listIpsecPolicyConnectionsPromise);

        listIpsecPolicyConnectionsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listVpnGateways', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listVpnGateways
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const mode = 'route';
        const params = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          mode: mode,
        };

        const listVpnGatewaysResult = vpcService.listVpnGateways(params);

        // all methods should return a Promise
        expectToBePromise(listVpnGatewaysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpn_gateways', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(options.qs['mode']).toEqual(mode);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVpnGateways(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listVpnGateways({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createVpnGateway', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      // SubnetIdentityById
      const subnetIdentityModel = {
        id: '7ec86020-1c6e-4889-b3f0-a15f2e50f87e',
      };

      // VPNGatewayPrototypeVPNGatewayRouteModePrototype
      const vpnGatewayPrototypeModel = {
        name: 'my-vpn-gateway',
        resource_group: resourceGroupIdentityModel,
        subnet: subnetIdentityModel,
        mode: 'route',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createVpnGateway
        const vpnGatewayPrototype = vpnGatewayPrototypeModel;
        const params = {
          vpnGatewayPrototype: vpnGatewayPrototype,
        };

        const createVpnGatewayResult = vpcService.createVpnGateway(params);

        // all methods should return a Promise
        expectToBePromise(createVpnGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpn_gateways', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(vpnGatewayPrototype);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayPrototype = vpnGatewayPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpnGatewayPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createVpnGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createVpnGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createVpnGatewayPromise = vpcService.createVpnGateway();
        expectToBePromise(createVpnGatewayPromise);

        createVpnGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteVpnGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteVpnGateway
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteVpnGatewayResult = vpcService.deleteVpnGateway(params);

        // all methods should return a Promise
        expectToBePromise(deleteVpnGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpn_gateways/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteVpnGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteVpnGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteVpnGatewayPromise = vpcService.deleteVpnGateway();
        expectToBePromise(deleteVpnGatewayPromise);

        deleteVpnGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getVpnGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getVpnGateway
        const id = 'testString';
        const params = {
          id: id,
        };

        const getVpnGatewayResult = vpcService.getVpnGateway(params);

        // all methods should return a Promise
        expectToBePromise(getVpnGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpn_gateways/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpnGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getVpnGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getVpnGatewayPromise = vpcService.getVpnGateway();
        expectToBePromise(getVpnGatewayPromise);

        getVpnGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateVpnGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateVpnGateway
        const id = 'testString';
        const name = 'my-vpn-gateway';
        const params = {
          id: id,
          name: name,
        };

        const updateVpnGatewayResult = vpcService.updateVpnGateway(params);

        // all methods should return a Promise
        expectToBePromise(updateVpnGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpn_gateways/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateVpnGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateVpnGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateVpnGatewayPromise = vpcService.updateVpnGateway();
        expectToBePromise(updateVpnGatewayPromise);

        updateVpnGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listVpnGatewayConnections', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listVpnGatewayConnections
        const vpnGatewayId = 'testString';
        const status = 'testString';
        const params = {
          vpnGatewayId: vpnGatewayId,
          status: status,
        };

        const listVpnGatewayConnectionsResult = vpcService.listVpnGatewayConnections(params);

        // all methods should return a Promise
        expectToBePromise(listVpnGatewayConnectionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpn_gateways/{vpn_gateway_id}/connections', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['status']).toEqual(status);
        expect(options.path['vpn_gateway_id']).toEqual(vpnGatewayId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpnGatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVpnGatewayConnections(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listVpnGatewayConnections({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listVpnGatewayConnectionsPromise = vpcService.listVpnGatewayConnections();
        expectToBePromise(listVpnGatewayConnectionsPromise);

        listVpnGatewayConnectionsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createVpnGatewayConnection', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // VPNGatewayConnectionDPDPrototype
      const vpnGatewayConnectionDpdPrototypeModel = {
        action: 'restart',
        interval: 30,
        timeout: 120,
      };

      // IKEPolicyIdentityById
      const ikePolicyIdentityModel = {
        id: 'ddf51bec-3424-11e8-b467-0ed5f89f718b',
      };

      // IPsecPolicyIdentityById
      const iPsecPolicyIdentityModel = {
        id: 'ddf51bec-3424-11e8-b467-0ed5f89f718b',
      };

      // VPNGatewayConnectionPrototypeVPNGatewayConnectionStaticRouteModePrototype
      const vpnGatewayConnectionPrototypeModel = {
        admin_state_up: true,
        dead_peer_detection: vpnGatewayConnectionDpdPrototypeModel,
        ike_policy: ikePolicyIdentityModel,
        ipsec_policy: iPsecPolicyIdentityModel,
        name: 'my-vpn-connection',
        peer_address: '169.21.50.5',
        psk: 'lkj14b1oi0alcniejkso',
        routing_protocol: 'none',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createVpnGatewayConnection
        const vpnGatewayId = 'testString';
        const vpnGatewayConnectionPrototype = vpnGatewayConnectionPrototypeModel;
        const params = {
          vpnGatewayId: vpnGatewayId,
          vpnGatewayConnectionPrototype: vpnGatewayConnectionPrototype,
        };

        const createVpnGatewayConnectionResult = vpcService.createVpnGatewayConnection(params);

        // all methods should return a Promise
        expectToBePromise(createVpnGatewayConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpn_gateways/{vpn_gateway_id}/connections', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(vpnGatewayConnectionPrototype);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpn_gateway_id']).toEqual(vpnGatewayId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const vpnGatewayConnectionPrototype = vpnGatewayConnectionPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpnGatewayId,
          vpnGatewayConnectionPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createVpnGatewayConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createVpnGatewayConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createVpnGatewayConnectionPromise = vpcService.createVpnGatewayConnection();
        expectToBePromise(createVpnGatewayConnectionPromise);

        createVpnGatewayConnectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteVpnGatewayConnection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteVpnGatewayConnection
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const params = {
          vpnGatewayId: vpnGatewayId,
          id: id,
        };

        const deleteVpnGatewayConnectionResult = vpcService.deleteVpnGatewayConnection(params);

        // all methods should return a Promise
        expectToBePromise(deleteVpnGatewayConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpn_gateways/{vpn_gateway_id}/connections/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpn_gateway_id']).toEqual(vpnGatewayId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpnGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteVpnGatewayConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteVpnGatewayConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteVpnGatewayConnectionPromise = vpcService.deleteVpnGatewayConnection();
        expectToBePromise(deleteVpnGatewayConnectionPromise);

        deleteVpnGatewayConnectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getVpnGatewayConnection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getVpnGatewayConnection
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const params = {
          vpnGatewayId: vpnGatewayId,
          id: id,
        };

        const getVpnGatewayConnectionResult = vpcService.getVpnGatewayConnection(params);

        // all methods should return a Promise
        expectToBePromise(getVpnGatewayConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpn_gateways/{vpn_gateway_id}/connections/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpn_gateway_id']).toEqual(vpnGatewayId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpnGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpnGatewayConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getVpnGatewayConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getVpnGatewayConnectionPromise = vpcService.getVpnGatewayConnection();
        expectToBePromise(getVpnGatewayConnectionPromise);

        getVpnGatewayConnectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateVpnGatewayConnection', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // VPNGatewayConnectionDPDPrototype
      const vpnGatewayConnectionDpdPrototypeModel = {
        action: 'restart',
        interval: 30,
        timeout: 120,
      };

      // IKEPolicyIdentityById
      const ikePolicyIdentityModel = {
        id: 'ddf51bec-3424-11e8-b467-0ed5f89f718b',
      };

      // IPsecPolicyIdentityById
      const iPsecPolicyIdentityModel = {
        id: 'ddf51bec-3424-11e8-b467-0ed5f89f718b',
      };

      // VPNGatewayConnectionPatchVPNGatewayConnectionStaticRouteModePatch
      const vpnGatewayConnectionPatchModel = {
        admin_state_up: true,
        dead_peer_detection: vpnGatewayConnectionDpdPrototypeModel,
        ike_policy: ikePolicyIdentityModel,
        ipsec_policy: iPsecPolicyIdentityModel,
        name: 'my-vpn-connection',
        peer_address: '169.21.50.5',
        psk: 'lkj14b1oi0alcniejkso',
        routing_protocol: 'none',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateVpnGatewayConnection
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const vpnGatewayConnectionPatch = vpnGatewayConnectionPatchModel;
        const params = {
          vpnGatewayId: vpnGatewayId,
          id: id,
          vpnGatewayConnectionPatch: vpnGatewayConnectionPatch,
        };

        const updateVpnGatewayConnectionResult = vpcService.updateVpnGatewayConnection(params);

        // all methods should return a Promise
        expectToBePromise(updateVpnGatewayConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/vpn_gateways/{vpn_gateway_id}/connections/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(vpnGatewayConnectionPatch);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpn_gateway_id']).toEqual(vpnGatewayId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const vpnGatewayConnectionPatch = vpnGatewayConnectionPatchModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpnGatewayId,
          id,
          vpnGatewayConnectionPatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateVpnGatewayConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateVpnGatewayConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateVpnGatewayConnectionPromise = vpcService.updateVpnGatewayConnection();
        expectToBePromise(updateVpnGatewayConnectionPromise);

        updateVpnGatewayConnectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listVpnGatewayConnectionLocalCidrs', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listVpnGatewayConnectionLocalCidrs
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const params = {
          vpnGatewayId: vpnGatewayId,
          id: id,
        };

        const listVpnGatewayConnectionLocalCidrsResult = vpcService.listVpnGatewayConnectionLocalCidrs(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listVpnGatewayConnectionLocalCidrsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/vpn_gateways/{vpn_gateway_id}/connections/{id}/local_cidrs',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpn_gateway_id']).toEqual(vpnGatewayId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpnGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVpnGatewayConnectionLocalCidrs(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listVpnGatewayConnectionLocalCidrs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listVpnGatewayConnectionLocalCidrsPromise = vpcService.listVpnGatewayConnectionLocalCidrs();
        expectToBePromise(listVpnGatewayConnectionLocalCidrsPromise);

        listVpnGatewayConnectionLocalCidrsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('removeVpnGatewayConnectionLocalCidr', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation removeVpnGatewayConnectionLocalCidr
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const params = {
          vpnGatewayId: vpnGatewayId,
          id: id,
          cidrPrefix: cidrPrefix,
          prefixLength: prefixLength,
        };

        const removeVpnGatewayConnectionLocalCidrResult = vpcService.removeVpnGatewayConnectionLocalCidr(
          params
        );

        // all methods should return a Promise
        expectToBePromise(removeVpnGatewayConnectionLocalCidrResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/vpn_gateways/{vpn_gateway_id}/connections/{id}/local_cidrs/{cidr_prefix}/{prefix_length}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpn_gateway_id']).toEqual(vpnGatewayId);
        expect(options.path['id']).toEqual(id);
        expect(options.path['cidr_prefix']).toEqual(cidrPrefix);
        expect(options.path['prefix_length']).toEqual(prefixLength);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpnGatewayId,
          id,
          cidrPrefix,
          prefixLength,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.removeVpnGatewayConnectionLocalCidr(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.removeVpnGatewayConnectionLocalCidr({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const removeVpnGatewayConnectionLocalCidrPromise = vpcService.removeVpnGatewayConnectionLocalCidr();
        expectToBePromise(removeVpnGatewayConnectionLocalCidrPromise);

        removeVpnGatewayConnectionLocalCidrPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('checkVpnGatewayConnectionLocalCidr', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation checkVpnGatewayConnectionLocalCidr
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const params = {
          vpnGatewayId: vpnGatewayId,
          id: id,
          cidrPrefix: cidrPrefix,
          prefixLength: prefixLength,
        };

        const checkVpnGatewayConnectionLocalCidrResult = vpcService.checkVpnGatewayConnectionLocalCidr(
          params
        );

        // all methods should return a Promise
        expectToBePromise(checkVpnGatewayConnectionLocalCidrResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/vpn_gateways/{vpn_gateway_id}/connections/{id}/local_cidrs/{cidr_prefix}/{prefix_length}',
          'GET'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpn_gateway_id']).toEqual(vpnGatewayId);
        expect(options.path['id']).toEqual(id);
        expect(options.path['cidr_prefix']).toEqual(cidrPrefix);
        expect(options.path['prefix_length']).toEqual(prefixLength);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpnGatewayId,
          id,
          cidrPrefix,
          prefixLength,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.checkVpnGatewayConnectionLocalCidr(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.checkVpnGatewayConnectionLocalCidr({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const checkVpnGatewayConnectionLocalCidrPromise = vpcService.checkVpnGatewayConnectionLocalCidr();
        expectToBePromise(checkVpnGatewayConnectionLocalCidrPromise);

        checkVpnGatewayConnectionLocalCidrPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addVpnGatewayConnectionLocalCidr', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addVpnGatewayConnectionLocalCidr
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const params = {
          vpnGatewayId: vpnGatewayId,
          id: id,
          cidrPrefix: cidrPrefix,
          prefixLength: prefixLength,
        };

        const addVpnGatewayConnectionLocalCidrResult = vpcService.addVpnGatewayConnectionLocalCidr(
          params
        );

        // all methods should return a Promise
        expectToBePromise(addVpnGatewayConnectionLocalCidrResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/vpn_gateways/{vpn_gateway_id}/connections/{id}/local_cidrs/{cidr_prefix}/{prefix_length}',
          'PUT'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpn_gateway_id']).toEqual(vpnGatewayId);
        expect(options.path['id']).toEqual(id);
        expect(options.path['cidr_prefix']).toEqual(cidrPrefix);
        expect(options.path['prefix_length']).toEqual(prefixLength);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpnGatewayId,
          id,
          cidrPrefix,
          prefixLength,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.addVpnGatewayConnectionLocalCidr(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.addVpnGatewayConnectionLocalCidr({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const addVpnGatewayConnectionLocalCidrPromise = vpcService.addVpnGatewayConnectionLocalCidr();
        expectToBePromise(addVpnGatewayConnectionLocalCidrPromise);

        addVpnGatewayConnectionLocalCidrPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listVpnGatewayConnectionPeerCidrs', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listVpnGatewayConnectionPeerCidrs
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const params = {
          vpnGatewayId: vpnGatewayId,
          id: id,
        };

        const listVpnGatewayConnectionPeerCidrsResult = vpcService.listVpnGatewayConnectionPeerCidrs(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listVpnGatewayConnectionPeerCidrsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/vpn_gateways/{vpn_gateway_id}/connections/{id}/peer_cidrs',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpn_gateway_id']).toEqual(vpnGatewayId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpnGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVpnGatewayConnectionPeerCidrs(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listVpnGatewayConnectionPeerCidrs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listVpnGatewayConnectionPeerCidrsPromise = vpcService.listVpnGatewayConnectionPeerCidrs();
        expectToBePromise(listVpnGatewayConnectionPeerCidrsPromise);

        listVpnGatewayConnectionPeerCidrsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('removeVpnGatewayConnectionPeerCidr', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation removeVpnGatewayConnectionPeerCidr
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const params = {
          vpnGatewayId: vpnGatewayId,
          id: id,
          cidrPrefix: cidrPrefix,
          prefixLength: prefixLength,
        };

        const removeVpnGatewayConnectionPeerCidrResult = vpcService.removeVpnGatewayConnectionPeerCidr(
          params
        );

        // all methods should return a Promise
        expectToBePromise(removeVpnGatewayConnectionPeerCidrResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/vpn_gateways/{vpn_gateway_id}/connections/{id}/peer_cidrs/{cidr_prefix}/{prefix_length}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpn_gateway_id']).toEqual(vpnGatewayId);
        expect(options.path['id']).toEqual(id);
        expect(options.path['cidr_prefix']).toEqual(cidrPrefix);
        expect(options.path['prefix_length']).toEqual(prefixLength);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpnGatewayId,
          id,
          cidrPrefix,
          prefixLength,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.removeVpnGatewayConnectionPeerCidr(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.removeVpnGatewayConnectionPeerCidr({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const removeVpnGatewayConnectionPeerCidrPromise = vpcService.removeVpnGatewayConnectionPeerCidr();
        expectToBePromise(removeVpnGatewayConnectionPeerCidrPromise);

        removeVpnGatewayConnectionPeerCidrPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('checkVpnGatewayConnectionPeerCidr', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation checkVpnGatewayConnectionPeerCidr
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const params = {
          vpnGatewayId: vpnGatewayId,
          id: id,
          cidrPrefix: cidrPrefix,
          prefixLength: prefixLength,
        };

        const checkVpnGatewayConnectionPeerCidrResult = vpcService.checkVpnGatewayConnectionPeerCidr(
          params
        );

        // all methods should return a Promise
        expectToBePromise(checkVpnGatewayConnectionPeerCidrResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/vpn_gateways/{vpn_gateway_id}/connections/{id}/peer_cidrs/{cidr_prefix}/{prefix_length}',
          'GET'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpn_gateway_id']).toEqual(vpnGatewayId);
        expect(options.path['id']).toEqual(id);
        expect(options.path['cidr_prefix']).toEqual(cidrPrefix);
        expect(options.path['prefix_length']).toEqual(prefixLength);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpnGatewayId,
          id,
          cidrPrefix,
          prefixLength,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.checkVpnGatewayConnectionPeerCidr(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.checkVpnGatewayConnectionPeerCidr({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const checkVpnGatewayConnectionPeerCidrPromise = vpcService.checkVpnGatewayConnectionPeerCidr();
        expectToBePromise(checkVpnGatewayConnectionPeerCidrPromise);

        checkVpnGatewayConnectionPeerCidrPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addVpnGatewayConnectionPeerCidr', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addVpnGatewayConnectionPeerCidr
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const params = {
          vpnGatewayId: vpnGatewayId,
          id: id,
          cidrPrefix: cidrPrefix,
          prefixLength: prefixLength,
        };

        const addVpnGatewayConnectionPeerCidrResult = vpcService.addVpnGatewayConnectionPeerCidr(
          params
        );

        // all methods should return a Promise
        expectToBePromise(addVpnGatewayConnectionPeerCidrResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/vpn_gateways/{vpn_gateway_id}/connections/{id}/peer_cidrs/{cidr_prefix}/{prefix_length}',
          'PUT'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['vpn_gateway_id']).toEqual(vpnGatewayId);
        expect(options.path['id']).toEqual(id);
        expect(options.path['cidr_prefix']).toEqual(cidrPrefix);
        expect(options.path['prefix_length']).toEqual(prefixLength);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          vpnGatewayId,
          id,
          cidrPrefix,
          prefixLength,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.addVpnGatewayConnectionPeerCidr(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.addVpnGatewayConnectionPeerCidr({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const addVpnGatewayConnectionPeerCidrPromise = vpcService.addVpnGatewayConnectionPeerCidr();
        expectToBePromise(addVpnGatewayConnectionPeerCidrPromise);

        addVpnGatewayConnectionPeerCidrPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listLoadBalancerProfiles', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listLoadBalancerProfiles
        const start = 'testString';
        const limit = 1;
        const params = {
          start: start,
          limit: limit,
        };

        const listLoadBalancerProfilesResult = vpcService.listLoadBalancerProfiles(params);

        // all methods should return a Promise
        expectToBePromise(listLoadBalancerProfilesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/load_balancer/profiles', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listLoadBalancerProfiles(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listLoadBalancerProfiles({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getLoadBalancerProfile', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getLoadBalancerProfile
        const name = 'testString';
        const params = {
          name: name,
        };

        const getLoadBalancerProfileResult = vpcService.getLoadBalancerProfile(params);

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/load_balancer/profiles/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['name']).toEqual(name);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getLoadBalancerProfile(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getLoadBalancerProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getLoadBalancerProfilePromise = vpcService.getLoadBalancerProfile();
        expectToBePromise(getLoadBalancerProfilePromise);

        getLoadBalancerProfilePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listLoadBalancers', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listLoadBalancers
        const params = {};

        const listLoadBalancersResult = vpcService.listLoadBalancers(params);

        // all methods should return a Promise
        expectToBePromise(listLoadBalancersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/load_balancers', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listLoadBalancers(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listLoadBalancers({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createLoadBalancer', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SubnetIdentityById
      const subnetIdentityModel = {
        id: '7ec86020-1c6e-4889-b3f0-a15f2e50f87e',
      };

      // LoadBalancerPoolIdentityByName
      const loadBalancerPoolIdentityByNameModel = {
        name: 'my-load-balancer-pool',
      };

      // LoadBalancerListenerPrototypeLoadBalancerContext
      const loadBalancerListenerPrototypeLoadBalancerContextModel = {
        accept_proxy_protocol: true,
        connection_limit: 2000,
        default_pool: loadBalancerPoolIdentityByNameModel,
        port: 443,
        protocol: 'http',
      };

      // LoadBalancerLoggingDatapath
      const loadBalancerLoggingDatapathModel = {
        active: true,
      };

      // LoadBalancerLogging
      const loadBalancerLoggingModel = {
        datapath: loadBalancerLoggingDatapathModel,
      };

      // LoadBalancerPoolHealthMonitorPrototype
      const loadBalancerPoolHealthMonitorPrototypeModel = {
        delay: 5,
        max_retries: 2,
        port: 22,
        timeout: 2,
        type: 'http',
        url_path: '/',
      };

      // LoadBalancerPoolMemberTargetPrototypeInstanceIdentityInstanceIdentityById
      const loadBalancerPoolMemberTargetPrototypeModel = {
        id: '1e09281b-f177-46fb-baf1-bc152b2e391a',
      };

      // LoadBalancerPoolMemberPrototype
      const loadBalancerPoolMemberPrototypeModel = {
        port: 80,
        target: loadBalancerPoolMemberTargetPrototypeModel,
        weight: 50,
      };

      // LoadBalancerPoolSessionPersistencePrototype
      const loadBalancerPoolSessionPersistencePrototypeModel = {
        type: 'source_ip',
      };

      // LoadBalancerPoolPrototype
      const loadBalancerPoolPrototypeModel = {
        algorithm: 'least_connections',
        health_monitor: loadBalancerPoolHealthMonitorPrototypeModel,
        members: [loadBalancerPoolMemberPrototypeModel],
        name: 'my-load-balancer-pool',
        protocol: 'http',
        proxy_protocol: 'disabled',
        session_persistence: loadBalancerPoolSessionPersistencePrototypeModel,
      };

      // LoadBalancerProfileIdentityByName
      const loadBalancerProfileIdentityModel = {
        name: 'network-fixed',
      };

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      // SecurityGroupIdentityById
      const securityGroupIdentityModel = {
        id: 'be5df5ca-12a0-494b-907e-aa6ec2bfa271',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createLoadBalancer
        const isPublic = true;
        const subnets = [subnetIdentityModel];
        const listeners = [loadBalancerListenerPrototypeLoadBalancerContextModel];
        const logging = loadBalancerLoggingModel;
        const name = 'my-load-balancer';
        const pools = [loadBalancerPoolPrototypeModel];
        const profile = loadBalancerProfileIdentityModel;
        const resourceGroup = resourceGroupIdentityModel;
        const securityGroups = [securityGroupIdentityModel];
        const params = {
          isPublic: isPublic,
          subnets: subnets,
          listeners: listeners,
          logging: logging,
          name: name,
          pools: pools,
          profile: profile,
          resourceGroup: resourceGroup,
          securityGroups: securityGroups,
        };

        const createLoadBalancerResult = vpcService.createLoadBalancer(params);

        // all methods should return a Promise
        expectToBePromise(createLoadBalancerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/load_balancers', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['is_public']).toEqual(isPublic);
        expect(options.body['subnets']).toEqual(subnets);
        expect(options.body['listeners']).toEqual(listeners);
        expect(options.body['logging']).toEqual(logging);
        expect(options.body['name']).toEqual(name);
        expect(options.body['pools']).toEqual(pools);
        expect(options.body['profile']).toEqual(profile);
        expect(options.body['resource_group']).toEqual(resourceGroup);
        expect(options.body['security_groups']).toEqual(securityGroups);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const isPublic = true;
        const subnets = [subnetIdentityModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          isPublic,
          subnets,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createLoadBalancer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createLoadBalancerPromise = vpcService.createLoadBalancer();
        expectToBePromise(createLoadBalancerPromise);

        createLoadBalancerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteLoadBalancer', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteLoadBalancer
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteLoadBalancerResult = vpcService.deleteLoadBalancer(params);

        // all methods should return a Promise
        expectToBePromise(deleteLoadBalancerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/load_balancers/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteLoadBalancer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteLoadBalancerPromise = vpcService.deleteLoadBalancer();
        expectToBePromise(deleteLoadBalancerPromise);

        deleteLoadBalancerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getLoadBalancer', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getLoadBalancer
        const id = 'testString';
        const params = {
          id: id,
        };

        const getLoadBalancerResult = vpcService.getLoadBalancer(params);

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/load_balancers/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getLoadBalancer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getLoadBalancerPromise = vpcService.getLoadBalancer();
        expectToBePromise(getLoadBalancerPromise);

        getLoadBalancerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateLoadBalancer', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // LoadBalancerLoggingDatapath
      const loadBalancerLoggingDatapathModel = {
        active: true,
      };

      // LoadBalancerLogging
      const loadBalancerLoggingModel = {
        datapath: loadBalancerLoggingDatapathModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateLoadBalancer
        const id = 'testString';
        const logging = loadBalancerLoggingModel;
        const name = 'my-load-balancer';
        const params = {
          id: id,
          logging: logging,
          name: name,
        };

        const updateLoadBalancerResult = vpcService.updateLoadBalancer(params);

        // all methods should return a Promise
        expectToBePromise(updateLoadBalancerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/load_balancers/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['logging']).toEqual(logging);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateLoadBalancer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateLoadBalancerPromise = vpcService.updateLoadBalancer();
        expectToBePromise(updateLoadBalancerPromise);

        updateLoadBalancerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getLoadBalancerStatistics', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getLoadBalancerStatistics
        const id = 'testString';
        const params = {
          id: id,
        };

        const getLoadBalancerStatisticsResult = vpcService.getLoadBalancerStatistics(params);

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerStatisticsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/load_balancers/{id}/statistics', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getLoadBalancerStatistics(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getLoadBalancerStatistics({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getLoadBalancerStatisticsPromise = vpcService.getLoadBalancerStatistics();
        expectToBePromise(getLoadBalancerStatisticsPromise);

        getLoadBalancerStatisticsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listLoadBalancerListeners', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listLoadBalancerListeners
        const loadBalancerId = 'testString';
        const params = {
          loadBalancerId: loadBalancerId,
        };

        const listLoadBalancerListenersResult = vpcService.listLoadBalancerListeners(params);

        // all methods should return a Promise
        expectToBePromise(listLoadBalancerListenersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/load_balancers/{load_balancer_id}/listeners', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listLoadBalancerListeners(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listLoadBalancerListeners({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listLoadBalancerListenersPromise = vpcService.listLoadBalancerListeners();
        expectToBePromise(listLoadBalancerListenersPromise);

        listLoadBalancerListenersPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createLoadBalancerListener', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CertificateInstanceIdentityByCRN
      const certificateInstanceIdentityModel = {
        crn:
          'crn:v1:bluemix:public:cloudcerts:us-south:a/123456:b8866ea4-b8df-467e-801a-da1db7e020bf:certificate:78ff9c4c97d013fb2a95b21dddde7758',
      };

      // LoadBalancerPoolIdentityById
      const loadBalancerPoolIdentityModel = {
        id: '70294e14-4e61-11e8-bcf4-0242ac110004',
      };

      // LoadBalancerListenerPolicyRulePrototype
      const loadBalancerListenerPolicyRulePrototypeModel = {
        condition: 'contains',
        field: 'MY-APP-HEADER',
        type: 'header',
        value: 'testString',
      };

      // LoadBalancerListenerPolicyTargetPrototypeLoadBalancerPoolIdentityLoadBalancerPoolIdentityById
      const loadBalancerListenerPolicyTargetPrototypeModel = {
        id: '70294e14-4e61-11e8-bcf4-0242ac110004',
      };

      // LoadBalancerListenerPolicyPrototype
      const loadBalancerListenerPolicyPrototypeModel = {
        action: 'forward',
        name: 'my-policy',
        priority: 5,
        rules: [loadBalancerListenerPolicyRulePrototypeModel],
        target: loadBalancerListenerPolicyTargetPrototypeModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createLoadBalancerListener
        const loadBalancerId = 'testString';
        const port = 443;
        const protocol = 'http';
        const acceptProxyProtocol = true;
        const certificateInstance = certificateInstanceIdentityModel;
        const connectionLimit = 2000;
        const defaultPool = loadBalancerPoolIdentityModel;
        const policies = [loadBalancerListenerPolicyPrototypeModel];
        const params = {
          loadBalancerId: loadBalancerId,
          port: port,
          protocol: protocol,
          acceptProxyProtocol: acceptProxyProtocol,
          certificateInstance: certificateInstance,
          connectionLimit: connectionLimit,
          defaultPool: defaultPool,
          policies: policies,
        };

        const createLoadBalancerListenerResult = vpcService.createLoadBalancerListener(params);

        // all methods should return a Promise
        expectToBePromise(createLoadBalancerListenerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/load_balancers/{load_balancer_id}/listeners', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['port']).toEqual(port);
        expect(options.body['protocol']).toEqual(protocol);
        expect(options.body['accept_proxy_protocol']).toEqual(acceptProxyProtocol);
        expect(options.body['certificate_instance']).toEqual(certificateInstance);
        expect(options.body['connection_limit']).toEqual(connectionLimit);
        expect(options.body['default_pool']).toEqual(defaultPool);
        expect(options.body['policies']).toEqual(policies);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const port = 443;
        const protocol = 'http';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          port,
          protocol,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createLoadBalancerListener(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createLoadBalancerListener({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createLoadBalancerListenerPromise = vpcService.createLoadBalancerListener();
        expectToBePromise(createLoadBalancerListenerPromise);

        createLoadBalancerListenerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteLoadBalancerListener', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteLoadBalancerListener
        const loadBalancerId = 'testString';
        const id = 'testString';
        const params = {
          loadBalancerId: loadBalancerId,
          id: id,
        };

        const deleteLoadBalancerListenerResult = vpcService.deleteLoadBalancerListener(params);

        // all methods should return a Promise
        expectToBePromise(deleteLoadBalancerListenerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/load_balancers/{load_balancer_id}/listeners/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteLoadBalancerListener(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteLoadBalancerListener({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteLoadBalancerListenerPromise = vpcService.deleteLoadBalancerListener();
        expectToBePromise(deleteLoadBalancerListenerPromise);

        deleteLoadBalancerListenerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getLoadBalancerListener', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getLoadBalancerListener
        const loadBalancerId = 'testString';
        const id = 'testString';
        const params = {
          loadBalancerId: loadBalancerId,
          id: id,
        };

        const getLoadBalancerListenerResult = vpcService.getLoadBalancerListener(params);

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerListenerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/load_balancers/{load_balancer_id}/listeners/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getLoadBalancerListener(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getLoadBalancerListener({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getLoadBalancerListenerPromise = vpcService.getLoadBalancerListener();
        expectToBePromise(getLoadBalancerListenerPromise);

        getLoadBalancerListenerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateLoadBalancerListener', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CertificateInstanceIdentityByCRN
      const certificateInstanceIdentityModel = {
        crn:
          'crn:v1:bluemix:public:cloudcerts:us-south:a/123456:b8866ea4-b8df-467e-801a-da1db7e020bf:certificate:78ff9c4c97d013fb2a95b21dddde7758',
      };

      // LoadBalancerPoolIdentityById
      const loadBalancerPoolIdentityModel = {
        id: '70294e14-4e61-11e8-bcf4-0242ac110004',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateLoadBalancerListener
        const loadBalancerId = 'testString';
        const id = 'testString';
        const acceptProxyProtocol = true;
        const certificateInstance = certificateInstanceIdentityModel;
        const connectionLimit = 2000;
        const defaultPool = loadBalancerPoolIdentityModel;
        const port = 443;
        const protocol = 'http';
        const params = {
          loadBalancerId: loadBalancerId,
          id: id,
          acceptProxyProtocol: acceptProxyProtocol,
          certificateInstance: certificateInstance,
          connectionLimit: connectionLimit,
          defaultPool: defaultPool,
          port: port,
          protocol: protocol,
        };

        const updateLoadBalancerListenerResult = vpcService.updateLoadBalancerListener(params);

        // all methods should return a Promise
        expectToBePromise(updateLoadBalancerListenerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/load_balancers/{load_balancer_id}/listeners/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['accept_proxy_protocol']).toEqual(acceptProxyProtocol);
        expect(options.body['certificate_instance']).toEqual(certificateInstance);
        expect(options.body['connection_limit']).toEqual(connectionLimit);
        expect(options.body['default_pool']).toEqual(defaultPool);
        expect(options.body['port']).toEqual(port);
        expect(options.body['protocol']).toEqual(protocol);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateLoadBalancerListener(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateLoadBalancerListener({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateLoadBalancerListenerPromise = vpcService.updateLoadBalancerListener();
        expectToBePromise(updateLoadBalancerListenerPromise);

        updateLoadBalancerListenerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listLoadBalancerListenerPolicies', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listLoadBalancerListenerPolicies
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const params = {
          loadBalancerId: loadBalancerId,
          listenerId: listenerId,
        };

        const listLoadBalancerListenerPoliciesResult = vpcService.listLoadBalancerListenerPolicies(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listLoadBalancerListenerPoliciesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['listener_id']).toEqual(listenerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          listenerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listLoadBalancerListenerPolicies(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listLoadBalancerListenerPolicies({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listLoadBalancerListenerPoliciesPromise = vpcService.listLoadBalancerListenerPolicies();
        expectToBePromise(listLoadBalancerListenerPoliciesPromise);

        listLoadBalancerListenerPoliciesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createLoadBalancerListenerPolicy', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // LoadBalancerListenerPolicyRulePrototype
      const loadBalancerListenerPolicyRulePrototypeModel = {
        condition: 'contains',
        field: 'MY-APP-HEADER',
        type: 'header',
        value: 'testString',
      };

      // LoadBalancerListenerPolicyTargetPrototypeLoadBalancerPoolIdentityLoadBalancerPoolIdentityById
      const loadBalancerListenerPolicyTargetPrototypeModel = {
        id: '70294e14-4e61-11e8-bcf4-0242ac110004',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createLoadBalancerListenerPolicy
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const action = 'forward';
        const priority = 5;
        const name = 'my-policy';
        const rules = [loadBalancerListenerPolicyRulePrototypeModel];
        const target = loadBalancerListenerPolicyTargetPrototypeModel;
        const params = {
          loadBalancerId: loadBalancerId,
          listenerId: listenerId,
          action: action,
          priority: priority,
          name: name,
          rules: rules,
          target: target,
        };

        const createLoadBalancerListenerPolicyResult = vpcService.createLoadBalancerListenerPolicy(
          params
        );

        // all methods should return a Promise
        expectToBePromise(createLoadBalancerListenerPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['action']).toEqual(action);
        expect(options.body['priority']).toEqual(priority);
        expect(options.body['name']).toEqual(name);
        expect(options.body['rules']).toEqual(rules);
        expect(options.body['target']).toEqual(target);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['listener_id']).toEqual(listenerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const action = 'forward';
        const priority = 5;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          listenerId,
          action,
          priority,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createLoadBalancerListenerPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createLoadBalancerListenerPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createLoadBalancerListenerPolicyPromise = vpcService.createLoadBalancerListenerPolicy();
        expectToBePromise(createLoadBalancerListenerPolicyPromise);

        createLoadBalancerListenerPolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteLoadBalancerListenerPolicy', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteLoadBalancerListenerPolicy
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const id = 'testString';
        const params = {
          loadBalancerId: loadBalancerId,
          listenerId: listenerId,
          id: id,
        };

        const deleteLoadBalancerListenerPolicyResult = vpcService.deleteLoadBalancerListenerPolicy(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteLoadBalancerListenerPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['listener_id']).toEqual(listenerId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          listenerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteLoadBalancerListenerPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteLoadBalancerListenerPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteLoadBalancerListenerPolicyPromise = vpcService.deleteLoadBalancerListenerPolicy();
        expectToBePromise(deleteLoadBalancerListenerPolicyPromise);

        deleteLoadBalancerListenerPolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getLoadBalancerListenerPolicy', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getLoadBalancerListenerPolicy
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const id = 'testString';
        const params = {
          loadBalancerId: loadBalancerId,
          listenerId: listenerId,
          id: id,
        };

        const getLoadBalancerListenerPolicyResult = vpcService.getLoadBalancerListenerPolicy(
          params
        );

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerListenerPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['listener_id']).toEqual(listenerId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          listenerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getLoadBalancerListenerPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getLoadBalancerListenerPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getLoadBalancerListenerPolicyPromise = vpcService.getLoadBalancerListenerPolicy();
        expectToBePromise(getLoadBalancerListenerPolicyPromise);

        getLoadBalancerListenerPolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateLoadBalancerListenerPolicy', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // LoadBalancerListenerPolicyTargetPatchLoadBalancerPoolIdentityLoadBalancerPoolIdentityById
      const loadBalancerListenerPolicyTargetPatchModel = {
        id: '70294e14-4e61-11e8-bcf4-0242ac110004',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateLoadBalancerListenerPolicy
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const id = 'testString';
        const name = 'my-policy';
        const priority = 5;
        const target = loadBalancerListenerPolicyTargetPatchModel;
        const params = {
          loadBalancerId: loadBalancerId,
          listenerId: listenerId,
          id: id,
          name: name,
          priority: priority,
          target: target,
        };

        const updateLoadBalancerListenerPolicyResult = vpcService.updateLoadBalancerListenerPolicy(
          params
        );

        // all methods should return a Promise
        expectToBePromise(updateLoadBalancerListenerPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['priority']).toEqual(priority);
        expect(options.body['target']).toEqual(target);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['listener_id']).toEqual(listenerId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          listenerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateLoadBalancerListenerPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateLoadBalancerListenerPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateLoadBalancerListenerPolicyPromise = vpcService.updateLoadBalancerListenerPolicy();
        expectToBePromise(updateLoadBalancerListenerPolicyPromise);

        updateLoadBalancerListenerPolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listLoadBalancerListenerPolicyRules', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listLoadBalancerListenerPolicyRules
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const params = {
          loadBalancerId: loadBalancerId,
          listenerId: listenerId,
          policyId: policyId,
        };

        const listLoadBalancerListenerPolicyRulesResult = vpcService.listLoadBalancerListenerPolicyRules(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listLoadBalancerListenerPolicyRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{policy_id}/rules',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['listener_id']).toEqual(listenerId);
        expect(options.path['policy_id']).toEqual(policyId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          listenerId,
          policyId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listLoadBalancerListenerPolicyRules(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listLoadBalancerListenerPolicyRules({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listLoadBalancerListenerPolicyRulesPromise = vpcService.listLoadBalancerListenerPolicyRules();
        expectToBePromise(listLoadBalancerListenerPolicyRulesPromise);

        listLoadBalancerListenerPolicyRulesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createLoadBalancerListenerPolicyRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createLoadBalancerListenerPolicyRule
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const condition = 'contains';
        const type = 'header';
        const value = 'testString';
        const field = 'MY-APP-HEADER';
        const params = {
          loadBalancerId: loadBalancerId,
          listenerId: listenerId,
          policyId: policyId,
          condition: condition,
          type: type,
          value: value,
          field: field,
        };

        const createLoadBalancerListenerPolicyRuleResult = vpcService.createLoadBalancerListenerPolicyRule(
          params
        );

        // all methods should return a Promise
        expectToBePromise(createLoadBalancerListenerPolicyRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{policy_id}/rules',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['condition']).toEqual(condition);
        expect(options.body['type']).toEqual(type);
        expect(options.body['value']).toEqual(value);
        expect(options.body['field']).toEqual(field);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['listener_id']).toEqual(listenerId);
        expect(options.path['policy_id']).toEqual(policyId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const condition = 'contains';
        const type = 'header';
        const value = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          listenerId,
          policyId,
          condition,
          type,
          value,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createLoadBalancerListenerPolicyRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createLoadBalancerListenerPolicyRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createLoadBalancerListenerPolicyRulePromise = vpcService.createLoadBalancerListenerPolicyRule();
        expectToBePromise(createLoadBalancerListenerPolicyRulePromise);

        createLoadBalancerListenerPolicyRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteLoadBalancerListenerPolicyRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteLoadBalancerListenerPolicyRule
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const id = 'testString';
        const params = {
          loadBalancerId: loadBalancerId,
          listenerId: listenerId,
          policyId: policyId,
          id: id,
        };

        const deleteLoadBalancerListenerPolicyRuleResult = vpcService.deleteLoadBalancerListenerPolicyRule(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteLoadBalancerListenerPolicyRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{policy_id}/rules/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['listener_id']).toEqual(listenerId);
        expect(options.path['policy_id']).toEqual(policyId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          listenerId,
          policyId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteLoadBalancerListenerPolicyRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteLoadBalancerListenerPolicyRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteLoadBalancerListenerPolicyRulePromise = vpcService.deleteLoadBalancerListenerPolicyRule();
        expectToBePromise(deleteLoadBalancerListenerPolicyRulePromise);

        deleteLoadBalancerListenerPolicyRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getLoadBalancerListenerPolicyRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getLoadBalancerListenerPolicyRule
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const id = 'testString';
        const params = {
          loadBalancerId: loadBalancerId,
          listenerId: listenerId,
          policyId: policyId,
          id: id,
        };

        const getLoadBalancerListenerPolicyRuleResult = vpcService.getLoadBalancerListenerPolicyRule(
          params
        );

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerListenerPolicyRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{policy_id}/rules/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['listener_id']).toEqual(listenerId);
        expect(options.path['policy_id']).toEqual(policyId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          listenerId,
          policyId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getLoadBalancerListenerPolicyRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getLoadBalancerListenerPolicyRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getLoadBalancerListenerPolicyRulePromise = vpcService.getLoadBalancerListenerPolicyRule();
        expectToBePromise(getLoadBalancerListenerPolicyRulePromise);

        getLoadBalancerListenerPolicyRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateLoadBalancerListenerPolicyRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateLoadBalancerListenerPolicyRule
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const id = 'testString';
        const condition = 'contains';
        const field = 'MY-APP-HEADER';
        const type = 'header';
        const value = 'testString';
        const params = {
          loadBalancerId: loadBalancerId,
          listenerId: listenerId,
          policyId: policyId,
          id: id,
          condition: condition,
          field: field,
          type: type,
          value: value,
        };

        const updateLoadBalancerListenerPolicyRuleResult = vpcService.updateLoadBalancerListenerPolicyRule(
          params
        );

        // all methods should return a Promise
        expectToBePromise(updateLoadBalancerListenerPolicyRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{policy_id}/rules/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['condition']).toEqual(condition);
        expect(options.body['field']).toEqual(field);
        expect(options.body['type']).toEqual(type);
        expect(options.body['value']).toEqual(value);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['listener_id']).toEqual(listenerId);
        expect(options.path['policy_id']).toEqual(policyId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          listenerId,
          policyId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateLoadBalancerListenerPolicyRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateLoadBalancerListenerPolicyRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateLoadBalancerListenerPolicyRulePromise = vpcService.updateLoadBalancerListenerPolicyRule();
        expectToBePromise(updateLoadBalancerListenerPolicyRulePromise);

        updateLoadBalancerListenerPolicyRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listLoadBalancerPools', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listLoadBalancerPools
        const loadBalancerId = 'testString';
        const params = {
          loadBalancerId: loadBalancerId,
        };

        const listLoadBalancerPoolsResult = vpcService.listLoadBalancerPools(params);

        // all methods should return a Promise
        expectToBePromise(listLoadBalancerPoolsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/load_balancers/{load_balancer_id}/pools', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listLoadBalancerPools(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listLoadBalancerPools({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listLoadBalancerPoolsPromise = vpcService.listLoadBalancerPools();
        expectToBePromise(listLoadBalancerPoolsPromise);

        listLoadBalancerPoolsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createLoadBalancerPool', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // LoadBalancerPoolHealthMonitorPrototype
      const loadBalancerPoolHealthMonitorPrototypeModel = {
        delay: 5,
        max_retries: 2,
        port: 22,
        timeout: 2,
        type: 'http',
        url_path: '/',
      };

      // LoadBalancerPoolMemberTargetPrototypeInstanceIdentityInstanceIdentityById
      const loadBalancerPoolMemberTargetPrototypeModel = {
        id: '1e09281b-f177-46fb-baf1-bc152b2e391a',
      };

      // LoadBalancerPoolMemberPrototype
      const loadBalancerPoolMemberPrototypeModel = {
        port: 80,
        target: loadBalancerPoolMemberTargetPrototypeModel,
        weight: 50,
      };

      // LoadBalancerPoolSessionPersistencePrototype
      const loadBalancerPoolSessionPersistencePrototypeModel = {
        type: 'source_ip',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createLoadBalancerPool
        const loadBalancerId = 'testString';
        const algorithm = 'least_connections';
        const healthMonitor = loadBalancerPoolHealthMonitorPrototypeModel;
        const protocol = 'http';
        const members = [loadBalancerPoolMemberPrototypeModel];
        const name = 'my-load-balancer-pool';
        const proxyProtocol = 'disabled';
        const sessionPersistence = loadBalancerPoolSessionPersistencePrototypeModel;
        const params = {
          loadBalancerId: loadBalancerId,
          algorithm: algorithm,
          healthMonitor: healthMonitor,
          protocol: protocol,
          members: members,
          name: name,
          proxyProtocol: proxyProtocol,
          sessionPersistence: sessionPersistence,
        };

        const createLoadBalancerPoolResult = vpcService.createLoadBalancerPool(params);

        // all methods should return a Promise
        expectToBePromise(createLoadBalancerPoolResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/load_balancers/{load_balancer_id}/pools', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['algorithm']).toEqual(algorithm);
        expect(options.body['health_monitor']).toEqual(healthMonitor);
        expect(options.body['protocol']).toEqual(protocol);
        expect(options.body['members']).toEqual(members);
        expect(options.body['name']).toEqual(name);
        expect(options.body['proxy_protocol']).toEqual(proxyProtocol);
        expect(options.body['session_persistence']).toEqual(sessionPersistence);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const algorithm = 'least_connections';
        const healthMonitor = loadBalancerPoolHealthMonitorPrototypeModel;
        const protocol = 'http';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          algorithm,
          healthMonitor,
          protocol,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createLoadBalancerPool(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createLoadBalancerPool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createLoadBalancerPoolPromise = vpcService.createLoadBalancerPool();
        expectToBePromise(createLoadBalancerPoolPromise);

        createLoadBalancerPoolPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteLoadBalancerPool', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteLoadBalancerPool
        const loadBalancerId = 'testString';
        const id = 'testString';
        const params = {
          loadBalancerId: loadBalancerId,
          id: id,
        };

        const deleteLoadBalancerPoolResult = vpcService.deleteLoadBalancerPool(params);

        // all methods should return a Promise
        expectToBePromise(deleteLoadBalancerPoolResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/load_balancers/{load_balancer_id}/pools/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteLoadBalancerPool(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteLoadBalancerPool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteLoadBalancerPoolPromise = vpcService.deleteLoadBalancerPool();
        expectToBePromise(deleteLoadBalancerPoolPromise);

        deleteLoadBalancerPoolPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getLoadBalancerPool', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getLoadBalancerPool
        const loadBalancerId = 'testString';
        const id = 'testString';
        const params = {
          loadBalancerId: loadBalancerId,
          id: id,
        };

        const getLoadBalancerPoolResult = vpcService.getLoadBalancerPool(params);

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerPoolResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/load_balancers/{load_balancer_id}/pools/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getLoadBalancerPool(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getLoadBalancerPool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getLoadBalancerPoolPromise = vpcService.getLoadBalancerPool();
        expectToBePromise(getLoadBalancerPoolPromise);

        getLoadBalancerPoolPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateLoadBalancerPool', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // LoadBalancerPoolHealthMonitorPatch
      const loadBalancerPoolHealthMonitorPatchModel = {
        delay: 5,
        max_retries: 2,
        port: 22,
        timeout: 2,
        type: 'http',
        url_path: '/',
      };

      // LoadBalancerPoolSessionPersistencePatch
      const loadBalancerPoolSessionPersistencePatchModel = {
        type: 'source_ip',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateLoadBalancerPool
        const loadBalancerId = 'testString';
        const id = 'testString';
        const algorithm = 'least_connections';
        const healthMonitor = loadBalancerPoolHealthMonitorPatchModel;
        const name = 'my-load-balancer-pool';
        const protocol = 'http';
        const proxyProtocol = 'disabled';
        const sessionPersistence = loadBalancerPoolSessionPersistencePatchModel;
        const params = {
          loadBalancerId: loadBalancerId,
          id: id,
          algorithm: algorithm,
          healthMonitor: healthMonitor,
          name: name,
          protocol: protocol,
          proxyProtocol: proxyProtocol,
          sessionPersistence: sessionPersistence,
        };

        const updateLoadBalancerPoolResult = vpcService.updateLoadBalancerPool(params);

        // all methods should return a Promise
        expectToBePromise(updateLoadBalancerPoolResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/load_balancers/{load_balancer_id}/pools/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['algorithm']).toEqual(algorithm);
        expect(options.body['health_monitor']).toEqual(healthMonitor);
        expect(options.body['name']).toEqual(name);
        expect(options.body['protocol']).toEqual(protocol);
        expect(options.body['proxy_protocol']).toEqual(proxyProtocol);
        expect(options.body['session_persistence']).toEqual(sessionPersistence);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateLoadBalancerPool(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateLoadBalancerPool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateLoadBalancerPoolPromise = vpcService.updateLoadBalancerPool();
        expectToBePromise(updateLoadBalancerPoolPromise);

        updateLoadBalancerPoolPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listLoadBalancerPoolMembers', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listLoadBalancerPoolMembers
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const params = {
          loadBalancerId: loadBalancerId,
          poolId: poolId,
        };

        const listLoadBalancerPoolMembersResult = vpcService.listLoadBalancerPoolMembers(params);

        // all methods should return a Promise
        expectToBePromise(listLoadBalancerPoolMembersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/load_balancers/{load_balancer_id}/pools/{pool_id}/members',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['pool_id']).toEqual(poolId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          poolId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listLoadBalancerPoolMembers(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listLoadBalancerPoolMembers({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listLoadBalancerPoolMembersPromise = vpcService.listLoadBalancerPoolMembers();
        expectToBePromise(listLoadBalancerPoolMembersPromise);

        listLoadBalancerPoolMembersPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createLoadBalancerPoolMember', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // LoadBalancerPoolMemberTargetPrototypeInstanceIdentityInstanceIdentityById
      const loadBalancerPoolMemberTargetPrototypeModel = {
        id: '1e09281b-f177-46fb-baf1-bc152b2e391a',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createLoadBalancerPoolMember
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const port = 80;
        const target = loadBalancerPoolMemberTargetPrototypeModel;
        const weight = 50;
        const params = {
          loadBalancerId: loadBalancerId,
          poolId: poolId,
          port: port,
          target: target,
          weight: weight,
        };

        const createLoadBalancerPoolMemberResult = vpcService.createLoadBalancerPoolMember(params);

        // all methods should return a Promise
        expectToBePromise(createLoadBalancerPoolMemberResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/load_balancers/{load_balancer_id}/pools/{pool_id}/members',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['port']).toEqual(port);
        expect(options.body['target']).toEqual(target);
        expect(options.body['weight']).toEqual(weight);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['pool_id']).toEqual(poolId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const port = 80;
        const target = loadBalancerPoolMemberTargetPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          poolId,
          port,
          target,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createLoadBalancerPoolMember(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createLoadBalancerPoolMember({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createLoadBalancerPoolMemberPromise = vpcService.createLoadBalancerPoolMember();
        expectToBePromise(createLoadBalancerPoolMemberPromise);

        createLoadBalancerPoolMemberPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('replaceLoadBalancerPoolMembers', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // LoadBalancerPoolMemberTargetPrototypeInstanceIdentityInstanceIdentityById
      const loadBalancerPoolMemberTargetPrototypeModel = {
        id: '1e09281b-f177-46fb-baf1-bc152b2e391a',
      };

      // LoadBalancerPoolMemberPrototype
      const loadBalancerPoolMemberPrototypeModel = {
        port: 80,
        target: loadBalancerPoolMemberTargetPrototypeModel,
        weight: 50,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation replaceLoadBalancerPoolMembers
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const members = [loadBalancerPoolMemberPrototypeModel];
        const params = {
          loadBalancerId: loadBalancerId,
          poolId: poolId,
          members: members,
        };

        const replaceLoadBalancerPoolMembersResult = vpcService.replaceLoadBalancerPoolMembers(
          params
        );

        // all methods should return a Promise
        expectToBePromise(replaceLoadBalancerPoolMembersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/load_balancers/{load_balancer_id}/pools/{pool_id}/members',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['members']).toEqual(members);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['pool_id']).toEqual(poolId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const members = [loadBalancerPoolMemberPrototypeModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          poolId,
          members,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.replaceLoadBalancerPoolMembers(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.replaceLoadBalancerPoolMembers({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const replaceLoadBalancerPoolMembersPromise = vpcService.replaceLoadBalancerPoolMembers();
        expectToBePromise(replaceLoadBalancerPoolMembersPromise);

        replaceLoadBalancerPoolMembersPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteLoadBalancerPoolMember', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteLoadBalancerPoolMember
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const id = 'testString';
        const params = {
          loadBalancerId: loadBalancerId,
          poolId: poolId,
          id: id,
        };

        const deleteLoadBalancerPoolMemberResult = vpcService.deleteLoadBalancerPoolMember(params);

        // all methods should return a Promise
        expectToBePromise(deleteLoadBalancerPoolMemberResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/load_balancers/{load_balancer_id}/pools/{pool_id}/members/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['pool_id']).toEqual(poolId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          poolId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteLoadBalancerPoolMember(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteLoadBalancerPoolMember({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteLoadBalancerPoolMemberPromise = vpcService.deleteLoadBalancerPoolMember();
        expectToBePromise(deleteLoadBalancerPoolMemberPromise);

        deleteLoadBalancerPoolMemberPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getLoadBalancerPoolMember', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getLoadBalancerPoolMember
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const id = 'testString';
        const params = {
          loadBalancerId: loadBalancerId,
          poolId: poolId,
          id: id,
        };

        const getLoadBalancerPoolMemberResult = vpcService.getLoadBalancerPoolMember(params);

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerPoolMemberResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/load_balancers/{load_balancer_id}/pools/{pool_id}/members/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['pool_id']).toEqual(poolId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          poolId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getLoadBalancerPoolMember(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getLoadBalancerPoolMember({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getLoadBalancerPoolMemberPromise = vpcService.getLoadBalancerPoolMember();
        expectToBePromise(getLoadBalancerPoolMemberPromise);

        getLoadBalancerPoolMemberPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateLoadBalancerPoolMember', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // LoadBalancerPoolMemberTargetPrototypeInstanceIdentityInstanceIdentityById
      const loadBalancerPoolMemberTargetPrototypeModel = {
        id: '1e09281b-f177-46fb-baf1-bc152b2e391a',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateLoadBalancerPoolMember
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const id = 'testString';
        const port = 80;
        const target = loadBalancerPoolMemberTargetPrototypeModel;
        const weight = 50;
        const params = {
          loadBalancerId: loadBalancerId,
          poolId: poolId,
          id: id,
          port: port,
          target: target,
          weight: weight,
        };

        const updateLoadBalancerPoolMemberResult = vpcService.updateLoadBalancerPoolMember(params);

        // all methods should return a Promise
        expectToBePromise(updateLoadBalancerPoolMemberResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/load_balancers/{load_balancer_id}/pools/{pool_id}/members/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['port']).toEqual(port);
        expect(options.body['target']).toEqual(target);
        expect(options.body['weight']).toEqual(weight);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['load_balancer_id']).toEqual(loadBalancerId);
        expect(options.path['pool_id']).toEqual(poolId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerId,
          poolId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateLoadBalancerPoolMember(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateLoadBalancerPoolMember({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateLoadBalancerPoolMemberPromise = vpcService.updateLoadBalancerPoolMember();
        expectToBePromise(updateLoadBalancerPoolMemberPromise);

        updateLoadBalancerPoolMemberPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listEndpointGateways', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listEndpointGateways
        const name = 'testString';
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const params = {
          name: name,
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
        };

        const listEndpointGatewaysResult = vpcService.listEndpointGateways(params);

        // all methods should return a Promise
        expectToBePromise(listEndpointGatewaysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/endpoint_gateways', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['name']).toEqual(name);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['resource_group.id']).toEqual(resourceGroupId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listEndpointGateways(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listEndpointGateways({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createEndpointGateway', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // EndpointGatewayTargetPrototypeProviderCloudServiceIdentityProviderCloudServiceIdentityByCRN
      const endpointGatewayTargetPrototypeModel = {
        resource_type: 'provider_infrastructure_service',
        crn:
          'crn:v1:bluemix:public:cloudant:us-south:a/123456:3527280b-9327-4411-8020-591092e60353::',
      };

      // VPCIdentityById
      const vpcIdentityModel = {
        id: 'f025b503-ae66-46de-a011-3bd08fd5f7bf',
      };

      // EndpointGatewayReservedIPReservedIPIdentityReservedIPIdentityById
      const endpointGatewayReservedIpModel = {
        id: '6d353a0f-aeb1-4ae1-832e-1110d10981bb',
      };

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createEndpointGateway
        const target = endpointGatewayTargetPrototypeModel;
        const vpc = vpcIdentityModel;
        const ips = [endpointGatewayReservedIpModel];
        const name = 'testString';
        const resourceGroup = resourceGroupIdentityModel;
        const params = {
          target: target,
          vpc: vpc,
          ips: ips,
          name: name,
          resourceGroup: resourceGroup,
        };

        const createEndpointGatewayResult = vpcService.createEndpointGateway(params);

        // all methods should return a Promise
        expectToBePromise(createEndpointGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/endpoint_gateways', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['target']).toEqual(target);
        expect(options.body['vpc']).toEqual(vpc);
        expect(options.body['ips']).toEqual(ips);
        expect(options.body['name']).toEqual(name);
        expect(options.body['resource_group']).toEqual(resourceGroup);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const target = endpointGatewayTargetPrototypeModel;
        const vpc = vpcIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          target,
          vpc,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createEndpointGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createEndpointGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createEndpointGatewayPromise = vpcService.createEndpointGateway();
        expectToBePromise(createEndpointGatewayPromise);

        createEndpointGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listEndpointGatewayIps', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listEndpointGatewayIps
        const endpointGatewayId = 'testString';
        const start = 'testString';
        const limit = 1;
        const sort = 'name';
        const params = {
          endpointGatewayId: endpointGatewayId,
          start: start,
          limit: limit,
          sort: sort,
        };

        const listEndpointGatewayIpsResult = vpcService.listEndpointGatewayIps(params);

        // all methods should return a Promise
        expectToBePromise(listEndpointGatewayIpsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/endpoint_gateways/{endpoint_gateway_id}/ips', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['sort']).toEqual(sort);
        expect(options.path['endpoint_gateway_id']).toEqual(endpointGatewayId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const endpointGatewayId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          endpointGatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listEndpointGatewayIps(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.listEndpointGatewayIps({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listEndpointGatewayIpsPromise = vpcService.listEndpointGatewayIps();
        expectToBePromise(listEndpointGatewayIpsPromise);

        listEndpointGatewayIpsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('removeEndpointGatewayIp', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation removeEndpointGatewayIp
        const endpointGatewayId = 'testString';
        const id = 'testString';
        const params = {
          endpointGatewayId: endpointGatewayId,
          id: id,
        };

        const removeEndpointGatewayIpResult = vpcService.removeEndpointGatewayIp(params);

        // all methods should return a Promise
        expectToBePromise(removeEndpointGatewayIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/endpoint_gateways/{endpoint_gateway_id}/ips/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['endpoint_gateway_id']).toEqual(endpointGatewayId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const endpointGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          endpointGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.removeEndpointGatewayIp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.removeEndpointGatewayIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const removeEndpointGatewayIpPromise = vpcService.removeEndpointGatewayIp();
        expectToBePromise(removeEndpointGatewayIpPromise);

        removeEndpointGatewayIpPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getEndpointGatewayIp', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getEndpointGatewayIp
        const endpointGatewayId = 'testString';
        const id = 'testString';
        const params = {
          endpointGatewayId: endpointGatewayId,
          id: id,
        };

        const getEndpointGatewayIpResult = vpcService.getEndpointGatewayIp(params);

        // all methods should return a Promise
        expectToBePromise(getEndpointGatewayIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/endpoint_gateways/{endpoint_gateway_id}/ips/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['endpoint_gateway_id']).toEqual(endpointGatewayId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const endpointGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          endpointGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getEndpointGatewayIp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getEndpointGatewayIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getEndpointGatewayIpPromise = vpcService.getEndpointGatewayIp();
        expectToBePromise(getEndpointGatewayIpPromise);

        getEndpointGatewayIpPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addEndpointGatewayIp', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addEndpointGatewayIp
        const endpointGatewayId = 'testString';
        const id = 'testString';
        const params = {
          endpointGatewayId: endpointGatewayId,
          id: id,
        };

        const addEndpointGatewayIpResult = vpcService.addEndpointGatewayIp(params);

        // all methods should return a Promise
        expectToBePromise(addEndpointGatewayIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/endpoint_gateways/{endpoint_gateway_id}/ips/{id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['endpoint_gateway_id']).toEqual(endpointGatewayId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const endpointGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          endpointGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.addEndpointGatewayIp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.addEndpointGatewayIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const addEndpointGatewayIpPromise = vpcService.addEndpointGatewayIp();
        expectToBePromise(addEndpointGatewayIpPromise);

        addEndpointGatewayIpPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteEndpointGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteEndpointGateway
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteEndpointGatewayResult = vpcService.deleteEndpointGateway(params);

        // all methods should return a Promise
        expectToBePromise(deleteEndpointGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/endpoint_gateways/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteEndpointGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteEndpointGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteEndpointGatewayPromise = vpcService.deleteEndpointGateway();
        expectToBePromise(deleteEndpointGatewayPromise);

        deleteEndpointGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getEndpointGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getEndpointGateway
        const id = 'testString';
        const params = {
          id: id,
        };

        const getEndpointGatewayResult = vpcService.getEndpointGateway(params);

        // all methods should return a Promise
        expectToBePromise(getEndpointGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/endpoint_gateways/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getEndpointGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getEndpointGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getEndpointGatewayPromise = vpcService.getEndpointGateway();
        expectToBePromise(getEndpointGatewayPromise);

        getEndpointGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateEndpointGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateEndpointGateway
        const id = 'testString';
        const name = 'my-endpoint-gateway';
        const params = {
          id: id,
          name: name,
        };

        const updateEndpointGatewayResult = vpcService.updateEndpointGateway(params);

        // all methods should return a Promise
        expectToBePromise(updateEndpointGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/endpoint_gateways/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateEndpointGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateEndpointGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateEndpointGatewayPromise = vpcService.updateEndpointGateway();
        expectToBePromise(updateEndpointGatewayPromise);

        updateEndpointGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listFlowLogCollectors', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listFlowLogCollectors
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const name = 'testString';
        const vpcId = 'testString';
        const vpcCrn = 'testString';
        const vpcName = 'testString';
        const targetId = 'testString';
        const targetResourceType = 'vpc';
        const params = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          name: name,
          vpcId: vpcId,
          vpcCrn: vpcCrn,
          vpcName: vpcName,
          targetId: targetId,
          targetResourceType: targetResourceType,
        };

        const listFlowLogCollectorsResult = vpcService.listFlowLogCollectors(params);

        // all methods should return a Promise
        expectToBePromise(listFlowLogCollectorsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/flow_log_collectors', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(options.qs['name']).toEqual(name);
        expect(options.qs['vpc.id']).toEqual(vpcId);
        expect(options.qs['vpc.crn']).toEqual(vpcCrn);
        expect(options.qs['vpc.name']).toEqual(vpcName);
        expect(options.qs['target.id']).toEqual(targetId);
        expect(options.qs['target.resource_type']).toEqual(targetResourceType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listFlowLogCollectors(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listFlowLogCollectors({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createFlowLogCollector', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CloudObjectStorageBucketIdentityByName
      const cloudObjectStorageBucketIdentityModel = {
        name: 'bucket-27200-lwx4cfvcue',
      };

      // FlowLogCollectorTargetPrototypeNetworkInterfaceIdentityNetworkInterfaceIdentityNetworkInterfaceIdentityById
      const flowLogCollectorTargetPrototypeModel = {
        id: '10c02d81-0ecb-4dc5-897d-28392913b81e',
      };

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createFlowLogCollector
        const storageBucket = cloudObjectStorageBucketIdentityModel;
        const target = flowLogCollectorTargetPrototypeModel;
        const active = false;
        const name = 'my-flow-log-collector';
        const resourceGroup = resourceGroupIdentityModel;
        const params = {
          storageBucket: storageBucket,
          target: target,
          active: active,
          name: name,
          resourceGroup: resourceGroup,
        };

        const createFlowLogCollectorResult = vpcService.createFlowLogCollector(params);

        // all methods should return a Promise
        expectToBePromise(createFlowLogCollectorResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/flow_log_collectors', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['storage_bucket']).toEqual(storageBucket);
        expect(options.body['target']).toEqual(target);
        expect(options.body['active']).toEqual(active);
        expect(options.body['name']).toEqual(name);
        expect(options.body['resource_group']).toEqual(resourceGroup);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const storageBucket = cloudObjectStorageBucketIdentityModel;
        const target = flowLogCollectorTargetPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          storageBucket,
          target,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createFlowLogCollector(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.createFlowLogCollector({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createFlowLogCollectorPromise = vpcService.createFlowLogCollector();
        expectToBePromise(createFlowLogCollectorPromise);

        createFlowLogCollectorPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteFlowLogCollector', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteFlowLogCollector
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteFlowLogCollectorResult = vpcService.deleteFlowLogCollector(params);

        // all methods should return a Promise
        expectToBePromise(deleteFlowLogCollectorResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/flow_log_collectors/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteFlowLogCollector(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.deleteFlowLogCollector({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteFlowLogCollectorPromise = vpcService.deleteFlowLogCollector();
        expectToBePromise(deleteFlowLogCollectorPromise);

        deleteFlowLogCollectorPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getFlowLogCollector', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getFlowLogCollector
        const id = 'testString';
        const params = {
          id: id,
        };

        const getFlowLogCollectorResult = vpcService.getFlowLogCollector(params);

        // all methods should return a Promise
        expectToBePromise(getFlowLogCollectorResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/flow_log_collectors/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getFlowLogCollector(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.getFlowLogCollector({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getFlowLogCollectorPromise = vpcService.getFlowLogCollector();
        expectToBePromise(getFlowLogCollectorPromise);

        getFlowLogCollectorPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateFlowLogCollector', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateFlowLogCollector
        const id = 'testString';
        const active = true;
        const name = 'my-flow-log-collector';
        const params = {
          id: id,
          active: active,
          name: name,
        };

        const updateFlowLogCollectorResult = vpcService.updateFlowLogCollector(params);

        // all methods should return a Promise
        expectToBePromise(updateFlowLogCollectorResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/flow_log_collectors/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['active']).toEqual(active);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['generation']).toEqual(service.generation);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateFlowLogCollector(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await vpcService.updateFlowLogCollector({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateFlowLogCollectorPromise = vpcService.updateFlowLogCollector();
        expectToBePromise(updateFlowLogCollectorPromise);

        updateFlowLogCollectorPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
