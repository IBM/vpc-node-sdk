/**
 * (C) Copyright IBM Corp. 2022.
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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

const VpcV1 = require('../../dist/vpc/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const vpcServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://us-south.iaas.cloud.ibm.com/v1',
  version: 'testString',
};

const vpcService = new VpcV1(vpcServiceOptions);

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
        const serviceObj = new VpcV1(vpcServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(vpcServiceOptions.version);
        expect(serviceObj.generation).toEqual(vpcServiceOptions.generation);
      });
    });
  });
  describe('listVpcs', () => {
    describe('positive tests', () => {
      function __listVpcsTest() {
        // Construct the params object for operation listVpcs
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const classicAccess = true;
        const listVpcsParams = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          classicAccess: classicAccess,
        };

        const listVpcsResult = vpcService.listVpcs(listVpcsParams);

        // all methods should return a Promise
        expectToBePromise(listVpcsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(mockRequestOptions.qs.classic_access).toEqual(classicAccess);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listVpcsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listVpcsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listVpcsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listVpcsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVpcs(listVpcsParams);
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

      function __createVpcTest() {
        // Construct the params object for operation createVpc
        const addressPrefixManagement = 'manual';
        const classicAccess = false;
        const name = 'my-vpc';
        const resourceGroup = resourceGroupIdentityModel;
        const createVpcParams = {
          addressPrefixManagement: addressPrefixManagement,
          classicAccess: classicAccess,
          name: name,
          resourceGroup: resourceGroup,
        };

        const createVpcResult = vpcService.createVpc(createVpcParams);

        // all methods should return a Promise
        expectToBePromise(createVpcResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.address_prefix_management).toEqual(addressPrefixManagement);
        expect(mockRequestOptions.body.classic_access).toEqual(classicAccess);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.resource_group).toEqual(resourceGroup);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createVpcTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createVpcTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createVpcTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createVpcParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createVpc(createVpcParams);
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
      function __deleteVpcTest() {
        // Construct the params object for operation deleteVpc
        const id = 'testString';
        const deleteVpcParams = {
          id: id,
        };

        const deleteVpcResult = vpcService.deleteVpc(deleteVpcParams);

        // all methods should return a Promise
        expectToBePromise(deleteVpcResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteVpcTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteVpcTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteVpcTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteVpcParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteVpc(deleteVpcParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteVpc({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteVpc();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getVpc', () => {
    describe('positive tests', () => {
      function __getVpcTest() {
        // Construct the params object for operation getVpc
        const id = 'testString';
        const getVpcParams = {
          id: id,
        };

        const getVpcResult = vpcService.getVpc(getVpcParams);

        // all methods should return a Promise
        expectToBePromise(getVpcResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getVpcTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getVpcTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getVpcTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getVpcParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpc(getVpcParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getVpc({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getVpc();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateVpc', () => {
    describe('positive tests', () => {
      function __updateVpcTest() {
        // Construct the params object for operation updateVpc
        const id = 'testString';
        const name = 'my-vpc';
        const updateVpcParams = {
          id: id,
          name: name,
        };

        const updateVpcResult = vpcService.updateVpc(updateVpcParams);

        // all methods should return a Promise
        expectToBePromise(updateVpcResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateVpcTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateVpcTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateVpcTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateVpcParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateVpc(updateVpcParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateVpc({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateVpc();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getVpcDefaultNetworkAcl', () => {
    describe('positive tests', () => {
      function __getVpcDefaultNetworkAclTest() {
        // Construct the params object for operation getVpcDefaultNetworkAcl
        const id = 'testString';
        const getVpcDefaultNetworkAclParams = {
          id: id,
        };

        const getVpcDefaultNetworkAclResult = vpcService.getVpcDefaultNetworkAcl(
          getVpcDefaultNetworkAclParams
        );

        // all methods should return a Promise
        expectToBePromise(getVpcDefaultNetworkAclResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{id}/default_network_acl', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getVpcDefaultNetworkAclTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getVpcDefaultNetworkAclTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getVpcDefaultNetworkAclTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getVpcDefaultNetworkAclParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpcDefaultNetworkAcl(getVpcDefaultNetworkAclParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getVpcDefaultNetworkAcl({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getVpcDefaultNetworkAcl();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getVpcDefaultRoutingTable', () => {
    describe('positive tests', () => {
      function __getVpcDefaultRoutingTableTest() {
        // Construct the params object for operation getVpcDefaultRoutingTable
        const id = 'testString';
        const getVpcDefaultRoutingTableParams = {
          id: id,
        };

        const getVpcDefaultRoutingTableResult = vpcService.getVpcDefaultRoutingTable(
          getVpcDefaultRoutingTableParams
        );

        // all methods should return a Promise
        expectToBePromise(getVpcDefaultRoutingTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{id}/default_routing_table', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getVpcDefaultRoutingTableTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getVpcDefaultRoutingTableTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getVpcDefaultRoutingTableTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getVpcDefaultRoutingTableParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpcDefaultRoutingTable(getVpcDefaultRoutingTableParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getVpcDefaultRoutingTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getVpcDefaultRoutingTable();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getVpcDefaultSecurityGroup', () => {
    describe('positive tests', () => {
      function __getVpcDefaultSecurityGroupTest() {
        // Construct the params object for operation getVpcDefaultSecurityGroup
        const id = 'testString';
        const getVpcDefaultSecurityGroupParams = {
          id: id,
        };

        const getVpcDefaultSecurityGroupResult = vpcService.getVpcDefaultSecurityGroup(
          getVpcDefaultSecurityGroupParams
        );

        // all methods should return a Promise
        expectToBePromise(getVpcDefaultSecurityGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{id}/default_security_group', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getVpcDefaultSecurityGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getVpcDefaultSecurityGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getVpcDefaultSecurityGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getVpcDefaultSecurityGroupParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpcDefaultSecurityGroup(getVpcDefaultSecurityGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getVpcDefaultSecurityGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getVpcDefaultSecurityGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listVpcAddressPrefixes', () => {
    describe('positive tests', () => {
      function __listVpcAddressPrefixesTest() {
        // Construct the params object for operation listVpcAddressPrefixes
        const vpcId = 'testString';
        const start = 'testString';
        const limit = 1;
        const listVpcAddressPrefixesParams = {
          vpcId: vpcId,
          start: start,
          limit: limit,
        };

        const listVpcAddressPrefixesResult = vpcService.listVpcAddressPrefixes(
          listVpcAddressPrefixesParams
        );

        // all methods should return a Promise
        expectToBePromise(listVpcAddressPrefixesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{vpc_id}/address_prefixes', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listVpcAddressPrefixesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listVpcAddressPrefixesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listVpcAddressPrefixesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listVpcAddressPrefixesParams = {
          vpcId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVpcAddressPrefixes(listVpcAddressPrefixesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listVpcAddressPrefixes({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listVpcAddressPrefixes();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createVpcAddressPrefixTest() {
        // Construct the params object for operation createVpcAddressPrefix
        const vpcId = 'testString';
        const cidr = '10.0.0.0/24';
        const zone = zoneIdentityModel;
        const isDefault = true;
        const name = 'my-address-prefix-2';
        const createVpcAddressPrefixParams = {
          vpcId: vpcId,
          cidr: cidr,
          zone: zone,
          isDefault: isDefault,
          name: name,
        };

        const createVpcAddressPrefixResult = vpcService.createVpcAddressPrefix(
          createVpcAddressPrefixParams
        );

        // all methods should return a Promise
        expectToBePromise(createVpcAddressPrefixResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{vpc_id}/address_prefixes', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.cidr).toEqual(cidr);
        expect(mockRequestOptions.body.zone).toEqual(zone);
        expect(mockRequestOptions.body.is_default).toEqual(isDefault);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createVpcAddressPrefixTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createVpcAddressPrefixTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createVpcAddressPrefixTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const cidr = '10.0.0.0/24';
        const zone = zoneIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createVpcAddressPrefixParams = {
          vpcId,
          cidr,
          zone,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createVpcAddressPrefix(createVpcAddressPrefixParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createVpcAddressPrefix({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createVpcAddressPrefix();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteVpcAddressPrefix', () => {
    describe('positive tests', () => {
      function __deleteVpcAddressPrefixTest() {
        // Construct the params object for operation deleteVpcAddressPrefix
        const vpcId = 'testString';
        const id = 'testString';
        const deleteVpcAddressPrefixParams = {
          vpcId: vpcId,
          id: id,
        };

        const deleteVpcAddressPrefixResult = vpcService.deleteVpcAddressPrefix(
          deleteVpcAddressPrefixParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteVpcAddressPrefixResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{vpc_id}/address_prefixes/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteVpcAddressPrefixTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteVpcAddressPrefixTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteVpcAddressPrefixTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteVpcAddressPrefixParams = {
          vpcId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteVpcAddressPrefix(deleteVpcAddressPrefixParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteVpcAddressPrefix({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteVpcAddressPrefix();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getVpcAddressPrefix', () => {
    describe('positive tests', () => {
      function __getVpcAddressPrefixTest() {
        // Construct the params object for operation getVpcAddressPrefix
        const vpcId = 'testString';
        const id = 'testString';
        const getVpcAddressPrefixParams = {
          vpcId: vpcId,
          id: id,
        };

        const getVpcAddressPrefixResult = vpcService.getVpcAddressPrefix(getVpcAddressPrefixParams);

        // all methods should return a Promise
        expectToBePromise(getVpcAddressPrefixResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{vpc_id}/address_prefixes/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getVpcAddressPrefixTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getVpcAddressPrefixTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getVpcAddressPrefixTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getVpcAddressPrefixParams = {
          vpcId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpcAddressPrefix(getVpcAddressPrefixParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getVpcAddressPrefix({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getVpcAddressPrefix();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateVpcAddressPrefix', () => {
    describe('positive tests', () => {
      function __updateVpcAddressPrefixTest() {
        // Construct the params object for operation updateVpcAddressPrefix
        const vpcId = 'testString';
        const id = 'testString';
        const isDefault = false;
        const name = 'my-address-prefix-2';
        const updateVpcAddressPrefixParams = {
          vpcId: vpcId,
          id: id,
          isDefault: isDefault,
          name: name,
        };

        const updateVpcAddressPrefixResult = vpcService.updateVpcAddressPrefix(
          updateVpcAddressPrefixParams
        );

        // all methods should return a Promise
        expectToBePromise(updateVpcAddressPrefixResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{vpc_id}/address_prefixes/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.is_default).toEqual(isDefault);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateVpcAddressPrefixTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateVpcAddressPrefixTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateVpcAddressPrefixTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateVpcAddressPrefixParams = {
          vpcId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateVpcAddressPrefix(updateVpcAddressPrefixParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateVpcAddressPrefix({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateVpcAddressPrefix();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listVpcRoutes', () => {
    describe('positive tests', () => {
      function __listVpcRoutesTest() {
        // Construct the params object for operation listVpcRoutes
        const vpcId = 'testString';
        const zoneName = 'testString';
        const start = 'testString';
        const limit = 1;
        const listVpcRoutesParams = {
          vpcId: vpcId,
          zoneName: zoneName,
          start: start,
          limit: limit,
        };

        const listVpcRoutesResult = vpcService.listVpcRoutes(listVpcRoutesParams);

        // all methods should return a Promise
        expectToBePromise(listVpcRoutesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{vpc_id}/routes', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs['zone.name']).toEqual(zoneName);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listVpcRoutesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listVpcRoutesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listVpcRoutesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listVpcRoutesParams = {
          vpcId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVpcRoutes(listVpcRoutesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listVpcRoutes({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listVpcRoutes();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createVpcRouteTest() {
        // Construct the params object for operation createVpcRoute
        const vpcId = 'testString';
        const destination = '192.168.3.0/24';
        const zone = zoneIdentityModel;
        const action = 'deliver';
        const name = 'my-route-2';
        const nextHop = routeNextHopPrototypeModel;
        const createVpcRouteParams = {
          vpcId: vpcId,
          destination: destination,
          zone: zone,
          action: action,
          name: name,
          nextHop: nextHop,
        };

        const createVpcRouteResult = vpcService.createVpcRoute(createVpcRouteParams);

        // all methods should return a Promise
        expectToBePromise(createVpcRouteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{vpc_id}/routes', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.destination).toEqual(destination);
        expect(mockRequestOptions.body.zone).toEqual(zone);
        expect(mockRequestOptions.body.action).toEqual(action);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.next_hop).toEqual(nextHop);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createVpcRouteTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createVpcRouteTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createVpcRouteTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const destination = '192.168.3.0/24';
        const zone = zoneIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createVpcRouteParams = {
          vpcId,
          destination,
          zone,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createVpcRoute(createVpcRouteParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createVpcRoute({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createVpcRoute();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteVpcRoute', () => {
    describe('positive tests', () => {
      function __deleteVpcRouteTest() {
        // Construct the params object for operation deleteVpcRoute
        const vpcId = 'testString';
        const id = 'testString';
        const deleteVpcRouteParams = {
          vpcId: vpcId,
          id: id,
        };

        const deleteVpcRouteResult = vpcService.deleteVpcRoute(deleteVpcRouteParams);

        // all methods should return a Promise
        expectToBePromise(deleteVpcRouteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{vpc_id}/routes/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteVpcRouteTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteVpcRouteTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteVpcRouteTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteVpcRouteParams = {
          vpcId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteVpcRoute(deleteVpcRouteParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteVpcRoute({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteVpcRoute();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getVpcRoute', () => {
    describe('positive tests', () => {
      function __getVpcRouteTest() {
        // Construct the params object for operation getVpcRoute
        const vpcId = 'testString';
        const id = 'testString';
        const getVpcRouteParams = {
          vpcId: vpcId,
          id: id,
        };

        const getVpcRouteResult = vpcService.getVpcRoute(getVpcRouteParams);

        // all methods should return a Promise
        expectToBePromise(getVpcRouteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{vpc_id}/routes/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getVpcRouteTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getVpcRouteTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getVpcRouteTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getVpcRouteParams = {
          vpcId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpcRoute(getVpcRouteParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getVpcRoute({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getVpcRoute();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateVpcRoute', () => {
    describe('positive tests', () => {
      function __updateVpcRouteTest() {
        // Construct the params object for operation updateVpcRoute
        const vpcId = 'testString';
        const id = 'testString';
        const name = 'my-route-2';
        const updateVpcRouteParams = {
          vpcId: vpcId,
          id: id,
          name: name,
        };

        const updateVpcRouteResult = vpcService.updateVpcRoute(updateVpcRouteParams);

        // all methods should return a Promise
        expectToBePromise(updateVpcRouteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{vpc_id}/routes/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateVpcRouteTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateVpcRouteTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateVpcRouteTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateVpcRouteParams = {
          vpcId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateVpcRoute(updateVpcRouteParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateVpcRoute({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateVpcRoute();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listVpcRoutingTables', () => {
    describe('positive tests', () => {
      function __listVpcRoutingTablesTest() {
        // Construct the params object for operation listVpcRoutingTables
        const vpcId = 'testString';
        const start = 'testString';
        const limit = 1;
        const isDefault = true;
        const listVpcRoutingTablesParams = {
          vpcId: vpcId,
          start: start,
          limit: limit,
          isDefault: isDefault,
        };

        const listVpcRoutingTablesResult = vpcService.listVpcRoutingTables(
          listVpcRoutingTablesParams
        );

        // all methods should return a Promise
        expectToBePromise(listVpcRoutingTablesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{vpc_id}/routing_tables', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.is_default).toEqual(isDefault);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listVpcRoutingTablesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listVpcRoutingTablesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listVpcRoutingTablesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listVpcRoutingTablesParams = {
          vpcId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVpcRoutingTables(listVpcRoutingTablesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listVpcRoutingTables({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listVpcRoutingTables();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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
        action: 'deliver',
        destination: '192.168.3.0/24',
        name: 'my-route-2',
        next_hop: routeNextHopPrototypeModel,
        zone: zoneIdentityModel,
      };

      function __createVpcRoutingTableTest() {
        // Construct the params object for operation createVpcRoutingTable
        const vpcId = 'testString';
        const name = 'my-routing-table-2';
        const routeDirectLinkIngress = false;
        const routeTransitGatewayIngress = false;
        const routeVpcZoneIngress = false;
        const routes = [routePrototypeModel];
        const createVpcRoutingTableParams = {
          vpcId: vpcId,
          name: name,
          routeDirectLinkIngress: routeDirectLinkIngress,
          routeTransitGatewayIngress: routeTransitGatewayIngress,
          routeVpcZoneIngress: routeVpcZoneIngress,
          routes: routes,
        };

        const createVpcRoutingTableResult = vpcService.createVpcRoutingTable(
          createVpcRoutingTableParams
        );

        // all methods should return a Promise
        expectToBePromise(createVpcRoutingTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{vpc_id}/routing_tables', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.route_direct_link_ingress).toEqual(routeDirectLinkIngress);
        expect(mockRequestOptions.body.route_transit_gateway_ingress).toEqual(
          routeTransitGatewayIngress
        );
        expect(mockRequestOptions.body.route_vpc_zone_ingress).toEqual(routeVpcZoneIngress);
        expect(mockRequestOptions.body.routes).toEqual(routes);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createVpcRoutingTableTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createVpcRoutingTableTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createVpcRoutingTableTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createVpcRoutingTableParams = {
          vpcId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createVpcRoutingTable(createVpcRoutingTableParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createVpcRoutingTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createVpcRoutingTable();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteVpcRoutingTable', () => {
    describe('positive tests', () => {
      function __deleteVpcRoutingTableTest() {
        // Construct the params object for operation deleteVpcRoutingTable
        const vpcId = 'testString';
        const id = 'testString';
        const deleteVpcRoutingTableParams = {
          vpcId: vpcId,
          id: id,
        };

        const deleteVpcRoutingTableResult = vpcService.deleteVpcRoutingTable(
          deleteVpcRoutingTableParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteVpcRoutingTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{vpc_id}/routing_tables/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteVpcRoutingTableTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteVpcRoutingTableTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteVpcRoutingTableTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteVpcRoutingTableParams = {
          vpcId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteVpcRoutingTable(deleteVpcRoutingTableParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteVpcRoutingTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteVpcRoutingTable();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getVpcRoutingTable', () => {
    describe('positive tests', () => {
      function __getVpcRoutingTableTest() {
        // Construct the params object for operation getVpcRoutingTable
        const vpcId = 'testString';
        const id = 'testString';
        const getVpcRoutingTableParams = {
          vpcId: vpcId,
          id: id,
        };

        const getVpcRoutingTableResult = vpcService.getVpcRoutingTable(getVpcRoutingTableParams);

        // all methods should return a Promise
        expectToBePromise(getVpcRoutingTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{vpc_id}/routing_tables/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getVpcRoutingTableTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getVpcRoutingTableTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getVpcRoutingTableTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getVpcRoutingTableParams = {
          vpcId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpcRoutingTable(getVpcRoutingTableParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getVpcRoutingTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getVpcRoutingTable();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateVpcRoutingTable', () => {
    describe('positive tests', () => {
      function __updateVpcRoutingTableTest() {
        // Construct the params object for operation updateVpcRoutingTable
        const vpcId = 'testString';
        const id = 'testString';
        const name = 'my-routing-table-2';
        const routeDirectLinkIngress = true;
        const routeTransitGatewayIngress = true;
        const routeVpcZoneIngress = true;
        const updateVpcRoutingTableParams = {
          vpcId: vpcId,
          id: id,
          name: name,
          routeDirectLinkIngress: routeDirectLinkIngress,
          routeTransitGatewayIngress: routeTransitGatewayIngress,
          routeVpcZoneIngress: routeVpcZoneIngress,
        };

        const updateVpcRoutingTableResult = vpcService.updateVpcRoutingTable(
          updateVpcRoutingTableParams
        );

        // all methods should return a Promise
        expectToBePromise(updateVpcRoutingTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpcs/{vpc_id}/routing_tables/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.route_direct_link_ingress).toEqual(routeDirectLinkIngress);
        expect(mockRequestOptions.body.route_transit_gateway_ingress).toEqual(
          routeTransitGatewayIngress
        );
        expect(mockRequestOptions.body.route_vpc_zone_ingress).toEqual(routeVpcZoneIngress);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateVpcRoutingTableTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateVpcRoutingTableTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateVpcRoutingTableTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateVpcRoutingTableParams = {
          vpcId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateVpcRoutingTable(updateVpcRoutingTableParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateVpcRoutingTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateVpcRoutingTable();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listVpcRoutingTableRoutes', () => {
    describe('positive tests', () => {
      function __listVpcRoutingTableRoutesTest() {
        // Construct the params object for operation listVpcRoutingTableRoutes
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const start = 'testString';
        const limit = 1;
        const listVpcRoutingTableRoutesParams = {
          vpcId: vpcId,
          routingTableId: routingTableId,
          start: start,
          limit: limit,
        };

        const listVpcRoutingTableRoutesResult = vpcService.listVpcRoutingTableRoutes(
          listVpcRoutingTableRoutesParams
        );

        // all methods should return a Promise
        expectToBePromise(listVpcRoutingTableRoutesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/vpcs/{vpc_id}/routing_tables/{routing_table_id}/routes',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
        expect(mockRequestOptions.path.routing_table_id).toEqual(routingTableId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listVpcRoutingTableRoutesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listVpcRoutingTableRoutesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listVpcRoutingTableRoutesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listVpcRoutingTableRoutesParams = {
          vpcId,
          routingTableId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVpcRoutingTableRoutes(listVpcRoutingTableRoutesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listVpcRoutingTableRoutes({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listVpcRoutingTableRoutes();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createVpcRoutingTableRouteTest() {
        // Construct the params object for operation createVpcRoutingTableRoute
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const destination = '192.168.3.0/24';
        const zone = zoneIdentityModel;
        const action = 'deliver';
        const name = 'my-route-2';
        const nextHop = routeNextHopPrototypeModel;
        const createVpcRoutingTableRouteParams = {
          vpcId: vpcId,
          routingTableId: routingTableId,
          destination: destination,
          zone: zone,
          action: action,
          name: name,
          nextHop: nextHop,
        };

        const createVpcRoutingTableRouteResult = vpcService.createVpcRoutingTableRoute(
          createVpcRoutingTableRouteParams
        );

        // all methods should return a Promise
        expectToBePromise(createVpcRoutingTableRouteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/vpcs/{vpc_id}/routing_tables/{routing_table_id}/routes',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.destination).toEqual(destination);
        expect(mockRequestOptions.body.zone).toEqual(zone);
        expect(mockRequestOptions.body.action).toEqual(action);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.next_hop).toEqual(nextHop);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
        expect(mockRequestOptions.path.routing_table_id).toEqual(routingTableId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createVpcRoutingTableRouteTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createVpcRoutingTableRouteTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createVpcRoutingTableRouteTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const destination = '192.168.3.0/24';
        const zone = zoneIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createVpcRoutingTableRouteParams = {
          vpcId,
          routingTableId,
          destination,
          zone,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createVpcRoutingTableRoute(createVpcRoutingTableRouteParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createVpcRoutingTableRoute({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createVpcRoutingTableRoute();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteVpcRoutingTableRoute', () => {
    describe('positive tests', () => {
      function __deleteVpcRoutingTableRouteTest() {
        // Construct the params object for operation deleteVpcRoutingTableRoute
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const id = 'testString';
        const deleteVpcRoutingTableRouteParams = {
          vpcId: vpcId,
          routingTableId: routingTableId,
          id: id,
        };

        const deleteVpcRoutingTableRouteResult = vpcService.deleteVpcRoutingTableRoute(
          deleteVpcRoutingTableRouteParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteVpcRoutingTableRouteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/vpcs/{vpc_id}/routing_tables/{routing_table_id}/routes/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
        expect(mockRequestOptions.path.routing_table_id).toEqual(routingTableId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteVpcRoutingTableRouteTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteVpcRoutingTableRouteTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteVpcRoutingTableRouteTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteVpcRoutingTableRouteParams = {
          vpcId,
          routingTableId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteVpcRoutingTableRoute(deleteVpcRoutingTableRouteParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteVpcRoutingTableRoute({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteVpcRoutingTableRoute();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getVpcRoutingTableRoute', () => {
    describe('positive tests', () => {
      function __getVpcRoutingTableRouteTest() {
        // Construct the params object for operation getVpcRoutingTableRoute
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const id = 'testString';
        const getVpcRoutingTableRouteParams = {
          vpcId: vpcId,
          routingTableId: routingTableId,
          id: id,
        };

        const getVpcRoutingTableRouteResult = vpcService.getVpcRoutingTableRoute(
          getVpcRoutingTableRouteParams
        );

        // all methods should return a Promise
        expectToBePromise(getVpcRoutingTableRouteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/vpcs/{vpc_id}/routing_tables/{routing_table_id}/routes/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
        expect(mockRequestOptions.path.routing_table_id).toEqual(routingTableId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getVpcRoutingTableRouteTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getVpcRoutingTableRouteTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getVpcRoutingTableRouteTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getVpcRoutingTableRouteParams = {
          vpcId,
          routingTableId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpcRoutingTableRoute(getVpcRoutingTableRouteParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getVpcRoutingTableRoute({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getVpcRoutingTableRoute();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateVpcRoutingTableRoute', () => {
    describe('positive tests', () => {
      function __updateVpcRoutingTableRouteTest() {
        // Construct the params object for operation updateVpcRoutingTableRoute
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const id = 'testString';
        const name = 'my-route-2';
        const updateVpcRoutingTableRouteParams = {
          vpcId: vpcId,
          routingTableId: routingTableId,
          id: id,
          name: name,
        };

        const updateVpcRoutingTableRouteResult = vpcService.updateVpcRoutingTableRoute(
          updateVpcRoutingTableRouteParams
        );

        // all methods should return a Promise
        expectToBePromise(updateVpcRoutingTableRouteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/vpcs/{vpc_id}/routing_tables/{routing_table_id}/routes/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpc_id).toEqual(vpcId);
        expect(mockRequestOptions.path.routing_table_id).toEqual(routingTableId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateVpcRoutingTableRouteTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateVpcRoutingTableRouteTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateVpcRoutingTableRouteTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpcId = 'testString';
        const routingTableId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateVpcRoutingTableRouteParams = {
          vpcId,
          routingTableId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateVpcRoutingTableRoute(updateVpcRoutingTableRouteParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateVpcRoutingTableRoute({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateVpcRoutingTableRoute();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listSubnets', () => {
    describe('positive tests', () => {
      function __listSubnetsTest() {
        // Construct the params object for operation listSubnets
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const routingTableId = 'testString';
        const routingTableName = 'testString';
        const listSubnetsParams = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          routingTableId: routingTableId,
          routingTableName: routingTableName,
        };

        const listSubnetsResult = vpcService.listSubnets(listSubnetsParams);

        // all methods should return a Promise
        expectToBePromise(listSubnetsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/subnets', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(mockRequestOptions.qs['routing_table.id']).toEqual(routingTableId);
        expect(mockRequestOptions.qs['routing_table.name']).toEqual(routingTableName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSubnetsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listSubnetsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listSubnetsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSubnetsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listSubnets(listSubnetsParams);
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

      // PublicGatewayIdentityPublicGatewayIdentityById
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

      function __createSubnetTest() {
        // Construct the params object for operation createSubnet
        const subnetPrototype = subnetPrototypeModel;
        const createSubnetParams = {
          subnetPrototype: subnetPrototype,
        };

        const createSubnetResult = vpcService.createSubnet(createSubnetParams);

        // all methods should return a Promise
        expectToBePromise(createSubnetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/subnets', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(subnetPrototype);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSubnetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createSubnetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createSubnetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const subnetPrototype = subnetPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSubnetParams = {
          subnetPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createSubnet(createSubnetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createSubnet({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createSubnet();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteSubnet', () => {
    describe('positive tests', () => {
      function __deleteSubnetTest() {
        // Construct the params object for operation deleteSubnet
        const id = 'testString';
        const deleteSubnetParams = {
          id: id,
        };

        const deleteSubnetResult = vpcService.deleteSubnet(deleteSubnetParams);

        // all methods should return a Promise
        expectToBePromise(deleteSubnetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/subnets/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSubnetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteSubnetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteSubnetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSubnetParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteSubnet(deleteSubnetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteSubnet({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteSubnet();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getSubnet', () => {
    describe('positive tests', () => {
      function __getSubnetTest() {
        // Construct the params object for operation getSubnet
        const id = 'testString';
        const getSubnetParams = {
          id: id,
        };

        const getSubnetResult = vpcService.getSubnet(getSubnetParams);

        // all methods should return a Promise
        expectToBePromise(getSubnetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/subnets/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSubnetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getSubnetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getSubnetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSubnetParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getSubnet(getSubnetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getSubnet({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getSubnet();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      // SubnetPublicGatewayPatchPublicGatewayIdentityById
      const subnetPublicGatewayPatchModel = {
        id: 'dc5431ef-1fc6-4861-adc9-a59d077d1241',
      };

      // RoutingTableIdentityById
      const routingTableIdentityModel = {
        id: '6885e83f-03b2-4603-8a86-db2a0f55c840',
      };

      function __updateSubnetTest() {
        // Construct the params object for operation updateSubnet
        const id = 'testString';
        const name = 'my-subnet';
        const networkAcl = networkAclIdentityModel;
        const publicGateway = subnetPublicGatewayPatchModel;
        const routingTable = routingTableIdentityModel;
        const updateSubnetParams = {
          id: id,
          name: name,
          networkAcl: networkAcl,
          publicGateway: publicGateway,
          routingTable: routingTable,
        };

        const updateSubnetResult = vpcService.updateSubnet(updateSubnetParams);

        // all methods should return a Promise
        expectToBePromise(updateSubnetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/subnets/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.network_acl).toEqual(networkAcl);
        expect(mockRequestOptions.body.public_gateway).toEqual(publicGateway);
        expect(mockRequestOptions.body.routing_table).toEqual(routingTable);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSubnetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateSubnetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateSubnetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSubnetParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateSubnet(updateSubnetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateSubnet({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateSubnet();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getSubnetNetworkAcl', () => {
    describe('positive tests', () => {
      function __getSubnetNetworkAclTest() {
        // Construct the params object for operation getSubnetNetworkAcl
        const id = 'testString';
        const getSubnetNetworkAclParams = {
          id: id,
        };

        const getSubnetNetworkAclResult = vpcService.getSubnetNetworkAcl(getSubnetNetworkAclParams);

        // all methods should return a Promise
        expectToBePromise(getSubnetNetworkAclResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/subnets/{id}/network_acl', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSubnetNetworkAclTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getSubnetNetworkAclTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getSubnetNetworkAclTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSubnetNetworkAclParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getSubnetNetworkAcl(getSubnetNetworkAclParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getSubnetNetworkAcl({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getSubnetNetworkAcl();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __replaceSubnetNetworkAclTest() {
        // Construct the params object for operation replaceSubnetNetworkAcl
        const id = 'testString';
        const networkAclIdentity = networkAclIdentityModel;
        const replaceSubnetNetworkAclParams = {
          id: id,
          networkAclIdentity: networkAclIdentity,
        };

        const replaceSubnetNetworkAclResult = vpcService.replaceSubnetNetworkAcl(
          replaceSubnetNetworkAclParams
        );

        // all methods should return a Promise
        expectToBePromise(replaceSubnetNetworkAclResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/subnets/{id}/network_acl', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(networkAclIdentity);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceSubnetNetworkAclTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __replaceSubnetNetworkAclTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __replaceSubnetNetworkAclTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const networkAclIdentity = networkAclIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceSubnetNetworkAclParams = {
          id,
          networkAclIdentity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.replaceSubnetNetworkAcl(replaceSubnetNetworkAclParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.replaceSubnetNetworkAcl({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.replaceSubnetNetworkAcl();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('unsetSubnetPublicGateway', () => {
    describe('positive tests', () => {
      function __unsetSubnetPublicGatewayTest() {
        // Construct the params object for operation unsetSubnetPublicGateway
        const id = 'testString';
        const unsetSubnetPublicGatewayParams = {
          id: id,
        };

        const unsetSubnetPublicGatewayResult = vpcService.unsetSubnetPublicGateway(
          unsetSubnetPublicGatewayParams
        );

        // all methods should return a Promise
        expectToBePromise(unsetSubnetPublicGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/subnets/{id}/public_gateway', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __unsetSubnetPublicGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __unsetSubnetPublicGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __unsetSubnetPublicGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const unsetSubnetPublicGatewayParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.unsetSubnetPublicGateway(unsetSubnetPublicGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.unsetSubnetPublicGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.unsetSubnetPublicGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getSubnetPublicGateway', () => {
    describe('positive tests', () => {
      function __getSubnetPublicGatewayTest() {
        // Construct the params object for operation getSubnetPublicGateway
        const id = 'testString';
        const getSubnetPublicGatewayParams = {
          id: id,
        };

        const getSubnetPublicGatewayResult = vpcService.getSubnetPublicGateway(
          getSubnetPublicGatewayParams
        );

        // all methods should return a Promise
        expectToBePromise(getSubnetPublicGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/subnets/{id}/public_gateway', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSubnetPublicGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getSubnetPublicGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getSubnetPublicGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSubnetPublicGatewayParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getSubnetPublicGateway(getSubnetPublicGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getSubnetPublicGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getSubnetPublicGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('setSubnetPublicGateway', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PublicGatewayIdentityPublicGatewayIdentityById
      const publicGatewayIdentityModel = {
        id: 'dc5431ef-1fc6-4861-adc9-a59d077d1241',
      };

      function __setSubnetPublicGatewayTest() {
        // Construct the params object for operation setSubnetPublicGateway
        const id = 'testString';
        const publicGatewayIdentity = publicGatewayIdentityModel;
        const setSubnetPublicGatewayParams = {
          id: id,
          publicGatewayIdentity: publicGatewayIdentity,
        };

        const setSubnetPublicGatewayResult = vpcService.setSubnetPublicGateway(
          setSubnetPublicGatewayParams
        );

        // all methods should return a Promise
        expectToBePromise(setSubnetPublicGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/subnets/{id}/public_gateway', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(publicGatewayIdentity);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __setSubnetPublicGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __setSubnetPublicGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __setSubnetPublicGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const publicGatewayIdentity = publicGatewayIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const setSubnetPublicGatewayParams = {
          id,
          publicGatewayIdentity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.setSubnetPublicGateway(setSubnetPublicGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.setSubnetPublicGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.setSubnetPublicGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getSubnetRoutingTable', () => {
    describe('positive tests', () => {
      function __getSubnetRoutingTableTest() {
        // Construct the params object for operation getSubnetRoutingTable
        const id = 'testString';
        const getSubnetRoutingTableParams = {
          id: id,
        };

        const getSubnetRoutingTableResult = vpcService.getSubnetRoutingTable(
          getSubnetRoutingTableParams
        );

        // all methods should return a Promise
        expectToBePromise(getSubnetRoutingTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/subnets/{id}/routing_table', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSubnetRoutingTableTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getSubnetRoutingTableTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getSubnetRoutingTableTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSubnetRoutingTableParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getSubnetRoutingTable(getSubnetRoutingTableParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getSubnetRoutingTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getSubnetRoutingTable();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __replaceSubnetRoutingTableTest() {
        // Construct the params object for operation replaceSubnetRoutingTable
        const id = 'testString';
        const routingTableIdentity = routingTableIdentityModel;
        const replaceSubnetRoutingTableParams = {
          id: id,
          routingTableIdentity: routingTableIdentity,
        };

        const replaceSubnetRoutingTableResult = vpcService.replaceSubnetRoutingTable(
          replaceSubnetRoutingTableParams
        );

        // all methods should return a Promise
        expectToBePromise(replaceSubnetRoutingTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/subnets/{id}/routing_table', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(routingTableIdentity);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceSubnetRoutingTableTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __replaceSubnetRoutingTableTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __replaceSubnetRoutingTableTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const routingTableIdentity = routingTableIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceSubnetRoutingTableParams = {
          id,
          routingTableIdentity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.replaceSubnetRoutingTable(replaceSubnetRoutingTableParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.replaceSubnetRoutingTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.replaceSubnetRoutingTable();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listSubnetReservedIps', () => {
    describe('positive tests', () => {
      function __listSubnetReservedIpsTest() {
        // Construct the params object for operation listSubnetReservedIps
        const subnetId = 'testString';
        const start = 'testString';
        const limit = 1;
        const sort = 'name';
        const listSubnetReservedIpsParams = {
          subnetId: subnetId,
          start: start,
          limit: limit,
          sort: sort,
        };

        const listSubnetReservedIpsResult = vpcService.listSubnetReservedIps(
          listSubnetReservedIpsParams
        );

        // all methods should return a Promise
        expectToBePromise(listSubnetReservedIpsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/subnets/{subnet_id}/reserved_ips', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.path.subnet_id).toEqual(subnetId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSubnetReservedIpsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listSubnetReservedIpsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listSubnetReservedIpsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const subnetId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSubnetReservedIpsParams = {
          subnetId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listSubnetReservedIps(listSubnetReservedIpsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listSubnetReservedIps({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listSubnetReservedIps();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createSubnetReservedIpTest() {
        // Construct the params object for operation createSubnetReservedIp
        const subnetId = 'testString';
        const address = '192.168.3.4';
        const autoDelete = false;
        const name = 'my-reserved-ip';
        const target = reservedIpTargetPrototypeModel;
        const createSubnetReservedIpParams = {
          subnetId: subnetId,
          address: address,
          autoDelete: autoDelete,
          name: name,
          target: target,
        };

        const createSubnetReservedIpResult = vpcService.createSubnetReservedIp(
          createSubnetReservedIpParams
        );

        // all methods should return a Promise
        expectToBePromise(createSubnetReservedIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/subnets/{subnet_id}/reserved_ips', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.address).toEqual(address);
        expect(mockRequestOptions.body.auto_delete).toEqual(autoDelete);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.target).toEqual(target);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.subnet_id).toEqual(subnetId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSubnetReservedIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createSubnetReservedIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createSubnetReservedIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const subnetId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSubnetReservedIpParams = {
          subnetId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createSubnetReservedIp(createSubnetReservedIpParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createSubnetReservedIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createSubnetReservedIp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteSubnetReservedIp', () => {
    describe('positive tests', () => {
      function __deleteSubnetReservedIpTest() {
        // Construct the params object for operation deleteSubnetReservedIp
        const subnetId = 'testString';
        const id = 'testString';
        const deleteSubnetReservedIpParams = {
          subnetId: subnetId,
          id: id,
        };

        const deleteSubnetReservedIpResult = vpcService.deleteSubnetReservedIp(
          deleteSubnetReservedIpParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteSubnetReservedIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/subnets/{subnet_id}/reserved_ips/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.subnet_id).toEqual(subnetId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSubnetReservedIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteSubnetReservedIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteSubnetReservedIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const subnetId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSubnetReservedIpParams = {
          subnetId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteSubnetReservedIp(deleteSubnetReservedIpParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteSubnetReservedIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteSubnetReservedIp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getSubnetReservedIp', () => {
    describe('positive tests', () => {
      function __getSubnetReservedIpTest() {
        // Construct the params object for operation getSubnetReservedIp
        const subnetId = 'testString';
        const id = 'testString';
        const getSubnetReservedIpParams = {
          subnetId: subnetId,
          id: id,
        };

        const getSubnetReservedIpResult = vpcService.getSubnetReservedIp(getSubnetReservedIpParams);

        // all methods should return a Promise
        expectToBePromise(getSubnetReservedIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/subnets/{subnet_id}/reserved_ips/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.subnet_id).toEqual(subnetId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSubnetReservedIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getSubnetReservedIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getSubnetReservedIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const subnetId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSubnetReservedIpParams = {
          subnetId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getSubnetReservedIp(getSubnetReservedIpParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getSubnetReservedIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getSubnetReservedIp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateSubnetReservedIp', () => {
    describe('positive tests', () => {
      function __updateSubnetReservedIpTest() {
        // Construct the params object for operation updateSubnetReservedIp
        const subnetId = 'testString';
        const id = 'testString';
        const autoDelete = false;
        const name = 'my-reserved-ip';
        const updateSubnetReservedIpParams = {
          subnetId: subnetId,
          id: id,
          autoDelete: autoDelete,
          name: name,
        };

        const updateSubnetReservedIpResult = vpcService.updateSubnetReservedIp(
          updateSubnetReservedIpParams
        );

        // all methods should return a Promise
        expectToBePromise(updateSubnetReservedIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/subnets/{subnet_id}/reserved_ips/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.auto_delete).toEqual(autoDelete);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.subnet_id).toEqual(subnetId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSubnetReservedIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateSubnetReservedIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateSubnetReservedIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const subnetId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSubnetReservedIpParams = {
          subnetId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateSubnetReservedIp(updateSubnetReservedIpParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateSubnetReservedIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateSubnetReservedIp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listImages', () => {
    describe('positive tests', () => {
      function __listImagesTest() {
        // Construct the params object for operation listImages
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const name = 'testString';
        const visibility = 'private';
        const listImagesParams = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          name: name,
          visibility: visibility,
        };

        const listImagesResult = vpcService.listImages(listImagesParams);

        // all methods should return a Promise
        expectToBePromise(listImagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/images', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.visibility).toEqual(visibility);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listImagesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listImagesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listImagesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listImagesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listImages(listImagesParams);
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

      function __createImageTest() {
        // Construct the params object for operation createImage
        const imagePrototype = imagePrototypeModel;
        const createImageParams = {
          imagePrototype: imagePrototype,
        };

        const createImageResult = vpcService.createImage(createImageParams);

        // all methods should return a Promise
        expectToBePromise(createImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/images', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(imagePrototype);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createImageTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createImageTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createImageTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const imagePrototype = imagePrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createImageParams = {
          imagePrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createImage(createImageParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createImage();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteImage', () => {
    describe('positive tests', () => {
      function __deleteImageTest() {
        // Construct the params object for operation deleteImage
        const id = 'testString';
        const deleteImageParams = {
          id: id,
        };

        const deleteImageResult = vpcService.deleteImage(deleteImageParams);

        // all methods should return a Promise
        expectToBePromise(deleteImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/images/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteImageTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteImageTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteImageTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteImageParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteImage(deleteImageParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteImage();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getImage', () => {
    describe('positive tests', () => {
      function __getImageTest() {
        // Construct the params object for operation getImage
        const id = 'testString';
        const getImageParams = {
          id: id,
        };

        const getImageResult = vpcService.getImage(getImageParams);

        // all methods should return a Promise
        expectToBePromise(getImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/images/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getImageTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getImageTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getImageTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getImageParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getImage(getImageParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getImage();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateImage', () => {
    describe('positive tests', () => {
      function __updateImageTest() {
        // Construct the params object for operation updateImage
        const id = 'testString';
        const name = 'my-image';
        const updateImageParams = {
          id: id,
          name: name,
        };

        const updateImageResult = vpcService.updateImage(updateImageParams);

        // all methods should return a Promise
        expectToBePromise(updateImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/images/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateImageTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateImageTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateImageTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateImageParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateImage(updateImageParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateImage();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listOperatingSystems', () => {
    describe('positive tests', () => {
      function __listOperatingSystemsTest() {
        // Construct the params object for operation listOperatingSystems
        const start = 'testString';
        const limit = 1;
        const listOperatingSystemsParams = {
          start: start,
          limit: limit,
        };

        const listOperatingSystemsResult = vpcService.listOperatingSystems(
          listOperatingSystemsParams
        );

        // all methods should return a Promise
        expectToBePromise(listOperatingSystemsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/operating_systems', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listOperatingSystemsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listOperatingSystemsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listOperatingSystemsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listOperatingSystemsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listOperatingSystems(listOperatingSystemsParams);
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
      function __getOperatingSystemTest() {
        // Construct the params object for operation getOperatingSystem
        const name = 'testString';
        const getOperatingSystemParams = {
          name: name,
        };

        const getOperatingSystemResult = vpcService.getOperatingSystem(getOperatingSystemParams);

        // all methods should return a Promise
        expectToBePromise(getOperatingSystemResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/operating_systems/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOperatingSystemTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getOperatingSystemTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getOperatingSystemTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getOperatingSystemParams = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getOperatingSystem(getOperatingSystemParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getOperatingSystem({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getOperatingSystem();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listKeys', () => {
    describe('positive tests', () => {
      function __listKeysTest() {
        // Construct the params object for operation listKeys
        const start = 'testString';
        const limit = 1;
        const listKeysParams = {
          start: start,
          limit: limit,
        };

        const listKeysResult = vpcService.listKeys(listKeysParams);

        // all methods should return a Promise
        expectToBePromise(listKeysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/keys', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listKeysTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listKeysTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listKeysTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listKeysParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listKeys(listKeysParams);
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

      function __createKeyTest() {
        // Construct the params object for operation createKey
        const publicKey =
          'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDDGe50Bxa5T5NDddrrtbx2Y4/VGbiCgXqnBsYToIUKoFSHTQl5IX3PasGnneKanhcLwWz5M5MoCRvhxTp66NKzIfAz7r+FX9rxgR+ZgcM253YAqOVeIpOU408simDZKriTlN8kYsXL7P34tsWuAJf4MgZtJAQxous/2byetpdCv8ddnT4X3ltOg9w+LqSCPYfNivqH00Eh7S1Ldz7I8aw5WOp5a+sQFP/RbwfpwHp+ny7DfeIOokcuI42tJkoBn7UsLTVpCSmXr2EDRlSWe/1M/iHNRBzaT3CK0+SwZWd2AEjePxSnWKNGIEUJDlUYp7hKhiQcgT5ZAnWU121oc5En';
        const name = 'my-key';
        const resourceGroup = resourceGroupIdentityModel;
        const type = 'rsa';
        const createKeyParams = {
          publicKey: publicKey,
          name: name,
          resourceGroup: resourceGroup,
          type: type,
        };

        const createKeyResult = vpcService.createKey(createKeyParams);

        // all methods should return a Promise
        expectToBePromise(createKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/keys', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.public_key).toEqual(publicKey);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.resource_group).toEqual(resourceGroup);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createKeyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createKeyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createKeyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const publicKey =
          'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDDGe50Bxa5T5NDddrrtbx2Y4/VGbiCgXqnBsYToIUKoFSHTQl5IX3PasGnneKanhcLwWz5M5MoCRvhxTp66NKzIfAz7r+FX9rxgR+ZgcM253YAqOVeIpOU408simDZKriTlN8kYsXL7P34tsWuAJf4MgZtJAQxous/2byetpdCv8ddnT4X3ltOg9w+LqSCPYfNivqH00Eh7S1Ldz7I8aw5WOp5a+sQFP/RbwfpwHp+ny7DfeIOokcuI42tJkoBn7UsLTVpCSmXr2EDRlSWe/1M/iHNRBzaT3CK0+SwZWd2AEjePxSnWKNGIEUJDlUYp7hKhiQcgT5ZAnWU121oc5En';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createKeyParams = {
          publicKey,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createKey(createKeyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createKey();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteKey', () => {
    describe('positive tests', () => {
      function __deleteKeyTest() {
        // Construct the params object for operation deleteKey
        const id = 'testString';
        const deleteKeyParams = {
          id: id,
        };

        const deleteKeyResult = vpcService.deleteKey(deleteKeyParams);

        // all methods should return a Promise
        expectToBePromise(deleteKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/keys/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteKeyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteKeyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteKeyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteKeyParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteKey(deleteKeyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteKey();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getKey', () => {
    describe('positive tests', () => {
      function __getKeyTest() {
        // Construct the params object for operation getKey
        const id = 'testString';
        const getKeyParams = {
          id: id,
        };

        const getKeyResult = vpcService.getKey(getKeyParams);

        // all methods should return a Promise
        expectToBePromise(getKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/keys/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getKeyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getKeyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getKeyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getKeyParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getKey(getKeyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getKey();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateKey', () => {
    describe('positive tests', () => {
      function __updateKeyTest() {
        // Construct the params object for operation updateKey
        const id = 'testString';
        const name = 'my-key';
        const updateKeyParams = {
          id: id,
          name: name,
        };

        const updateKeyResult = vpcService.updateKey(updateKeyParams);

        // all methods should return a Promise
        expectToBePromise(updateKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/keys/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateKeyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateKeyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateKeyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateKeyParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateKey(updateKeyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateKey();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listInstanceProfiles', () => {
    describe('positive tests', () => {
      function __listInstanceProfilesTest() {
        // Construct the params object for operation listInstanceProfiles
        const listInstanceProfilesParams = {};

        const listInstanceProfilesResult = vpcService.listInstanceProfiles(
          listInstanceProfilesParams
        );

        // all methods should return a Promise
        expectToBePromise(listInstanceProfilesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instance/profiles', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceProfilesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listInstanceProfilesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listInstanceProfilesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceProfilesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceProfiles(listInstanceProfilesParams);
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
      function __getInstanceProfileTest() {
        // Construct the params object for operation getInstanceProfile
        const name = 'testString';
        const getInstanceProfileParams = {
          name: name,
        };

        const getInstanceProfileResult = vpcService.getInstanceProfile(getInstanceProfileParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instance/profiles/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceProfileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getInstanceProfileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getInstanceProfileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceProfileParams = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceProfile(getInstanceProfileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getInstanceProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getInstanceProfile();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listInstanceTemplates', () => {
    describe('positive tests', () => {
      function __listInstanceTemplatesTest() {
        // Construct the params object for operation listInstanceTemplates
        const listInstanceTemplatesParams = {};

        const listInstanceTemplatesResult = vpcService.listInstanceTemplates(
          listInstanceTemplatesParams
        );

        // all methods should return a Promise
        expectToBePromise(listInstanceTemplatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instance/templates', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceTemplatesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listInstanceTemplatesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listInstanceTemplatesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceTemplatesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceTemplates(listInstanceTemplatesParams);
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

      // InstanceAvailabilityPrototype
      const instanceAvailabilityPrototypeModel = {
        host_failure: 'restart',
      };

      // TrustedProfileIdentityTrustedProfileById
      const trustedProfileIdentityModel = {
        id: 'Profile-9fd84246-7df4-4667-94e4-8ecde51d5ac5',
      };

      // InstanceDefaultTrustedProfilePrototype
      const instanceDefaultTrustedProfilePrototypeModel = {
        auto_link: false,
        target: trustedProfileIdentityModel,
      };

      // KeyIdentityById
      const keyIdentityModel = {
        id: '363f6d70-0000-0001-0000-00000013b96c',
      };

      // InstanceMetadataServicePrototype
      const instanceMetadataServicePrototypeModel = {
        enabled: true,
      };

      // NetworkInterfaceIPPrototypeReservedIPPrototypeNetworkInterfaceContext
      const networkInterfaceIpPrototypeModel = {
        address: '10.0.0.5',
        auto_delete: false,
        name: 'my-reserved-ip',
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
        primary_ip: networkInterfaceIpPrototypeModel,
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
        capacity: 250,
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
        availability_policy: instanceAvailabilityPrototypeModel,
        default_trusted_profile: instanceDefaultTrustedProfilePrototypeModel,
        keys: [keyIdentityModel],
        metadata_service: instanceMetadataServicePrototypeModel,
        name: 'my-instance-template',
        network_interfaces: [networkInterfacePrototypeModel],
        placement_target: instancePlacementTargetPrototypeModel,
        profile: instanceProfileIdentityModel,
        resource_group: resourceGroupIdentityModel,
        total_volume_bandwidth: 500,
        user_data: 'testString',
        volume_attachments: [volumeAttachmentPrototypeInstanceContextModel],
        vpc: vpcIdentityModel,
        boot_volume_attachment: volumeAttachmentPrototypeInstanceByImageContextModel,
        image: imageIdentityModel,
        primary_network_interface: networkInterfacePrototypeModel,
        zone: zoneIdentityModel,
      };

      function __createInstanceTemplateTest() {
        // Construct the params object for operation createInstanceTemplate
        const instanceTemplatePrototype = instanceTemplatePrototypeModel;
        const createInstanceTemplateParams = {
          instanceTemplatePrototype: instanceTemplatePrototype,
        };

        const createInstanceTemplateResult = vpcService.createInstanceTemplate(
          createInstanceTemplateParams
        );

        // all methods should return a Promise
        expectToBePromise(createInstanceTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instance/templates', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(instanceTemplatePrototype);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createInstanceTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createInstanceTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createInstanceTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceTemplatePrototype = instanceTemplatePrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createInstanceTemplateParams = {
          instanceTemplatePrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstanceTemplate(createInstanceTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createInstanceTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createInstanceTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteInstanceTemplate', () => {
    describe('positive tests', () => {
      function __deleteInstanceTemplateTest() {
        // Construct the params object for operation deleteInstanceTemplate
        const id = 'testString';
        const deleteInstanceTemplateParams = {
          id: id,
        };

        const deleteInstanceTemplateResult = vpcService.deleteInstanceTemplate(
          deleteInstanceTemplateParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteInstanceTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instance/templates/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteInstanceTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteInstanceTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceTemplateParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceTemplate(deleteInstanceTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteInstanceTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteInstanceTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getInstanceTemplate', () => {
    describe('positive tests', () => {
      function __getInstanceTemplateTest() {
        // Construct the params object for operation getInstanceTemplate
        const id = 'testString';
        const getInstanceTemplateParams = {
          id: id,
        };

        const getInstanceTemplateResult = vpcService.getInstanceTemplate(getInstanceTemplateParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instance/templates/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getInstanceTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getInstanceTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceTemplateParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceTemplate(getInstanceTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getInstanceTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getInstanceTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateInstanceTemplate', () => {
    describe('positive tests', () => {
      function __updateInstanceTemplateTest() {
        // Construct the params object for operation updateInstanceTemplate
        const id = 'testString';
        const name = 'my-instance-template';
        const updateInstanceTemplateParams = {
          id: id,
          name: name,
        };

        const updateInstanceTemplateResult = vpcService.updateInstanceTemplate(
          updateInstanceTemplateParams
        );

        // all methods should return a Promise
        expectToBePromise(updateInstanceTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instance/templates/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateInstanceTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateInstanceTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateInstanceTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateInstanceTemplateParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstanceTemplate(updateInstanceTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateInstanceTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateInstanceTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listInstances', () => {
    describe('positive tests', () => {
      function __listInstancesTest() {
        // Construct the params object for operation listInstances
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const name = 'testString';
        const vpcId = 'testString';
        const vpcCrn = 'testString';
        const vpcName = 'testString';
        const dedicatedHostId = 'testString';
        const dedicatedHostCrn = 'testString';
        const dedicatedHostName = 'testString';
        const placementGroupId = 'testString';
        const placementGroupCrn = 'testString';
        const placementGroupName = 'testString';
        const listInstancesParams = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          name: name,
          vpcId: vpcId,
          vpcCrn: vpcCrn,
          vpcName: vpcName,
          dedicatedHostId: dedicatedHostId,
          dedicatedHostCrn: dedicatedHostCrn,
          dedicatedHostName: dedicatedHostName,
          placementGroupId: placementGroupId,
          placementGroupCrn: placementGroupCrn,
          placementGroupName: placementGroupName,
        };

        const listInstancesResult = vpcService.listInstances(listInstancesParams);

        // all methods should return a Promise
        expectToBePromise(listInstancesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs['vpc.id']).toEqual(vpcId);
        expect(mockRequestOptions.qs['vpc.crn']).toEqual(vpcCrn);
        expect(mockRequestOptions.qs['vpc.name']).toEqual(vpcName);
        expect(mockRequestOptions.qs['dedicated_host.id']).toEqual(dedicatedHostId);
        expect(mockRequestOptions.qs['dedicated_host.crn']).toEqual(dedicatedHostCrn);
        expect(mockRequestOptions.qs['dedicated_host.name']).toEqual(dedicatedHostName);
        expect(mockRequestOptions.qs['placement_group.id']).toEqual(placementGroupId);
        expect(mockRequestOptions.qs['placement_group.crn']).toEqual(placementGroupCrn);
        expect(mockRequestOptions.qs['placement_group.name']).toEqual(placementGroupName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstancesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listInstancesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listInstancesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstancesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstances(listInstancesParams);
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

      // InstanceAvailabilityPrototype
      const instanceAvailabilityPrototypeModel = {
        host_failure: 'restart',
      };

      // TrustedProfileIdentityTrustedProfileById
      const trustedProfileIdentityModel = {
        id: 'Profile-9fd84246-7df4-4667-94e4-8ecde51d5ac5',
      };

      // InstanceDefaultTrustedProfilePrototype
      const instanceDefaultTrustedProfilePrototypeModel = {
        auto_link: false,
        target: trustedProfileIdentityModel,
      };

      // KeyIdentityById
      const keyIdentityModel = {
        id: '363f6d70-0000-0001-0000-00000013b96c',
      };

      // InstanceMetadataServicePrototype
      const instanceMetadataServicePrototypeModel = {
        enabled: true,
      };

      // NetworkInterfaceIPPrototypeReservedIPPrototypeNetworkInterfaceContext
      const networkInterfaceIpPrototypeModel = {
        address: '10.0.0.5',
        auto_delete: false,
        name: 'my-reserved-ip',
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
        primary_ip: networkInterfaceIpPrototypeModel,
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
        capacity: 250,
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
        availability_policy: instanceAvailabilityPrototypeModel,
        default_trusted_profile: instanceDefaultTrustedProfilePrototypeModel,
        keys: [keyIdentityModel],
        metadata_service: instanceMetadataServicePrototypeModel,
        name: 'my-instance',
        network_interfaces: [networkInterfacePrototypeModel],
        placement_target: instancePlacementTargetPrototypeModel,
        profile: instanceProfileIdentityModel,
        resource_group: resourceGroupIdentityModel,
        total_volume_bandwidth: 500,
        user_data: 'testString',
        volume_attachments: [volumeAttachmentPrototypeInstanceContextModel],
        vpc: vpcIdentityModel,
        boot_volume_attachment: volumeAttachmentPrototypeInstanceByImageContextModel,
        image: imageIdentityModel,
        primary_network_interface: networkInterfacePrototypeModel,
        zone: zoneIdentityModel,
      };

      function __createInstanceTest() {
        // Construct the params object for operation createInstance
        const instancePrototype = instancePrototypeModel;
        const createInstanceParams = {
          instancePrototype: instancePrototype,
        };

        const createInstanceResult = vpcService.createInstance(createInstanceParams);

        // all methods should return a Promise
        expectToBePromise(createInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(instancePrototype);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instancePrototype = instancePrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createInstanceParams = {
          instancePrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstance(createInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteInstance', () => {
    describe('positive tests', () => {
      function __deleteInstanceTest() {
        // Construct the params object for operation deleteInstance
        const id = 'testString';
        const deleteInstanceParams = {
          id: id,
        };

        const deleteInstanceResult = vpcService.deleteInstance(deleteInstanceParams);

        // all methods should return a Promise
        expectToBePromise(deleteInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstance(deleteInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getInstance', () => {
    describe('positive tests', () => {
      function __getInstanceTest() {
        // Construct the params object for operation getInstance
        const id = 'testString';
        const getInstanceParams = {
          id: id,
        };

        const getInstanceResult = vpcService.getInstance(getInstanceParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstance(getInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateInstance', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // InstanceAvailabilityPolicyPatch
      const instanceAvailabilityPolicyPatchModel = {
        host_failure: 'restart',
      };

      // InstanceMetadataServicePatch
      const instanceMetadataServicePatchModel = {
        enabled: true,
      };

      // InstancePlacementTargetPatchDedicatedHostIdentityDedicatedHostIdentityById
      const instancePlacementTargetPatchModel = {
        id: '1e09281b-f177-46fb-baf1-bc152b2e391a',
      };

      // InstancePatchProfileInstanceProfileIdentityByName
      const instancePatchProfileModel = {
        name: 'bx2-4x16',
      };

      function __updateInstanceTest() {
        // Construct the params object for operation updateInstance
        const id = 'testString';
        const availabilityPolicy = instanceAvailabilityPolicyPatchModel;
        const metadataService = instanceMetadataServicePatchModel;
        const name = 'my-instance';
        const placementTarget = instancePlacementTargetPatchModel;
        const profile = instancePatchProfileModel;
        const totalVolumeBandwidth = 500;
        const updateInstanceParams = {
          id: id,
          availabilityPolicy: availabilityPolicy,
          metadataService: metadataService,
          name: name,
          placementTarget: placementTarget,
          profile: profile,
          totalVolumeBandwidth: totalVolumeBandwidth,
        };

        const updateInstanceResult = vpcService.updateInstance(updateInstanceParams);

        // all methods should return a Promise
        expectToBePromise(updateInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.availability_policy).toEqual(availabilityPolicy);
        expect(mockRequestOptions.body.metadata_service).toEqual(metadataService);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.placement_target).toEqual(placementTarget);
        expect(mockRequestOptions.body.profile).toEqual(profile);
        expect(mockRequestOptions.body.total_volume_bandwidth).toEqual(totalVolumeBandwidth);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateInstanceParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstance(updateInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getInstanceInitialization', () => {
    describe('positive tests', () => {
      function __getInstanceInitializationTest() {
        // Construct the params object for operation getInstanceInitialization
        const id = 'testString';
        const getInstanceInitializationParams = {
          id: id,
        };

        const getInstanceInitializationResult = vpcService.getInstanceInitialization(
          getInstanceInitializationParams
        );

        // all methods should return a Promise
        expectToBePromise(getInstanceInitializationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{id}/initialization', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceInitializationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getInstanceInitializationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getInstanceInitializationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceInitializationParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceInitialization(getInstanceInitializationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getInstanceInitialization({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getInstanceInitialization();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createInstanceAction', () => {
    describe('positive tests', () => {
      function __createInstanceActionTest() {
        // Construct the params object for operation createInstanceAction
        const instanceId = 'testString';
        const type = 'reboot';
        const force = true;
        const createInstanceActionParams = {
          instanceId: instanceId,
          type: type,
          force: force,
        };

        const createInstanceActionResult = vpcService.createInstanceAction(
          createInstanceActionParams
        );

        // all methods should return a Promise
        expectToBePromise(createInstanceActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/actions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.force).toEqual(force);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createInstanceActionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createInstanceActionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createInstanceActionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const type = 'reboot';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createInstanceActionParams = {
          instanceId,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstanceAction(createInstanceActionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createInstanceAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createInstanceAction();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createInstanceConsoleAccessToken', () => {
    describe('positive tests', () => {
      function __createInstanceConsoleAccessTokenTest() {
        // Construct the params object for operation createInstanceConsoleAccessToken
        const instanceId = 'testString';
        const consoleType = 'serial';
        const force = false;
        const createInstanceConsoleAccessTokenParams = {
          instanceId: instanceId,
          consoleType: consoleType,
          force: force,
        };

        const createInstanceConsoleAccessTokenResult = vpcService.createInstanceConsoleAccessToken(
          createInstanceConsoleAccessTokenParams
        );

        // all methods should return a Promise
        expectToBePromise(createInstanceConsoleAccessTokenResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/console_access_token',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.console_type).toEqual(consoleType);
        expect(mockRequestOptions.body.force).toEqual(force);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createInstanceConsoleAccessTokenTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createInstanceConsoleAccessTokenTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createInstanceConsoleAccessTokenTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const consoleType = 'serial';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createInstanceConsoleAccessTokenParams = {
          instanceId,
          consoleType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstanceConsoleAccessToken(createInstanceConsoleAccessTokenParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createInstanceConsoleAccessToken({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createInstanceConsoleAccessToken();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listInstanceDisks', () => {
    describe('positive tests', () => {
      function __listInstanceDisksTest() {
        // Construct the params object for operation listInstanceDisks
        const instanceId = 'testString';
        const listInstanceDisksParams = {
          instanceId: instanceId,
        };

        const listInstanceDisksResult = vpcService.listInstanceDisks(listInstanceDisksParams);

        // all methods should return a Promise
        expectToBePromise(listInstanceDisksResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/disks', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceDisksTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listInstanceDisksTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listInstanceDisksTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceDisksParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceDisks(listInstanceDisksParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listInstanceDisks({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listInstanceDisks();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getInstanceDisk', () => {
    describe('positive tests', () => {
      function __getInstanceDiskTest() {
        // Construct the params object for operation getInstanceDisk
        const instanceId = 'testString';
        const id = 'testString';
        const getInstanceDiskParams = {
          instanceId: instanceId,
          id: id,
        };

        const getInstanceDiskResult = vpcService.getInstanceDisk(getInstanceDiskParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceDiskResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/disks/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceDiskTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getInstanceDiskTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getInstanceDiskTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceDiskParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceDisk(getInstanceDiskParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getInstanceDisk({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getInstanceDisk();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateInstanceDisk', () => {
    describe('positive tests', () => {
      function __updateInstanceDiskTest() {
        // Construct the params object for operation updateInstanceDisk
        const instanceId = 'testString';
        const id = 'testString';
        const name = 'my-instance-disk-updated';
        const updateInstanceDiskParams = {
          instanceId: instanceId,
          id: id,
          name: name,
        };

        const updateInstanceDiskResult = vpcService.updateInstanceDisk(updateInstanceDiskParams);

        // all methods should return a Promise
        expectToBePromise(updateInstanceDiskResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/disks/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateInstanceDiskTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateInstanceDiskTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateInstanceDiskTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateInstanceDiskParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstanceDisk(updateInstanceDiskParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateInstanceDisk({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateInstanceDisk();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listInstanceNetworkInterfaces', () => {
    describe('positive tests', () => {
      function __listInstanceNetworkInterfacesTest() {
        // Construct the params object for operation listInstanceNetworkInterfaces
        const instanceId = 'testString';
        const listInstanceNetworkInterfacesParams = {
          instanceId: instanceId,
        };

        const listInstanceNetworkInterfacesResult = vpcService.listInstanceNetworkInterfaces(
          listInstanceNetworkInterfacesParams
        );

        // all methods should return a Promise
        expectToBePromise(listInstanceNetworkInterfacesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/network_interfaces', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceNetworkInterfacesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listInstanceNetworkInterfacesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listInstanceNetworkInterfacesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceNetworkInterfacesParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceNetworkInterfaces(listInstanceNetworkInterfacesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listInstanceNetworkInterfaces({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listInstanceNetworkInterfaces();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      // NetworkInterfaceIPPrototypeReservedIPPrototypeNetworkInterfaceContext
      const networkInterfaceIpPrototypeModel = {
        address: '10.0.0.5',
        auto_delete: false,
        name: 'my-reserved-ip',
      };

      // SecurityGroupIdentityById
      const securityGroupIdentityModel = {
        id: 'be5df5ca-12a0-494b-907e-aa6ec2bfa271',
      };

      function __createInstanceNetworkInterfaceTest() {
        // Construct the params object for operation createInstanceNetworkInterface
        const instanceId = 'testString';
        const subnet = subnetIdentityModel;
        const allowIpSpoofing = true;
        const name = 'my-network-interface';
        const primaryIp = networkInterfaceIpPrototypeModel;
        const securityGroups = [securityGroupIdentityModel];
        const createInstanceNetworkInterfaceParams = {
          instanceId: instanceId,
          subnet: subnet,
          allowIpSpoofing: allowIpSpoofing,
          name: name,
          primaryIp: primaryIp,
          securityGroups: securityGroups,
        };

        const createInstanceNetworkInterfaceResult = vpcService.createInstanceNetworkInterface(
          createInstanceNetworkInterfaceParams
        );

        // all methods should return a Promise
        expectToBePromise(createInstanceNetworkInterfaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/network_interfaces',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.subnet).toEqual(subnet);
        expect(mockRequestOptions.body.allow_ip_spoofing).toEqual(allowIpSpoofing);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.primary_ip).toEqual(primaryIp);
        expect(mockRequestOptions.body.security_groups).toEqual(securityGroups);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createInstanceNetworkInterfaceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createInstanceNetworkInterfaceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createInstanceNetworkInterfaceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const subnet = subnetIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createInstanceNetworkInterfaceParams = {
          instanceId,
          subnet,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstanceNetworkInterface(createInstanceNetworkInterfaceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createInstanceNetworkInterface({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createInstanceNetworkInterface();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteInstanceNetworkInterface', () => {
    describe('positive tests', () => {
      function __deleteInstanceNetworkInterfaceTest() {
        // Construct the params object for operation deleteInstanceNetworkInterface
        const instanceId = 'testString';
        const id = 'testString';
        const deleteInstanceNetworkInterfaceParams = {
          instanceId: instanceId,
          id: id,
        };

        const deleteInstanceNetworkInterfaceResult = vpcService.deleteInstanceNetworkInterface(
          deleteInstanceNetworkInterfaceParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteInstanceNetworkInterfaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/network_interfaces/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceNetworkInterfaceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteInstanceNetworkInterfaceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteInstanceNetworkInterfaceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceNetworkInterfaceParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceNetworkInterface(deleteInstanceNetworkInterfaceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteInstanceNetworkInterface({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteInstanceNetworkInterface();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getInstanceNetworkInterface', () => {
    describe('positive tests', () => {
      function __getInstanceNetworkInterfaceTest() {
        // Construct the params object for operation getInstanceNetworkInterface
        const instanceId = 'testString';
        const id = 'testString';
        const getInstanceNetworkInterfaceParams = {
          instanceId: instanceId,
          id: id,
        };

        const getInstanceNetworkInterfaceResult = vpcService.getInstanceNetworkInterface(
          getInstanceNetworkInterfaceParams
        );

        // all methods should return a Promise
        expectToBePromise(getInstanceNetworkInterfaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/network_interfaces/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceNetworkInterfaceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getInstanceNetworkInterfaceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getInstanceNetworkInterfaceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceNetworkInterfaceParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceNetworkInterface(getInstanceNetworkInterfaceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getInstanceNetworkInterface({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getInstanceNetworkInterface();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateInstanceNetworkInterface', () => {
    describe('positive tests', () => {
      function __updateInstanceNetworkInterfaceTest() {
        // Construct the params object for operation updateInstanceNetworkInterface
        const instanceId = 'testString';
        const id = 'testString';
        const allowIpSpoofing = true;
        const name = 'my-network-interface-1';
        const updateInstanceNetworkInterfaceParams = {
          instanceId: instanceId,
          id: id,
          allowIpSpoofing: allowIpSpoofing,
          name: name,
        };

        const updateInstanceNetworkInterfaceResult = vpcService.updateInstanceNetworkInterface(
          updateInstanceNetworkInterfaceParams
        );

        // all methods should return a Promise
        expectToBePromise(updateInstanceNetworkInterfaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/network_interfaces/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.allow_ip_spoofing).toEqual(allowIpSpoofing);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateInstanceNetworkInterfaceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateInstanceNetworkInterfaceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateInstanceNetworkInterfaceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateInstanceNetworkInterfaceParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstanceNetworkInterface(updateInstanceNetworkInterfaceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateInstanceNetworkInterface({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateInstanceNetworkInterface();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listInstanceNetworkInterfaceFloatingIps', () => {
    describe('positive tests', () => {
      function __listInstanceNetworkInterfaceFloatingIpsTest() {
        // Construct the params object for operation listInstanceNetworkInterfaceFloatingIps
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const listInstanceNetworkInterfaceFloatingIpsParams = {
          instanceId: instanceId,
          networkInterfaceId: networkInterfaceId,
        };

        const listInstanceNetworkInterfaceFloatingIpsResult = vpcService.listInstanceNetworkInterfaceFloatingIps(
          listInstanceNetworkInterfaceFloatingIpsParams
        );

        // all methods should return a Promise
        expectToBePromise(listInstanceNetworkInterfaceFloatingIpsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/network_interfaces/{network_interface_id}/floating_ips',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.network_interface_id).toEqual(networkInterfaceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceNetworkInterfaceFloatingIpsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listInstanceNetworkInterfaceFloatingIpsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listInstanceNetworkInterfaceFloatingIpsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceNetworkInterfaceFloatingIpsParams = {
          instanceId,
          networkInterfaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceNetworkInterfaceFloatingIps(
          listInstanceNetworkInterfaceFloatingIpsParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listInstanceNetworkInterfaceFloatingIps({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listInstanceNetworkInterfaceFloatingIps();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('removeInstanceNetworkInterfaceFloatingIp', () => {
    describe('positive tests', () => {
      function __removeInstanceNetworkInterfaceFloatingIpTest() {
        // Construct the params object for operation removeInstanceNetworkInterfaceFloatingIp
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const removeInstanceNetworkInterfaceFloatingIpParams = {
          instanceId: instanceId,
          networkInterfaceId: networkInterfaceId,
          id: id,
        };

        const removeInstanceNetworkInterfaceFloatingIpResult = vpcService.removeInstanceNetworkInterfaceFloatingIp(
          removeInstanceNetworkInterfaceFloatingIpParams
        );

        // all methods should return a Promise
        expectToBePromise(removeInstanceNetworkInterfaceFloatingIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/network_interfaces/{network_interface_id}/floating_ips/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.network_interface_id).toEqual(networkInterfaceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __removeInstanceNetworkInterfaceFloatingIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __removeInstanceNetworkInterfaceFloatingIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __removeInstanceNetworkInterfaceFloatingIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const removeInstanceNetworkInterfaceFloatingIpParams = {
          instanceId,
          networkInterfaceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.removeInstanceNetworkInterfaceFloatingIp(
          removeInstanceNetworkInterfaceFloatingIpParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.removeInstanceNetworkInterfaceFloatingIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.removeInstanceNetworkInterfaceFloatingIp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getInstanceNetworkInterfaceFloatingIp', () => {
    describe('positive tests', () => {
      function __getInstanceNetworkInterfaceFloatingIpTest() {
        // Construct the params object for operation getInstanceNetworkInterfaceFloatingIp
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const getInstanceNetworkInterfaceFloatingIpParams = {
          instanceId: instanceId,
          networkInterfaceId: networkInterfaceId,
          id: id,
        };

        const getInstanceNetworkInterfaceFloatingIpResult = vpcService.getInstanceNetworkInterfaceFloatingIp(
          getInstanceNetworkInterfaceFloatingIpParams
        );

        // all methods should return a Promise
        expectToBePromise(getInstanceNetworkInterfaceFloatingIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/network_interfaces/{network_interface_id}/floating_ips/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.network_interface_id).toEqual(networkInterfaceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceNetworkInterfaceFloatingIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getInstanceNetworkInterfaceFloatingIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getInstanceNetworkInterfaceFloatingIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceNetworkInterfaceFloatingIpParams = {
          instanceId,
          networkInterfaceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceNetworkInterfaceFloatingIp(
          getInstanceNetworkInterfaceFloatingIpParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getInstanceNetworkInterfaceFloatingIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getInstanceNetworkInterfaceFloatingIp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('addInstanceNetworkInterfaceFloatingIp', () => {
    describe('positive tests', () => {
      function __addInstanceNetworkInterfaceFloatingIpTest() {
        // Construct the params object for operation addInstanceNetworkInterfaceFloatingIp
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const addInstanceNetworkInterfaceFloatingIpParams = {
          instanceId: instanceId,
          networkInterfaceId: networkInterfaceId,
          id: id,
        };

        const addInstanceNetworkInterfaceFloatingIpResult = vpcService.addInstanceNetworkInterfaceFloatingIp(
          addInstanceNetworkInterfaceFloatingIpParams
        );

        // all methods should return a Promise
        expectToBePromise(addInstanceNetworkInterfaceFloatingIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/network_interfaces/{network_interface_id}/floating_ips/{id}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.network_interface_id).toEqual(networkInterfaceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addInstanceNetworkInterfaceFloatingIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __addInstanceNetworkInterfaceFloatingIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __addInstanceNetworkInterfaceFloatingIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addInstanceNetworkInterfaceFloatingIpParams = {
          instanceId,
          networkInterfaceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.addInstanceNetworkInterfaceFloatingIp(
          addInstanceNetworkInterfaceFloatingIpParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.addInstanceNetworkInterfaceFloatingIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.addInstanceNetworkInterfaceFloatingIp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listInstanceNetworkInterfaceIps', () => {
    describe('positive tests', () => {
      function __listInstanceNetworkInterfaceIpsTest() {
        // Construct the params object for operation listInstanceNetworkInterfaceIps
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const start = 'testString';
        const limit = 1;
        const listInstanceNetworkInterfaceIpsParams = {
          instanceId: instanceId,
          networkInterfaceId: networkInterfaceId,
          start: start,
          limit: limit,
        };

        const listInstanceNetworkInterfaceIpsResult = vpcService.listInstanceNetworkInterfaceIps(
          listInstanceNetworkInterfaceIpsParams
        );

        // all methods should return a Promise
        expectToBePromise(listInstanceNetworkInterfaceIpsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/network_interfaces/{network_interface_id}/ips',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.network_interface_id).toEqual(networkInterfaceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceNetworkInterfaceIpsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listInstanceNetworkInterfaceIpsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listInstanceNetworkInterfaceIpsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceNetworkInterfaceIpsParams = {
          instanceId,
          networkInterfaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceNetworkInterfaceIps(listInstanceNetworkInterfaceIpsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listInstanceNetworkInterfaceIps({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listInstanceNetworkInterfaceIps();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getInstanceNetworkInterfaceIp', () => {
    describe('positive tests', () => {
      function __getInstanceNetworkInterfaceIpTest() {
        // Construct the params object for operation getInstanceNetworkInterfaceIp
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const getInstanceNetworkInterfaceIpParams = {
          instanceId: instanceId,
          networkInterfaceId: networkInterfaceId,
          id: id,
        };

        const getInstanceNetworkInterfaceIpResult = vpcService.getInstanceNetworkInterfaceIp(
          getInstanceNetworkInterfaceIpParams
        );

        // all methods should return a Promise
        expectToBePromise(getInstanceNetworkInterfaceIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/network_interfaces/{network_interface_id}/ips/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.network_interface_id).toEqual(networkInterfaceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceNetworkInterfaceIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getInstanceNetworkInterfaceIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getInstanceNetworkInterfaceIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceNetworkInterfaceIpParams = {
          instanceId,
          networkInterfaceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceNetworkInterfaceIp(getInstanceNetworkInterfaceIpParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getInstanceNetworkInterfaceIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getInstanceNetworkInterfaceIp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listInstanceVolumeAttachments', () => {
    describe('positive tests', () => {
      function __listInstanceVolumeAttachmentsTest() {
        // Construct the params object for operation listInstanceVolumeAttachments
        const instanceId = 'testString';
        const listInstanceVolumeAttachmentsParams = {
          instanceId: instanceId,
        };

        const listInstanceVolumeAttachmentsResult = vpcService.listInstanceVolumeAttachments(
          listInstanceVolumeAttachmentsParams
        );

        // all methods should return a Promise
        expectToBePromise(listInstanceVolumeAttachmentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/volume_attachments', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceVolumeAttachmentsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listInstanceVolumeAttachmentsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listInstanceVolumeAttachmentsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceVolumeAttachmentsParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceVolumeAttachments(listInstanceVolumeAttachmentsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listInstanceVolumeAttachments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listInstanceVolumeAttachments();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createInstanceVolumeAttachment', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // VolumeAttachmentPrototypeVolumeVolumeIdentityVolumeIdentityById
      const volumeAttachmentPrototypeVolumeModel = {
        id: '1a6b7274-678d-4dfb-8981-c71dd9d4daa5',
      };

      function __createInstanceVolumeAttachmentTest() {
        // Construct the params object for operation createInstanceVolumeAttachment
        const instanceId = 'testString';
        const volume = volumeAttachmentPrototypeVolumeModel;
        const deleteVolumeOnInstanceDelete = false;
        const name = 'my-volume-attachment';
        const createInstanceVolumeAttachmentParams = {
          instanceId: instanceId,
          volume: volume,
          deleteVolumeOnInstanceDelete: deleteVolumeOnInstanceDelete,
          name: name,
        };

        const createInstanceVolumeAttachmentResult = vpcService.createInstanceVolumeAttachment(
          createInstanceVolumeAttachmentParams
        );

        // all methods should return a Promise
        expectToBePromise(createInstanceVolumeAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/volume_attachments',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.volume).toEqual(volume);
        expect(mockRequestOptions.body.delete_volume_on_instance_delete).toEqual(
          deleteVolumeOnInstanceDelete
        );
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createInstanceVolumeAttachmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createInstanceVolumeAttachmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createInstanceVolumeAttachmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const volume = volumeAttachmentPrototypeVolumeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createInstanceVolumeAttachmentParams = {
          instanceId,
          volume,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstanceVolumeAttachment(createInstanceVolumeAttachmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createInstanceVolumeAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createInstanceVolumeAttachment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteInstanceVolumeAttachment', () => {
    describe('positive tests', () => {
      function __deleteInstanceVolumeAttachmentTest() {
        // Construct the params object for operation deleteInstanceVolumeAttachment
        const instanceId = 'testString';
        const id = 'testString';
        const deleteInstanceVolumeAttachmentParams = {
          instanceId: instanceId,
          id: id,
        };

        const deleteInstanceVolumeAttachmentResult = vpcService.deleteInstanceVolumeAttachment(
          deleteInstanceVolumeAttachmentParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteInstanceVolumeAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/volume_attachments/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceVolumeAttachmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteInstanceVolumeAttachmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteInstanceVolumeAttachmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceVolumeAttachmentParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceVolumeAttachment(deleteInstanceVolumeAttachmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteInstanceVolumeAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteInstanceVolumeAttachment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getInstanceVolumeAttachment', () => {
    describe('positive tests', () => {
      function __getInstanceVolumeAttachmentTest() {
        // Construct the params object for operation getInstanceVolumeAttachment
        const instanceId = 'testString';
        const id = 'testString';
        const getInstanceVolumeAttachmentParams = {
          instanceId: instanceId,
          id: id,
        };

        const getInstanceVolumeAttachmentResult = vpcService.getInstanceVolumeAttachment(
          getInstanceVolumeAttachmentParams
        );

        // all methods should return a Promise
        expectToBePromise(getInstanceVolumeAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/volume_attachments/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceVolumeAttachmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getInstanceVolumeAttachmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getInstanceVolumeAttachmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceVolumeAttachmentParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceVolumeAttachment(getInstanceVolumeAttachmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getInstanceVolumeAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getInstanceVolumeAttachment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateInstanceVolumeAttachment', () => {
    describe('positive tests', () => {
      function __updateInstanceVolumeAttachmentTest() {
        // Construct the params object for operation updateInstanceVolumeAttachment
        const instanceId = 'testString';
        const id = 'testString';
        const deleteVolumeOnInstanceDelete = true;
        const name = 'my-volume-attachment';
        const updateInstanceVolumeAttachmentParams = {
          instanceId: instanceId,
          id: id,
          deleteVolumeOnInstanceDelete: deleteVolumeOnInstanceDelete,
          name: name,
        };

        const updateInstanceVolumeAttachmentResult = vpcService.updateInstanceVolumeAttachment(
          updateInstanceVolumeAttachmentParams
        );

        // all methods should return a Promise
        expectToBePromise(updateInstanceVolumeAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/volume_attachments/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.delete_volume_on_instance_delete).toEqual(
          deleteVolumeOnInstanceDelete
        );
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateInstanceVolumeAttachmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateInstanceVolumeAttachmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateInstanceVolumeAttachmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateInstanceVolumeAttachmentParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstanceVolumeAttachment(updateInstanceVolumeAttachmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateInstanceVolumeAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateInstanceVolumeAttachment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listInstanceGroups', () => {
    describe('positive tests', () => {
      function __listInstanceGroupsTest() {
        // Construct the params object for operation listInstanceGroups
        const start = 'testString';
        const limit = 1;
        const listInstanceGroupsParams = {
          start: start,
          limit: limit,
        };

        const listInstanceGroupsResult = vpcService.listInstanceGroups(listInstanceGroupsParams);

        // all methods should return a Promise
        expectToBePromise(listInstanceGroupsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instance_groups', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceGroupsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listInstanceGroupsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listInstanceGroupsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceGroupsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceGroups(listInstanceGroupsParams);
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

      function __createInstanceGroupTest() {
        // Construct the params object for operation createInstanceGroup
        const instanceTemplate = instanceTemplateIdentityModel;
        const subnets = [subnetIdentityModel];
        const applicationPort = 22;
        const loadBalancer = loadBalancerIdentityModel;
        const loadBalancerPool = loadBalancerPoolIdentityModel;
        const membershipCount = 10;
        const name = 'my-instance-group';
        const resourceGroup = resourceGroupIdentityModel;
        const createInstanceGroupParams = {
          instanceTemplate: instanceTemplate,
          subnets: subnets,
          applicationPort: applicationPort,
          loadBalancer: loadBalancer,
          loadBalancerPool: loadBalancerPool,
          membershipCount: membershipCount,
          name: name,
          resourceGroup: resourceGroup,
        };

        const createInstanceGroupResult = vpcService.createInstanceGroup(createInstanceGroupParams);

        // all methods should return a Promise
        expectToBePromise(createInstanceGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instance_groups', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.instance_template).toEqual(instanceTemplate);
        expect(mockRequestOptions.body.subnets).toEqual(subnets);
        expect(mockRequestOptions.body.application_port).toEqual(applicationPort);
        expect(mockRequestOptions.body.load_balancer).toEqual(loadBalancer);
        expect(mockRequestOptions.body.load_balancer_pool).toEqual(loadBalancerPool);
        expect(mockRequestOptions.body.membership_count).toEqual(membershipCount);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.resource_group).toEqual(resourceGroup);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createInstanceGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createInstanceGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createInstanceGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceTemplate = instanceTemplateIdentityModel;
        const subnets = [subnetIdentityModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createInstanceGroupParams = {
          instanceTemplate,
          subnets,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstanceGroup(createInstanceGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createInstanceGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createInstanceGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteInstanceGroup', () => {
    describe('positive tests', () => {
      function __deleteInstanceGroupTest() {
        // Construct the params object for operation deleteInstanceGroup
        const id = 'testString';
        const deleteInstanceGroupParams = {
          id: id,
        };

        const deleteInstanceGroupResult = vpcService.deleteInstanceGroup(deleteInstanceGroupParams);

        // all methods should return a Promise
        expectToBePromise(deleteInstanceGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instance_groups/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteInstanceGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteInstanceGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceGroupParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceGroup(deleteInstanceGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteInstanceGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteInstanceGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getInstanceGroup', () => {
    describe('positive tests', () => {
      function __getInstanceGroupTest() {
        // Construct the params object for operation getInstanceGroup
        const id = 'testString';
        const getInstanceGroupParams = {
          id: id,
        };

        const getInstanceGroupResult = vpcService.getInstanceGroup(getInstanceGroupParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instance_groups/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getInstanceGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getInstanceGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceGroupParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceGroup(getInstanceGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getInstanceGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getInstanceGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __updateInstanceGroupTest() {
        // Construct the params object for operation updateInstanceGroup
        const id = 'testString';
        const applicationPort = 22;
        const instanceTemplate = instanceTemplateIdentityModel;
        const loadBalancer = loadBalancerIdentityModel;
        const loadBalancerPool = loadBalancerPoolIdentityModel;
        const membershipCount = 10;
        const name = 'my-instance-group';
        const subnets = [subnetIdentityModel];
        const updateInstanceGroupParams = {
          id: id,
          applicationPort: applicationPort,
          instanceTemplate: instanceTemplate,
          loadBalancer: loadBalancer,
          loadBalancerPool: loadBalancerPool,
          membershipCount: membershipCount,
          name: name,
          subnets: subnets,
        };

        const updateInstanceGroupResult = vpcService.updateInstanceGroup(updateInstanceGroupParams);

        // all methods should return a Promise
        expectToBePromise(updateInstanceGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instance_groups/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.application_port).toEqual(applicationPort);
        expect(mockRequestOptions.body.instance_template).toEqual(instanceTemplate);
        expect(mockRequestOptions.body.load_balancer).toEqual(loadBalancer);
        expect(mockRequestOptions.body.load_balancer_pool).toEqual(loadBalancerPool);
        expect(mockRequestOptions.body.membership_count).toEqual(membershipCount);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.subnets).toEqual(subnets);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateInstanceGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateInstanceGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateInstanceGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateInstanceGroupParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstanceGroup(updateInstanceGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateInstanceGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateInstanceGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteInstanceGroupLoadBalancer', () => {
    describe('positive tests', () => {
      function __deleteInstanceGroupLoadBalancerTest() {
        // Construct the params object for operation deleteInstanceGroupLoadBalancer
        const instanceGroupId = 'testString';
        const deleteInstanceGroupLoadBalancerParams = {
          instanceGroupId: instanceGroupId,
        };

        const deleteInstanceGroupLoadBalancerResult = vpcService.deleteInstanceGroupLoadBalancer(
          deleteInstanceGroupLoadBalancerParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteInstanceGroupLoadBalancerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/load_balancer',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceGroupLoadBalancerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteInstanceGroupLoadBalancerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteInstanceGroupLoadBalancerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceGroupLoadBalancerParams = {
          instanceGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceGroupLoadBalancer(deleteInstanceGroupLoadBalancerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteInstanceGroupLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteInstanceGroupLoadBalancer();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listInstanceGroupManagers', () => {
    describe('positive tests', () => {
      function __listInstanceGroupManagersTest() {
        // Construct the params object for operation listInstanceGroupManagers
        const instanceGroupId = 'testString';
        const start = 'testString';
        const limit = 1;
        const listInstanceGroupManagersParams = {
          instanceGroupId: instanceGroupId,
          start: start,
          limit: limit,
        };

        const listInstanceGroupManagersResult = vpcService.listInstanceGroupManagers(
          listInstanceGroupManagersParams
        );

        // all methods should return a Promise
        expectToBePromise(listInstanceGroupManagersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/managers',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceGroupManagersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listInstanceGroupManagersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listInstanceGroupManagersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceGroupManagersParams = {
          instanceGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceGroupManagers(listInstanceGroupManagersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listInstanceGroupManagers({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listInstanceGroupManagers();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createInstanceGroupManagerTest() {
        // Construct the params object for operation createInstanceGroupManager
        const instanceGroupId = 'testString';
        const instanceGroupManagerPrototype = instanceGroupManagerPrototypeModel;
        const createInstanceGroupManagerParams = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerPrototype: instanceGroupManagerPrototype,
        };

        const createInstanceGroupManagerResult = vpcService.createInstanceGroupManager(
          createInstanceGroupManagerParams
        );

        // all methods should return a Promise
        expectToBePromise(createInstanceGroupManagerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/managers',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(instanceGroupManagerPrototype);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createInstanceGroupManagerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createInstanceGroupManagerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createInstanceGroupManagerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerPrototype = instanceGroupManagerPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createInstanceGroupManagerParams = {
          instanceGroupId,
          instanceGroupManagerPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstanceGroupManager(createInstanceGroupManagerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createInstanceGroupManager({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createInstanceGroupManager();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteInstanceGroupManager', () => {
    describe('positive tests', () => {
      function __deleteInstanceGroupManagerTest() {
        // Construct the params object for operation deleteInstanceGroupManager
        const instanceGroupId = 'testString';
        const id = 'testString';
        const deleteInstanceGroupManagerParams = {
          instanceGroupId: instanceGroupId,
          id: id,
        };

        const deleteInstanceGroupManagerResult = vpcService.deleteInstanceGroupManager(
          deleteInstanceGroupManagerParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteInstanceGroupManagerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/managers/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceGroupManagerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteInstanceGroupManagerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteInstanceGroupManagerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceGroupManagerParams = {
          instanceGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceGroupManager(deleteInstanceGroupManagerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteInstanceGroupManager({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteInstanceGroupManager();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getInstanceGroupManager', () => {
    describe('positive tests', () => {
      function __getInstanceGroupManagerTest() {
        // Construct the params object for operation getInstanceGroupManager
        const instanceGroupId = 'testString';
        const id = 'testString';
        const getInstanceGroupManagerParams = {
          instanceGroupId: instanceGroupId,
          id: id,
        };

        const getInstanceGroupManagerResult = vpcService.getInstanceGroupManager(
          getInstanceGroupManagerParams
        );

        // all methods should return a Promise
        expectToBePromise(getInstanceGroupManagerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/managers/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceGroupManagerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getInstanceGroupManagerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getInstanceGroupManagerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceGroupManagerParams = {
          instanceGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceGroupManager(getInstanceGroupManagerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getInstanceGroupManager({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getInstanceGroupManager();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateInstanceGroupManager', () => {
    describe('positive tests', () => {
      function __updateInstanceGroupManagerTest() {
        // Construct the params object for operation updateInstanceGroupManager
        const instanceGroupId = 'testString';
        const id = 'testString';
        const aggregationWindow = 120;
        const cooldown = 210;
        const managementEnabled = true;
        const maxMembershipCount = 10;
        const minMembershipCount = 10;
        const name = 'my-instance-group-manager';
        const updateInstanceGroupManagerParams = {
          instanceGroupId: instanceGroupId,
          id: id,
          aggregationWindow: aggregationWindow,
          cooldown: cooldown,
          managementEnabled: managementEnabled,
          maxMembershipCount: maxMembershipCount,
          minMembershipCount: minMembershipCount,
          name: name,
        };

        const updateInstanceGroupManagerResult = vpcService.updateInstanceGroupManager(
          updateInstanceGroupManagerParams
        );

        // all methods should return a Promise
        expectToBePromise(updateInstanceGroupManagerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/managers/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.aggregation_window).toEqual(aggregationWindow);
        expect(mockRequestOptions.body.cooldown).toEqual(cooldown);
        expect(mockRequestOptions.body.management_enabled).toEqual(managementEnabled);
        expect(mockRequestOptions.body.max_membership_count).toEqual(maxMembershipCount);
        expect(mockRequestOptions.body.min_membership_count).toEqual(minMembershipCount);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateInstanceGroupManagerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateInstanceGroupManagerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateInstanceGroupManagerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateInstanceGroupManagerParams = {
          instanceGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstanceGroupManager(updateInstanceGroupManagerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateInstanceGroupManager({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateInstanceGroupManager();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listInstanceGroupManagerActions', () => {
    describe('positive tests', () => {
      function __listInstanceGroupManagerActionsTest() {
        // Construct the params object for operation listInstanceGroupManagerActions
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const start = 'testString';
        const limit = 1;
        const listInstanceGroupManagerActionsParams = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          start: start,
          limit: limit,
        };

        const listInstanceGroupManagerActionsResult = vpcService.listInstanceGroupManagerActions(
          listInstanceGroupManagerActionsParams
        );

        // all methods should return a Promise
        expectToBePromise(listInstanceGroupManagerActionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/actions',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
        expect(mockRequestOptions.path.instance_group_manager_id).toEqual(instanceGroupManagerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceGroupManagerActionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listInstanceGroupManagerActionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listInstanceGroupManagerActionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceGroupManagerActionsParams = {
          instanceGroupId,
          instanceGroupManagerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceGroupManagerActions(listInstanceGroupManagerActionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listInstanceGroupManagerActions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listInstanceGroupManagerActions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createInstanceGroupManagerActionTest() {
        // Construct the params object for operation createInstanceGroupManagerAction
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const instanceGroupManagerActionPrototype = instanceGroupManagerActionPrototypeModel;
        const createInstanceGroupManagerActionParams = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          instanceGroupManagerActionPrototype: instanceGroupManagerActionPrototype,
        };

        const createInstanceGroupManagerActionResult = vpcService.createInstanceGroupManagerAction(
          createInstanceGroupManagerActionParams
        );

        // all methods should return a Promise
        expectToBePromise(createInstanceGroupManagerActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/actions',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(instanceGroupManagerActionPrototype);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
        expect(mockRequestOptions.path.instance_group_manager_id).toEqual(instanceGroupManagerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createInstanceGroupManagerActionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createInstanceGroupManagerActionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createInstanceGroupManagerActionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const instanceGroupManagerActionPrototype = instanceGroupManagerActionPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createInstanceGroupManagerActionParams = {
          instanceGroupId,
          instanceGroupManagerId,
          instanceGroupManagerActionPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstanceGroupManagerAction(createInstanceGroupManagerActionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createInstanceGroupManagerAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createInstanceGroupManagerAction();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteInstanceGroupManagerAction', () => {
    describe('positive tests', () => {
      function __deleteInstanceGroupManagerActionTest() {
        // Construct the params object for operation deleteInstanceGroupManagerAction
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const deleteInstanceGroupManagerActionParams = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          id: id,
        };

        const deleteInstanceGroupManagerActionResult = vpcService.deleteInstanceGroupManagerAction(
          deleteInstanceGroupManagerActionParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteInstanceGroupManagerActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/actions/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
        expect(mockRequestOptions.path.instance_group_manager_id).toEqual(instanceGroupManagerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceGroupManagerActionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteInstanceGroupManagerActionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteInstanceGroupManagerActionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceGroupManagerActionParams = {
          instanceGroupId,
          instanceGroupManagerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceGroupManagerAction(deleteInstanceGroupManagerActionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteInstanceGroupManagerAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteInstanceGroupManagerAction();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getInstanceGroupManagerAction', () => {
    describe('positive tests', () => {
      function __getInstanceGroupManagerActionTest() {
        // Construct the params object for operation getInstanceGroupManagerAction
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const getInstanceGroupManagerActionParams = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          id: id,
        };

        const getInstanceGroupManagerActionResult = vpcService.getInstanceGroupManagerAction(
          getInstanceGroupManagerActionParams
        );

        // all methods should return a Promise
        expectToBePromise(getInstanceGroupManagerActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/actions/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
        expect(mockRequestOptions.path.instance_group_manager_id).toEqual(instanceGroupManagerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceGroupManagerActionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getInstanceGroupManagerActionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getInstanceGroupManagerActionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceGroupManagerActionParams = {
          instanceGroupId,
          instanceGroupManagerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceGroupManagerAction(getInstanceGroupManagerActionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getInstanceGroupManagerAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getInstanceGroupManagerAction();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateInstanceGroupManagerAction', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // InstanceGroupManagerActionGroupPatch
      const instanceGroupManagerActionGroupPatchModel = {
        membership_count: 10,
      };

      // InstanceGroupManagerActionManagerPatch
      const instanceGroupManagerActionManagerPatchModel = {
        max_membership_count: 10,
        min_membership_count: 10,
      };

      function __updateInstanceGroupManagerActionTest() {
        // Construct the params object for operation updateInstanceGroupManagerAction
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const cronSpec = '*/5 1,2,3 * * *';
        const group = instanceGroupManagerActionGroupPatchModel;
        const manager = instanceGroupManagerActionManagerPatchModel;
        const name = 'my-instance-group-manager-action';
        const runAt = '2019-01-01T12:00:00.000Z';
        const updateInstanceGroupManagerActionParams = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          id: id,
          cronSpec: cronSpec,
          group: group,
          manager: manager,
          name: name,
          runAt: runAt,
        };

        const updateInstanceGroupManagerActionResult = vpcService.updateInstanceGroupManagerAction(
          updateInstanceGroupManagerActionParams
        );

        // all methods should return a Promise
        expectToBePromise(updateInstanceGroupManagerActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/actions/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.cron_spec).toEqual(cronSpec);
        expect(mockRequestOptions.body.group).toEqual(group);
        expect(mockRequestOptions.body.manager).toEqual(manager);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.run_at).toEqual(runAt);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
        expect(mockRequestOptions.path.instance_group_manager_id).toEqual(instanceGroupManagerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateInstanceGroupManagerActionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateInstanceGroupManagerActionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateInstanceGroupManagerActionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateInstanceGroupManagerActionParams = {
          instanceGroupId,
          instanceGroupManagerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstanceGroupManagerAction(updateInstanceGroupManagerActionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateInstanceGroupManagerAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateInstanceGroupManagerAction();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listInstanceGroupManagerPolicies', () => {
    describe('positive tests', () => {
      function __listInstanceGroupManagerPoliciesTest() {
        // Construct the params object for operation listInstanceGroupManagerPolicies
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const start = 'testString';
        const limit = 1;
        const listInstanceGroupManagerPoliciesParams = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          start: start,
          limit: limit,
        };

        const listInstanceGroupManagerPoliciesResult = vpcService.listInstanceGroupManagerPolicies(
          listInstanceGroupManagerPoliciesParams
        );

        // all methods should return a Promise
        expectToBePromise(listInstanceGroupManagerPoliciesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/policies',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
        expect(mockRequestOptions.path.instance_group_manager_id).toEqual(instanceGroupManagerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceGroupManagerPoliciesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listInstanceGroupManagerPoliciesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listInstanceGroupManagerPoliciesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceGroupManagerPoliciesParams = {
          instanceGroupId,
          instanceGroupManagerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceGroupManagerPolicies(listInstanceGroupManagerPoliciesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listInstanceGroupManagerPolicies({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listInstanceGroupManagerPolicies();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createInstanceGroupManagerPolicyTest() {
        // Construct the params object for operation createInstanceGroupManagerPolicy
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const instanceGroupManagerPolicyPrototype = instanceGroupManagerPolicyPrototypeModel;
        const createInstanceGroupManagerPolicyParams = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          instanceGroupManagerPolicyPrototype: instanceGroupManagerPolicyPrototype,
        };

        const createInstanceGroupManagerPolicyResult = vpcService.createInstanceGroupManagerPolicy(
          createInstanceGroupManagerPolicyParams
        );

        // all methods should return a Promise
        expectToBePromise(createInstanceGroupManagerPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/policies',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(instanceGroupManagerPolicyPrototype);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
        expect(mockRequestOptions.path.instance_group_manager_id).toEqual(instanceGroupManagerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createInstanceGroupManagerPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createInstanceGroupManagerPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createInstanceGroupManagerPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const instanceGroupManagerPolicyPrototype = instanceGroupManagerPolicyPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createInstanceGroupManagerPolicyParams = {
          instanceGroupId,
          instanceGroupManagerId,
          instanceGroupManagerPolicyPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createInstanceGroupManagerPolicy(createInstanceGroupManagerPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createInstanceGroupManagerPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createInstanceGroupManagerPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteInstanceGroupManagerPolicy', () => {
    describe('positive tests', () => {
      function __deleteInstanceGroupManagerPolicyTest() {
        // Construct the params object for operation deleteInstanceGroupManagerPolicy
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const deleteInstanceGroupManagerPolicyParams = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          id: id,
        };

        const deleteInstanceGroupManagerPolicyResult = vpcService.deleteInstanceGroupManagerPolicy(
          deleteInstanceGroupManagerPolicyParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteInstanceGroupManagerPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/policies/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
        expect(mockRequestOptions.path.instance_group_manager_id).toEqual(instanceGroupManagerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceGroupManagerPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteInstanceGroupManagerPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteInstanceGroupManagerPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceGroupManagerPolicyParams = {
          instanceGroupId,
          instanceGroupManagerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceGroupManagerPolicy(deleteInstanceGroupManagerPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteInstanceGroupManagerPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteInstanceGroupManagerPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getInstanceGroupManagerPolicy', () => {
    describe('positive tests', () => {
      function __getInstanceGroupManagerPolicyTest() {
        // Construct the params object for operation getInstanceGroupManagerPolicy
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const getInstanceGroupManagerPolicyParams = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          id: id,
        };

        const getInstanceGroupManagerPolicyResult = vpcService.getInstanceGroupManagerPolicy(
          getInstanceGroupManagerPolicyParams
        );

        // all methods should return a Promise
        expectToBePromise(getInstanceGroupManagerPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/policies/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
        expect(mockRequestOptions.path.instance_group_manager_id).toEqual(instanceGroupManagerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceGroupManagerPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getInstanceGroupManagerPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getInstanceGroupManagerPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceGroupManagerPolicyParams = {
          instanceGroupId,
          instanceGroupManagerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceGroupManagerPolicy(getInstanceGroupManagerPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getInstanceGroupManagerPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getInstanceGroupManagerPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateInstanceGroupManagerPolicy', () => {
    describe('positive tests', () => {
      function __updateInstanceGroupManagerPolicyTest() {
        // Construct the params object for operation updateInstanceGroupManagerPolicy
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const metricType = 'cpu';
        const metricValue = 38;
        const name = 'my-instance-group-manager-policy';
        const updateInstanceGroupManagerPolicyParams = {
          instanceGroupId: instanceGroupId,
          instanceGroupManagerId: instanceGroupManagerId,
          id: id,
          metricType: metricType,
          metricValue: metricValue,
          name: name,
        };

        const updateInstanceGroupManagerPolicyResult = vpcService.updateInstanceGroupManagerPolicy(
          updateInstanceGroupManagerPolicyParams
        );

        // all methods should return a Promise
        expectToBePromise(updateInstanceGroupManagerPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/policies/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.metric_type).toEqual(metricType);
        expect(mockRequestOptions.body.metric_value).toEqual(metricValue);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
        expect(mockRequestOptions.path.instance_group_manager_id).toEqual(instanceGroupManagerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateInstanceGroupManagerPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateInstanceGroupManagerPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateInstanceGroupManagerPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const instanceGroupManagerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateInstanceGroupManagerPolicyParams = {
          instanceGroupId,
          instanceGroupManagerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstanceGroupManagerPolicy(updateInstanceGroupManagerPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateInstanceGroupManagerPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateInstanceGroupManagerPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteInstanceGroupMemberships', () => {
    describe('positive tests', () => {
      function __deleteInstanceGroupMembershipsTest() {
        // Construct the params object for operation deleteInstanceGroupMemberships
        const instanceGroupId = 'testString';
        const deleteInstanceGroupMembershipsParams = {
          instanceGroupId: instanceGroupId,
        };

        const deleteInstanceGroupMembershipsResult = vpcService.deleteInstanceGroupMemberships(
          deleteInstanceGroupMembershipsParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteInstanceGroupMembershipsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/memberships',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceGroupMembershipsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteInstanceGroupMembershipsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteInstanceGroupMembershipsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceGroupMembershipsParams = {
          instanceGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceGroupMemberships(deleteInstanceGroupMembershipsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteInstanceGroupMemberships({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteInstanceGroupMemberships();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listInstanceGroupMemberships', () => {
    describe('positive tests', () => {
      function __listInstanceGroupMembershipsTest() {
        // Construct the params object for operation listInstanceGroupMemberships
        const instanceGroupId = 'testString';
        const start = 'testString';
        const limit = 1;
        const listInstanceGroupMembershipsParams = {
          instanceGroupId: instanceGroupId,
          start: start,
          limit: limit,
        };

        const listInstanceGroupMembershipsResult = vpcService.listInstanceGroupMemberships(
          listInstanceGroupMembershipsParams
        );

        // all methods should return a Promise
        expectToBePromise(listInstanceGroupMembershipsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/memberships',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceGroupMembershipsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listInstanceGroupMembershipsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listInstanceGroupMembershipsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceGroupMembershipsParams = {
          instanceGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listInstanceGroupMemberships(listInstanceGroupMembershipsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listInstanceGroupMemberships({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listInstanceGroupMemberships();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteInstanceGroupMembership', () => {
    describe('positive tests', () => {
      function __deleteInstanceGroupMembershipTest() {
        // Construct the params object for operation deleteInstanceGroupMembership
        const instanceGroupId = 'testString';
        const id = 'testString';
        const deleteInstanceGroupMembershipParams = {
          instanceGroupId: instanceGroupId,
          id: id,
        };

        const deleteInstanceGroupMembershipResult = vpcService.deleteInstanceGroupMembership(
          deleteInstanceGroupMembershipParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteInstanceGroupMembershipResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/memberships/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceGroupMembershipTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteInstanceGroupMembershipTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteInstanceGroupMembershipTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceGroupMembershipParams = {
          instanceGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteInstanceGroupMembership(deleteInstanceGroupMembershipParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteInstanceGroupMembership({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteInstanceGroupMembership();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getInstanceGroupMembership', () => {
    describe('positive tests', () => {
      function __getInstanceGroupMembershipTest() {
        // Construct the params object for operation getInstanceGroupMembership
        const instanceGroupId = 'testString';
        const id = 'testString';
        const getInstanceGroupMembershipParams = {
          instanceGroupId: instanceGroupId,
          id: id,
        };

        const getInstanceGroupMembershipResult = vpcService.getInstanceGroupMembership(
          getInstanceGroupMembershipParams
        );

        // all methods should return a Promise
        expectToBePromise(getInstanceGroupMembershipResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/memberships/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceGroupMembershipTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getInstanceGroupMembershipTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getInstanceGroupMembershipTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceGroupMembershipParams = {
          instanceGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getInstanceGroupMembership(getInstanceGroupMembershipParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getInstanceGroupMembership({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getInstanceGroupMembership();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateInstanceGroupMembership', () => {
    describe('positive tests', () => {
      function __updateInstanceGroupMembershipTest() {
        // Construct the params object for operation updateInstanceGroupMembership
        const instanceGroupId = 'testString';
        const id = 'testString';
        const name = 'my-instance-group-membership';
        const updateInstanceGroupMembershipParams = {
          instanceGroupId: instanceGroupId,
          id: id,
          name: name,
        };

        const updateInstanceGroupMembershipResult = vpcService.updateInstanceGroupMembership(
          updateInstanceGroupMembershipParams
        );

        // all methods should return a Promise
        expectToBePromise(updateInstanceGroupMembershipResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instance_groups/{instance_group_id}/memberships/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.instance_group_id).toEqual(instanceGroupId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateInstanceGroupMembershipTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateInstanceGroupMembershipTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateInstanceGroupMembershipTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateInstanceGroupMembershipParams = {
          instanceGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateInstanceGroupMembership(updateInstanceGroupMembershipParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateInstanceGroupMembership({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateInstanceGroupMembership();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listDedicatedHostGroups', () => {
    describe('positive tests', () => {
      function __listDedicatedHostGroupsTest() {
        // Construct the params object for operation listDedicatedHostGroups
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const zoneName = 'testString';
        const name = 'testString';
        const listDedicatedHostGroupsParams = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          zoneName: zoneName,
          name: name,
        };

        const listDedicatedHostGroupsResult = vpcService.listDedicatedHostGroups(
          listDedicatedHostGroupsParams
        );

        // all methods should return a Promise
        expectToBePromise(listDedicatedHostGroupsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/dedicated_host/groups', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(mockRequestOptions.qs['zone.name']).toEqual(zoneName);
        expect(mockRequestOptions.qs.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDedicatedHostGroupsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listDedicatedHostGroupsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listDedicatedHostGroupsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDedicatedHostGroupsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listDedicatedHostGroups(listDedicatedHostGroupsParams);
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

      function __createDedicatedHostGroupTest() {
        // Construct the params object for operation createDedicatedHostGroup
        const _class = 'mx2';
        const family = 'balanced';
        const zone = zoneIdentityModel;
        const name = 'testString';
        const resourceGroup = resourceGroupIdentityModel;
        const createDedicatedHostGroupParams = {
          _class: _class,
          family: family,
          zone: zone,
          name: name,
          resourceGroup: resourceGroup,
        };

        const createDedicatedHostGroupResult = vpcService.createDedicatedHostGroup(
          createDedicatedHostGroupParams
        );

        // all methods should return a Promise
        expectToBePromise(createDedicatedHostGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/dedicated_host/groups', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.class).toEqual(_class);
        expect(mockRequestOptions.body.family).toEqual(family);
        expect(mockRequestOptions.body.zone).toEqual(zone);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.resource_group).toEqual(resourceGroup);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDedicatedHostGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createDedicatedHostGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createDedicatedHostGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDedicatedHostGroupParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createDedicatedHostGroup(createDedicatedHostGroupParams);
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
      function __deleteDedicatedHostGroupTest() {
        // Construct the params object for operation deleteDedicatedHostGroup
        const id = 'testString';
        const deleteDedicatedHostGroupParams = {
          id: id,
        };

        const deleteDedicatedHostGroupResult = vpcService.deleteDedicatedHostGroup(
          deleteDedicatedHostGroupParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteDedicatedHostGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/dedicated_host/groups/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDedicatedHostGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteDedicatedHostGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteDedicatedHostGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDedicatedHostGroupParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteDedicatedHostGroup(deleteDedicatedHostGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteDedicatedHostGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteDedicatedHostGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getDedicatedHostGroup', () => {
    describe('positive tests', () => {
      function __getDedicatedHostGroupTest() {
        // Construct the params object for operation getDedicatedHostGroup
        const id = 'testString';
        const getDedicatedHostGroupParams = {
          id: id,
        };

        const getDedicatedHostGroupResult = vpcService.getDedicatedHostGroup(
          getDedicatedHostGroupParams
        );

        // all methods should return a Promise
        expectToBePromise(getDedicatedHostGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/dedicated_host/groups/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDedicatedHostGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getDedicatedHostGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getDedicatedHostGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDedicatedHostGroupParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getDedicatedHostGroup(getDedicatedHostGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getDedicatedHostGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getDedicatedHostGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateDedicatedHostGroup', () => {
    describe('positive tests', () => {
      function __updateDedicatedHostGroupTest() {
        // Construct the params object for operation updateDedicatedHostGroup
        const id = 'testString';
        const name = 'my-host-group-modified';
        const updateDedicatedHostGroupParams = {
          id: id,
          name: name,
        };

        const updateDedicatedHostGroupResult = vpcService.updateDedicatedHostGroup(
          updateDedicatedHostGroupParams
        );

        // all methods should return a Promise
        expectToBePromise(updateDedicatedHostGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/dedicated_host/groups/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDedicatedHostGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateDedicatedHostGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateDedicatedHostGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDedicatedHostGroupParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateDedicatedHostGroup(updateDedicatedHostGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateDedicatedHostGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateDedicatedHostGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listDedicatedHostProfiles', () => {
    describe('positive tests', () => {
      function __listDedicatedHostProfilesTest() {
        // Construct the params object for operation listDedicatedHostProfiles
        const start = 'testString';
        const limit = 1;
        const listDedicatedHostProfilesParams = {
          start: start,
          limit: limit,
        };

        const listDedicatedHostProfilesResult = vpcService.listDedicatedHostProfiles(
          listDedicatedHostProfilesParams
        );

        // all methods should return a Promise
        expectToBePromise(listDedicatedHostProfilesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/dedicated_host/profiles', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDedicatedHostProfilesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listDedicatedHostProfilesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listDedicatedHostProfilesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDedicatedHostProfilesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listDedicatedHostProfiles(listDedicatedHostProfilesParams);
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
      function __getDedicatedHostProfileTest() {
        // Construct the params object for operation getDedicatedHostProfile
        const name = 'testString';
        const getDedicatedHostProfileParams = {
          name: name,
        };

        const getDedicatedHostProfileResult = vpcService.getDedicatedHostProfile(
          getDedicatedHostProfileParams
        );

        // all methods should return a Promise
        expectToBePromise(getDedicatedHostProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/dedicated_host/profiles/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDedicatedHostProfileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getDedicatedHostProfileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getDedicatedHostProfileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDedicatedHostProfileParams = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getDedicatedHostProfile(getDedicatedHostProfileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getDedicatedHostProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getDedicatedHostProfile();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listDedicatedHosts', () => {
    describe('positive tests', () => {
      function __listDedicatedHostsTest() {
        // Construct the params object for operation listDedicatedHosts
        const dedicatedHostGroupId = 'testString';
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const zoneName = 'testString';
        const name = 'testString';
        const listDedicatedHostsParams = {
          dedicatedHostGroupId: dedicatedHostGroupId,
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          zoneName: zoneName,
          name: name,
        };

        const listDedicatedHostsResult = vpcService.listDedicatedHosts(listDedicatedHostsParams);

        // all methods should return a Promise
        expectToBePromise(listDedicatedHostsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/dedicated_hosts', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs['dedicated_host_group.id']).toEqual(dedicatedHostGroupId);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(mockRequestOptions.qs['zone.name']).toEqual(zoneName);
        expect(mockRequestOptions.qs.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDedicatedHostsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listDedicatedHostsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listDedicatedHostsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDedicatedHostsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listDedicatedHosts(listDedicatedHostsParams);
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

      function __createDedicatedHostTest() {
        // Construct the params object for operation createDedicatedHost
        const dedicatedHostPrototype = dedicatedHostPrototypeModel;
        const createDedicatedHostParams = {
          dedicatedHostPrototype: dedicatedHostPrototype,
        };

        const createDedicatedHostResult = vpcService.createDedicatedHost(createDedicatedHostParams);

        // all methods should return a Promise
        expectToBePromise(createDedicatedHostResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/dedicated_hosts', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(dedicatedHostPrototype);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDedicatedHostTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createDedicatedHostTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createDedicatedHostTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dedicatedHostPrototype = dedicatedHostPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDedicatedHostParams = {
          dedicatedHostPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createDedicatedHost(createDedicatedHostParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createDedicatedHost({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createDedicatedHost();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listDedicatedHostDisks', () => {
    describe('positive tests', () => {
      function __listDedicatedHostDisksTest() {
        // Construct the params object for operation listDedicatedHostDisks
        const dedicatedHostId = 'testString';
        const listDedicatedHostDisksParams = {
          dedicatedHostId: dedicatedHostId,
        };

        const listDedicatedHostDisksResult = vpcService.listDedicatedHostDisks(
          listDedicatedHostDisksParams
        );

        // all methods should return a Promise
        expectToBePromise(listDedicatedHostDisksResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/dedicated_hosts/{dedicated_host_id}/disks', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.dedicated_host_id).toEqual(dedicatedHostId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDedicatedHostDisksTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listDedicatedHostDisksTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listDedicatedHostDisksTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dedicatedHostId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDedicatedHostDisksParams = {
          dedicatedHostId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listDedicatedHostDisks(listDedicatedHostDisksParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listDedicatedHostDisks({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listDedicatedHostDisks();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getDedicatedHostDisk', () => {
    describe('positive tests', () => {
      function __getDedicatedHostDiskTest() {
        // Construct the params object for operation getDedicatedHostDisk
        const dedicatedHostId = 'testString';
        const id = 'testString';
        const getDedicatedHostDiskParams = {
          dedicatedHostId: dedicatedHostId,
          id: id,
        };

        const getDedicatedHostDiskResult = vpcService.getDedicatedHostDisk(
          getDedicatedHostDiskParams
        );

        // all methods should return a Promise
        expectToBePromise(getDedicatedHostDiskResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/dedicated_hosts/{dedicated_host_id}/disks/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.dedicated_host_id).toEqual(dedicatedHostId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDedicatedHostDiskTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getDedicatedHostDiskTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getDedicatedHostDiskTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dedicatedHostId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDedicatedHostDiskParams = {
          dedicatedHostId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getDedicatedHostDisk(getDedicatedHostDiskParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getDedicatedHostDisk({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getDedicatedHostDisk();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateDedicatedHostDisk', () => {
    describe('positive tests', () => {
      function __updateDedicatedHostDiskTest() {
        // Construct the params object for operation updateDedicatedHostDisk
        const dedicatedHostId = 'testString';
        const id = 'testString';
        const name = 'my-disk-updated';
        const updateDedicatedHostDiskParams = {
          dedicatedHostId: dedicatedHostId,
          id: id,
          name: name,
        };

        const updateDedicatedHostDiskResult = vpcService.updateDedicatedHostDisk(
          updateDedicatedHostDiskParams
        );

        // all methods should return a Promise
        expectToBePromise(updateDedicatedHostDiskResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/dedicated_hosts/{dedicated_host_id}/disks/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.dedicated_host_id).toEqual(dedicatedHostId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDedicatedHostDiskTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateDedicatedHostDiskTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateDedicatedHostDiskTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dedicatedHostId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDedicatedHostDiskParams = {
          dedicatedHostId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateDedicatedHostDisk(updateDedicatedHostDiskParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateDedicatedHostDisk({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateDedicatedHostDisk();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteDedicatedHost', () => {
    describe('positive tests', () => {
      function __deleteDedicatedHostTest() {
        // Construct the params object for operation deleteDedicatedHost
        const id = 'testString';
        const deleteDedicatedHostParams = {
          id: id,
        };

        const deleteDedicatedHostResult = vpcService.deleteDedicatedHost(deleteDedicatedHostParams);

        // all methods should return a Promise
        expectToBePromise(deleteDedicatedHostResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/dedicated_hosts/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDedicatedHostTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteDedicatedHostTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteDedicatedHostTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDedicatedHostParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteDedicatedHost(deleteDedicatedHostParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteDedicatedHost({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteDedicatedHost();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getDedicatedHost', () => {
    describe('positive tests', () => {
      function __getDedicatedHostTest() {
        // Construct the params object for operation getDedicatedHost
        const id = 'testString';
        const getDedicatedHostParams = {
          id: id,
        };

        const getDedicatedHostResult = vpcService.getDedicatedHost(getDedicatedHostParams);

        // all methods should return a Promise
        expectToBePromise(getDedicatedHostResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/dedicated_hosts/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDedicatedHostTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getDedicatedHostTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getDedicatedHostTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDedicatedHostParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getDedicatedHost(getDedicatedHostParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getDedicatedHost({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getDedicatedHost();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateDedicatedHost', () => {
    describe('positive tests', () => {
      function __updateDedicatedHostTest() {
        // Construct the params object for operation updateDedicatedHost
        const id = 'testString';
        const instancePlacementEnabled = true;
        const name = 'my-host';
        const updateDedicatedHostParams = {
          id: id,
          instancePlacementEnabled: instancePlacementEnabled,
          name: name,
        };

        const updateDedicatedHostResult = vpcService.updateDedicatedHost(updateDedicatedHostParams);

        // all methods should return a Promise
        expectToBePromise(updateDedicatedHostResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/dedicated_hosts/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.instance_placement_enabled).toEqual(
          instancePlacementEnabled
        );
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDedicatedHostTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateDedicatedHostTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateDedicatedHostTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDedicatedHostParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateDedicatedHost(updateDedicatedHostParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateDedicatedHost({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateDedicatedHost();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listPlacementGroups', () => {
    describe('positive tests', () => {
      function __listPlacementGroupsTest() {
        // Construct the params object for operation listPlacementGroups
        const start = 'testString';
        const limit = 1;
        const listPlacementGroupsParams = {
          start: start,
          limit: limit,
        };

        const listPlacementGroupsResult = vpcService.listPlacementGroups(listPlacementGroupsParams);

        // all methods should return a Promise
        expectToBePromise(listPlacementGroupsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/placement_groups', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listPlacementGroupsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listPlacementGroupsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listPlacementGroupsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listPlacementGroupsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listPlacementGroups(listPlacementGroupsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listPlacementGroups({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createPlacementGroup', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      function __createPlacementGroupTest() {
        // Construct the params object for operation createPlacementGroup
        const strategy = 'host_spread';
        const name = 'my-placement-group';
        const resourceGroup = resourceGroupIdentityModel;
        const createPlacementGroupParams = {
          strategy: strategy,
          name: name,
          resourceGroup: resourceGroup,
        };

        const createPlacementGroupResult = vpcService.createPlacementGroup(
          createPlacementGroupParams
        );

        // all methods should return a Promise
        expectToBePromise(createPlacementGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/placement_groups', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.strategy).toEqual(strategy);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.resource_group).toEqual(resourceGroup);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createPlacementGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createPlacementGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createPlacementGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const strategy = 'host_spread';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createPlacementGroupParams = {
          strategy,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createPlacementGroup(createPlacementGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createPlacementGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createPlacementGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deletePlacementGroup', () => {
    describe('positive tests', () => {
      function __deletePlacementGroupTest() {
        // Construct the params object for operation deletePlacementGroup
        const id = 'testString';
        const deletePlacementGroupParams = {
          id: id,
        };

        const deletePlacementGroupResult = vpcService.deletePlacementGroup(
          deletePlacementGroupParams
        );

        // all methods should return a Promise
        expectToBePromise(deletePlacementGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/placement_groups/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deletePlacementGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deletePlacementGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deletePlacementGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deletePlacementGroupParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deletePlacementGroup(deletePlacementGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deletePlacementGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deletePlacementGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getPlacementGroup', () => {
    describe('positive tests', () => {
      function __getPlacementGroupTest() {
        // Construct the params object for operation getPlacementGroup
        const id = 'testString';
        const getPlacementGroupParams = {
          id: id,
        };

        const getPlacementGroupResult = vpcService.getPlacementGroup(getPlacementGroupParams);

        // all methods should return a Promise
        expectToBePromise(getPlacementGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/placement_groups/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPlacementGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getPlacementGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getPlacementGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPlacementGroupParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getPlacementGroup(getPlacementGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getPlacementGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getPlacementGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updatePlacementGroup', () => {
    describe('positive tests', () => {
      function __updatePlacementGroupTest() {
        // Construct the params object for operation updatePlacementGroup
        const id = 'testString';
        const name = 'my-placement-group';
        const updatePlacementGroupParams = {
          id: id,
          name: name,
        };

        const updatePlacementGroupResult = vpcService.updatePlacementGroup(
          updatePlacementGroupParams
        );

        // all methods should return a Promise
        expectToBePromise(updatePlacementGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/placement_groups/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updatePlacementGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updatePlacementGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updatePlacementGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updatePlacementGroupParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updatePlacementGroup(updatePlacementGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updatePlacementGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updatePlacementGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listBareMetalServerProfiles', () => {
    describe('positive tests', () => {
      function __listBareMetalServerProfilesTest() {
        // Construct the params object for operation listBareMetalServerProfiles
        const start = 'testString';
        const limit = 1;
        const listBareMetalServerProfilesParams = {
          start: start,
          limit: limit,
        };

        const listBareMetalServerProfilesResult = vpcService.listBareMetalServerProfiles(
          listBareMetalServerProfilesParams
        );

        // all methods should return a Promise
        expectToBePromise(listBareMetalServerProfilesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bare_metal_server/profiles', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listBareMetalServerProfilesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listBareMetalServerProfilesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listBareMetalServerProfilesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listBareMetalServerProfilesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listBareMetalServerProfiles(listBareMetalServerProfilesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listBareMetalServerProfiles({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getBareMetalServerProfile', () => {
    describe('positive tests', () => {
      function __getBareMetalServerProfileTest() {
        // Construct the params object for operation getBareMetalServerProfile
        const name = 'testString';
        const getBareMetalServerProfileParams = {
          name: name,
        };

        const getBareMetalServerProfileResult = vpcService.getBareMetalServerProfile(
          getBareMetalServerProfileParams
        );

        // all methods should return a Promise
        expectToBePromise(getBareMetalServerProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bare_metal_server/profiles/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getBareMetalServerProfileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getBareMetalServerProfileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getBareMetalServerProfileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getBareMetalServerProfileParams = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getBareMetalServerProfile(getBareMetalServerProfileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getBareMetalServerProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getBareMetalServerProfile();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listBareMetalServers', () => {
    describe('positive tests', () => {
      function __listBareMetalServersTest() {
        // Construct the params object for operation listBareMetalServers
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const name = 'testString';
        const vpcId = 'testString';
        const vpcCrn = 'testString';
        const vpcName = 'testString';
        const networkInterfacesSubnetId = 'testString';
        const networkInterfacesSubnetCrn = 'testString';
        const networkInterfacesSubnetName = 'testString';
        const sort = 'name';
        const listBareMetalServersParams = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          name: name,
          vpcId: vpcId,
          vpcCrn: vpcCrn,
          vpcName: vpcName,
          networkInterfacesSubnetId: networkInterfacesSubnetId,
          networkInterfacesSubnetCrn: networkInterfacesSubnetCrn,
          networkInterfacesSubnetName: networkInterfacesSubnetName,
          sort: sort,
        };

        const listBareMetalServersResult = vpcService.listBareMetalServers(
          listBareMetalServersParams
        );

        // all methods should return a Promise
        expectToBePromise(listBareMetalServersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bare_metal_servers', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs['vpc.id']).toEqual(vpcId);
        expect(mockRequestOptions.qs['vpc.crn']).toEqual(vpcCrn);
        expect(mockRequestOptions.qs['vpc.name']).toEqual(vpcName);
        expect(mockRequestOptions.qs['network_interfaces.subnet.id']).toEqual(
          networkInterfacesSubnetId
        );
        expect(mockRequestOptions.qs['network_interfaces.subnet.crn']).toEqual(
          networkInterfacesSubnetCrn
        );
        expect(mockRequestOptions.qs['network_interfaces.subnet.name']).toEqual(
          networkInterfacesSubnetName
        );
        expect(mockRequestOptions.qs.sort).toEqual(sort);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listBareMetalServersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listBareMetalServersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listBareMetalServersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listBareMetalServersParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listBareMetalServers(listBareMetalServersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listBareMetalServers({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createBareMetalServer', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ImageIdentityById
      const imageIdentityModel = {
        id: '72b27b5c-f4b0-48bb-b954-5becc7c1dcb8',
      };

      // KeyIdentityById
      const keyIdentityModel = {
        id: 'a6b1a881-2ce8-41a3-80fc-36316a73f803',
      };

      // BareMetalServerInitializationPrototype
      const bareMetalServerInitializationPrototypeModel = {
        image: imageIdentityModel,
        keys: [keyIdentityModel],
        user_data: 'testString',
      };

      // NetworkInterfaceIPPrototypeReservedIPPrototypeNetworkInterfaceContext
      const networkInterfaceIpPrototypeModel = {
        address: '10.0.0.5',
        auto_delete: false,
        name: 'my-reserved-ip',
      };

      // SecurityGroupIdentityById
      const securityGroupIdentityModel = {
        id: 'be5df5ca-12a0-494b-907e-aa6ec2bfa271',
      };

      // SubnetIdentityById
      const subnetIdentityModel = {
        id: '7ec86020-1c6e-4889-b3f0-a15f2e50f87e',
      };

      // BareMetalServerPrimaryNetworkInterfacePrototype
      const bareMetalServerPrimaryNetworkInterfacePrototypeModel = {
        allow_ip_spoofing: true,
        allowed_vlans: [4],
        enable_infrastructure_nat: true,
        interface_type: 'pci',
        name: 'my-network-interface',
        primary_ip: networkInterfaceIpPrototypeModel,
        security_groups: [securityGroupIdentityModel],
        subnet: subnetIdentityModel,
      };

      // BareMetalServerProfileIdentityByName
      const bareMetalServerProfileIdentityModel = {
        name: 'bx2-metal-192x768',
      };

      // ZoneIdentityByName
      const zoneIdentityModel = {
        name: 'us-south-1',
      };

      // BareMetalServerNetworkInterfacePrototypeBareMetalServerNetworkInterfaceByVLANPrototype
      const bareMetalServerNetworkInterfacePrototypeModel = {
        allow_ip_spoofing: true,
        enable_infrastructure_nat: true,
        interface_type: 'vlan',
        name: 'my-network-interface',
        primary_ip: networkInterfaceIpPrototypeModel,
        security_groups: [securityGroupIdentityModel],
        subnet: subnetIdentityModel,
        allow_interface_to_float: false,
        vlan: 4,
      };

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      // VPCIdentityById
      const vpcIdentityModel = {
        id: '4727d842-f94f-4a2d-824a-9bc9b02c523b',
      };

      function __createBareMetalServerTest() {
        // Construct the params object for operation createBareMetalServer
        const initialization = bareMetalServerInitializationPrototypeModel;
        const primaryNetworkInterface = bareMetalServerPrimaryNetworkInterfacePrototypeModel;
        const profile = bareMetalServerProfileIdentityModel;
        const zone = zoneIdentityModel;
        const name = 'my-bare-metal-server';
        const networkInterfaces = [bareMetalServerNetworkInterfacePrototypeModel];
        const resourceGroup = resourceGroupIdentityModel;
        const vpc = vpcIdentityModel;
        const createBareMetalServerParams = {
          initialization: initialization,
          primaryNetworkInterface: primaryNetworkInterface,
          profile: profile,
          zone: zone,
          name: name,
          networkInterfaces: networkInterfaces,
          resourceGroup: resourceGroup,
          vpc: vpc,
        };

        const createBareMetalServerResult = vpcService.createBareMetalServer(
          createBareMetalServerParams
        );

        // all methods should return a Promise
        expectToBePromise(createBareMetalServerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bare_metal_servers', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.initialization).toEqual(initialization);
        expect(mockRequestOptions.body.primary_network_interface).toEqual(primaryNetworkInterface);
        expect(mockRequestOptions.body.profile).toEqual(profile);
        expect(mockRequestOptions.body.zone).toEqual(zone);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.network_interfaces).toEqual(networkInterfaces);
        expect(mockRequestOptions.body.resource_group).toEqual(resourceGroup);
        expect(mockRequestOptions.body.vpc).toEqual(vpc);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createBareMetalServerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createBareMetalServerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createBareMetalServerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const initialization = bareMetalServerInitializationPrototypeModel;
        const primaryNetworkInterface = bareMetalServerPrimaryNetworkInterfacePrototypeModel;
        const profile = bareMetalServerProfileIdentityModel;
        const zone = zoneIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createBareMetalServerParams = {
          initialization,
          primaryNetworkInterface,
          profile,
          zone,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createBareMetalServer(createBareMetalServerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createBareMetalServer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createBareMetalServer();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createBareMetalServerConsoleAccessToken', () => {
    describe('positive tests', () => {
      function __createBareMetalServerConsoleAccessTokenTest() {
        // Construct the params object for operation createBareMetalServerConsoleAccessToken
        const bareMetalServerId = 'testString';
        const consoleType = 'serial';
        const force = false;
        const createBareMetalServerConsoleAccessTokenParams = {
          bareMetalServerId: bareMetalServerId,
          consoleType: consoleType,
          force: force,
        };

        const createBareMetalServerConsoleAccessTokenResult = vpcService.createBareMetalServerConsoleAccessToken(
          createBareMetalServerConsoleAccessTokenParams
        );

        // all methods should return a Promise
        expectToBePromise(createBareMetalServerConsoleAccessTokenResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/bare_metal_servers/{bare_metal_server_id}/console_access_token',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.console_type).toEqual(consoleType);
        expect(mockRequestOptions.body.force).toEqual(force);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.bare_metal_server_id).toEqual(bareMetalServerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createBareMetalServerConsoleAccessTokenTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createBareMetalServerConsoleAccessTokenTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createBareMetalServerConsoleAccessTokenTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bareMetalServerId = 'testString';
        const consoleType = 'serial';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createBareMetalServerConsoleAccessTokenParams = {
          bareMetalServerId,
          consoleType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createBareMetalServerConsoleAccessToken(
          createBareMetalServerConsoleAccessTokenParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createBareMetalServerConsoleAccessToken({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createBareMetalServerConsoleAccessToken();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listBareMetalServerDisks', () => {
    describe('positive tests', () => {
      function __listBareMetalServerDisksTest() {
        // Construct the params object for operation listBareMetalServerDisks
        const bareMetalServerId = 'testString';
        const listBareMetalServerDisksParams = {
          bareMetalServerId: bareMetalServerId,
        };

        const listBareMetalServerDisksResult = vpcService.listBareMetalServerDisks(
          listBareMetalServerDisksParams
        );

        // all methods should return a Promise
        expectToBePromise(listBareMetalServerDisksResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/bare_metal_servers/{bare_metal_server_id}/disks',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.bare_metal_server_id).toEqual(bareMetalServerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listBareMetalServerDisksTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listBareMetalServerDisksTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listBareMetalServerDisksTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bareMetalServerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listBareMetalServerDisksParams = {
          bareMetalServerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listBareMetalServerDisks(listBareMetalServerDisksParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listBareMetalServerDisks({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listBareMetalServerDisks();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getBareMetalServerDisk', () => {
    describe('positive tests', () => {
      function __getBareMetalServerDiskTest() {
        // Construct the params object for operation getBareMetalServerDisk
        const bareMetalServerId = 'testString';
        const id = 'testString';
        const getBareMetalServerDiskParams = {
          bareMetalServerId: bareMetalServerId,
          id: id,
        };

        const getBareMetalServerDiskResult = vpcService.getBareMetalServerDisk(
          getBareMetalServerDiskParams
        );

        // all methods should return a Promise
        expectToBePromise(getBareMetalServerDiskResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/bare_metal_servers/{bare_metal_server_id}/disks/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.bare_metal_server_id).toEqual(bareMetalServerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getBareMetalServerDiskTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getBareMetalServerDiskTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getBareMetalServerDiskTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bareMetalServerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getBareMetalServerDiskParams = {
          bareMetalServerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getBareMetalServerDisk(getBareMetalServerDiskParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getBareMetalServerDisk({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getBareMetalServerDisk();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateBareMetalServerDisk', () => {
    describe('positive tests', () => {
      function __updateBareMetalServerDiskTest() {
        // Construct the params object for operation updateBareMetalServerDisk
        const bareMetalServerId = 'testString';
        const id = 'testString';
        const name = 'my-bare-metal-server-disk-updated';
        const updateBareMetalServerDiskParams = {
          bareMetalServerId: bareMetalServerId,
          id: id,
          name: name,
        };

        const updateBareMetalServerDiskResult = vpcService.updateBareMetalServerDisk(
          updateBareMetalServerDiskParams
        );

        // all methods should return a Promise
        expectToBePromise(updateBareMetalServerDiskResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/bare_metal_servers/{bare_metal_server_id}/disks/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.bare_metal_server_id).toEqual(bareMetalServerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateBareMetalServerDiskTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateBareMetalServerDiskTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateBareMetalServerDiskTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bareMetalServerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateBareMetalServerDiskParams = {
          bareMetalServerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateBareMetalServerDisk(updateBareMetalServerDiskParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateBareMetalServerDisk({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateBareMetalServerDisk();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listBareMetalServerNetworkInterfaces', () => {
    describe('positive tests', () => {
      function __listBareMetalServerNetworkInterfacesTest() {
        // Construct the params object for operation listBareMetalServerNetworkInterfaces
        const bareMetalServerId = 'testString';
        const start = 'testString';
        const limit = 1;
        const listBareMetalServerNetworkInterfacesParams = {
          bareMetalServerId: bareMetalServerId,
          start: start,
          limit: limit,
        };

        const listBareMetalServerNetworkInterfacesResult = vpcService.listBareMetalServerNetworkInterfaces(
          listBareMetalServerNetworkInterfacesParams
        );

        // all methods should return a Promise
        expectToBePromise(listBareMetalServerNetworkInterfacesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/bare_metal_servers/{bare_metal_server_id}/network_interfaces',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.bare_metal_server_id).toEqual(bareMetalServerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listBareMetalServerNetworkInterfacesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listBareMetalServerNetworkInterfacesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listBareMetalServerNetworkInterfacesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bareMetalServerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listBareMetalServerNetworkInterfacesParams = {
          bareMetalServerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listBareMetalServerNetworkInterfaces(listBareMetalServerNetworkInterfacesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listBareMetalServerNetworkInterfaces({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listBareMetalServerNetworkInterfaces();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createBareMetalServerNetworkInterface', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // NetworkInterfaceIPPrototypeReservedIPPrototypeNetworkInterfaceContext
      const networkInterfaceIpPrototypeModel = {
        address: '10.0.0.5',
        auto_delete: false,
        name: 'my-reserved-ip',
      };

      // SecurityGroupIdentityById
      const securityGroupIdentityModel = {
        id: 'be5df5ca-12a0-494b-907e-aa6ec2bfa271',
      };

      // SubnetIdentityById
      const subnetIdentityModel = {
        id: '7ec86020-1c6e-4889-b3f0-a15f2e50f87e',
      };

      // BareMetalServerNetworkInterfacePrototypeBareMetalServerNetworkInterfaceByVLANPrototype
      const bareMetalServerNetworkInterfacePrototypeModel = {
        allow_ip_spoofing: true,
        enable_infrastructure_nat: true,
        interface_type: 'vlan',
        name: 'my-network-interface',
        primary_ip: networkInterfaceIpPrototypeModel,
        security_groups: [securityGroupIdentityModel],
        subnet: subnetIdentityModel,
        allow_interface_to_float: false,
        vlan: 4,
      };

      function __createBareMetalServerNetworkInterfaceTest() {
        // Construct the params object for operation createBareMetalServerNetworkInterface
        const bareMetalServerId = 'testString';
        const bareMetalServerNetworkInterfacePrototype = bareMetalServerNetworkInterfacePrototypeModel;
        const createBareMetalServerNetworkInterfaceParams = {
          bareMetalServerId: bareMetalServerId,
          bareMetalServerNetworkInterfacePrototype: bareMetalServerNetworkInterfacePrototype,
        };

        const createBareMetalServerNetworkInterfaceResult = vpcService.createBareMetalServerNetworkInterface(
          createBareMetalServerNetworkInterfaceParams
        );

        // all methods should return a Promise
        expectToBePromise(createBareMetalServerNetworkInterfaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/bare_metal_servers/{bare_metal_server_id}/network_interfaces',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(bareMetalServerNetworkInterfacePrototype);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.bare_metal_server_id).toEqual(bareMetalServerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createBareMetalServerNetworkInterfaceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createBareMetalServerNetworkInterfaceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createBareMetalServerNetworkInterfaceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bareMetalServerId = 'testString';
        const bareMetalServerNetworkInterfacePrototype = bareMetalServerNetworkInterfacePrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createBareMetalServerNetworkInterfaceParams = {
          bareMetalServerId,
          bareMetalServerNetworkInterfacePrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createBareMetalServerNetworkInterface(
          createBareMetalServerNetworkInterfaceParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createBareMetalServerNetworkInterface({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createBareMetalServerNetworkInterface();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteBareMetalServerNetworkInterface', () => {
    describe('positive tests', () => {
      function __deleteBareMetalServerNetworkInterfaceTest() {
        // Construct the params object for operation deleteBareMetalServerNetworkInterface
        const bareMetalServerId = 'testString';
        const id = 'testString';
        const deleteBareMetalServerNetworkInterfaceParams = {
          bareMetalServerId: bareMetalServerId,
          id: id,
        };

        const deleteBareMetalServerNetworkInterfaceResult = vpcService.deleteBareMetalServerNetworkInterface(
          deleteBareMetalServerNetworkInterfaceParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteBareMetalServerNetworkInterfaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/bare_metal_servers/{bare_metal_server_id}/network_interfaces/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.bare_metal_server_id).toEqual(bareMetalServerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteBareMetalServerNetworkInterfaceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteBareMetalServerNetworkInterfaceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteBareMetalServerNetworkInterfaceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bareMetalServerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteBareMetalServerNetworkInterfaceParams = {
          bareMetalServerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteBareMetalServerNetworkInterface(
          deleteBareMetalServerNetworkInterfaceParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteBareMetalServerNetworkInterface({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteBareMetalServerNetworkInterface();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getBareMetalServerNetworkInterface', () => {
    describe('positive tests', () => {
      function __getBareMetalServerNetworkInterfaceTest() {
        // Construct the params object for operation getBareMetalServerNetworkInterface
        const bareMetalServerId = 'testString';
        const id = 'testString';
        const getBareMetalServerNetworkInterfaceParams = {
          bareMetalServerId: bareMetalServerId,
          id: id,
        };

        const getBareMetalServerNetworkInterfaceResult = vpcService.getBareMetalServerNetworkInterface(
          getBareMetalServerNetworkInterfaceParams
        );

        // all methods should return a Promise
        expectToBePromise(getBareMetalServerNetworkInterfaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/bare_metal_servers/{bare_metal_server_id}/network_interfaces/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.bare_metal_server_id).toEqual(bareMetalServerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getBareMetalServerNetworkInterfaceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getBareMetalServerNetworkInterfaceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getBareMetalServerNetworkInterfaceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bareMetalServerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getBareMetalServerNetworkInterfaceParams = {
          bareMetalServerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getBareMetalServerNetworkInterface(getBareMetalServerNetworkInterfaceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getBareMetalServerNetworkInterface({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getBareMetalServerNetworkInterface();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateBareMetalServerNetworkInterface', () => {
    describe('positive tests', () => {
      function __updateBareMetalServerNetworkInterfaceTest() {
        // Construct the params object for operation updateBareMetalServerNetworkInterface
        const bareMetalServerId = 'testString';
        const id = 'testString';
        const allowIpSpoofing = true;
        const allowedVlans = [4];
        const enableInfrastructureNat = true;
        const name = 'my-network-interface';
        const updateBareMetalServerNetworkInterfaceParams = {
          bareMetalServerId: bareMetalServerId,
          id: id,
          allowIpSpoofing: allowIpSpoofing,
          allowedVlans: allowedVlans,
          enableInfrastructureNat: enableInfrastructureNat,
          name: name,
        };

        const updateBareMetalServerNetworkInterfaceResult = vpcService.updateBareMetalServerNetworkInterface(
          updateBareMetalServerNetworkInterfaceParams
        );

        // all methods should return a Promise
        expectToBePromise(updateBareMetalServerNetworkInterfaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/bare_metal_servers/{bare_metal_server_id}/network_interfaces/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.allow_ip_spoofing).toEqual(allowIpSpoofing);
        expect(mockRequestOptions.body.allowed_vlans).toEqual(allowedVlans);
        expect(mockRequestOptions.body.enable_infrastructure_nat).toEqual(enableInfrastructureNat);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.bare_metal_server_id).toEqual(bareMetalServerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateBareMetalServerNetworkInterfaceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateBareMetalServerNetworkInterfaceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateBareMetalServerNetworkInterfaceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bareMetalServerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateBareMetalServerNetworkInterfaceParams = {
          bareMetalServerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateBareMetalServerNetworkInterface(
          updateBareMetalServerNetworkInterfaceParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateBareMetalServerNetworkInterface({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateBareMetalServerNetworkInterface();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listBareMetalServerNetworkInterfaceFloatingIps', () => {
    describe('positive tests', () => {
      function __listBareMetalServerNetworkInterfaceFloatingIpsTest() {
        // Construct the params object for operation listBareMetalServerNetworkInterfaceFloatingIps
        const bareMetalServerId = 'testString';
        const networkInterfaceId = 'testString';
        const listBareMetalServerNetworkInterfaceFloatingIpsParams = {
          bareMetalServerId: bareMetalServerId,
          networkInterfaceId: networkInterfaceId,
        };

        const listBareMetalServerNetworkInterfaceFloatingIpsResult = vpcService.listBareMetalServerNetworkInterfaceFloatingIps(
          listBareMetalServerNetworkInterfaceFloatingIpsParams
        );

        // all methods should return a Promise
        expectToBePromise(listBareMetalServerNetworkInterfaceFloatingIpsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/bare_metal_servers/{bare_metal_server_id}/network_interfaces/{network_interface_id}/floating_ips',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.bare_metal_server_id).toEqual(bareMetalServerId);
        expect(mockRequestOptions.path.network_interface_id).toEqual(networkInterfaceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listBareMetalServerNetworkInterfaceFloatingIpsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listBareMetalServerNetworkInterfaceFloatingIpsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listBareMetalServerNetworkInterfaceFloatingIpsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bareMetalServerId = 'testString';
        const networkInterfaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listBareMetalServerNetworkInterfaceFloatingIpsParams = {
          bareMetalServerId,
          networkInterfaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listBareMetalServerNetworkInterfaceFloatingIps(
          listBareMetalServerNetworkInterfaceFloatingIpsParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listBareMetalServerNetworkInterfaceFloatingIps({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listBareMetalServerNetworkInterfaceFloatingIps();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('removeBareMetalServerNetworkInterfaceFloatingIp', () => {
    describe('positive tests', () => {
      function __removeBareMetalServerNetworkInterfaceFloatingIpTest() {
        // Construct the params object for operation removeBareMetalServerNetworkInterfaceFloatingIp
        const bareMetalServerId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const removeBareMetalServerNetworkInterfaceFloatingIpParams = {
          bareMetalServerId: bareMetalServerId,
          networkInterfaceId: networkInterfaceId,
          id: id,
        };

        const removeBareMetalServerNetworkInterfaceFloatingIpResult = vpcService.removeBareMetalServerNetworkInterfaceFloatingIp(
          removeBareMetalServerNetworkInterfaceFloatingIpParams
        );

        // all methods should return a Promise
        expectToBePromise(removeBareMetalServerNetworkInterfaceFloatingIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/bare_metal_servers/{bare_metal_server_id}/network_interfaces/{network_interface_id}/floating_ips/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.bare_metal_server_id).toEqual(bareMetalServerId);
        expect(mockRequestOptions.path.network_interface_id).toEqual(networkInterfaceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __removeBareMetalServerNetworkInterfaceFloatingIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __removeBareMetalServerNetworkInterfaceFloatingIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __removeBareMetalServerNetworkInterfaceFloatingIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bareMetalServerId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const removeBareMetalServerNetworkInterfaceFloatingIpParams = {
          bareMetalServerId,
          networkInterfaceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.removeBareMetalServerNetworkInterfaceFloatingIp(
          removeBareMetalServerNetworkInterfaceFloatingIpParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.removeBareMetalServerNetworkInterfaceFloatingIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.removeBareMetalServerNetworkInterfaceFloatingIp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getBareMetalServerNetworkInterfaceFloatingIp', () => {
    describe('positive tests', () => {
      function __getBareMetalServerNetworkInterfaceFloatingIpTest() {
        // Construct the params object for operation getBareMetalServerNetworkInterfaceFloatingIp
        const bareMetalServerId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const getBareMetalServerNetworkInterfaceFloatingIpParams = {
          bareMetalServerId: bareMetalServerId,
          networkInterfaceId: networkInterfaceId,
          id: id,
        };

        const getBareMetalServerNetworkInterfaceFloatingIpResult = vpcService.getBareMetalServerNetworkInterfaceFloatingIp(
          getBareMetalServerNetworkInterfaceFloatingIpParams
        );

        // all methods should return a Promise
        expectToBePromise(getBareMetalServerNetworkInterfaceFloatingIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/bare_metal_servers/{bare_metal_server_id}/network_interfaces/{network_interface_id}/floating_ips/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.bare_metal_server_id).toEqual(bareMetalServerId);
        expect(mockRequestOptions.path.network_interface_id).toEqual(networkInterfaceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getBareMetalServerNetworkInterfaceFloatingIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getBareMetalServerNetworkInterfaceFloatingIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getBareMetalServerNetworkInterfaceFloatingIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bareMetalServerId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getBareMetalServerNetworkInterfaceFloatingIpParams = {
          bareMetalServerId,
          networkInterfaceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getBareMetalServerNetworkInterfaceFloatingIp(
          getBareMetalServerNetworkInterfaceFloatingIpParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getBareMetalServerNetworkInterfaceFloatingIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getBareMetalServerNetworkInterfaceFloatingIp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('addBareMetalServerNetworkInterfaceFloatingIp', () => {
    describe('positive tests', () => {
      function __addBareMetalServerNetworkInterfaceFloatingIpTest() {
        // Construct the params object for operation addBareMetalServerNetworkInterfaceFloatingIp
        const bareMetalServerId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const addBareMetalServerNetworkInterfaceFloatingIpParams = {
          bareMetalServerId: bareMetalServerId,
          networkInterfaceId: networkInterfaceId,
          id: id,
        };

        const addBareMetalServerNetworkInterfaceFloatingIpResult = vpcService.addBareMetalServerNetworkInterfaceFloatingIp(
          addBareMetalServerNetworkInterfaceFloatingIpParams
        );

        // all methods should return a Promise
        expectToBePromise(addBareMetalServerNetworkInterfaceFloatingIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/bare_metal_servers/{bare_metal_server_id}/network_interfaces/{network_interface_id}/floating_ips/{id}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.bare_metal_server_id).toEqual(bareMetalServerId);
        expect(mockRequestOptions.path.network_interface_id).toEqual(networkInterfaceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addBareMetalServerNetworkInterfaceFloatingIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __addBareMetalServerNetworkInterfaceFloatingIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __addBareMetalServerNetworkInterfaceFloatingIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bareMetalServerId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addBareMetalServerNetworkInterfaceFloatingIpParams = {
          bareMetalServerId,
          networkInterfaceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.addBareMetalServerNetworkInterfaceFloatingIp(
          addBareMetalServerNetworkInterfaceFloatingIpParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.addBareMetalServerNetworkInterfaceFloatingIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.addBareMetalServerNetworkInterfaceFloatingIp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listBareMetalServerNetworkInterfaceIps', () => {
    describe('positive tests', () => {
      function __listBareMetalServerNetworkInterfaceIpsTest() {
        // Construct the params object for operation listBareMetalServerNetworkInterfaceIps
        const bareMetalServerId = 'testString';
        const networkInterfaceId = 'testString';
        const listBareMetalServerNetworkInterfaceIpsParams = {
          bareMetalServerId: bareMetalServerId,
          networkInterfaceId: networkInterfaceId,
        };

        const listBareMetalServerNetworkInterfaceIpsResult = vpcService.listBareMetalServerNetworkInterfaceIps(
          listBareMetalServerNetworkInterfaceIpsParams
        );

        // all methods should return a Promise
        expectToBePromise(listBareMetalServerNetworkInterfaceIpsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/bare_metal_servers/{bare_metal_server_id}/network_interfaces/{network_interface_id}/ips',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.bare_metal_server_id).toEqual(bareMetalServerId);
        expect(mockRequestOptions.path.network_interface_id).toEqual(networkInterfaceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listBareMetalServerNetworkInterfaceIpsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listBareMetalServerNetworkInterfaceIpsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listBareMetalServerNetworkInterfaceIpsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bareMetalServerId = 'testString';
        const networkInterfaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listBareMetalServerNetworkInterfaceIpsParams = {
          bareMetalServerId,
          networkInterfaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listBareMetalServerNetworkInterfaceIps(
          listBareMetalServerNetworkInterfaceIpsParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listBareMetalServerNetworkInterfaceIps({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listBareMetalServerNetworkInterfaceIps();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getBareMetalServerNetworkInterfaceIp', () => {
    describe('positive tests', () => {
      function __getBareMetalServerNetworkInterfaceIpTest() {
        // Construct the params object for operation getBareMetalServerNetworkInterfaceIp
        const bareMetalServerId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const getBareMetalServerNetworkInterfaceIpParams = {
          bareMetalServerId: bareMetalServerId,
          networkInterfaceId: networkInterfaceId,
          id: id,
        };

        const getBareMetalServerNetworkInterfaceIpResult = vpcService.getBareMetalServerNetworkInterfaceIp(
          getBareMetalServerNetworkInterfaceIpParams
        );

        // all methods should return a Promise
        expectToBePromise(getBareMetalServerNetworkInterfaceIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/bare_metal_servers/{bare_metal_server_id}/network_interfaces/{network_interface_id}/ips/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.bare_metal_server_id).toEqual(bareMetalServerId);
        expect(mockRequestOptions.path.network_interface_id).toEqual(networkInterfaceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getBareMetalServerNetworkInterfaceIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getBareMetalServerNetworkInterfaceIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getBareMetalServerNetworkInterfaceIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bareMetalServerId = 'testString';
        const networkInterfaceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getBareMetalServerNetworkInterfaceIpParams = {
          bareMetalServerId,
          networkInterfaceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getBareMetalServerNetworkInterfaceIp(getBareMetalServerNetworkInterfaceIpParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getBareMetalServerNetworkInterfaceIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getBareMetalServerNetworkInterfaceIp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteBareMetalServer', () => {
    describe('positive tests', () => {
      function __deleteBareMetalServerTest() {
        // Construct the params object for operation deleteBareMetalServer
        const id = 'testString';
        const deleteBareMetalServerParams = {
          id: id,
        };

        const deleteBareMetalServerResult = vpcService.deleteBareMetalServer(
          deleteBareMetalServerParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteBareMetalServerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bare_metal_servers/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteBareMetalServerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteBareMetalServerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteBareMetalServerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteBareMetalServerParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteBareMetalServer(deleteBareMetalServerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteBareMetalServer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteBareMetalServer();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getBareMetalServer', () => {
    describe('positive tests', () => {
      function __getBareMetalServerTest() {
        // Construct the params object for operation getBareMetalServer
        const id = 'testString';
        const getBareMetalServerParams = {
          id: id,
        };

        const getBareMetalServerResult = vpcService.getBareMetalServer(getBareMetalServerParams);

        // all methods should return a Promise
        expectToBePromise(getBareMetalServerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bare_metal_servers/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getBareMetalServerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getBareMetalServerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getBareMetalServerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getBareMetalServerParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getBareMetalServer(getBareMetalServerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getBareMetalServer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getBareMetalServer();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateBareMetalServer', () => {
    describe('positive tests', () => {
      function __updateBareMetalServerTest() {
        // Construct the params object for operation updateBareMetalServer
        const id = 'testString';
        const name = 'my-bare-metal-server';
        const updateBareMetalServerParams = {
          id: id,
          name: name,
        };

        const updateBareMetalServerResult = vpcService.updateBareMetalServer(
          updateBareMetalServerParams
        );

        // all methods should return a Promise
        expectToBePromise(updateBareMetalServerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bare_metal_servers/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateBareMetalServerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateBareMetalServerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateBareMetalServerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateBareMetalServerParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateBareMetalServer(updateBareMetalServerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateBareMetalServer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateBareMetalServer();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getBareMetalServerInitialization', () => {
    describe('positive tests', () => {
      function __getBareMetalServerInitializationTest() {
        // Construct the params object for operation getBareMetalServerInitialization
        const id = 'testString';
        const getBareMetalServerInitializationParams = {
          id: id,
        };

        const getBareMetalServerInitializationResult = vpcService.getBareMetalServerInitialization(
          getBareMetalServerInitializationParams
        );

        // all methods should return a Promise
        expectToBePromise(getBareMetalServerInitializationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bare_metal_servers/{id}/initialization', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getBareMetalServerInitializationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getBareMetalServerInitializationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getBareMetalServerInitializationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getBareMetalServerInitializationParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getBareMetalServerInitialization(getBareMetalServerInitializationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getBareMetalServerInitialization({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getBareMetalServerInitialization();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('restartBareMetalServer', () => {
    describe('positive tests', () => {
      function __restartBareMetalServerTest() {
        // Construct the params object for operation restartBareMetalServer
        const id = 'testString';
        const restartBareMetalServerParams = {
          id: id,
        };

        const restartBareMetalServerResult = vpcService.restartBareMetalServer(
          restartBareMetalServerParams
        );

        // all methods should return a Promise
        expectToBePromise(restartBareMetalServerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bare_metal_servers/{id}/restart', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __restartBareMetalServerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __restartBareMetalServerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __restartBareMetalServerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const restartBareMetalServerParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.restartBareMetalServer(restartBareMetalServerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.restartBareMetalServer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.restartBareMetalServer();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('startBareMetalServer', () => {
    describe('positive tests', () => {
      function __startBareMetalServerTest() {
        // Construct the params object for operation startBareMetalServer
        const id = 'testString';
        const startBareMetalServerParams = {
          id: id,
        };

        const startBareMetalServerResult = vpcService.startBareMetalServer(
          startBareMetalServerParams
        );

        // all methods should return a Promise
        expectToBePromise(startBareMetalServerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bare_metal_servers/{id}/start', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __startBareMetalServerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __startBareMetalServerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __startBareMetalServerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const startBareMetalServerParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.startBareMetalServer(startBareMetalServerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.startBareMetalServer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.startBareMetalServer();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('stopBareMetalServer', () => {
    describe('positive tests', () => {
      function __stopBareMetalServerTest() {
        // Construct the params object for operation stopBareMetalServer
        const id = 'testString';
        const type = 'hard';
        const stopBareMetalServerParams = {
          id: id,
          type: type,
        };

        const stopBareMetalServerResult = vpcService.stopBareMetalServer(stopBareMetalServerParams);

        // all methods should return a Promise
        expectToBePromise(stopBareMetalServerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bare_metal_servers/{id}/stop', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __stopBareMetalServerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __stopBareMetalServerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __stopBareMetalServerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const type = 'hard';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const stopBareMetalServerParams = {
          id,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.stopBareMetalServer(stopBareMetalServerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.stopBareMetalServer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.stopBareMetalServer();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listVolumeProfiles', () => {
    describe('positive tests', () => {
      function __listVolumeProfilesTest() {
        // Construct the params object for operation listVolumeProfiles
        const start = 'testString';
        const limit = 1;
        const listVolumeProfilesParams = {
          start: start,
          limit: limit,
        };

        const listVolumeProfilesResult = vpcService.listVolumeProfiles(listVolumeProfilesParams);

        // all methods should return a Promise
        expectToBePromise(listVolumeProfilesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/volume/profiles', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listVolumeProfilesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listVolumeProfilesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listVolumeProfilesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listVolumeProfilesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVolumeProfiles(listVolumeProfilesParams);
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
      function __getVolumeProfileTest() {
        // Construct the params object for operation getVolumeProfile
        const name = 'testString';
        const getVolumeProfileParams = {
          name: name,
        };

        const getVolumeProfileResult = vpcService.getVolumeProfile(getVolumeProfileParams);

        // all methods should return a Promise
        expectToBePromise(getVolumeProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/volume/profiles/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getVolumeProfileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getVolumeProfileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getVolumeProfileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getVolumeProfileParams = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVolumeProfile(getVolumeProfileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getVolumeProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getVolumeProfile();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listVolumes', () => {
    describe('positive tests', () => {
      function __listVolumesTest() {
        // Construct the params object for operation listVolumes
        const start = 'testString';
        const limit = 1;
        const name = 'testString';
        const zoneName = 'testString';
        const listVolumesParams = {
          start: start,
          limit: limit,
          name: name,
          zoneName: zoneName,
        };

        const listVolumesResult = vpcService.listVolumes(listVolumesParams);

        // all methods should return a Promise
        expectToBePromise(listVolumesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/volumes', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs['zone.name']).toEqual(zoneName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listVolumesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listVolumesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listVolumesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listVolumesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVolumes(listVolumesParams);
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
        user_tags: ['testString'],
        zone: zoneIdentityModel,
        capacity: 100,
        encryption_key: encryptionKeyIdentityModel,
      };

      function __createVolumeTest() {
        // Construct the params object for operation createVolume
        const volumePrototype = volumePrototypeModel;
        const createVolumeParams = {
          volumePrototype: volumePrototype,
        };

        const createVolumeResult = vpcService.createVolume(createVolumeParams);

        // all methods should return a Promise
        expectToBePromise(createVolumeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/volumes', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(volumePrototype);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createVolumeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createVolumeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createVolumeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const volumePrototype = volumePrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createVolumeParams = {
          volumePrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createVolume(createVolumeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createVolume({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createVolume();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteVolume', () => {
    describe('positive tests', () => {
      function __deleteVolumeTest() {
        // Construct the params object for operation deleteVolume
        const id = 'testString';
        const ifMatch = '96d225c4-56bd-43d9-98fc-d7148e5c5028';
        const deleteVolumeParams = {
          id: id,
          ifMatch: ifMatch,
        };

        const deleteVolumeResult = vpcService.deleteVolume(deleteVolumeParams);

        // all methods should return a Promise
        expectToBePromise(deleteVolumeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/volumes/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteVolumeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteVolumeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteVolumeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteVolumeParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteVolume(deleteVolumeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteVolume({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteVolume();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getVolume', () => {
    describe('positive tests', () => {
      function __getVolumeTest() {
        // Construct the params object for operation getVolume
        const id = 'testString';
        const getVolumeParams = {
          id: id,
        };

        const getVolumeResult = vpcService.getVolume(getVolumeParams);

        // all methods should return a Promise
        expectToBePromise(getVolumeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/volumes/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getVolumeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getVolumeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getVolumeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getVolumeParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVolume(getVolumeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getVolume({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getVolume();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateVolume', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // VolumeProfileIdentityByName
      const volumeProfileIdentityModel = {
        name: 'general-purpose',
      };

      function __updateVolumeTest() {
        // Construct the params object for operation updateVolume
        const id = 'testString';
        const capacity = 100;
        const iops = 10000;
        const name = 'my-volume';
        const profile = volumeProfileIdentityModel;
        const userTags = ['testString'];
        const ifMatch = '96d225c4-56bd-43d9-98fc-d7148e5c5028';
        const updateVolumeParams = {
          id: id,
          capacity: capacity,
          iops: iops,
          name: name,
          profile: profile,
          userTags: userTags,
          ifMatch: ifMatch,
        };

        const updateVolumeResult = vpcService.updateVolume(updateVolumeParams);

        // all methods should return a Promise
        expectToBePromise(updateVolumeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/volumes/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.capacity).toEqual(capacity);
        expect(mockRequestOptions.body.iops).toEqual(iops);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.profile).toEqual(profile);
        expect(mockRequestOptions.body.user_tags).toEqual(userTags);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateVolumeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateVolumeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateVolumeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateVolumeParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateVolume(updateVolumeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateVolume({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateVolume();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteSnapshots', () => {
    describe('positive tests', () => {
      function __deleteSnapshotsTest() {
        // Construct the params object for operation deleteSnapshots
        const sourceVolumeId = 'testString';
        const deleteSnapshotsParams = {
          sourceVolumeId: sourceVolumeId,
        };

        const deleteSnapshotsResult = vpcService.deleteSnapshots(deleteSnapshotsParams);

        // all methods should return a Promise
        expectToBePromise(deleteSnapshotsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/snapshots', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs['source_volume.id']).toEqual(sourceVolumeId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSnapshotsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteSnapshotsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteSnapshotsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const sourceVolumeId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSnapshotsParams = {
          sourceVolumeId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteSnapshots(deleteSnapshotsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteSnapshots({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteSnapshots();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listSnapshots', () => {
    describe('positive tests', () => {
      function __listSnapshotsTest() {
        // Construct the params object for operation listSnapshots
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const name = 'testString';
        const sourceVolumeId = 'testString';
        const sourceVolumeCrn = 'testString';
        const sourceImageId = 'testString';
        const sourceImageCrn = 'testString';
        const sort = 'name';
        const listSnapshotsParams = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          name: name,
          sourceVolumeId: sourceVolumeId,
          sourceVolumeCrn: sourceVolumeCrn,
          sourceImageId: sourceImageId,
          sourceImageCrn: sourceImageCrn,
          sort: sort,
        };

        const listSnapshotsResult = vpcService.listSnapshots(listSnapshotsParams);

        // all methods should return a Promise
        expectToBePromise(listSnapshotsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/snapshots', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs['source_volume.id']).toEqual(sourceVolumeId);
        expect(mockRequestOptions.qs['source_volume.crn']).toEqual(sourceVolumeCrn);
        expect(mockRequestOptions.qs['source_image.id']).toEqual(sourceImageId);
        expect(mockRequestOptions.qs['source_image.crn']).toEqual(sourceImageCrn);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSnapshotsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listSnapshotsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listSnapshotsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSnapshotsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listSnapshots(listSnapshotsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        vpcService.listSnapshots({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createSnapshot', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResourceGroupIdentityById
      const resourceGroupIdentityModel = {
        id: 'fee82deba12e4c0fb69c3b09d1f12345',
      };

      // VolumeIdentityById
      const volumeIdentityModel = {
        id: '1a6b7274-678d-4dfb-8981-c71dd9d4daa5',
      };

      // SnapshotPrototypeSnapshotBySourceVolume
      const snapshotPrototypeModel = {
        name: 'my-snapshot',
        resource_group: resourceGroupIdentityModel,
        user_tags: ['testString'],
        source_volume: volumeIdentityModel,
      };

      function __createSnapshotTest() {
        // Construct the params object for operation createSnapshot
        const snapshotPrototype = snapshotPrototypeModel;
        const createSnapshotParams = {
          snapshotPrototype: snapshotPrototype,
        };

        const createSnapshotResult = vpcService.createSnapshot(createSnapshotParams);

        // all methods should return a Promise
        expectToBePromise(createSnapshotResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/snapshots', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(snapshotPrototype);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSnapshotTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createSnapshotTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createSnapshotTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const snapshotPrototype = snapshotPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSnapshotParams = {
          snapshotPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createSnapshot(createSnapshotParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createSnapshot({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createSnapshot();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteSnapshot', () => {
    describe('positive tests', () => {
      function __deleteSnapshotTest() {
        // Construct the params object for operation deleteSnapshot
        const id = 'testString';
        const ifMatch = '96d225c4-56bd-43d9-98fc-d7148e5c5028';
        const deleteSnapshotParams = {
          id: id,
          ifMatch: ifMatch,
        };

        const deleteSnapshotResult = vpcService.deleteSnapshot(deleteSnapshotParams);

        // all methods should return a Promise
        expectToBePromise(deleteSnapshotResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/snapshots/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSnapshotTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteSnapshotTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteSnapshotTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSnapshotParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteSnapshot(deleteSnapshotParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteSnapshot({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteSnapshot();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getSnapshot', () => {
    describe('positive tests', () => {
      function __getSnapshotTest() {
        // Construct the params object for operation getSnapshot
        const id = 'testString';
        const getSnapshotParams = {
          id: id,
        };

        const getSnapshotResult = vpcService.getSnapshot(getSnapshotParams);

        // all methods should return a Promise
        expectToBePromise(getSnapshotResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/snapshots/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSnapshotTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getSnapshotTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getSnapshotTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSnapshotParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getSnapshot(getSnapshotParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getSnapshot({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getSnapshot();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateSnapshot', () => {
    describe('positive tests', () => {
      function __updateSnapshotTest() {
        // Construct the params object for operation updateSnapshot
        const id = 'testString';
        const name = 'my-snapshot';
        const userTags = ['testString'];
        const ifMatch = '96d225c4-56bd-43d9-98fc-d7148e5c5028';
        const updateSnapshotParams = {
          id: id,
          name: name,
          userTags: userTags,
          ifMatch: ifMatch,
        };

        const updateSnapshotResult = vpcService.updateSnapshot(updateSnapshotParams);

        // all methods should return a Promise
        expectToBePromise(updateSnapshotResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/snapshots/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.user_tags).toEqual(userTags);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSnapshotTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateSnapshotTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateSnapshotTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSnapshotParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateSnapshot(updateSnapshotParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateSnapshot({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateSnapshot();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listRegions', () => {
    describe('positive tests', () => {
      function __listRegionsTest() {
        // Construct the params object for operation listRegions
        const listRegionsParams = {};

        const listRegionsResult = vpcService.listRegions(listRegionsParams);

        // all methods should return a Promise
        expectToBePromise(listRegionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/regions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listRegionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listRegionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listRegionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listRegionsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listRegions(listRegionsParams);
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
      function __getRegionTest() {
        // Construct the params object for operation getRegion
        const name = 'testString';
        const getRegionParams = {
          name: name,
        };

        const getRegionResult = vpcService.getRegion(getRegionParams);

        // all methods should return a Promise
        expectToBePromise(getRegionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/regions/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getRegionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getRegionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getRegionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getRegionParams = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getRegion(getRegionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getRegion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getRegion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listRegionZones', () => {
    describe('positive tests', () => {
      function __listRegionZonesTest() {
        // Construct the params object for operation listRegionZones
        const regionName = 'testString';
        const listRegionZonesParams = {
          regionName: regionName,
        };

        const listRegionZonesResult = vpcService.listRegionZones(listRegionZonesParams);

        // all methods should return a Promise
        expectToBePromise(listRegionZonesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/regions/{region_name}/zones', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.region_name).toEqual(regionName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listRegionZonesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listRegionZonesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listRegionZonesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const regionName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listRegionZonesParams = {
          regionName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listRegionZones(listRegionZonesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listRegionZones({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listRegionZones();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getRegionZone', () => {
    describe('positive tests', () => {
      function __getRegionZoneTest() {
        // Construct the params object for operation getRegionZone
        const regionName = 'testString';
        const name = 'testString';
        const getRegionZoneParams = {
          regionName: regionName,
          name: name,
        };

        const getRegionZoneResult = vpcService.getRegionZone(getRegionZoneParams);

        // all methods should return a Promise
        expectToBePromise(getRegionZoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/regions/{region_name}/zones/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.region_name).toEqual(regionName);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getRegionZoneTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getRegionZoneTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getRegionZoneTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const regionName = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getRegionZoneParams = {
          regionName,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getRegionZone(getRegionZoneParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getRegionZone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getRegionZone();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listPublicGateways', () => {
    describe('positive tests', () => {
      function __listPublicGatewaysTest() {
        // Construct the params object for operation listPublicGateways
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const listPublicGatewaysParams = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
        };

        const listPublicGatewaysResult = vpcService.listPublicGateways(listPublicGatewaysParams);

        // all methods should return a Promise
        expectToBePromise(listPublicGatewaysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/public_gateways', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs['resource_group.id']).toEqual(resourceGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listPublicGatewaysTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listPublicGatewaysTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listPublicGatewaysTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listPublicGatewaysParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listPublicGateways(listPublicGatewaysParams);
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

      function __createPublicGatewayTest() {
        // Construct the params object for operation createPublicGateway
        const vpc = vpcIdentityModel;
        const zone = zoneIdentityModel;
        const floatingIp = publicGatewayFloatingIpPrototypeModel;
        const name = 'my-public-gateway';
        const resourceGroup = resourceGroupIdentityModel;
        const createPublicGatewayParams = {
          vpc: vpc,
          zone: zone,
          floatingIp: floatingIp,
          name: name,
          resourceGroup: resourceGroup,
        };

        const createPublicGatewayResult = vpcService.createPublicGateway(createPublicGatewayParams);

        // all methods should return a Promise
        expectToBePromise(createPublicGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/public_gateways', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.vpc).toEqual(vpc);
        expect(mockRequestOptions.body.zone).toEqual(zone);
        expect(mockRequestOptions.body.floating_ip).toEqual(floatingIp);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.resource_group).toEqual(resourceGroup);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createPublicGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createPublicGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createPublicGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpc = vpcIdentityModel;
        const zone = zoneIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createPublicGatewayParams = {
          vpc,
          zone,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createPublicGateway(createPublicGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createPublicGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createPublicGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deletePublicGateway', () => {
    describe('positive tests', () => {
      function __deletePublicGatewayTest() {
        // Construct the params object for operation deletePublicGateway
        const id = 'testString';
        const deletePublicGatewayParams = {
          id: id,
        };

        const deletePublicGatewayResult = vpcService.deletePublicGateway(deletePublicGatewayParams);

        // all methods should return a Promise
        expectToBePromise(deletePublicGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/public_gateways/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deletePublicGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deletePublicGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deletePublicGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deletePublicGatewayParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deletePublicGateway(deletePublicGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deletePublicGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deletePublicGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getPublicGateway', () => {
    describe('positive tests', () => {
      function __getPublicGatewayTest() {
        // Construct the params object for operation getPublicGateway
        const id = 'testString';
        const getPublicGatewayParams = {
          id: id,
        };

        const getPublicGatewayResult = vpcService.getPublicGateway(getPublicGatewayParams);

        // all methods should return a Promise
        expectToBePromise(getPublicGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/public_gateways/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPublicGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getPublicGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getPublicGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPublicGatewayParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getPublicGateway(getPublicGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getPublicGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getPublicGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updatePublicGateway', () => {
    describe('positive tests', () => {
      function __updatePublicGatewayTest() {
        // Construct the params object for operation updatePublicGateway
        const id = 'testString';
        const name = 'my-public-gateway';
        const updatePublicGatewayParams = {
          id: id,
          name: name,
        };

        const updatePublicGatewayResult = vpcService.updatePublicGateway(updatePublicGatewayParams);

        // all methods should return a Promise
        expectToBePromise(updatePublicGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/public_gateways/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updatePublicGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updatePublicGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updatePublicGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updatePublicGatewayParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updatePublicGateway(updatePublicGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updatePublicGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updatePublicGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listFloatingIps', () => {
    describe('positive tests', () => {
      function __listFloatingIpsTest() {
        // Construct the params object for operation listFloatingIps
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const sort = 'name';
        const listFloatingIpsParams = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          sort: sort,
        };

        const listFloatingIpsResult = vpcService.listFloatingIps(listFloatingIpsParams);

        // all methods should return a Promise
        expectToBePromise(listFloatingIpsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/floating_ips', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listFloatingIpsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listFloatingIpsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listFloatingIpsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listFloatingIpsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listFloatingIps(listFloatingIpsParams);
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

      function __createFloatingIpTest() {
        // Construct the params object for operation createFloatingIp
        const floatingIpPrototype = floatingIpPrototypeModel;
        const createFloatingIpParams = {
          floatingIpPrototype: floatingIpPrototype,
        };

        const createFloatingIpResult = vpcService.createFloatingIp(createFloatingIpParams);

        // all methods should return a Promise
        expectToBePromise(createFloatingIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/floating_ips', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(floatingIpPrototype);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createFloatingIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createFloatingIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createFloatingIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const floatingIpPrototype = floatingIpPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createFloatingIpParams = {
          floatingIpPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createFloatingIp(createFloatingIpParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createFloatingIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createFloatingIp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteFloatingIp', () => {
    describe('positive tests', () => {
      function __deleteFloatingIpTest() {
        // Construct the params object for operation deleteFloatingIp
        const id = 'testString';
        const deleteFloatingIpParams = {
          id: id,
        };

        const deleteFloatingIpResult = vpcService.deleteFloatingIp(deleteFloatingIpParams);

        // all methods should return a Promise
        expectToBePromise(deleteFloatingIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/floating_ips/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteFloatingIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteFloatingIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteFloatingIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteFloatingIpParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteFloatingIp(deleteFloatingIpParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteFloatingIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteFloatingIp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getFloatingIp', () => {
    describe('positive tests', () => {
      function __getFloatingIpTest() {
        // Construct the params object for operation getFloatingIp
        const id = 'testString';
        const getFloatingIpParams = {
          id: id,
        };

        const getFloatingIpResult = vpcService.getFloatingIp(getFloatingIpParams);

        // all methods should return a Promise
        expectToBePromise(getFloatingIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/floating_ips/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getFloatingIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getFloatingIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getFloatingIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getFloatingIpParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getFloatingIp(getFloatingIpParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getFloatingIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getFloatingIp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateFloatingIp', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // FloatingIPTargetPatchNetworkInterfaceIdentityById
      const floatingIpTargetPatchModel = {
        id: '10c02d81-0ecb-4dc5-897d-28392913b81e',
      };

      function __updateFloatingIpTest() {
        // Construct the params object for operation updateFloatingIp
        const id = 'testString';
        const name = 'my-floating-ip';
        const target = floatingIpTargetPatchModel;
        const updateFloatingIpParams = {
          id: id,
          name: name,
          target: target,
        };

        const updateFloatingIpResult = vpcService.updateFloatingIp(updateFloatingIpParams);

        // all methods should return a Promise
        expectToBePromise(updateFloatingIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/floating_ips/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.target).toEqual(target);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateFloatingIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateFloatingIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateFloatingIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateFloatingIpParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateFloatingIp(updateFloatingIpParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateFloatingIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateFloatingIp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listNetworkAcls', () => {
    describe('positive tests', () => {
      function __listNetworkAclsTest() {
        // Construct the params object for operation listNetworkAcls
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const listNetworkAclsParams = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
        };

        const listNetworkAclsResult = vpcService.listNetworkAcls(listNetworkAclsParams);

        // all methods should return a Promise
        expectToBePromise(listNetworkAclsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/network_acls', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs['resource_group.id']).toEqual(resourceGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listNetworkAclsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listNetworkAclsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listNetworkAclsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listNetworkAclsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listNetworkAcls(listNetworkAclsParams);
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

      // NetworkACLRulePrototypeNetworkACLContextNetworkACLRuleProtocolTCPUDP
      const networkAclRulePrototypeNetworkAclContextModel = {
        action: 'allow',
        destination: '192.168.3.2/32',
        direction: 'inbound',
        name: 'my-rule-2',
        source: '192.168.3.2/32',
        destination_port_max: 22,
        destination_port_min: 22,
        protocol: 'udp',
        source_port_max: 65535,
        source_port_min: 49152,
      };

      // NetworkACLPrototypeNetworkACLByRules
      const networkAclPrototypeModel = {
        name: 'my-network-acl',
        resource_group: resourceGroupIdentityModel,
        vpc: vpcIdentityModel,
        rules: [networkAclRulePrototypeNetworkAclContextModel],
      };

      function __createNetworkAclTest() {
        // Construct the params object for operation createNetworkAcl
        const networkAclPrototype = networkAclPrototypeModel;
        const createNetworkAclParams = {
          networkAclPrototype: networkAclPrototype,
        };

        const createNetworkAclResult = vpcService.createNetworkAcl(createNetworkAclParams);

        // all methods should return a Promise
        expectToBePromise(createNetworkAclResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/network_acls', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(networkAclPrototype);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createNetworkAclTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createNetworkAclTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createNetworkAclTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createNetworkAclParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createNetworkAcl(createNetworkAclParams);
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
      function __deleteNetworkAclTest() {
        // Construct the params object for operation deleteNetworkAcl
        const id = 'testString';
        const deleteNetworkAclParams = {
          id: id,
        };

        const deleteNetworkAclResult = vpcService.deleteNetworkAcl(deleteNetworkAclParams);

        // all methods should return a Promise
        expectToBePromise(deleteNetworkAclResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/network_acls/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteNetworkAclTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteNetworkAclTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteNetworkAclTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteNetworkAclParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteNetworkAcl(deleteNetworkAclParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteNetworkAcl({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteNetworkAcl();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getNetworkAcl', () => {
    describe('positive tests', () => {
      function __getNetworkAclTest() {
        // Construct the params object for operation getNetworkAcl
        const id = 'testString';
        const getNetworkAclParams = {
          id: id,
        };

        const getNetworkAclResult = vpcService.getNetworkAcl(getNetworkAclParams);

        // all methods should return a Promise
        expectToBePromise(getNetworkAclResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/network_acls/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getNetworkAclTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getNetworkAclTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getNetworkAclTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getNetworkAclParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getNetworkAcl(getNetworkAclParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getNetworkAcl({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getNetworkAcl();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateNetworkAcl', () => {
    describe('positive tests', () => {
      function __updateNetworkAclTest() {
        // Construct the params object for operation updateNetworkAcl
        const id = 'testString';
        const name = 'my-network-acl';
        const updateNetworkAclParams = {
          id: id,
          name: name,
        };

        const updateNetworkAclResult = vpcService.updateNetworkAcl(updateNetworkAclParams);

        // all methods should return a Promise
        expectToBePromise(updateNetworkAclResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/network_acls/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateNetworkAclTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateNetworkAclTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateNetworkAclTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateNetworkAclParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateNetworkAcl(updateNetworkAclParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateNetworkAcl({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateNetworkAcl();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listNetworkAclRules', () => {
    describe('positive tests', () => {
      function __listNetworkAclRulesTest() {
        // Construct the params object for operation listNetworkAclRules
        const networkAclId = 'testString';
        const start = 'testString';
        const limit = 1;
        const direction = 'inbound';
        const listNetworkAclRulesParams = {
          networkAclId: networkAclId,
          start: start,
          limit: limit,
          direction: direction,
        };

        const listNetworkAclRulesResult = vpcService.listNetworkAclRules(listNetworkAclRulesParams);

        // all methods should return a Promise
        expectToBePromise(listNetworkAclRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/network_acls/{network_acl_id}/rules', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.direction).toEqual(direction);
        expect(mockRequestOptions.path.network_acl_id).toEqual(networkAclId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listNetworkAclRulesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listNetworkAclRulesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listNetworkAclRulesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const networkAclId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listNetworkAclRulesParams = {
          networkAclId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listNetworkAclRules(listNetworkAclRulesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listNetworkAclRules({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listNetworkAclRules();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createNetworkAclRuleTest() {
        // Construct the params object for operation createNetworkAclRule
        const networkAclId = 'testString';
        const networkAclRulePrototype = networkAclRulePrototypeModel;
        const createNetworkAclRuleParams = {
          networkAclId: networkAclId,
          networkAclRulePrototype: networkAclRulePrototype,
        };

        const createNetworkAclRuleResult = vpcService.createNetworkAclRule(
          createNetworkAclRuleParams
        );

        // all methods should return a Promise
        expectToBePromise(createNetworkAclRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/network_acls/{network_acl_id}/rules', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(networkAclRulePrototype);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.network_acl_id).toEqual(networkAclId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createNetworkAclRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createNetworkAclRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createNetworkAclRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const networkAclId = 'testString';
        const networkAclRulePrototype = networkAclRulePrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createNetworkAclRuleParams = {
          networkAclId,
          networkAclRulePrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createNetworkAclRule(createNetworkAclRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createNetworkAclRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createNetworkAclRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteNetworkAclRule', () => {
    describe('positive tests', () => {
      function __deleteNetworkAclRuleTest() {
        // Construct the params object for operation deleteNetworkAclRule
        const networkAclId = 'testString';
        const id = 'testString';
        const deleteNetworkAclRuleParams = {
          networkAclId: networkAclId,
          id: id,
        };

        const deleteNetworkAclRuleResult = vpcService.deleteNetworkAclRule(
          deleteNetworkAclRuleParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteNetworkAclRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/network_acls/{network_acl_id}/rules/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.network_acl_id).toEqual(networkAclId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteNetworkAclRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteNetworkAclRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteNetworkAclRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const networkAclId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteNetworkAclRuleParams = {
          networkAclId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteNetworkAclRule(deleteNetworkAclRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteNetworkAclRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteNetworkAclRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getNetworkAclRule', () => {
    describe('positive tests', () => {
      function __getNetworkAclRuleTest() {
        // Construct the params object for operation getNetworkAclRule
        const networkAclId = 'testString';
        const id = 'testString';
        const getNetworkAclRuleParams = {
          networkAclId: networkAclId,
          id: id,
        };

        const getNetworkAclRuleResult = vpcService.getNetworkAclRule(getNetworkAclRuleParams);

        // all methods should return a Promise
        expectToBePromise(getNetworkAclRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/network_acls/{network_acl_id}/rules/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.network_acl_id).toEqual(networkAclId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getNetworkAclRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getNetworkAclRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getNetworkAclRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const networkAclId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getNetworkAclRuleParams = {
          networkAclId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getNetworkAclRule(getNetworkAclRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getNetworkAclRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getNetworkAclRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __updateNetworkAclRuleTest() {
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
        const updateNetworkAclRuleParams = {
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

        const updateNetworkAclRuleResult = vpcService.updateNetworkAclRule(
          updateNetworkAclRuleParams
        );

        // all methods should return a Promise
        expectToBePromise(updateNetworkAclRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/network_acls/{network_acl_id}/rules/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.action).toEqual(action);
        expect(mockRequestOptions.body.before).toEqual(before);
        expect(mockRequestOptions.body.code).toEqual(code);
        expect(mockRequestOptions.body.destination).toEqual(destination);
        expect(mockRequestOptions.body.destination_port_max).toEqual(destinationPortMax);
        expect(mockRequestOptions.body.destination_port_min).toEqual(destinationPortMin);
        expect(mockRequestOptions.body.direction).toEqual(direction);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.source).toEqual(source);
        expect(mockRequestOptions.body.source_port_max).toEqual(sourcePortMax);
        expect(mockRequestOptions.body.source_port_min).toEqual(sourcePortMin);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.network_acl_id).toEqual(networkAclId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateNetworkAclRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateNetworkAclRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateNetworkAclRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const networkAclId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateNetworkAclRuleParams = {
          networkAclId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateNetworkAclRule(updateNetworkAclRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateNetworkAclRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateNetworkAclRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listSecurityGroups', () => {
    describe('positive tests', () => {
      function __listSecurityGroupsTest() {
        // Construct the params object for operation listSecurityGroups
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const vpcId = 'testString';
        const vpcCrn = 'testString';
        const vpcName = 'testString';
        const listSecurityGroupsParams = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          vpcId: vpcId,
          vpcCrn: vpcCrn,
          vpcName: vpcName,
        };

        const listSecurityGroupsResult = vpcService.listSecurityGroups(listSecurityGroupsParams);

        // all methods should return a Promise
        expectToBePromise(listSecurityGroupsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/security_groups', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(mockRequestOptions.qs['vpc.id']).toEqual(vpcId);
        expect(mockRequestOptions.qs['vpc.crn']).toEqual(vpcCrn);
        expect(mockRequestOptions.qs['vpc.name']).toEqual(vpcName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSecurityGroupsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listSecurityGroupsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listSecurityGroupsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSecurityGroupsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listSecurityGroups(listSecurityGroupsParams);
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
        code: 0,
        direction: 'inbound',
        ip_version: 'ipv4',
        protocol: 'icmp',
        remote: securityGroupRuleRemotePrototypeModel,
        type: 8,
      };

      function __createSecurityGroupTest() {
        // Construct the params object for operation createSecurityGroup
        const vpc = vpcIdentityModel;
        const name = 'my-security-group';
        const resourceGroup = resourceGroupIdentityModel;
        const rules = [securityGroupRulePrototypeModel];
        const createSecurityGroupParams = {
          vpc: vpc,
          name: name,
          resourceGroup: resourceGroup,
          rules: rules,
        };

        const createSecurityGroupResult = vpcService.createSecurityGroup(createSecurityGroupParams);

        // all methods should return a Promise
        expectToBePromise(createSecurityGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/security_groups', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.vpc).toEqual(vpc);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.resource_group).toEqual(resourceGroup);
        expect(mockRequestOptions.body.rules).toEqual(rules);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSecurityGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createSecurityGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createSecurityGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpc = vpcIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSecurityGroupParams = {
          vpc,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createSecurityGroup(createSecurityGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createSecurityGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createSecurityGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteSecurityGroup', () => {
    describe('positive tests', () => {
      function __deleteSecurityGroupTest() {
        // Construct the params object for operation deleteSecurityGroup
        const id = 'testString';
        const deleteSecurityGroupParams = {
          id: id,
        };

        const deleteSecurityGroupResult = vpcService.deleteSecurityGroup(deleteSecurityGroupParams);

        // all methods should return a Promise
        expectToBePromise(deleteSecurityGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/security_groups/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSecurityGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteSecurityGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteSecurityGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSecurityGroupParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteSecurityGroup(deleteSecurityGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteSecurityGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteSecurityGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getSecurityGroup', () => {
    describe('positive tests', () => {
      function __getSecurityGroupTest() {
        // Construct the params object for operation getSecurityGroup
        const id = 'testString';
        const getSecurityGroupParams = {
          id: id,
        };

        const getSecurityGroupResult = vpcService.getSecurityGroup(getSecurityGroupParams);

        // all methods should return a Promise
        expectToBePromise(getSecurityGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/security_groups/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSecurityGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getSecurityGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getSecurityGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSecurityGroupParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getSecurityGroup(getSecurityGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getSecurityGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getSecurityGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateSecurityGroup', () => {
    describe('positive tests', () => {
      function __updateSecurityGroupTest() {
        // Construct the params object for operation updateSecurityGroup
        const id = 'testString';
        const name = 'my-security-group';
        const updateSecurityGroupParams = {
          id: id,
          name: name,
        };

        const updateSecurityGroupResult = vpcService.updateSecurityGroup(updateSecurityGroupParams);

        // all methods should return a Promise
        expectToBePromise(updateSecurityGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/security_groups/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSecurityGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateSecurityGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateSecurityGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSecurityGroupParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateSecurityGroup(updateSecurityGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateSecurityGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateSecurityGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listSecurityGroupRules', () => {
    describe('positive tests', () => {
      function __listSecurityGroupRulesTest() {
        // Construct the params object for operation listSecurityGroupRules
        const securityGroupId = 'testString';
        const listSecurityGroupRulesParams = {
          securityGroupId: securityGroupId,
        };

        const listSecurityGroupRulesResult = vpcService.listSecurityGroupRules(
          listSecurityGroupRulesParams
        );

        // all methods should return a Promise
        expectToBePromise(listSecurityGroupRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/security_groups/{security_group_id}/rules', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.security_group_id).toEqual(securityGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSecurityGroupRulesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listSecurityGroupRulesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listSecurityGroupRulesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSecurityGroupRulesParams = {
          securityGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listSecurityGroupRules(listSecurityGroupRulesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listSecurityGroupRules({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listSecurityGroupRules();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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
        code: 0,
        direction: 'inbound',
        ip_version: 'ipv4',
        protocol: 'icmp',
        remote: securityGroupRuleRemotePrototypeModel,
        type: 8,
      };

      function __createSecurityGroupRuleTest() {
        // Construct the params object for operation createSecurityGroupRule
        const securityGroupId = 'testString';
        const securityGroupRulePrototype = securityGroupRulePrototypeModel;
        const createSecurityGroupRuleParams = {
          securityGroupId: securityGroupId,
          securityGroupRulePrototype: securityGroupRulePrototype,
        };

        const createSecurityGroupRuleResult = vpcService.createSecurityGroupRule(
          createSecurityGroupRuleParams
        );

        // all methods should return a Promise
        expectToBePromise(createSecurityGroupRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/security_groups/{security_group_id}/rules', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(securityGroupRulePrototype);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.security_group_id).toEqual(securityGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSecurityGroupRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createSecurityGroupRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createSecurityGroupRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const securityGroupRulePrototype = securityGroupRulePrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSecurityGroupRuleParams = {
          securityGroupId,
          securityGroupRulePrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createSecurityGroupRule(createSecurityGroupRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createSecurityGroupRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createSecurityGroupRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteSecurityGroupRule', () => {
    describe('positive tests', () => {
      function __deleteSecurityGroupRuleTest() {
        // Construct the params object for operation deleteSecurityGroupRule
        const securityGroupId = 'testString';
        const id = 'testString';
        const deleteSecurityGroupRuleParams = {
          securityGroupId: securityGroupId,
          id: id,
        };

        const deleteSecurityGroupRuleResult = vpcService.deleteSecurityGroupRule(
          deleteSecurityGroupRuleParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteSecurityGroupRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/security_groups/{security_group_id}/rules/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.security_group_id).toEqual(securityGroupId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSecurityGroupRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteSecurityGroupRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteSecurityGroupRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSecurityGroupRuleParams = {
          securityGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteSecurityGroupRule(deleteSecurityGroupRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteSecurityGroupRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteSecurityGroupRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getSecurityGroupRule', () => {
    describe('positive tests', () => {
      function __getSecurityGroupRuleTest() {
        // Construct the params object for operation getSecurityGroupRule
        const securityGroupId = 'testString';
        const id = 'testString';
        const getSecurityGroupRuleParams = {
          securityGroupId: securityGroupId,
          id: id,
        };

        const getSecurityGroupRuleResult = vpcService.getSecurityGroupRule(
          getSecurityGroupRuleParams
        );

        // all methods should return a Promise
        expectToBePromise(getSecurityGroupRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/security_groups/{security_group_id}/rules/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.security_group_id).toEqual(securityGroupId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSecurityGroupRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getSecurityGroupRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getSecurityGroupRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSecurityGroupRuleParams = {
          securityGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getSecurityGroupRule(getSecurityGroupRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getSecurityGroupRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getSecurityGroupRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __updateSecurityGroupRuleTest() {
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
        const updateSecurityGroupRuleParams = {
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

        const updateSecurityGroupRuleResult = vpcService.updateSecurityGroupRule(
          updateSecurityGroupRuleParams
        );

        // all methods should return a Promise
        expectToBePromise(updateSecurityGroupRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/security_groups/{security_group_id}/rules/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.code).toEqual(code);
        expect(mockRequestOptions.body.direction).toEqual(direction);
        expect(mockRequestOptions.body.ip_version).toEqual(ipVersion);
        expect(mockRequestOptions.body.port_max).toEqual(portMax);
        expect(mockRequestOptions.body.port_min).toEqual(portMin);
        expect(mockRequestOptions.body.remote).toEqual(remote);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.security_group_id).toEqual(securityGroupId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSecurityGroupRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateSecurityGroupRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateSecurityGroupRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSecurityGroupRuleParams = {
          securityGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateSecurityGroupRule(updateSecurityGroupRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateSecurityGroupRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateSecurityGroupRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listSecurityGroupTargets', () => {
    describe('positive tests', () => {
      function __listSecurityGroupTargetsTest() {
        // Construct the params object for operation listSecurityGroupTargets
        const securityGroupId = 'testString';
        const start = 'testString';
        const limit = 1;
        const listSecurityGroupTargetsParams = {
          securityGroupId: securityGroupId,
          start: start,
          limit: limit,
        };

        const listSecurityGroupTargetsResult = vpcService.listSecurityGroupTargets(
          listSecurityGroupTargetsParams
        );

        // all methods should return a Promise
        expectToBePromise(listSecurityGroupTargetsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/security_groups/{security_group_id}/targets',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.security_group_id).toEqual(securityGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSecurityGroupTargetsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listSecurityGroupTargetsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listSecurityGroupTargetsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSecurityGroupTargetsParams = {
          securityGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listSecurityGroupTargets(listSecurityGroupTargetsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listSecurityGroupTargets({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listSecurityGroupTargets();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteSecurityGroupTargetBinding', () => {
    describe('positive tests', () => {
      function __deleteSecurityGroupTargetBindingTest() {
        // Construct the params object for operation deleteSecurityGroupTargetBinding
        const securityGroupId = 'testString';
        const id = 'testString';
        const deleteSecurityGroupTargetBindingParams = {
          securityGroupId: securityGroupId,
          id: id,
        };

        const deleteSecurityGroupTargetBindingResult = vpcService.deleteSecurityGroupTargetBinding(
          deleteSecurityGroupTargetBindingParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteSecurityGroupTargetBindingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/security_groups/{security_group_id}/targets/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.security_group_id).toEqual(securityGroupId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSecurityGroupTargetBindingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteSecurityGroupTargetBindingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteSecurityGroupTargetBindingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSecurityGroupTargetBindingParams = {
          securityGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteSecurityGroupTargetBinding(deleteSecurityGroupTargetBindingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteSecurityGroupTargetBinding({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteSecurityGroupTargetBinding();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getSecurityGroupTarget', () => {
    describe('positive tests', () => {
      function __getSecurityGroupTargetTest() {
        // Construct the params object for operation getSecurityGroupTarget
        const securityGroupId = 'testString';
        const id = 'testString';
        const getSecurityGroupTargetParams = {
          securityGroupId: securityGroupId,
          id: id,
        };

        const getSecurityGroupTargetResult = vpcService.getSecurityGroupTarget(
          getSecurityGroupTargetParams
        );

        // all methods should return a Promise
        expectToBePromise(getSecurityGroupTargetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/security_groups/{security_group_id}/targets/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.security_group_id).toEqual(securityGroupId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSecurityGroupTargetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getSecurityGroupTargetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getSecurityGroupTargetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSecurityGroupTargetParams = {
          securityGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getSecurityGroupTarget(getSecurityGroupTargetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getSecurityGroupTarget({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getSecurityGroupTarget();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createSecurityGroupTargetBinding', () => {
    describe('positive tests', () => {
      function __createSecurityGroupTargetBindingTest() {
        // Construct the params object for operation createSecurityGroupTargetBinding
        const securityGroupId = 'testString';
        const id = 'testString';
        const createSecurityGroupTargetBindingParams = {
          securityGroupId: securityGroupId,
          id: id,
        };

        const createSecurityGroupTargetBindingResult = vpcService.createSecurityGroupTargetBinding(
          createSecurityGroupTargetBindingParams
        );

        // all methods should return a Promise
        expectToBePromise(createSecurityGroupTargetBindingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/security_groups/{security_group_id}/targets/{id}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.security_group_id).toEqual(securityGroupId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSecurityGroupTargetBindingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createSecurityGroupTargetBindingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createSecurityGroupTargetBindingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const securityGroupId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSecurityGroupTargetBindingParams = {
          securityGroupId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createSecurityGroupTargetBinding(createSecurityGroupTargetBindingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createSecurityGroupTargetBinding({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createSecurityGroupTargetBinding();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listIkePolicies', () => {
    describe('positive tests', () => {
      function __listIkePoliciesTest() {
        // Construct the params object for operation listIkePolicies
        const start = 'testString';
        const limit = 1;
        const listIkePoliciesParams = {
          start: start,
          limit: limit,
        };

        const listIkePoliciesResult = vpcService.listIkePolicies(listIkePoliciesParams);

        // all methods should return a Promise
        expectToBePromise(listIkePoliciesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ike_policies', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listIkePoliciesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listIkePoliciesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listIkePoliciesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listIkePoliciesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listIkePolicies(listIkePoliciesParams);
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

      function __createIkePolicyTest() {
        // Construct the params object for operation createIkePolicy
        const authenticationAlgorithm = 'md5';
        const dhGroup = 14;
        const encryptionAlgorithm = 'aes128';
        const ikeVersion = 1;
        const keyLifetime = 28800;
        const name = 'my-ike-policy';
        const resourceGroup = resourceGroupIdentityModel;
        const createIkePolicyParams = {
          authenticationAlgorithm: authenticationAlgorithm,
          dhGroup: dhGroup,
          encryptionAlgorithm: encryptionAlgorithm,
          ikeVersion: ikeVersion,
          keyLifetime: keyLifetime,
          name: name,
          resourceGroup: resourceGroup,
        };

        const createIkePolicyResult = vpcService.createIkePolicy(createIkePolicyParams);

        // all methods should return a Promise
        expectToBePromise(createIkePolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ike_policies', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.authentication_algorithm).toEqual(authenticationAlgorithm);
        expect(mockRequestOptions.body.dh_group).toEqual(dhGroup);
        expect(mockRequestOptions.body.encryption_algorithm).toEqual(encryptionAlgorithm);
        expect(mockRequestOptions.body.ike_version).toEqual(ikeVersion);
        expect(mockRequestOptions.body.key_lifetime).toEqual(keyLifetime);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.resource_group).toEqual(resourceGroup);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createIkePolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createIkePolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createIkePolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const authenticationAlgorithm = 'md5';
        const dhGroup = 14;
        const encryptionAlgorithm = 'aes128';
        const ikeVersion = 1;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createIkePolicyParams = {
          authenticationAlgorithm,
          dhGroup,
          encryptionAlgorithm,
          ikeVersion,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createIkePolicy(createIkePolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createIkePolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createIkePolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteIkePolicy', () => {
    describe('positive tests', () => {
      function __deleteIkePolicyTest() {
        // Construct the params object for operation deleteIkePolicy
        const id = 'testString';
        const deleteIkePolicyParams = {
          id: id,
        };

        const deleteIkePolicyResult = vpcService.deleteIkePolicy(deleteIkePolicyParams);

        // all methods should return a Promise
        expectToBePromise(deleteIkePolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ike_policies/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteIkePolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteIkePolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteIkePolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteIkePolicyParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteIkePolicy(deleteIkePolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteIkePolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteIkePolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getIkePolicy', () => {
    describe('positive tests', () => {
      function __getIkePolicyTest() {
        // Construct the params object for operation getIkePolicy
        const id = 'testString';
        const getIkePolicyParams = {
          id: id,
        };

        const getIkePolicyResult = vpcService.getIkePolicy(getIkePolicyParams);

        // all methods should return a Promise
        expectToBePromise(getIkePolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ike_policies/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getIkePolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getIkePolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getIkePolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getIkePolicyParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getIkePolicy(getIkePolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getIkePolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getIkePolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateIkePolicy', () => {
    describe('positive tests', () => {
      function __updateIkePolicyTest() {
        // Construct the params object for operation updateIkePolicy
        const id = 'testString';
        const authenticationAlgorithm = 'md5';
        const dhGroup = 14;
        const encryptionAlgorithm = 'aes128';
        const ikeVersion = 1;
        const keyLifetime = 28800;
        const name = 'my-ike-policy';
        const updateIkePolicyParams = {
          id: id,
          authenticationAlgorithm: authenticationAlgorithm,
          dhGroup: dhGroup,
          encryptionAlgorithm: encryptionAlgorithm,
          ikeVersion: ikeVersion,
          keyLifetime: keyLifetime,
          name: name,
        };

        const updateIkePolicyResult = vpcService.updateIkePolicy(updateIkePolicyParams);

        // all methods should return a Promise
        expectToBePromise(updateIkePolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ike_policies/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.authentication_algorithm).toEqual(authenticationAlgorithm);
        expect(mockRequestOptions.body.dh_group).toEqual(dhGroup);
        expect(mockRequestOptions.body.encryption_algorithm).toEqual(encryptionAlgorithm);
        expect(mockRequestOptions.body.ike_version).toEqual(ikeVersion);
        expect(mockRequestOptions.body.key_lifetime).toEqual(keyLifetime);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateIkePolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateIkePolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateIkePolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateIkePolicyParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateIkePolicy(updateIkePolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateIkePolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateIkePolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listIkePolicyConnections', () => {
    describe('positive tests', () => {
      function __listIkePolicyConnectionsTest() {
        // Construct the params object for operation listIkePolicyConnections
        const id = 'testString';
        const listIkePolicyConnectionsParams = {
          id: id,
        };

        const listIkePolicyConnectionsResult = vpcService.listIkePolicyConnections(
          listIkePolicyConnectionsParams
        );

        // all methods should return a Promise
        expectToBePromise(listIkePolicyConnectionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ike_policies/{id}/connections', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listIkePolicyConnectionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listIkePolicyConnectionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listIkePolicyConnectionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listIkePolicyConnectionsParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listIkePolicyConnections(listIkePolicyConnectionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listIkePolicyConnections({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listIkePolicyConnections();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listIpsecPolicies', () => {
    describe('positive tests', () => {
      function __listIpsecPoliciesTest() {
        // Construct the params object for operation listIpsecPolicies
        const start = 'testString';
        const limit = 1;
        const listIpsecPoliciesParams = {
          start: start,
          limit: limit,
        };

        const listIpsecPoliciesResult = vpcService.listIpsecPolicies(listIpsecPoliciesParams);

        // all methods should return a Promise
        expectToBePromise(listIpsecPoliciesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ipsec_policies', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listIpsecPoliciesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listIpsecPoliciesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listIpsecPoliciesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listIpsecPoliciesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listIpsecPolicies(listIpsecPoliciesParams);
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

      function __createIpsecPolicyTest() {
        // Construct the params object for operation createIpsecPolicy
        const authenticationAlgorithm = 'md5';
        const encryptionAlgorithm = 'aes128';
        const pfs = 'disabled';
        const keyLifetime = 3600;
        const name = 'my-ipsec-policy';
        const resourceGroup = resourceGroupIdentityModel;
        const createIpsecPolicyParams = {
          authenticationAlgorithm: authenticationAlgorithm,
          encryptionAlgorithm: encryptionAlgorithm,
          pfs: pfs,
          keyLifetime: keyLifetime,
          name: name,
          resourceGroup: resourceGroup,
        };

        const createIpsecPolicyResult = vpcService.createIpsecPolicy(createIpsecPolicyParams);

        // all methods should return a Promise
        expectToBePromise(createIpsecPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ipsec_policies', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.authentication_algorithm).toEqual(authenticationAlgorithm);
        expect(mockRequestOptions.body.encryption_algorithm).toEqual(encryptionAlgorithm);
        expect(mockRequestOptions.body.pfs).toEqual(pfs);
        expect(mockRequestOptions.body.key_lifetime).toEqual(keyLifetime);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.resource_group).toEqual(resourceGroup);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createIpsecPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createIpsecPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createIpsecPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const authenticationAlgorithm = 'md5';
        const encryptionAlgorithm = 'aes128';
        const pfs = 'disabled';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createIpsecPolicyParams = {
          authenticationAlgorithm,
          encryptionAlgorithm,
          pfs,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createIpsecPolicy(createIpsecPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createIpsecPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createIpsecPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteIpsecPolicy', () => {
    describe('positive tests', () => {
      function __deleteIpsecPolicyTest() {
        // Construct the params object for operation deleteIpsecPolicy
        const id = 'testString';
        const deleteIpsecPolicyParams = {
          id: id,
        };

        const deleteIpsecPolicyResult = vpcService.deleteIpsecPolicy(deleteIpsecPolicyParams);

        // all methods should return a Promise
        expectToBePromise(deleteIpsecPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ipsec_policies/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteIpsecPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteIpsecPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteIpsecPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteIpsecPolicyParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteIpsecPolicy(deleteIpsecPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteIpsecPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteIpsecPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getIpsecPolicy', () => {
    describe('positive tests', () => {
      function __getIpsecPolicyTest() {
        // Construct the params object for operation getIpsecPolicy
        const id = 'testString';
        const getIpsecPolicyParams = {
          id: id,
        };

        const getIpsecPolicyResult = vpcService.getIpsecPolicy(getIpsecPolicyParams);

        // all methods should return a Promise
        expectToBePromise(getIpsecPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ipsec_policies/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getIpsecPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getIpsecPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getIpsecPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getIpsecPolicyParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getIpsecPolicy(getIpsecPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getIpsecPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getIpsecPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateIpsecPolicy', () => {
    describe('positive tests', () => {
      function __updateIpsecPolicyTest() {
        // Construct the params object for operation updateIpsecPolicy
        const id = 'testString';
        const authenticationAlgorithm = 'md5';
        const encryptionAlgorithm = 'aes128';
        const keyLifetime = 3600;
        const name = 'my-ipsec-policy';
        const pfs = 'disabled';
        const updateIpsecPolicyParams = {
          id: id,
          authenticationAlgorithm: authenticationAlgorithm,
          encryptionAlgorithm: encryptionAlgorithm,
          keyLifetime: keyLifetime,
          name: name,
          pfs: pfs,
        };

        const updateIpsecPolicyResult = vpcService.updateIpsecPolicy(updateIpsecPolicyParams);

        // all methods should return a Promise
        expectToBePromise(updateIpsecPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ipsec_policies/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.authentication_algorithm).toEqual(authenticationAlgorithm);
        expect(mockRequestOptions.body.encryption_algorithm).toEqual(encryptionAlgorithm);
        expect(mockRequestOptions.body.key_lifetime).toEqual(keyLifetime);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.pfs).toEqual(pfs);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateIpsecPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateIpsecPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateIpsecPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateIpsecPolicyParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateIpsecPolicy(updateIpsecPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateIpsecPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateIpsecPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listIpsecPolicyConnections', () => {
    describe('positive tests', () => {
      function __listIpsecPolicyConnectionsTest() {
        // Construct the params object for operation listIpsecPolicyConnections
        const id = 'testString';
        const listIpsecPolicyConnectionsParams = {
          id: id,
        };

        const listIpsecPolicyConnectionsResult = vpcService.listIpsecPolicyConnections(
          listIpsecPolicyConnectionsParams
        );

        // all methods should return a Promise
        expectToBePromise(listIpsecPolicyConnectionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ipsec_policies/{id}/connections', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listIpsecPolicyConnectionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listIpsecPolicyConnectionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listIpsecPolicyConnectionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listIpsecPolicyConnectionsParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listIpsecPolicyConnections(listIpsecPolicyConnectionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listIpsecPolicyConnections({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listIpsecPolicyConnections();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listVpnGateways', () => {
    describe('positive tests', () => {
      function __listVpnGatewaysTest() {
        // Construct the params object for operation listVpnGateways
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const mode = 'route';
        const listVpnGatewaysParams = {
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
          mode: mode,
        };

        const listVpnGatewaysResult = vpcService.listVpnGateways(listVpnGatewaysParams);

        // all methods should return a Promise
        expectToBePromise(listVpnGatewaysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpn_gateways', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(mockRequestOptions.qs.mode).toEqual(mode);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listVpnGatewaysTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listVpnGatewaysTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listVpnGatewaysTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listVpnGatewaysParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVpnGateways(listVpnGatewaysParams);
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

      function __createVpnGatewayTest() {
        // Construct the params object for operation createVpnGateway
        const vpnGatewayPrototype = vpnGatewayPrototypeModel;
        const createVpnGatewayParams = {
          vpnGatewayPrototype: vpnGatewayPrototype,
        };

        const createVpnGatewayResult = vpcService.createVpnGateway(createVpnGatewayParams);

        // all methods should return a Promise
        expectToBePromise(createVpnGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpn_gateways', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(vpnGatewayPrototype);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createVpnGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createVpnGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createVpnGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayPrototype = vpnGatewayPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createVpnGatewayParams = {
          vpnGatewayPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createVpnGateway(createVpnGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createVpnGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createVpnGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteVpnGateway', () => {
    describe('positive tests', () => {
      function __deleteVpnGatewayTest() {
        // Construct the params object for operation deleteVpnGateway
        const id = 'testString';
        const deleteVpnGatewayParams = {
          id: id,
        };

        const deleteVpnGatewayResult = vpcService.deleteVpnGateway(deleteVpnGatewayParams);

        // all methods should return a Promise
        expectToBePromise(deleteVpnGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpn_gateways/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteVpnGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteVpnGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteVpnGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteVpnGatewayParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteVpnGateway(deleteVpnGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteVpnGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteVpnGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getVpnGateway', () => {
    describe('positive tests', () => {
      function __getVpnGatewayTest() {
        // Construct the params object for operation getVpnGateway
        const id = 'testString';
        const getVpnGatewayParams = {
          id: id,
        };

        const getVpnGatewayResult = vpcService.getVpnGateway(getVpnGatewayParams);

        // all methods should return a Promise
        expectToBePromise(getVpnGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpn_gateways/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getVpnGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getVpnGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getVpnGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getVpnGatewayParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpnGateway(getVpnGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getVpnGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getVpnGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateVpnGateway', () => {
    describe('positive tests', () => {
      function __updateVpnGatewayTest() {
        // Construct the params object for operation updateVpnGateway
        const id = 'testString';
        const name = 'my-vpn-gateway';
        const updateVpnGatewayParams = {
          id: id,
          name: name,
        };

        const updateVpnGatewayResult = vpcService.updateVpnGateway(updateVpnGatewayParams);

        // all methods should return a Promise
        expectToBePromise(updateVpnGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpn_gateways/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateVpnGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateVpnGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateVpnGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateVpnGatewayParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateVpnGateway(updateVpnGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateVpnGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateVpnGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listVpnGatewayConnections', () => {
    describe('positive tests', () => {
      function __listVpnGatewayConnectionsTest() {
        // Construct the params object for operation listVpnGatewayConnections
        const vpnGatewayId = 'testString';
        const status = 'testString';
        const listVpnGatewayConnectionsParams = {
          vpnGatewayId: vpnGatewayId,
          status: status,
        };

        const listVpnGatewayConnectionsResult = vpcService.listVpnGatewayConnections(
          listVpnGatewayConnectionsParams
        );

        // all methods should return a Promise
        expectToBePromise(listVpnGatewayConnectionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpn_gateways/{vpn_gateway_id}/connections', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.status).toEqual(status);
        expect(mockRequestOptions.path.vpn_gateway_id).toEqual(vpnGatewayId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listVpnGatewayConnectionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listVpnGatewayConnectionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listVpnGatewayConnectionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listVpnGatewayConnectionsParams = {
          vpnGatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVpnGatewayConnections(listVpnGatewayConnectionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listVpnGatewayConnections({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listVpnGatewayConnections();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      // VPNGatewayConnectionIKEPolicyPrototypeIKEPolicyIdentityById
      const vpnGatewayConnectionIkePolicyPrototypeModel = {
        id: 'ddf51bec-3424-11e8-b467-0ed5f89f718b',
      };

      // VPNGatewayConnectionIPsecPolicyPrototypeIPsecPolicyIdentityById
      const vpnGatewayConnectionIPsecPolicyPrototypeModel = {
        id: 'ddf51bec-3424-11e8-b467-0ed5f89f718b',
      };

      // VPNGatewayConnectionPrototypeVPNGatewayConnectionStaticRouteModePrototype
      const vpnGatewayConnectionPrototypeModel = {
        admin_state_up: true,
        dead_peer_detection: vpnGatewayConnectionDpdPrototypeModel,
        ike_policy: vpnGatewayConnectionIkePolicyPrototypeModel,
        ipsec_policy: vpnGatewayConnectionIPsecPolicyPrototypeModel,
        name: 'my-vpn-connection',
        peer_address: '169.21.50.5',
        psk: 'lkj14b1oi0alcniejkso',
        routing_protocol: 'none',
      };

      function __createVpnGatewayConnectionTest() {
        // Construct the params object for operation createVpnGatewayConnection
        const vpnGatewayId = 'testString';
        const vpnGatewayConnectionPrototype = vpnGatewayConnectionPrototypeModel;
        const createVpnGatewayConnectionParams = {
          vpnGatewayId: vpnGatewayId,
          vpnGatewayConnectionPrototype: vpnGatewayConnectionPrototype,
        };

        const createVpnGatewayConnectionResult = vpcService.createVpnGatewayConnection(
          createVpnGatewayConnectionParams
        );

        // all methods should return a Promise
        expectToBePromise(createVpnGatewayConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/vpn_gateways/{vpn_gateway_id}/connections', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(vpnGatewayConnectionPrototype);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpn_gateway_id).toEqual(vpnGatewayId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createVpnGatewayConnectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createVpnGatewayConnectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createVpnGatewayConnectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const vpnGatewayConnectionPrototype = vpnGatewayConnectionPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createVpnGatewayConnectionParams = {
          vpnGatewayId,
          vpnGatewayConnectionPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createVpnGatewayConnection(createVpnGatewayConnectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createVpnGatewayConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createVpnGatewayConnection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteVpnGatewayConnection', () => {
    describe('positive tests', () => {
      function __deleteVpnGatewayConnectionTest() {
        // Construct the params object for operation deleteVpnGatewayConnection
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const deleteVpnGatewayConnectionParams = {
          vpnGatewayId: vpnGatewayId,
          id: id,
        };

        const deleteVpnGatewayConnectionResult = vpcService.deleteVpnGatewayConnection(
          deleteVpnGatewayConnectionParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteVpnGatewayConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/vpn_gateways/{vpn_gateway_id}/connections/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpn_gateway_id).toEqual(vpnGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteVpnGatewayConnectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteVpnGatewayConnectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteVpnGatewayConnectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteVpnGatewayConnectionParams = {
          vpnGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteVpnGatewayConnection(deleteVpnGatewayConnectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteVpnGatewayConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteVpnGatewayConnection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getVpnGatewayConnection', () => {
    describe('positive tests', () => {
      function __getVpnGatewayConnectionTest() {
        // Construct the params object for operation getVpnGatewayConnection
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const getVpnGatewayConnectionParams = {
          vpnGatewayId: vpnGatewayId,
          id: id,
        };

        const getVpnGatewayConnectionResult = vpcService.getVpnGatewayConnection(
          getVpnGatewayConnectionParams
        );

        // all methods should return a Promise
        expectToBePromise(getVpnGatewayConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/vpn_gateways/{vpn_gateway_id}/connections/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpn_gateway_id).toEqual(vpnGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getVpnGatewayConnectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getVpnGatewayConnectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getVpnGatewayConnectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getVpnGatewayConnectionParams = {
          vpnGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getVpnGatewayConnection(getVpnGatewayConnectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getVpnGatewayConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getVpnGatewayConnection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateVpnGatewayConnection', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // VPNGatewayConnectionDPDPatch
      const vpnGatewayConnectionDpdPatchModel = {
        action: 'restart',
        interval: 30,
        timeout: 120,
      };

      // VPNGatewayConnectionIKEPolicyPatchIKEPolicyIdentityById
      const vpnGatewayConnectionIkePolicyPatchModel = {
        id: 'ddf51bec-3424-11e8-b467-0ed5f89f718b',
      };

      // VPNGatewayConnectionIPsecPolicyPatchIPsecPolicyIdentityById
      const vpnGatewayConnectionIPsecPolicyPatchModel = {
        id: 'ddf51bec-3424-11e8-b467-0ed5f89f718b',
      };

      // VPNGatewayConnectionPatchVPNGatewayConnectionStaticRouteModePatch
      const vpnGatewayConnectionPatchModel = {
        admin_state_up: true,
        dead_peer_detection: vpnGatewayConnectionDpdPatchModel,
        ike_policy: vpnGatewayConnectionIkePolicyPatchModel,
        ipsec_policy: vpnGatewayConnectionIPsecPolicyPatchModel,
        name: 'my-vpn-connection',
        peer_address: '169.21.50.5',
        psk: 'lkj14b1oi0alcniejkso',
        routing_protocol: 'none',
      };

      function __updateVpnGatewayConnectionTest() {
        // Construct the params object for operation updateVpnGatewayConnection
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const vpnGatewayConnectionPatch = vpnGatewayConnectionPatchModel;
        const updateVpnGatewayConnectionParams = {
          vpnGatewayId: vpnGatewayId,
          id: id,
          vpnGatewayConnectionPatch: vpnGatewayConnectionPatch,
        };

        const updateVpnGatewayConnectionResult = vpcService.updateVpnGatewayConnection(
          updateVpnGatewayConnectionParams
        );

        // all methods should return a Promise
        expectToBePromise(updateVpnGatewayConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/vpn_gateways/{vpn_gateway_id}/connections/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(vpnGatewayConnectionPatch);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpn_gateway_id).toEqual(vpnGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateVpnGatewayConnectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateVpnGatewayConnectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateVpnGatewayConnectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const vpnGatewayConnectionPatch = vpnGatewayConnectionPatchModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateVpnGatewayConnectionParams = {
          vpnGatewayId,
          id,
          vpnGatewayConnectionPatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateVpnGatewayConnection(updateVpnGatewayConnectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateVpnGatewayConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateVpnGatewayConnection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listVpnGatewayConnectionLocalCidrs', () => {
    describe('positive tests', () => {
      function __listVpnGatewayConnectionLocalCidrsTest() {
        // Construct the params object for operation listVpnGatewayConnectionLocalCidrs
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const listVpnGatewayConnectionLocalCidrsParams = {
          vpnGatewayId: vpnGatewayId,
          id: id,
        };

        const listVpnGatewayConnectionLocalCidrsResult = vpcService.listVpnGatewayConnectionLocalCidrs(
          listVpnGatewayConnectionLocalCidrsParams
        );

        // all methods should return a Promise
        expectToBePromise(listVpnGatewayConnectionLocalCidrsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/vpn_gateways/{vpn_gateway_id}/connections/{id}/local_cidrs',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpn_gateway_id).toEqual(vpnGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listVpnGatewayConnectionLocalCidrsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listVpnGatewayConnectionLocalCidrsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listVpnGatewayConnectionLocalCidrsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listVpnGatewayConnectionLocalCidrsParams = {
          vpnGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVpnGatewayConnectionLocalCidrs(listVpnGatewayConnectionLocalCidrsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listVpnGatewayConnectionLocalCidrs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listVpnGatewayConnectionLocalCidrs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('removeVpnGatewayConnectionLocalCidr', () => {
    describe('positive tests', () => {
      function __removeVpnGatewayConnectionLocalCidrTest() {
        // Construct the params object for operation removeVpnGatewayConnectionLocalCidr
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const removeVpnGatewayConnectionLocalCidrParams = {
          vpnGatewayId: vpnGatewayId,
          id: id,
          cidrPrefix: cidrPrefix,
          prefixLength: prefixLength,
        };

        const removeVpnGatewayConnectionLocalCidrResult = vpcService.removeVpnGatewayConnectionLocalCidr(
          removeVpnGatewayConnectionLocalCidrParams
        );

        // all methods should return a Promise
        expectToBePromise(removeVpnGatewayConnectionLocalCidrResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/vpn_gateways/{vpn_gateway_id}/connections/{id}/local_cidrs/{cidr_prefix}/{prefix_length}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpn_gateway_id).toEqual(vpnGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.cidr_prefix).toEqual(cidrPrefix);
        expect(mockRequestOptions.path.prefix_length).toEqual(prefixLength);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __removeVpnGatewayConnectionLocalCidrTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __removeVpnGatewayConnectionLocalCidrTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __removeVpnGatewayConnectionLocalCidrTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const removeVpnGatewayConnectionLocalCidrParams = {
          vpnGatewayId,
          id,
          cidrPrefix,
          prefixLength,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.removeVpnGatewayConnectionLocalCidr(removeVpnGatewayConnectionLocalCidrParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.removeVpnGatewayConnectionLocalCidr({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.removeVpnGatewayConnectionLocalCidr();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('checkVpnGatewayConnectionLocalCidr', () => {
    describe('positive tests', () => {
      function __checkVpnGatewayConnectionLocalCidrTest() {
        // Construct the params object for operation checkVpnGatewayConnectionLocalCidr
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const checkVpnGatewayConnectionLocalCidrParams = {
          vpnGatewayId: vpnGatewayId,
          id: id,
          cidrPrefix: cidrPrefix,
          prefixLength: prefixLength,
        };

        const checkVpnGatewayConnectionLocalCidrResult = vpcService.checkVpnGatewayConnectionLocalCidr(
          checkVpnGatewayConnectionLocalCidrParams
        );

        // all methods should return a Promise
        expectToBePromise(checkVpnGatewayConnectionLocalCidrResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/vpn_gateways/{vpn_gateway_id}/connections/{id}/local_cidrs/{cidr_prefix}/{prefix_length}',
          'GET'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpn_gateway_id).toEqual(vpnGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.cidr_prefix).toEqual(cidrPrefix);
        expect(mockRequestOptions.path.prefix_length).toEqual(prefixLength);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __checkVpnGatewayConnectionLocalCidrTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __checkVpnGatewayConnectionLocalCidrTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __checkVpnGatewayConnectionLocalCidrTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const checkVpnGatewayConnectionLocalCidrParams = {
          vpnGatewayId,
          id,
          cidrPrefix,
          prefixLength,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.checkVpnGatewayConnectionLocalCidr(checkVpnGatewayConnectionLocalCidrParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.checkVpnGatewayConnectionLocalCidr({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.checkVpnGatewayConnectionLocalCidr();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('addVpnGatewayConnectionLocalCidr', () => {
    describe('positive tests', () => {
      function __addVpnGatewayConnectionLocalCidrTest() {
        // Construct the params object for operation addVpnGatewayConnectionLocalCidr
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const addVpnGatewayConnectionLocalCidrParams = {
          vpnGatewayId: vpnGatewayId,
          id: id,
          cidrPrefix: cidrPrefix,
          prefixLength: prefixLength,
        };

        const addVpnGatewayConnectionLocalCidrResult = vpcService.addVpnGatewayConnectionLocalCidr(
          addVpnGatewayConnectionLocalCidrParams
        );

        // all methods should return a Promise
        expectToBePromise(addVpnGatewayConnectionLocalCidrResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/vpn_gateways/{vpn_gateway_id}/connections/{id}/local_cidrs/{cidr_prefix}/{prefix_length}',
          'PUT'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpn_gateway_id).toEqual(vpnGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.cidr_prefix).toEqual(cidrPrefix);
        expect(mockRequestOptions.path.prefix_length).toEqual(prefixLength);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addVpnGatewayConnectionLocalCidrTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __addVpnGatewayConnectionLocalCidrTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __addVpnGatewayConnectionLocalCidrTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addVpnGatewayConnectionLocalCidrParams = {
          vpnGatewayId,
          id,
          cidrPrefix,
          prefixLength,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.addVpnGatewayConnectionLocalCidr(addVpnGatewayConnectionLocalCidrParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.addVpnGatewayConnectionLocalCidr({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.addVpnGatewayConnectionLocalCidr();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listVpnGatewayConnectionPeerCidrs', () => {
    describe('positive tests', () => {
      function __listVpnGatewayConnectionPeerCidrsTest() {
        // Construct the params object for operation listVpnGatewayConnectionPeerCidrs
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const listVpnGatewayConnectionPeerCidrsParams = {
          vpnGatewayId: vpnGatewayId,
          id: id,
        };

        const listVpnGatewayConnectionPeerCidrsResult = vpcService.listVpnGatewayConnectionPeerCidrs(
          listVpnGatewayConnectionPeerCidrsParams
        );

        // all methods should return a Promise
        expectToBePromise(listVpnGatewayConnectionPeerCidrsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/vpn_gateways/{vpn_gateway_id}/connections/{id}/peer_cidrs',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpn_gateway_id).toEqual(vpnGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listVpnGatewayConnectionPeerCidrsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listVpnGatewayConnectionPeerCidrsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listVpnGatewayConnectionPeerCidrsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listVpnGatewayConnectionPeerCidrsParams = {
          vpnGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listVpnGatewayConnectionPeerCidrs(listVpnGatewayConnectionPeerCidrsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listVpnGatewayConnectionPeerCidrs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listVpnGatewayConnectionPeerCidrs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('removeVpnGatewayConnectionPeerCidr', () => {
    describe('positive tests', () => {
      function __removeVpnGatewayConnectionPeerCidrTest() {
        // Construct the params object for operation removeVpnGatewayConnectionPeerCidr
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const removeVpnGatewayConnectionPeerCidrParams = {
          vpnGatewayId: vpnGatewayId,
          id: id,
          cidrPrefix: cidrPrefix,
          prefixLength: prefixLength,
        };

        const removeVpnGatewayConnectionPeerCidrResult = vpcService.removeVpnGatewayConnectionPeerCidr(
          removeVpnGatewayConnectionPeerCidrParams
        );

        // all methods should return a Promise
        expectToBePromise(removeVpnGatewayConnectionPeerCidrResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/vpn_gateways/{vpn_gateway_id}/connections/{id}/peer_cidrs/{cidr_prefix}/{prefix_length}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpn_gateway_id).toEqual(vpnGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.cidr_prefix).toEqual(cidrPrefix);
        expect(mockRequestOptions.path.prefix_length).toEqual(prefixLength);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __removeVpnGatewayConnectionPeerCidrTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __removeVpnGatewayConnectionPeerCidrTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __removeVpnGatewayConnectionPeerCidrTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const removeVpnGatewayConnectionPeerCidrParams = {
          vpnGatewayId,
          id,
          cidrPrefix,
          prefixLength,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.removeVpnGatewayConnectionPeerCidr(removeVpnGatewayConnectionPeerCidrParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.removeVpnGatewayConnectionPeerCidr({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.removeVpnGatewayConnectionPeerCidr();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('checkVpnGatewayConnectionPeerCidr', () => {
    describe('positive tests', () => {
      function __checkVpnGatewayConnectionPeerCidrTest() {
        // Construct the params object for operation checkVpnGatewayConnectionPeerCidr
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const checkVpnGatewayConnectionPeerCidrParams = {
          vpnGatewayId: vpnGatewayId,
          id: id,
          cidrPrefix: cidrPrefix,
          prefixLength: prefixLength,
        };

        const checkVpnGatewayConnectionPeerCidrResult = vpcService.checkVpnGatewayConnectionPeerCidr(
          checkVpnGatewayConnectionPeerCidrParams
        );

        // all methods should return a Promise
        expectToBePromise(checkVpnGatewayConnectionPeerCidrResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/vpn_gateways/{vpn_gateway_id}/connections/{id}/peer_cidrs/{cidr_prefix}/{prefix_length}',
          'GET'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpn_gateway_id).toEqual(vpnGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.cidr_prefix).toEqual(cidrPrefix);
        expect(mockRequestOptions.path.prefix_length).toEqual(prefixLength);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __checkVpnGatewayConnectionPeerCidrTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __checkVpnGatewayConnectionPeerCidrTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __checkVpnGatewayConnectionPeerCidrTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const checkVpnGatewayConnectionPeerCidrParams = {
          vpnGatewayId,
          id,
          cidrPrefix,
          prefixLength,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.checkVpnGatewayConnectionPeerCidr(checkVpnGatewayConnectionPeerCidrParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.checkVpnGatewayConnectionPeerCidr({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.checkVpnGatewayConnectionPeerCidr();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('addVpnGatewayConnectionPeerCidr', () => {
    describe('positive tests', () => {
      function __addVpnGatewayConnectionPeerCidrTest() {
        // Construct the params object for operation addVpnGatewayConnectionPeerCidr
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const addVpnGatewayConnectionPeerCidrParams = {
          vpnGatewayId: vpnGatewayId,
          id: id,
          cidrPrefix: cidrPrefix,
          prefixLength: prefixLength,
        };

        const addVpnGatewayConnectionPeerCidrResult = vpcService.addVpnGatewayConnectionPeerCidr(
          addVpnGatewayConnectionPeerCidrParams
        );

        // all methods should return a Promise
        expectToBePromise(addVpnGatewayConnectionPeerCidrResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/vpn_gateways/{vpn_gateway_id}/connections/{id}/peer_cidrs/{cidr_prefix}/{prefix_length}',
          'PUT'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.vpn_gateway_id).toEqual(vpnGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.cidr_prefix).toEqual(cidrPrefix);
        expect(mockRequestOptions.path.prefix_length).toEqual(prefixLength);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addVpnGatewayConnectionPeerCidrTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __addVpnGatewayConnectionPeerCidrTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __addVpnGatewayConnectionPeerCidrTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const vpnGatewayId = 'testString';
        const id = 'testString';
        const cidrPrefix = 'testString';
        const prefixLength = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addVpnGatewayConnectionPeerCidrParams = {
          vpnGatewayId,
          id,
          cidrPrefix,
          prefixLength,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.addVpnGatewayConnectionPeerCidr(addVpnGatewayConnectionPeerCidrParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.addVpnGatewayConnectionPeerCidr({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.addVpnGatewayConnectionPeerCidr();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listLoadBalancerProfiles', () => {
    describe('positive tests', () => {
      function __listLoadBalancerProfilesTest() {
        // Construct the params object for operation listLoadBalancerProfiles
        const start = 'testString';
        const limit = 1;
        const listLoadBalancerProfilesParams = {
          start: start,
          limit: limit,
        };

        const listLoadBalancerProfilesResult = vpcService.listLoadBalancerProfiles(
          listLoadBalancerProfilesParams
        );

        // all methods should return a Promise
        expectToBePromise(listLoadBalancerProfilesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/load_balancer/profiles', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listLoadBalancerProfilesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listLoadBalancerProfilesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listLoadBalancerProfilesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listLoadBalancerProfilesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listLoadBalancerProfiles(listLoadBalancerProfilesParams);
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
      function __getLoadBalancerProfileTest() {
        // Construct the params object for operation getLoadBalancerProfile
        const name = 'testString';
        const getLoadBalancerProfileParams = {
          name: name,
        };

        const getLoadBalancerProfileResult = vpcService.getLoadBalancerProfile(
          getLoadBalancerProfileParams
        );

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/load_balancer/profiles/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLoadBalancerProfileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getLoadBalancerProfileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getLoadBalancerProfileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLoadBalancerProfileParams = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getLoadBalancerProfile(getLoadBalancerProfileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getLoadBalancerProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getLoadBalancerProfile();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listLoadBalancers', () => {
    describe('positive tests', () => {
      function __listLoadBalancersTest() {
        // Construct the params object for operation listLoadBalancers
        const start = 'testString';
        const limit = 1;
        const listLoadBalancersParams = {
          start: start,
          limit: limit,
        };

        const listLoadBalancersResult = vpcService.listLoadBalancers(listLoadBalancersParams);

        // all methods should return a Promise
        expectToBePromise(listLoadBalancersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/load_balancers', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listLoadBalancersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listLoadBalancersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listLoadBalancersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listLoadBalancersParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listLoadBalancers(listLoadBalancersParams);
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
        port_max: 499,
        port_min: 443,
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
        cookie_name: 'my-cookie-name',
        type: 'app_cookie',
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

      function __createLoadBalancerTest() {
        // Construct the params object for operation createLoadBalancer
        const isPublic = true;
        const subnets = [subnetIdentityModel];
        const listeners = [loadBalancerListenerPrototypeLoadBalancerContextModel];
        const logging = loadBalancerLoggingModel;
        const name = 'my-load-balancer';
        const pools = [loadBalancerPoolPrototypeModel];
        const profile = loadBalancerProfileIdentityModel;
        const resourceGroup = resourceGroupIdentityModel;
        const routeMode = true;
        const securityGroups = [securityGroupIdentityModel];
        const createLoadBalancerParams = {
          isPublic: isPublic,
          subnets: subnets,
          listeners: listeners,
          logging: logging,
          name: name,
          pools: pools,
          profile: profile,
          resourceGroup: resourceGroup,
          routeMode: routeMode,
          securityGroups: securityGroups,
        };

        const createLoadBalancerResult = vpcService.createLoadBalancer(createLoadBalancerParams);

        // all methods should return a Promise
        expectToBePromise(createLoadBalancerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/load_balancers', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.is_public).toEqual(isPublic);
        expect(mockRequestOptions.body.subnets).toEqual(subnets);
        expect(mockRequestOptions.body.listeners).toEqual(listeners);
        expect(mockRequestOptions.body.logging).toEqual(logging);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.pools).toEqual(pools);
        expect(mockRequestOptions.body.profile).toEqual(profile);
        expect(mockRequestOptions.body.resource_group).toEqual(resourceGroup);
        expect(mockRequestOptions.body.route_mode).toEqual(routeMode);
        expect(mockRequestOptions.body.security_groups).toEqual(securityGroups);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createLoadBalancerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createLoadBalancerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createLoadBalancerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const isPublic = true;
        const subnets = [subnetIdentityModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createLoadBalancerParams = {
          isPublic,
          subnets,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createLoadBalancer(createLoadBalancerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createLoadBalancer();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteLoadBalancer', () => {
    describe('positive tests', () => {
      function __deleteLoadBalancerTest() {
        // Construct the params object for operation deleteLoadBalancer
        const id = 'testString';
        const deleteLoadBalancerParams = {
          id: id,
        };

        const deleteLoadBalancerResult = vpcService.deleteLoadBalancer(deleteLoadBalancerParams);

        // all methods should return a Promise
        expectToBePromise(deleteLoadBalancerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/load_balancers/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteLoadBalancerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteLoadBalancerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteLoadBalancerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteLoadBalancerParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteLoadBalancer(deleteLoadBalancerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteLoadBalancer();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getLoadBalancer', () => {
    describe('positive tests', () => {
      function __getLoadBalancerTest() {
        // Construct the params object for operation getLoadBalancer
        const id = 'testString';
        const getLoadBalancerParams = {
          id: id,
        };

        const getLoadBalancerResult = vpcService.getLoadBalancer(getLoadBalancerParams);

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/load_balancers/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLoadBalancerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getLoadBalancerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getLoadBalancerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLoadBalancerParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getLoadBalancer(getLoadBalancerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getLoadBalancer();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __updateLoadBalancerTest() {
        // Construct the params object for operation updateLoadBalancer
        const id = 'testString';
        const logging = loadBalancerLoggingModel;
        const name = 'my-load-balancer';
        const updateLoadBalancerParams = {
          id: id,
          logging: logging,
          name: name,
        };

        const updateLoadBalancerResult = vpcService.updateLoadBalancer(updateLoadBalancerParams);

        // all methods should return a Promise
        expectToBePromise(updateLoadBalancerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/load_balancers/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.logging).toEqual(logging);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateLoadBalancerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateLoadBalancerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateLoadBalancerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateLoadBalancerParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateLoadBalancer(updateLoadBalancerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateLoadBalancer();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getLoadBalancerStatistics', () => {
    describe('positive tests', () => {
      function __getLoadBalancerStatisticsTest() {
        // Construct the params object for operation getLoadBalancerStatistics
        const id = 'testString';
        const getLoadBalancerStatisticsParams = {
          id: id,
        };

        const getLoadBalancerStatisticsResult = vpcService.getLoadBalancerStatistics(
          getLoadBalancerStatisticsParams
        );

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerStatisticsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/load_balancers/{id}/statistics', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLoadBalancerStatisticsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getLoadBalancerStatisticsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getLoadBalancerStatisticsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLoadBalancerStatisticsParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getLoadBalancerStatistics(getLoadBalancerStatisticsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getLoadBalancerStatistics({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getLoadBalancerStatistics();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listLoadBalancerListeners', () => {
    describe('positive tests', () => {
      function __listLoadBalancerListenersTest() {
        // Construct the params object for operation listLoadBalancerListeners
        const loadBalancerId = 'testString';
        const listLoadBalancerListenersParams = {
          loadBalancerId: loadBalancerId,
        };

        const listLoadBalancerListenersResult = vpcService.listLoadBalancerListeners(
          listLoadBalancerListenersParams
        );

        // all methods should return a Promise
        expectToBePromise(listLoadBalancerListenersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/listeners',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listLoadBalancerListenersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listLoadBalancerListenersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listLoadBalancerListenersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listLoadBalancerListenersParams = {
          loadBalancerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listLoadBalancerListeners(listLoadBalancerListenersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listLoadBalancerListeners({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listLoadBalancerListeners();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createLoadBalancerListener', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CertificateInstanceIdentityByCRN
      const certificateInstanceIdentityModel = {
        crn:
          'crn:v1:bluemix:public:secrets-manager:us-south:a/123456:36fa422d-080d-4d83-8d2d-86851b4001df:secret:2e786aab-42fa-63ed-14f8-d66d552f4dd5',
      };

      // LoadBalancerPoolIdentityById
      const loadBalancerPoolIdentityModel = {
        id: '70294e14-4e61-11e8-bcf4-0242ac110004',
      };

      // LoadBalancerListenerIdentityById
      const loadBalancerListenerIdentityModel = {
        id: '70294e14-4e61-11e8-bcf4-0242ac110004',
      };

      // LoadBalancerListenerHTTPSRedirectPrototype
      const loadBalancerListenerHttpsRedirectPrototypeModel = {
        http_status_code: 301,
        listener: loadBalancerListenerIdentityModel,
        uri: '/example?doc=get',
      };

      // LoadBalancerListenerPolicyRulePrototype
      const loadBalancerListenerPolicyRulePrototypeModel = {
        condition: 'contains',
        field: 'MY-APP-HEADER',
        type: 'body',
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

      function __createLoadBalancerListenerTest() {
        // Construct the params object for operation createLoadBalancerListener
        const loadBalancerId = 'testString';
        const protocol = 'http';
        const acceptProxyProtocol = true;
        const certificateInstance = certificateInstanceIdentityModel;
        const connectionLimit = 2000;
        const defaultPool = loadBalancerPoolIdentityModel;
        const httpsRedirect = loadBalancerListenerHttpsRedirectPrototypeModel;
        const policies = [loadBalancerListenerPolicyPrototypeModel];
        const port = 443;
        const portMax = 499;
        const portMin = 443;
        const createLoadBalancerListenerParams = {
          loadBalancerId: loadBalancerId,
          protocol: protocol,
          acceptProxyProtocol: acceptProxyProtocol,
          certificateInstance: certificateInstance,
          connectionLimit: connectionLimit,
          defaultPool: defaultPool,
          httpsRedirect: httpsRedirect,
          policies: policies,
          port: port,
          portMax: portMax,
          portMin: portMin,
        };

        const createLoadBalancerListenerResult = vpcService.createLoadBalancerListener(
          createLoadBalancerListenerParams
        );

        // all methods should return a Promise
        expectToBePromise(createLoadBalancerListenerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/listeners',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.protocol).toEqual(protocol);
        expect(mockRequestOptions.body.accept_proxy_protocol).toEqual(acceptProxyProtocol);
        expect(mockRequestOptions.body.certificate_instance).toEqual(certificateInstance);
        expect(mockRequestOptions.body.connection_limit).toEqual(connectionLimit);
        expect(mockRequestOptions.body.default_pool).toEqual(defaultPool);
        expect(mockRequestOptions.body.https_redirect).toEqual(httpsRedirect);
        expect(mockRequestOptions.body.policies).toEqual(policies);
        expect(mockRequestOptions.body.port).toEqual(port);
        expect(mockRequestOptions.body.port_max).toEqual(portMax);
        expect(mockRequestOptions.body.port_min).toEqual(portMin);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createLoadBalancerListenerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createLoadBalancerListenerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createLoadBalancerListenerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const protocol = 'http';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createLoadBalancerListenerParams = {
          loadBalancerId,
          protocol,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createLoadBalancerListener(createLoadBalancerListenerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createLoadBalancerListener({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createLoadBalancerListener();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteLoadBalancerListener', () => {
    describe('positive tests', () => {
      function __deleteLoadBalancerListenerTest() {
        // Construct the params object for operation deleteLoadBalancerListener
        const loadBalancerId = 'testString';
        const id = 'testString';
        const deleteLoadBalancerListenerParams = {
          loadBalancerId: loadBalancerId,
          id: id,
        };

        const deleteLoadBalancerListenerResult = vpcService.deleteLoadBalancerListener(
          deleteLoadBalancerListenerParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteLoadBalancerListenerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/listeners/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteLoadBalancerListenerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteLoadBalancerListenerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteLoadBalancerListenerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteLoadBalancerListenerParams = {
          loadBalancerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteLoadBalancerListener(deleteLoadBalancerListenerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteLoadBalancerListener({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteLoadBalancerListener();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getLoadBalancerListener', () => {
    describe('positive tests', () => {
      function __getLoadBalancerListenerTest() {
        // Construct the params object for operation getLoadBalancerListener
        const loadBalancerId = 'testString';
        const id = 'testString';
        const getLoadBalancerListenerParams = {
          loadBalancerId: loadBalancerId,
          id: id,
        };

        const getLoadBalancerListenerResult = vpcService.getLoadBalancerListener(
          getLoadBalancerListenerParams
        );

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerListenerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/listeners/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLoadBalancerListenerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getLoadBalancerListenerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getLoadBalancerListenerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLoadBalancerListenerParams = {
          loadBalancerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getLoadBalancerListener(getLoadBalancerListenerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getLoadBalancerListener({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getLoadBalancerListener();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateLoadBalancerListener', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CertificateInstanceIdentityByCRN
      const certificateInstanceIdentityModel = {
        crn:
          'crn:v1:bluemix:public:secrets-manager:us-south:a/123456:36fa422d-080d-4d83-8d2d-86851b4001df:secret:2e786aab-42fa-63ed-14f8-d66d552f4dd5',
      };

      // LoadBalancerPoolIdentityById
      const loadBalancerPoolIdentityModel = {
        id: '70294e14-4e61-11e8-bcf4-0242ac110004',
      };

      // LoadBalancerListenerIdentityById
      const loadBalancerListenerIdentityModel = {
        id: '70294e14-4e61-11e8-bcf4-0242ac110004',
      };

      // LoadBalancerListenerHTTPSRedirectPatch
      const loadBalancerListenerHttpsRedirectPatchModel = {
        http_status_code: 301,
        listener: loadBalancerListenerIdentityModel,
        uri: '/example?doc=get',
      };

      function __updateLoadBalancerListenerTest() {
        // Construct the params object for operation updateLoadBalancerListener
        const loadBalancerId = 'testString';
        const id = 'testString';
        const acceptProxyProtocol = true;
        const certificateInstance = certificateInstanceIdentityModel;
        const connectionLimit = 2000;
        const defaultPool = loadBalancerPoolIdentityModel;
        const httpsRedirect = loadBalancerListenerHttpsRedirectPatchModel;
        const port = 443;
        const portMax = 499;
        const portMin = 443;
        const protocol = 'http';
        const updateLoadBalancerListenerParams = {
          loadBalancerId: loadBalancerId,
          id: id,
          acceptProxyProtocol: acceptProxyProtocol,
          certificateInstance: certificateInstance,
          connectionLimit: connectionLimit,
          defaultPool: defaultPool,
          httpsRedirect: httpsRedirect,
          port: port,
          portMax: portMax,
          portMin: portMin,
          protocol: protocol,
        };

        const updateLoadBalancerListenerResult = vpcService.updateLoadBalancerListener(
          updateLoadBalancerListenerParams
        );

        // all methods should return a Promise
        expectToBePromise(updateLoadBalancerListenerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/listeners/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.accept_proxy_protocol).toEqual(acceptProxyProtocol);
        expect(mockRequestOptions.body.certificate_instance).toEqual(certificateInstance);
        expect(mockRequestOptions.body.connection_limit).toEqual(connectionLimit);
        expect(mockRequestOptions.body.default_pool).toEqual(defaultPool);
        expect(mockRequestOptions.body.https_redirect).toEqual(httpsRedirect);
        expect(mockRequestOptions.body.port).toEqual(port);
        expect(mockRequestOptions.body.port_max).toEqual(portMax);
        expect(mockRequestOptions.body.port_min).toEqual(portMin);
        expect(mockRequestOptions.body.protocol).toEqual(protocol);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateLoadBalancerListenerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateLoadBalancerListenerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateLoadBalancerListenerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateLoadBalancerListenerParams = {
          loadBalancerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateLoadBalancerListener(updateLoadBalancerListenerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateLoadBalancerListener({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateLoadBalancerListener();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listLoadBalancerListenerPolicies', () => {
    describe('positive tests', () => {
      function __listLoadBalancerListenerPoliciesTest() {
        // Construct the params object for operation listLoadBalancerListenerPolicies
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const listLoadBalancerListenerPoliciesParams = {
          loadBalancerId: loadBalancerId,
          listenerId: listenerId,
        };

        const listLoadBalancerListenerPoliciesResult = vpcService.listLoadBalancerListenerPolicies(
          listLoadBalancerListenerPoliciesParams
        );

        // all methods should return a Promise
        expectToBePromise(listLoadBalancerListenerPoliciesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.listener_id).toEqual(listenerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listLoadBalancerListenerPoliciesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listLoadBalancerListenerPoliciesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listLoadBalancerListenerPoliciesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listLoadBalancerListenerPoliciesParams = {
          loadBalancerId,
          listenerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listLoadBalancerListenerPolicies(listLoadBalancerListenerPoliciesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listLoadBalancerListenerPolicies({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listLoadBalancerListenerPolicies();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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
        type: 'body',
        value: 'testString',
      };

      // LoadBalancerListenerPolicyTargetPrototypeLoadBalancerPoolIdentityLoadBalancerPoolIdentityById
      const loadBalancerListenerPolicyTargetPrototypeModel = {
        id: '70294e14-4e61-11e8-bcf4-0242ac110004',
      };

      function __createLoadBalancerListenerPolicyTest() {
        // Construct the params object for operation createLoadBalancerListenerPolicy
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const action = 'forward';
        const priority = 5;
        const name = 'my-policy';
        const rules = [loadBalancerListenerPolicyRulePrototypeModel];
        const target = loadBalancerListenerPolicyTargetPrototypeModel;
        const createLoadBalancerListenerPolicyParams = {
          loadBalancerId: loadBalancerId,
          listenerId: listenerId,
          action: action,
          priority: priority,
          name: name,
          rules: rules,
          target: target,
        };

        const createLoadBalancerListenerPolicyResult = vpcService.createLoadBalancerListenerPolicy(
          createLoadBalancerListenerPolicyParams
        );

        // all methods should return a Promise
        expectToBePromise(createLoadBalancerListenerPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.action).toEqual(action);
        expect(mockRequestOptions.body.priority).toEqual(priority);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.rules).toEqual(rules);
        expect(mockRequestOptions.body.target).toEqual(target);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.listener_id).toEqual(listenerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createLoadBalancerListenerPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createLoadBalancerListenerPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createLoadBalancerListenerPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const action = 'forward';
        const priority = 5;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createLoadBalancerListenerPolicyParams = {
          loadBalancerId,
          listenerId,
          action,
          priority,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createLoadBalancerListenerPolicy(createLoadBalancerListenerPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createLoadBalancerListenerPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createLoadBalancerListenerPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteLoadBalancerListenerPolicy', () => {
    describe('positive tests', () => {
      function __deleteLoadBalancerListenerPolicyTest() {
        // Construct the params object for operation deleteLoadBalancerListenerPolicy
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const id = 'testString';
        const deleteLoadBalancerListenerPolicyParams = {
          loadBalancerId: loadBalancerId,
          listenerId: listenerId,
          id: id,
        };

        const deleteLoadBalancerListenerPolicyResult = vpcService.deleteLoadBalancerListenerPolicy(
          deleteLoadBalancerListenerPolicyParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteLoadBalancerListenerPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.listener_id).toEqual(listenerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteLoadBalancerListenerPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteLoadBalancerListenerPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteLoadBalancerListenerPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteLoadBalancerListenerPolicyParams = {
          loadBalancerId,
          listenerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteLoadBalancerListenerPolicy(deleteLoadBalancerListenerPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteLoadBalancerListenerPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteLoadBalancerListenerPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getLoadBalancerListenerPolicy', () => {
    describe('positive tests', () => {
      function __getLoadBalancerListenerPolicyTest() {
        // Construct the params object for operation getLoadBalancerListenerPolicy
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const id = 'testString';
        const getLoadBalancerListenerPolicyParams = {
          loadBalancerId: loadBalancerId,
          listenerId: listenerId,
          id: id,
        };

        const getLoadBalancerListenerPolicyResult = vpcService.getLoadBalancerListenerPolicy(
          getLoadBalancerListenerPolicyParams
        );

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerListenerPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.listener_id).toEqual(listenerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLoadBalancerListenerPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getLoadBalancerListenerPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getLoadBalancerListenerPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLoadBalancerListenerPolicyParams = {
          loadBalancerId,
          listenerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getLoadBalancerListenerPolicy(getLoadBalancerListenerPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getLoadBalancerListenerPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getLoadBalancerListenerPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __updateLoadBalancerListenerPolicyTest() {
        // Construct the params object for operation updateLoadBalancerListenerPolicy
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const id = 'testString';
        const name = 'my-policy';
        const priority = 5;
        const target = loadBalancerListenerPolicyTargetPatchModel;
        const updateLoadBalancerListenerPolicyParams = {
          loadBalancerId: loadBalancerId,
          listenerId: listenerId,
          id: id,
          name: name,
          priority: priority,
          target: target,
        };

        const updateLoadBalancerListenerPolicyResult = vpcService.updateLoadBalancerListenerPolicy(
          updateLoadBalancerListenerPolicyParams
        );

        // all methods should return a Promise
        expectToBePromise(updateLoadBalancerListenerPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.priority).toEqual(priority);
        expect(mockRequestOptions.body.target).toEqual(target);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.listener_id).toEqual(listenerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateLoadBalancerListenerPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateLoadBalancerListenerPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateLoadBalancerListenerPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateLoadBalancerListenerPolicyParams = {
          loadBalancerId,
          listenerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateLoadBalancerListenerPolicy(updateLoadBalancerListenerPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateLoadBalancerListenerPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateLoadBalancerListenerPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listLoadBalancerListenerPolicyRules', () => {
    describe('positive tests', () => {
      function __listLoadBalancerListenerPolicyRulesTest() {
        // Construct the params object for operation listLoadBalancerListenerPolicyRules
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const listLoadBalancerListenerPolicyRulesParams = {
          loadBalancerId: loadBalancerId,
          listenerId: listenerId,
          policyId: policyId,
        };

        const listLoadBalancerListenerPolicyRulesResult = vpcService.listLoadBalancerListenerPolicyRules(
          listLoadBalancerListenerPolicyRulesParams
        );

        // all methods should return a Promise
        expectToBePromise(listLoadBalancerListenerPolicyRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{policy_id}/rules',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.listener_id).toEqual(listenerId);
        expect(mockRequestOptions.path.policy_id).toEqual(policyId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listLoadBalancerListenerPolicyRulesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listLoadBalancerListenerPolicyRulesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listLoadBalancerListenerPolicyRulesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listLoadBalancerListenerPolicyRulesParams = {
          loadBalancerId,
          listenerId,
          policyId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listLoadBalancerListenerPolicyRules(listLoadBalancerListenerPolicyRulesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listLoadBalancerListenerPolicyRules({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listLoadBalancerListenerPolicyRules();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createLoadBalancerListenerPolicyRule', () => {
    describe('positive tests', () => {
      function __createLoadBalancerListenerPolicyRuleTest() {
        // Construct the params object for operation createLoadBalancerListenerPolicyRule
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const condition = 'contains';
        const type = 'body';
        const value = 'testString';
        const field = 'MY-APP-HEADER';
        const createLoadBalancerListenerPolicyRuleParams = {
          loadBalancerId: loadBalancerId,
          listenerId: listenerId,
          policyId: policyId,
          condition: condition,
          type: type,
          value: value,
          field: field,
        };

        const createLoadBalancerListenerPolicyRuleResult = vpcService.createLoadBalancerListenerPolicyRule(
          createLoadBalancerListenerPolicyRuleParams
        );

        // all methods should return a Promise
        expectToBePromise(createLoadBalancerListenerPolicyRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{policy_id}/rules',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.condition).toEqual(condition);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.body.field).toEqual(field);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.listener_id).toEqual(listenerId);
        expect(mockRequestOptions.path.policy_id).toEqual(policyId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createLoadBalancerListenerPolicyRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createLoadBalancerListenerPolicyRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createLoadBalancerListenerPolicyRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const condition = 'contains';
        const type = 'body';
        const value = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createLoadBalancerListenerPolicyRuleParams = {
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

        vpcService.createLoadBalancerListenerPolicyRule(createLoadBalancerListenerPolicyRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createLoadBalancerListenerPolicyRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createLoadBalancerListenerPolicyRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteLoadBalancerListenerPolicyRule', () => {
    describe('positive tests', () => {
      function __deleteLoadBalancerListenerPolicyRuleTest() {
        // Construct the params object for operation deleteLoadBalancerListenerPolicyRule
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const id = 'testString';
        const deleteLoadBalancerListenerPolicyRuleParams = {
          loadBalancerId: loadBalancerId,
          listenerId: listenerId,
          policyId: policyId,
          id: id,
        };

        const deleteLoadBalancerListenerPolicyRuleResult = vpcService.deleteLoadBalancerListenerPolicyRule(
          deleteLoadBalancerListenerPolicyRuleParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteLoadBalancerListenerPolicyRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{policy_id}/rules/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.listener_id).toEqual(listenerId);
        expect(mockRequestOptions.path.policy_id).toEqual(policyId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteLoadBalancerListenerPolicyRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteLoadBalancerListenerPolicyRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteLoadBalancerListenerPolicyRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteLoadBalancerListenerPolicyRuleParams = {
          loadBalancerId,
          listenerId,
          policyId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteLoadBalancerListenerPolicyRule(deleteLoadBalancerListenerPolicyRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteLoadBalancerListenerPolicyRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteLoadBalancerListenerPolicyRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getLoadBalancerListenerPolicyRule', () => {
    describe('positive tests', () => {
      function __getLoadBalancerListenerPolicyRuleTest() {
        // Construct the params object for operation getLoadBalancerListenerPolicyRule
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const id = 'testString';
        const getLoadBalancerListenerPolicyRuleParams = {
          loadBalancerId: loadBalancerId,
          listenerId: listenerId,
          policyId: policyId,
          id: id,
        };

        const getLoadBalancerListenerPolicyRuleResult = vpcService.getLoadBalancerListenerPolicyRule(
          getLoadBalancerListenerPolicyRuleParams
        );

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerListenerPolicyRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{policy_id}/rules/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.listener_id).toEqual(listenerId);
        expect(mockRequestOptions.path.policy_id).toEqual(policyId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLoadBalancerListenerPolicyRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getLoadBalancerListenerPolicyRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getLoadBalancerListenerPolicyRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLoadBalancerListenerPolicyRuleParams = {
          loadBalancerId,
          listenerId,
          policyId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getLoadBalancerListenerPolicyRule(getLoadBalancerListenerPolicyRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getLoadBalancerListenerPolicyRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getLoadBalancerListenerPolicyRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateLoadBalancerListenerPolicyRule', () => {
    describe('positive tests', () => {
      function __updateLoadBalancerListenerPolicyRuleTest() {
        // Construct the params object for operation updateLoadBalancerListenerPolicyRule
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const id = 'testString';
        const condition = 'contains';
        const field = 'MY-APP-HEADER';
        const type = 'body';
        const value = 'testString';
        const updateLoadBalancerListenerPolicyRuleParams = {
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
          updateLoadBalancerListenerPolicyRuleParams
        );

        // all methods should return a Promise
        expectToBePromise(updateLoadBalancerListenerPolicyRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{policy_id}/rules/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.condition).toEqual(condition);
        expect(mockRequestOptions.body.field).toEqual(field);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.listener_id).toEqual(listenerId);
        expect(mockRequestOptions.path.policy_id).toEqual(policyId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateLoadBalancerListenerPolicyRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateLoadBalancerListenerPolicyRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateLoadBalancerListenerPolicyRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const listenerId = 'testString';
        const policyId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateLoadBalancerListenerPolicyRuleParams = {
          loadBalancerId,
          listenerId,
          policyId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateLoadBalancerListenerPolicyRule(updateLoadBalancerListenerPolicyRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateLoadBalancerListenerPolicyRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateLoadBalancerListenerPolicyRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listLoadBalancerPools', () => {
    describe('positive tests', () => {
      function __listLoadBalancerPoolsTest() {
        // Construct the params object for operation listLoadBalancerPools
        const loadBalancerId = 'testString';
        const listLoadBalancerPoolsParams = {
          loadBalancerId: loadBalancerId,
        };

        const listLoadBalancerPoolsResult = vpcService.listLoadBalancerPools(
          listLoadBalancerPoolsParams
        );

        // all methods should return a Promise
        expectToBePromise(listLoadBalancerPoolsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/load_balancers/{load_balancer_id}/pools', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listLoadBalancerPoolsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listLoadBalancerPoolsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listLoadBalancerPoolsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listLoadBalancerPoolsParams = {
          loadBalancerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listLoadBalancerPools(listLoadBalancerPoolsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listLoadBalancerPools({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listLoadBalancerPools();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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
        cookie_name: 'my-cookie-name',
        type: 'app_cookie',
      };

      function __createLoadBalancerPoolTest() {
        // Construct the params object for operation createLoadBalancerPool
        const loadBalancerId = 'testString';
        const algorithm = 'least_connections';
        const healthMonitor = loadBalancerPoolHealthMonitorPrototypeModel;
        const protocol = 'http';
        const members = [loadBalancerPoolMemberPrototypeModel];
        const name = 'my-load-balancer-pool';
        const proxyProtocol = 'disabled';
        const sessionPersistence = loadBalancerPoolSessionPersistencePrototypeModel;
        const createLoadBalancerPoolParams = {
          loadBalancerId: loadBalancerId,
          algorithm: algorithm,
          healthMonitor: healthMonitor,
          protocol: protocol,
          members: members,
          name: name,
          proxyProtocol: proxyProtocol,
          sessionPersistence: sessionPersistence,
        };

        const createLoadBalancerPoolResult = vpcService.createLoadBalancerPool(
          createLoadBalancerPoolParams
        );

        // all methods should return a Promise
        expectToBePromise(createLoadBalancerPoolResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/load_balancers/{load_balancer_id}/pools', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.algorithm).toEqual(algorithm);
        expect(mockRequestOptions.body.health_monitor).toEqual(healthMonitor);
        expect(mockRequestOptions.body.protocol).toEqual(protocol);
        expect(mockRequestOptions.body.members).toEqual(members);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.proxy_protocol).toEqual(proxyProtocol);
        expect(mockRequestOptions.body.session_persistence).toEqual(sessionPersistence);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createLoadBalancerPoolTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createLoadBalancerPoolTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createLoadBalancerPoolTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const algorithm = 'least_connections';
        const healthMonitor = loadBalancerPoolHealthMonitorPrototypeModel;
        const protocol = 'http';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createLoadBalancerPoolParams = {
          loadBalancerId,
          algorithm,
          healthMonitor,
          protocol,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createLoadBalancerPool(createLoadBalancerPoolParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createLoadBalancerPool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createLoadBalancerPool();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteLoadBalancerPool', () => {
    describe('positive tests', () => {
      function __deleteLoadBalancerPoolTest() {
        // Construct the params object for operation deleteLoadBalancerPool
        const loadBalancerId = 'testString';
        const id = 'testString';
        const deleteLoadBalancerPoolParams = {
          loadBalancerId: loadBalancerId,
          id: id,
        };

        const deleteLoadBalancerPoolResult = vpcService.deleteLoadBalancerPool(
          deleteLoadBalancerPoolParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteLoadBalancerPoolResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/pools/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteLoadBalancerPoolTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteLoadBalancerPoolTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteLoadBalancerPoolTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteLoadBalancerPoolParams = {
          loadBalancerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteLoadBalancerPool(deleteLoadBalancerPoolParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteLoadBalancerPool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteLoadBalancerPool();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getLoadBalancerPool', () => {
    describe('positive tests', () => {
      function __getLoadBalancerPoolTest() {
        // Construct the params object for operation getLoadBalancerPool
        const loadBalancerId = 'testString';
        const id = 'testString';
        const getLoadBalancerPoolParams = {
          loadBalancerId: loadBalancerId,
          id: id,
        };

        const getLoadBalancerPoolResult = vpcService.getLoadBalancerPool(getLoadBalancerPoolParams);

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerPoolResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/pools/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLoadBalancerPoolTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getLoadBalancerPoolTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getLoadBalancerPoolTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLoadBalancerPoolParams = {
          loadBalancerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getLoadBalancerPool(getLoadBalancerPoolParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getLoadBalancerPool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getLoadBalancerPool();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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
        cookie_name: 'my-cookie-name',
        type: 'app_cookie',
      };

      function __updateLoadBalancerPoolTest() {
        // Construct the params object for operation updateLoadBalancerPool
        const loadBalancerId = 'testString';
        const id = 'testString';
        const algorithm = 'least_connections';
        const healthMonitor = loadBalancerPoolHealthMonitorPatchModel;
        const name = 'my-load-balancer-pool';
        const protocol = 'http';
        const proxyProtocol = 'disabled';
        const sessionPersistence = loadBalancerPoolSessionPersistencePatchModel;
        const updateLoadBalancerPoolParams = {
          loadBalancerId: loadBalancerId,
          id: id,
          algorithm: algorithm,
          healthMonitor: healthMonitor,
          name: name,
          protocol: protocol,
          proxyProtocol: proxyProtocol,
          sessionPersistence: sessionPersistence,
        };

        const updateLoadBalancerPoolResult = vpcService.updateLoadBalancerPool(
          updateLoadBalancerPoolParams
        );

        // all methods should return a Promise
        expectToBePromise(updateLoadBalancerPoolResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/pools/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.algorithm).toEqual(algorithm);
        expect(mockRequestOptions.body.health_monitor).toEqual(healthMonitor);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.protocol).toEqual(protocol);
        expect(mockRequestOptions.body.proxy_protocol).toEqual(proxyProtocol);
        expect(mockRequestOptions.body.session_persistence).toEqual(sessionPersistence);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateLoadBalancerPoolTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateLoadBalancerPoolTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateLoadBalancerPoolTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateLoadBalancerPoolParams = {
          loadBalancerId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateLoadBalancerPool(updateLoadBalancerPoolParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateLoadBalancerPool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateLoadBalancerPool();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listLoadBalancerPoolMembers', () => {
    describe('positive tests', () => {
      function __listLoadBalancerPoolMembersTest() {
        // Construct the params object for operation listLoadBalancerPoolMembers
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const listLoadBalancerPoolMembersParams = {
          loadBalancerId: loadBalancerId,
          poolId: poolId,
        };

        const listLoadBalancerPoolMembersResult = vpcService.listLoadBalancerPoolMembers(
          listLoadBalancerPoolMembersParams
        );

        // all methods should return a Promise
        expectToBePromise(listLoadBalancerPoolMembersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/pools/{pool_id}/members',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.pool_id).toEqual(poolId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listLoadBalancerPoolMembersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listLoadBalancerPoolMembersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listLoadBalancerPoolMembersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listLoadBalancerPoolMembersParams = {
          loadBalancerId,
          poolId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listLoadBalancerPoolMembers(listLoadBalancerPoolMembersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listLoadBalancerPoolMembers({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listLoadBalancerPoolMembers();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createLoadBalancerPoolMemberTest() {
        // Construct the params object for operation createLoadBalancerPoolMember
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const port = 80;
        const target = loadBalancerPoolMemberTargetPrototypeModel;
        const weight = 50;
        const createLoadBalancerPoolMemberParams = {
          loadBalancerId: loadBalancerId,
          poolId: poolId,
          port: port,
          target: target,
          weight: weight,
        };

        const createLoadBalancerPoolMemberResult = vpcService.createLoadBalancerPoolMember(
          createLoadBalancerPoolMemberParams
        );

        // all methods should return a Promise
        expectToBePromise(createLoadBalancerPoolMemberResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/pools/{pool_id}/members',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.port).toEqual(port);
        expect(mockRequestOptions.body.target).toEqual(target);
        expect(mockRequestOptions.body.weight).toEqual(weight);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.pool_id).toEqual(poolId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createLoadBalancerPoolMemberTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createLoadBalancerPoolMemberTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createLoadBalancerPoolMemberTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const port = 80;
        const target = loadBalancerPoolMemberTargetPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createLoadBalancerPoolMemberParams = {
          loadBalancerId,
          poolId,
          port,
          target,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createLoadBalancerPoolMember(createLoadBalancerPoolMemberParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createLoadBalancerPoolMember({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createLoadBalancerPoolMember();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __replaceLoadBalancerPoolMembersTest() {
        // Construct the params object for operation replaceLoadBalancerPoolMembers
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const members = [loadBalancerPoolMemberPrototypeModel];
        const replaceLoadBalancerPoolMembersParams = {
          loadBalancerId: loadBalancerId,
          poolId: poolId,
          members: members,
        };

        const replaceLoadBalancerPoolMembersResult = vpcService.replaceLoadBalancerPoolMembers(
          replaceLoadBalancerPoolMembersParams
        );

        // all methods should return a Promise
        expectToBePromise(replaceLoadBalancerPoolMembersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/pools/{pool_id}/members',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.members).toEqual(members);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.pool_id).toEqual(poolId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceLoadBalancerPoolMembersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __replaceLoadBalancerPoolMembersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __replaceLoadBalancerPoolMembersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const members = [loadBalancerPoolMemberPrototypeModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceLoadBalancerPoolMembersParams = {
          loadBalancerId,
          poolId,
          members,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.replaceLoadBalancerPoolMembers(replaceLoadBalancerPoolMembersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.replaceLoadBalancerPoolMembers({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.replaceLoadBalancerPoolMembers();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteLoadBalancerPoolMember', () => {
    describe('positive tests', () => {
      function __deleteLoadBalancerPoolMemberTest() {
        // Construct the params object for operation deleteLoadBalancerPoolMember
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const id = 'testString';
        const deleteLoadBalancerPoolMemberParams = {
          loadBalancerId: loadBalancerId,
          poolId: poolId,
          id: id,
        };

        const deleteLoadBalancerPoolMemberResult = vpcService.deleteLoadBalancerPoolMember(
          deleteLoadBalancerPoolMemberParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteLoadBalancerPoolMemberResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/pools/{pool_id}/members/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.pool_id).toEqual(poolId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteLoadBalancerPoolMemberTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteLoadBalancerPoolMemberTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteLoadBalancerPoolMemberTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteLoadBalancerPoolMemberParams = {
          loadBalancerId,
          poolId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteLoadBalancerPoolMember(deleteLoadBalancerPoolMemberParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteLoadBalancerPoolMember({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteLoadBalancerPoolMember();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getLoadBalancerPoolMember', () => {
    describe('positive tests', () => {
      function __getLoadBalancerPoolMemberTest() {
        // Construct the params object for operation getLoadBalancerPoolMember
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const id = 'testString';
        const getLoadBalancerPoolMemberParams = {
          loadBalancerId: loadBalancerId,
          poolId: poolId,
          id: id,
        };

        const getLoadBalancerPoolMemberResult = vpcService.getLoadBalancerPoolMember(
          getLoadBalancerPoolMemberParams
        );

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerPoolMemberResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/pools/{pool_id}/members/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.pool_id).toEqual(poolId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLoadBalancerPoolMemberTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getLoadBalancerPoolMemberTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getLoadBalancerPoolMemberTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLoadBalancerPoolMemberParams = {
          loadBalancerId,
          poolId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getLoadBalancerPoolMember(getLoadBalancerPoolMemberParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getLoadBalancerPoolMember({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getLoadBalancerPoolMember();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __updateLoadBalancerPoolMemberTest() {
        // Construct the params object for operation updateLoadBalancerPoolMember
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const id = 'testString';
        const port = 80;
        const target = loadBalancerPoolMemberTargetPrototypeModel;
        const weight = 50;
        const updateLoadBalancerPoolMemberParams = {
          loadBalancerId: loadBalancerId,
          poolId: poolId,
          id: id,
          port: port,
          target: target,
          weight: weight,
        };

        const updateLoadBalancerPoolMemberResult = vpcService.updateLoadBalancerPoolMember(
          updateLoadBalancerPoolMemberParams
        );

        // all methods should return a Promise
        expectToBePromise(updateLoadBalancerPoolMemberResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/load_balancers/{load_balancer_id}/pools/{pool_id}/members/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.port).toEqual(port);
        expect(mockRequestOptions.body.target).toEqual(target);
        expect(mockRequestOptions.body.weight).toEqual(weight);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.load_balancer_id).toEqual(loadBalancerId);
        expect(mockRequestOptions.path.pool_id).toEqual(poolId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateLoadBalancerPoolMemberTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateLoadBalancerPoolMemberTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateLoadBalancerPoolMemberTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerId = 'testString';
        const poolId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateLoadBalancerPoolMemberParams = {
          loadBalancerId,
          poolId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateLoadBalancerPoolMember(updateLoadBalancerPoolMemberParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateLoadBalancerPoolMember({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateLoadBalancerPoolMember();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listEndpointGateways', () => {
    describe('positive tests', () => {
      function __listEndpointGatewaysTest() {
        // Construct the params object for operation listEndpointGateways
        const name = 'testString';
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const listEndpointGatewaysParams = {
          name: name,
          start: start,
          limit: limit,
          resourceGroupId: resourceGroupId,
        };

        const listEndpointGatewaysResult = vpcService.listEndpointGateways(
          listEndpointGatewaysParams
        );

        // all methods should return a Promise
        expectToBePromise(listEndpointGatewaysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/endpoint_gateways', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs['resource_group.id']).toEqual(resourceGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listEndpointGatewaysTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listEndpointGatewaysTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listEndpointGatewaysTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listEndpointGatewaysParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listEndpointGateways(listEndpointGatewaysParams);
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

      // SecurityGroupIdentityById
      const securityGroupIdentityModel = {
        id: 'be5df5ca-12a0-494b-907e-aa6ec2bfa271',
      };

      function __createEndpointGatewayTest() {
        // Construct the params object for operation createEndpointGateway
        const target = endpointGatewayTargetPrototypeModel;
        const vpc = vpcIdentityModel;
        const ips = [endpointGatewayReservedIpModel];
        const name = 'testString';
        const resourceGroup = resourceGroupIdentityModel;
        const securityGroups = [securityGroupIdentityModel];
        const createEndpointGatewayParams = {
          target: target,
          vpc: vpc,
          ips: ips,
          name: name,
          resourceGroup: resourceGroup,
          securityGroups: securityGroups,
        };

        const createEndpointGatewayResult = vpcService.createEndpointGateway(
          createEndpointGatewayParams
        );

        // all methods should return a Promise
        expectToBePromise(createEndpointGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/endpoint_gateways', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.target).toEqual(target);
        expect(mockRequestOptions.body.vpc).toEqual(vpc);
        expect(mockRequestOptions.body.ips).toEqual(ips);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.resource_group).toEqual(resourceGroup);
        expect(mockRequestOptions.body.security_groups).toEqual(securityGroups);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createEndpointGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createEndpointGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createEndpointGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const target = endpointGatewayTargetPrototypeModel;
        const vpc = vpcIdentityModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createEndpointGatewayParams = {
          target,
          vpc,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createEndpointGateway(createEndpointGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createEndpointGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createEndpointGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listEndpointGatewayIps', () => {
    describe('positive tests', () => {
      function __listEndpointGatewayIpsTest() {
        // Construct the params object for operation listEndpointGatewayIps
        const endpointGatewayId = 'testString';
        const start = 'testString';
        const limit = 1;
        const sort = 'name';
        const listEndpointGatewayIpsParams = {
          endpointGatewayId: endpointGatewayId,
          start: start,
          limit: limit,
          sort: sort,
        };

        const listEndpointGatewayIpsResult = vpcService.listEndpointGatewayIps(
          listEndpointGatewayIpsParams
        );

        // all methods should return a Promise
        expectToBePromise(listEndpointGatewayIpsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/endpoint_gateways/{endpoint_gateway_id}/ips',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.path.endpoint_gateway_id).toEqual(endpointGatewayId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listEndpointGatewayIpsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listEndpointGatewayIpsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listEndpointGatewayIpsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const endpointGatewayId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listEndpointGatewayIpsParams = {
          endpointGatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listEndpointGatewayIps(listEndpointGatewayIpsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.listEndpointGatewayIps({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.listEndpointGatewayIps();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('removeEndpointGatewayIp', () => {
    describe('positive tests', () => {
      function __removeEndpointGatewayIpTest() {
        // Construct the params object for operation removeEndpointGatewayIp
        const endpointGatewayId = 'testString';
        const id = 'testString';
        const removeEndpointGatewayIpParams = {
          endpointGatewayId: endpointGatewayId,
          id: id,
        };

        const removeEndpointGatewayIpResult = vpcService.removeEndpointGatewayIp(
          removeEndpointGatewayIpParams
        );

        // all methods should return a Promise
        expectToBePromise(removeEndpointGatewayIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/endpoint_gateways/{endpoint_gateway_id}/ips/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.endpoint_gateway_id).toEqual(endpointGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __removeEndpointGatewayIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __removeEndpointGatewayIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __removeEndpointGatewayIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const endpointGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const removeEndpointGatewayIpParams = {
          endpointGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.removeEndpointGatewayIp(removeEndpointGatewayIpParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.removeEndpointGatewayIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.removeEndpointGatewayIp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getEndpointGatewayIp', () => {
    describe('positive tests', () => {
      function __getEndpointGatewayIpTest() {
        // Construct the params object for operation getEndpointGatewayIp
        const endpointGatewayId = 'testString';
        const id = 'testString';
        const getEndpointGatewayIpParams = {
          endpointGatewayId: endpointGatewayId,
          id: id,
        };

        const getEndpointGatewayIpResult = vpcService.getEndpointGatewayIp(
          getEndpointGatewayIpParams
        );

        // all methods should return a Promise
        expectToBePromise(getEndpointGatewayIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/endpoint_gateways/{endpoint_gateway_id}/ips/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.endpoint_gateway_id).toEqual(endpointGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getEndpointGatewayIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getEndpointGatewayIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getEndpointGatewayIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const endpointGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getEndpointGatewayIpParams = {
          endpointGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getEndpointGatewayIp(getEndpointGatewayIpParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getEndpointGatewayIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getEndpointGatewayIp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('addEndpointGatewayIp', () => {
    describe('positive tests', () => {
      function __addEndpointGatewayIpTest() {
        // Construct the params object for operation addEndpointGatewayIp
        const endpointGatewayId = 'testString';
        const id = 'testString';
        const addEndpointGatewayIpParams = {
          endpointGatewayId: endpointGatewayId,
          id: id,
        };

        const addEndpointGatewayIpResult = vpcService.addEndpointGatewayIp(
          addEndpointGatewayIpParams
        );

        // all methods should return a Promise
        expectToBePromise(addEndpointGatewayIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/endpoint_gateways/{endpoint_gateway_id}/ips/{id}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.endpoint_gateway_id).toEqual(endpointGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addEndpointGatewayIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __addEndpointGatewayIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __addEndpointGatewayIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const endpointGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addEndpointGatewayIpParams = {
          endpointGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.addEndpointGatewayIp(addEndpointGatewayIpParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.addEndpointGatewayIp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.addEndpointGatewayIp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteEndpointGateway', () => {
    describe('positive tests', () => {
      function __deleteEndpointGatewayTest() {
        // Construct the params object for operation deleteEndpointGateway
        const id = 'testString';
        const deleteEndpointGatewayParams = {
          id: id,
        };

        const deleteEndpointGatewayResult = vpcService.deleteEndpointGateway(
          deleteEndpointGatewayParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteEndpointGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/endpoint_gateways/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteEndpointGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteEndpointGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteEndpointGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteEndpointGatewayParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteEndpointGateway(deleteEndpointGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteEndpointGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteEndpointGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getEndpointGateway', () => {
    describe('positive tests', () => {
      function __getEndpointGatewayTest() {
        // Construct the params object for operation getEndpointGateway
        const id = 'testString';
        const getEndpointGatewayParams = {
          id: id,
        };

        const getEndpointGatewayResult = vpcService.getEndpointGateway(getEndpointGatewayParams);

        // all methods should return a Promise
        expectToBePromise(getEndpointGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/endpoint_gateways/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getEndpointGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getEndpointGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getEndpointGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getEndpointGatewayParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getEndpointGateway(getEndpointGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getEndpointGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getEndpointGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateEndpointGateway', () => {
    describe('positive tests', () => {
      function __updateEndpointGatewayTest() {
        // Construct the params object for operation updateEndpointGateway
        const id = 'testString';
        const name = 'my-endpoint-gateway';
        const updateEndpointGatewayParams = {
          id: id,
          name: name,
        };

        const updateEndpointGatewayResult = vpcService.updateEndpointGateway(
          updateEndpointGatewayParams
        );

        // all methods should return a Promise
        expectToBePromise(updateEndpointGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/endpoint_gateways/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateEndpointGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateEndpointGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateEndpointGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateEndpointGatewayParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateEndpointGateway(updateEndpointGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateEndpointGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateEndpointGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listFlowLogCollectors', () => {
    describe('positive tests', () => {
      function __listFlowLogCollectorsTest() {
        // Construct the params object for operation listFlowLogCollectors
        const start = 'testString';
        const limit = 1;
        const resourceGroupId = 'testString';
        const name = 'testString';
        const vpcId = 'testString';
        const vpcCrn = 'testString';
        const vpcName = 'testString';
        const targetId = 'testString';
        const targetResourceType = 'instance';
        const listFlowLogCollectorsParams = {
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

        const listFlowLogCollectorsResult = vpcService.listFlowLogCollectors(
          listFlowLogCollectorsParams
        );

        // all methods should return a Promise
        expectToBePromise(listFlowLogCollectorsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/flow_log_collectors', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs['resource_group.id']).toEqual(resourceGroupId);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs['vpc.id']).toEqual(vpcId);
        expect(mockRequestOptions.qs['vpc.crn']).toEqual(vpcCrn);
        expect(mockRequestOptions.qs['vpc.name']).toEqual(vpcName);
        expect(mockRequestOptions.qs['target.id']).toEqual(targetId);
        expect(mockRequestOptions.qs['target.resource_type']).toEqual(targetResourceType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listFlowLogCollectorsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __listFlowLogCollectorsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __listFlowLogCollectorsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listFlowLogCollectorsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.listFlowLogCollectors(listFlowLogCollectorsParams);
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

      // LegacyCloudObjectStorageBucketIdentityCloudObjectStorageBucketIdentityByName
      const legacyCloudObjectStorageBucketIdentityModel = {
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

      function __createFlowLogCollectorTest() {
        // Construct the params object for operation createFlowLogCollector
        const storageBucket = legacyCloudObjectStorageBucketIdentityModel;
        const target = flowLogCollectorTargetPrototypeModel;
        const active = false;
        const name = 'my-flow-log-collector';
        const resourceGroup = resourceGroupIdentityModel;
        const createFlowLogCollectorParams = {
          storageBucket: storageBucket,
          target: target,
          active: active,
          name: name,
          resourceGroup: resourceGroup,
        };

        const createFlowLogCollectorResult = vpcService.createFlowLogCollector(
          createFlowLogCollectorParams
        );

        // all methods should return a Promise
        expectToBePromise(createFlowLogCollectorResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/flow_log_collectors', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.storage_bucket).toEqual(storageBucket);
        expect(mockRequestOptions.body.target).toEqual(target);
        expect(mockRequestOptions.body.active).toEqual(active);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.resource_group).toEqual(resourceGroup);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createFlowLogCollectorTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __createFlowLogCollectorTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __createFlowLogCollectorTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const storageBucket = legacyCloudObjectStorageBucketIdentityModel;
        const target = flowLogCollectorTargetPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createFlowLogCollectorParams = {
          storageBucket,
          target,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.createFlowLogCollector(createFlowLogCollectorParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.createFlowLogCollector({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.createFlowLogCollector();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteFlowLogCollector', () => {
    describe('positive tests', () => {
      function __deleteFlowLogCollectorTest() {
        // Construct the params object for operation deleteFlowLogCollector
        const id = 'testString';
        const deleteFlowLogCollectorParams = {
          id: id,
        };

        const deleteFlowLogCollectorResult = vpcService.deleteFlowLogCollector(
          deleteFlowLogCollectorParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteFlowLogCollectorResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/flow_log_collectors/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteFlowLogCollectorTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __deleteFlowLogCollectorTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __deleteFlowLogCollectorTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteFlowLogCollectorParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.deleteFlowLogCollector(deleteFlowLogCollectorParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.deleteFlowLogCollector({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.deleteFlowLogCollector();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getFlowLogCollector', () => {
    describe('positive tests', () => {
      function __getFlowLogCollectorTest() {
        // Construct the params object for operation getFlowLogCollector
        const id = 'testString';
        const getFlowLogCollectorParams = {
          id: id,
        };

        const getFlowLogCollectorResult = vpcService.getFlowLogCollector(getFlowLogCollectorParams);

        // all methods should return a Promise
        expectToBePromise(getFlowLogCollectorResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/flow_log_collectors/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getFlowLogCollectorTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __getFlowLogCollectorTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __getFlowLogCollectorTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getFlowLogCollectorParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.getFlowLogCollector(getFlowLogCollectorParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.getFlowLogCollector({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.getFlowLogCollector();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateFlowLogCollector', () => {
    describe('positive tests', () => {
      function __updateFlowLogCollectorTest() {
        // Construct the params object for operation updateFlowLogCollector
        const id = 'testString';
        const active = true;
        const name = 'my-flow-log-collector';
        const updateFlowLogCollectorParams = {
          id: id,
          active: active,
          name: name,
        };

        const updateFlowLogCollectorResult = vpcService.updateFlowLogCollector(
          updateFlowLogCollectorParams
        );

        // all methods should return a Promise
        expectToBePromise(updateFlowLogCollectorResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/flow_log_collectors/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.active).toEqual(active);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(vpcServiceOptions.version);
        expect(mockRequestOptions.qs.generation).toEqual(vpcServiceOptions.generation);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateFlowLogCollectorTest();

        // enable retries and test again
        createRequestMock.mockClear();
        vpcService.enableRetries();
        __updateFlowLogCollectorTest();

        // disable retries and test again
        createRequestMock.mockClear();
        vpcService.disableRetries();
        __updateFlowLogCollectorTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateFlowLogCollectorParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        vpcService.updateFlowLogCollector(updateFlowLogCollectorParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await vpcService.updateFlowLogCollector({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await vpcService.updateFlowLogCollector();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});