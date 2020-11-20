/**
 * (C) Copyright IBM Corp. 2020.
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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.12.3-81ed37e0-20200929-215851
 */


import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { Authenticator, BaseService, getAuthenticatorFromEnvironment, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * The IBM Cloud Virtual Private Cloud (VPC) API can be used to programmatically provision and manage infrastructure
 * resources, including virtual server instances, subnets, volumes, and load balancers.
 */

class VpcV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://us-south.iaas.cloud.ibm.com/v1';
  static DEFAULT_SERVICE_NAME: string = 'vpc';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of VpcV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {VpcV1}
   */

  public static newInstance(options: UserOptions): VpcV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new VpcV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** Requests the version of the API as of a date in the format `YYYY-MM-DD`. Any date up to the current date may
   *  be provided. Specify the current date to request the latest version.
   */
  version: string;

  /** The infrastructure generation for the request. For the API behavior documented here, use `2`. */
  generation?: number;

  /**
   * Construct a VpcV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.version - Requests the version of the API as of a date in the format `YYYY-MM-DD`. Any date
   * up to the current date may be provided. Specify the current date to request the latest version.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/v1'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {VpcV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    options.generation = 2;
    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(VpcV1.DEFAULT_SERVICE_URL);
    }
    this.version = options.version || '2020-11-17';
    this.generation = options.generation;
  }

  /*************************
   * vPCs
   ************************/

  /**
   * List all VPCs.
   *
   * This request lists all VPCs. A VPC is a virtual network that belongs to an account and provides logical isolation
   * from other networks. A VPC is made up of resources in one or more zones. VPCs are regional, and each VPC can
   * contain resources in multiple zones in a region.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {string} [params.resourceGroupId] - Filters the collection to resources within one of the resource groups
   * identified in a comma-separated list of resource group identifiers.
   * @param {boolean} [params.classicAccess] - The `classic_access` parameter filters the returned collection by the
   * supplied field. If the supplied field is `true`, only Classic Access VPCs will be returned. If the supplied field
   * is `false`, only VPCs without Classic Access will be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VPCCollection>>}
   */
  public listVpcs(params?: VpcV1.ListVpcsParams): Promise<VpcV1.Response<VpcV1.VPCCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit,
      'resource_group.id': _params.resourceGroupId,
      'classic_access': _params.classicAccess
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listVpcs');

    const parameters = {
      options: {
        url: '/vpcs',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a VPC.
   *
   * This request creates a new VPC from a VPC prototype object. The prototype object is structured in the same way as a
   * retrieved VPC, and contains the information necessary to create the new VPC.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.addressPrefixManagement] - Indicates whether a default address prefix should be
   * automatically created for each zone in this VPC. If `manual`, this VPC will be created with no default address
   * prefixes.
   * @param {boolean} [params.classicAccess] - Indicates whether this VPC should be connected to Classic Infrastructure.
   * If true, this VPC's resources will have private network connectivity to the account's Classic Infrastructure
   * resources. Only one VPC, per region, may be connected in this way. This value is set at creation and subsequently
   * immutable.
   * @param {string} [params.name] - The unique user-defined name for this VPC. If unspecified, the name will be a
   * hyphenated list of randomly-selected words.
   * @param {ResourceGroupIdentity} [params.resourceGroup] - The resource group to use. If unspecified, the account's
   * [default resource
   * group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VPC>>}
   */
  public createVpc(params?: VpcV1.CreateVpcParams): Promise<VpcV1.Response<VpcV1.VPC>> {
    const _params = Object.assign({}, params);

    const body = {
      'address_prefix_management': _params.addressPrefixManagement,
      'classic_access': _params.classicAccess,
      'name': _params.name,
      'resource_group': _params.resourceGroup
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createVpc');

    const parameters = {
      options: {
        url: '/vpcs',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete specified VPC.
   *
   * This request deletes a VPC. This operation cannot be reversed. For this request to succeed, the VPC must not
   * contain any instances, subnets, or public gateways. All security groups and network ACLs associated with the VPC
   * are automatically deleted. All flow log collectors with `auto_delete` set to `true` targeting the VPC or any
   * resource in the VPC are automatically deleted.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The VPC identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteVpc(params: VpcV1.DeleteVpcParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteVpc');

    const parameters = {
      options: {
        url: '/vpcs/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified VPC.
   *
   * This request retrieves a single VPC specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The VPC identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VPC>>}
   */
  public getVpc(params: VpcV1.GetVpcParams): Promise<VpcV1.Response<VpcV1.VPC>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getVpc');

    const parameters = {
      options: {
        url: '/vpcs/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update specified VPC.
   *
   * This request updates a VPC's name.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The VPC identifier.
   * @param {string} [params.name] - The unique user-defined name for this VPC.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VPC>>}
   */
  public updateVpc(params: VpcV1.UpdateVpcParams): Promise<VpcV1.Response<VpcV1.VPC>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateVpc');

    const parameters = {
      options: {
        url: '/vpcs/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve a VPC's default network ACL.
   *
   * This request retrieves the default network ACL for the VPC specified by the identifier in the URL. The default
   * network ACL is applied to any new subnets in the VPC which do not specify a network ACL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The VPC identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.DefaultNetworkACL>>}
   */
  public getVpcDefaultNetworkAcl(params: VpcV1.GetVpcDefaultNetworkAclParams): Promise<VpcV1.Response<VpcV1.DefaultNetworkACL>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getVpcDefaultNetworkAcl');

    const parameters = {
      options: {
        url: '/vpcs/{id}/default_network_acl',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve a VPC's default routing table.
   *
   * This request retrieves the default routing table for the VPC specified by the identifier in the URL. The default
   * routing table is associated with any subnets in the VPC which have not been explicitly associated with a
   * user-defined routing table.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The VPC identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.DefaultRoutingTable>>}
   */
  public getVpcDefaultRoutingTable(params: VpcV1.GetVpcDefaultRoutingTableParams): Promise<VpcV1.Response<VpcV1.DefaultRoutingTable>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getVpcDefaultRoutingTable');

    const parameters = {
      options: {
        url: '/vpcs/{id}/default_routing_table',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve a VPC's default security group.
   *
   * This request retrieves the default security group for the VPC specified by the identifier in the URL. The default
   * security group is applied to any new network interfaces in the VPC that do not specify a security group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The VPC identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.DefaultSecurityGroup>>}
   */
  public getVpcDefaultSecurityGroup(params: VpcV1.GetVpcDefaultSecurityGroupParams): Promise<VpcV1.Response<VpcV1.DefaultSecurityGroup>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getVpcDefaultSecurityGroup');

    const parameters = {
      options: {
        url: '/vpcs/{id}/default_security_group',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all address pool prefixes for a VPC.
   *
   * This request lists all address pool prefixes for a VPC.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.AddressPrefixCollection>>}
   */
  public listVpcAddressPrefixes(params: VpcV1.ListVpcAddressPrefixesParams): Promise<VpcV1.Response<VpcV1.AddressPrefixCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit
    };

    const path = {
      'vpc_id': _params.vpcId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listVpcAddressPrefixes');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/address_prefixes',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create an address pool prefix.
   *
   * This request creates a new prefix from a prefix prototype object. The prototype object is structured in the same
   * way as a retrieved prefix, and contains the information necessary to create the new prefix.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} params.cidr - The IPv4 range of the address prefix, expressed in CIDR format. The request must not
   * overlap with any existing address prefixes in the VPC, and must fall within the [RFC
   * 1918](https://tools.ietf.org/html/rfc1918) address ranges. The prefix length of the address prefix's CIDR must be
   * between `/9` (8,388,608 addresses) and `/29` (8 addresses).
   * @param {ZoneIdentity} params.zone - The zone this address prefix is to belong to.
   * @param {boolean} [params.isDefault] - Indicates whether this is the default prefix for this zone in this VPC. If
   * true, this prefix will become the default prefix for this zone in this VPC. This fails if the VPC currently has a
   * default address prefix for this zone.
   * @param {string} [params.name] - The user-defined name for this address prefix. Names must be unique within the VPC
   * the address prefix resides in. If unspecified, the name will be a hyphenated list of randomly-selected words.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.AddressPrefix>>}
   */
  public createVpcAddressPrefix(params: VpcV1.CreateVpcAddressPrefixParams): Promise<VpcV1.Response<VpcV1.AddressPrefix>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId', 'cidr', 'zone'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'cidr': _params.cidr,
      'zone': _params.zone,
      'is_default': _params.isDefault,
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpc_id': _params.vpcId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createVpcAddressPrefix');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/address_prefixes',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete specified address pool prefix.
   *
   * This request deletes a prefix. This operation cannot be reversed. The request will fail if any subnets use
   * addresses from this prefix.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} params.id - The prefix identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteVpcAddressPrefix(params: VpcV1.DeleteVpcAddressPrefixParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpc_id': _params.vpcId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteVpcAddressPrefix');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/address_prefixes/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified address pool prefix.
   *
   * This request retrieves a single prefix specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} params.id - The prefix identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.AddressPrefix>>}
   */
  public getVpcAddressPrefix(params: VpcV1.GetVpcAddressPrefixParams): Promise<VpcV1.Response<VpcV1.AddressPrefix>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpc_id': _params.vpcId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getVpcAddressPrefix');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/address_prefixes/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update an address pool prefix.
   *
   * This request updates a prefix with the information in a provided prefix patch. The prefix patch object is
   * structured in the same way as a retrieved prefix and contains only the information to be updated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} params.id - The prefix identifier.
   * @param {boolean} [params.isDefault] - Indicates whether this is the default prefix for this zone in this VPC.
   * Updating to true makes this prefix the default prefix for this zone in this VPC, provided the VPC currently has no
   * default address prefix for this zone. Updating to false removes the default prefix for this zone in this VPC.
   * @param {string} [params.name] - The user-defined name for this address prefix. Names must be unique within the VPC
   * the address prefix resides in.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.AddressPrefix>>}
   */
  public updateVpcAddressPrefix(params: VpcV1.UpdateVpcAddressPrefixParams): Promise<VpcV1.Response<VpcV1.AddressPrefix>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'is_default': _params.isDefault,
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpc_id': _params.vpcId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateVpcAddressPrefix');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/address_prefixes/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all routes in the VPC's default routing table.
   *
   * This request retrieves routes in the VPC's default routing table. Each route is zone-specific and directs any
   * packets matching its destination CIDR block to a `next_hop` IP address. The most specific route matching a packet's
   * destination will be used. If multiple equally-specific routes exist, traffic will be distributed across them.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} [params.zoneName] - Filters the collection to resources in the zone with the exact specified name.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.RouteCollection>>}
   */
  public listVpcRoutes(params: VpcV1.ListVpcRoutesParams): Promise<VpcV1.Response<VpcV1.RouteCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation,
      'zone.name': _params.zoneName,
      'start': _params.start,
      'limit': _params.limit
    };

    const path = {
      'vpc_id': _params.vpcId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listVpcRoutes');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/routes',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a route in the VPC's default routing table.
   *
   * This request creates a new route in the VPC's default routing table. The route prototype object is structured in
   * the same way as a retrieved route, and contains the information necessary to create the new route. The request will
   * fail if the new route will cause a loop.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} params.destination - The destination of the route. At most two routes per `zone` in a table can
   * have the same destination, and only if both routes have an `action` of `deliver` and the
   * `next_hop` is an IP address.
   * @param {RouteNextHopPrototype} params.nextHop - If `action` is `deliver`, the next hop that packets will be
   * delivered to.  For
   * other `action` values, its `address` will be `0.0.0.0`.
   * @param {ZoneIdentity} params.zone - The zone to apply the route to. (Traffic from subnets in this zone will be
   * subject to this route.).
   * @param {string} [params.action] - The action to perform with a packet matching the route:
   * - `delegate`: delegate to the system's built-in routes
   * - `deliver`: deliver the packet to the specified `next_hop`
   * - `drop`: drop the packet.
   * @param {string} [params.name] - The user-defined name for this route. If unspecified, the name will be a hyphenated
   * list of randomly-selected words. Names must be unique within the VPC routing table the route resides in.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Route>>}
   */
  public createVpcRoute(params: VpcV1.CreateVpcRouteParams): Promise<VpcV1.Response<VpcV1.Route>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId', 'destination', 'nextHop', 'zone'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'destination': _params.destination,
      'next_hop': _params.nextHop,
      'zone': _params.zone,
      'action': _params.action,
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpc_id': _params.vpcId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createVpcRoute');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/routes',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete the specified route in the VPC's default routing table.
   *
   * This request deletes a route. This operation cannot be reversed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} params.id - The route identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteVpcRoute(params: VpcV1.DeleteVpcRouteParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpc_id': _params.vpcId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteVpcRoute');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/routes/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve the specified route in the VPC's default routing table.
   *
   * This request retrieves a single route specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} params.id - The route identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Route>>}
   */
  public getVpcRoute(params: VpcV1.GetVpcRouteParams): Promise<VpcV1.Response<VpcV1.Route>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpc_id': _params.vpcId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getVpcRoute');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/routes/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update the specified route in the VPC's default routing table.
   *
   * This request updates a route with the information in a provided route patch. The route patch object is structured
   * in the same way as a retrieved route and contains only the information to be updated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} params.id - The route identifier.
   * @param {string} [params.name] - The user-defined name for this route. Names must be unique within the VPC routing
   * table the route resides in.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Route>>}
   */
  public updateVpcRoute(params: VpcV1.UpdateVpcRouteParams): Promise<VpcV1.Response<VpcV1.Route>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpc_id': _params.vpcId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateVpcRoute');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/routes/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all routing tables for a VPC.
   *
   * This request lists all user-defined routing tables for a VPC.  Each subnet in a VPC is associated with a routing
   * table, which controls delivery of packets sent on that subnet according to the action of the most specific matching
   * route in the table.  If multiple equally-specific routes exist, traffic will be distributed across them.  If no
   * routes match, delivery will be controlled by the system's built-in routes.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {boolean} [params.isDefault] - If the supplied value is `true`, filters the routing table collection to only
   * the default routing table. If the supplied value is `false`, filters the routing table collection to exclude the
   * default routing table.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.RoutingTableCollection>>}
   */
  public listVpcRoutingTables(params: VpcV1.ListVpcRoutingTablesParams): Promise<VpcV1.Response<VpcV1.RoutingTableCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit,
      'is_default': _params.isDefault
    };

    const path = {
      'vpc_id': _params.vpcId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listVpcRoutingTables');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/routing_tables',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a VPC routing table.
   *
   * This request creates a user-defined routing table from a routing table prototype object. The prototype object is
   * structured in the same way as a retrieved routing table, and contains the information necessary to create the new
   * routing table.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} [params.name] - The user-defined name for this routing table. Names must be unique within the VPC
   * the routing table resides in. If unspecified, the name will be a hyphenated list of randomly-selected words.
   * @param {boolean} [params.routeDirectLinkIngress] - If set to `true`, this routing table will be used to route
   * traffic that originates from [Direct Link](https://cloud.ibm.com/docs/dl/) to this VPC. For this to succeed, the
   * VPC must not already have a routing table with this property set to `true`.
   *
   * Incoming traffic will be routed according to the routing table with one exception: routes with an `action` of
   * `deliver` are treated as `drop` unless the `next_hop` is an IP address within the VPC's address prefix ranges.
   * Therefore, if an incoming packet matches a route with with a `next_hop` of an internet-bound IP address or a VPN
   * gateway connection, the packet will be dropped.
   * @param {boolean} [params.routeTransitGatewayIngress] - If set to `true`, this routing table will be used to route
   * traffic that originates from [Transit Gateway](https://cloud.ibm.com/cloud/transit-gateway/) to this VPC. For this
   * to succeed, the VPC must not already have a routing table with this property set to `true`.
   *
   * Incoming traffic will be routed according to the routing table with one exception: routes with an `action` of
   * `deliver` are treated as `drop` unless the `next_hop` is an IP address within the VPC's address prefix ranges.
   * Therefore, if an incoming packet matches a route with with a `next_hop` of an internet-bound IP address or a VPN
   * gateway connection, the packet will be dropped.
   *
   * If [Classic Access](https://cloud.ibm.com/docs/vpc?topic=vpc-setting-up-access-to-classic-infrastructure) is
   * enabled for this VPC, and this property is set to `true`, its incoming traffic will also be routed according to
   * this routing table.
   * @param {boolean} [params.routeVpcZoneIngress] - If set to `true`, this routing table will be used to route traffic
   * that originates from subnets in other zones in this VPC. For this to succeed, the VPC must not already have a
   * routing table with this property set to `true`.
   *
   * Incoming traffic will be routed according to the routing table with one exception: routes with an `action` of
   * `deliver` are treated as `drop` unless the `next_hop` is an IP address within the VPC's address prefix ranges.
   * Therefore, if an incoming packet matches a route with with a `next_hop` of an internet-bound IP address or a VPN
   * gateway connection, the packet will be dropped.
   * @param {RoutePrototype[]} [params.routes] - Array of route prototype objects for routes to create for this routing
   * table. If unspecified, the routing table will be created with no routes.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.RoutingTable>>}
   */
  public createVpcRoutingTable(params: VpcV1.CreateVpcRoutingTableParams): Promise<VpcV1.Response<VpcV1.RoutingTable>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name,
      'route_direct_link_ingress': _params.routeDirectLinkIngress,
      'route_transit_gateway_ingress': _params.routeTransitGatewayIngress,
      'route_vpc_zone_ingress': _params.routeVpcZoneIngress,
      'routes': _params.routes
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpc_id': _params.vpcId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createVpcRoutingTable');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/routing_tables',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete specified VPC routing table.
   *
   * This request deletes a routing table.  A routing table cannot be deleted if it is associated with any subnets in
   * the VPC. Additionally, a VPC's default routing table cannot be deleted. This operation cannot be reversed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} params.id - The routing table identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteVpcRoutingTable(params: VpcV1.DeleteVpcRoutingTableParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpc_id': _params.vpcId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteVpcRoutingTable');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/routing_tables/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified VPC routing table.
   *
   * This request retrieves a single routing table specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} params.id - The routing table identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.RoutingTable>>}
   */
  public getVpcRoutingTable(params: VpcV1.GetVpcRoutingTableParams): Promise<VpcV1.Response<VpcV1.RoutingTable>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpc_id': _params.vpcId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getVpcRoutingTable');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/routing_tables/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update specified VPC routing table.
   *
   * This request updates a routing table with the information in a provided routing table patch. The patch object is
   * structured in the same way as a retrieved table and contains only the information to be updated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} params.id - The routing table identifier.
   * @param {string} [params.name] - The user-defined name for this routing table. Names must be unique within the VPC
   * the routing table resides in.
   * @param {boolean} [params.routeDirectLinkIngress] - Indicates whether this routing table is used to route traffic
   * that originates from
   * [Direct Link](https://cloud.ibm.com/docs/dl/) to this VPC. Updating to `true` selects this routing table, provided
   * no other routing table in the VPC already has this property set to `true`, and no subnets are attached to this
   * routing table. Updating to `false` deselects this routing table.
   *
   * Incoming traffic will be routed according to the routing table with one exception: routes with an `action` of
   * `deliver` are treated as `drop` unless the `next_hop` is an IP address within the VPC's address prefix ranges.
   * Therefore, if an incoming packet matches a route with with a `next_hop` of an internet-bound IP address or a VPN
   * gateway connection, the packet will be dropped.
   * @param {boolean} [params.routeTransitGatewayIngress] - Indicates whether this routing table is used to route
   * traffic that originates from
   * [Transit Gateway](https://cloud.ibm.com/cloud/transit-gateway/) to this VPC. Updating to
   * `true` selects this routing table, provided no other routing table in the VPC already has this property set to
   * `true`, and no subnets are attached to this routing table. Updating to `false` deselects this routing table.
   *
   * Incoming traffic will be routed according to the routing table with one exception: routes with an `action` of
   * `deliver` are treated as `drop` unless the `next_hop` is an IP address within the VPC's address prefix ranges.
   * Therefore, if an incoming packet matches a route with with a `next_hop` of an internet-bound IP address or a VPN
   * gateway connection, the packet will be dropped.
   *
   * If [Classic Access](https://cloud.ibm.com/docs/vpc?topic=vpc-setting-up-access-to-classic-infrastructure) is
   * enabled for this VPC, and this property is set to `true`, its incoming traffic will also be routed according to
   * this routing table.
   * @param {boolean} [params.routeVpcZoneIngress] - Indicates whether this routing table is used to route traffic that
   * originates from subnets in other zones in this VPC. Updating to `true` selects this routing table, provided no
   * other routing table in the VPC already has this property set to `true`, and no subnets are attached to this routing
   * table. Updating to `false` deselects this routing table.
   *
   * Incoming traffic will be routed according to the routing table with one exception: routes with an `action` of
   * `deliver` are treated as `drop` unless the `next_hop` is an IP address within the VPC's address prefix ranges.
   * Therefore, if an incoming packet matches a route with with a `next_hop` of an internet-bound IP address or a VPN
   * gateway connection, the packet will be dropped.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.RoutingTable>>}
   */
  public updateVpcRoutingTable(params: VpcV1.UpdateVpcRoutingTableParams): Promise<VpcV1.Response<VpcV1.RoutingTable>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name,
      'route_direct_link_ingress': _params.routeDirectLinkIngress,
      'route_transit_gateway_ingress': _params.routeTransitGatewayIngress,
      'route_vpc_zone_ingress': _params.routeVpcZoneIngress
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpc_id': _params.vpcId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateVpcRoutingTable');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/routing_tables/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all the routes of a VPC routing table.
   *
   * This request lists all the routes for the specified VPC routing table.  If a subnet has been associated with this
   * routing table, delivery of packets sent on a subnet is performed according to the action of the most specific
   * matching route in the table (provided the subnet and route are in the same zone).  If multiple equally-specific
   * routes exist, traffic will be distributed across them.  If no routes match, delivery will be controlled by the
   * system's built-in routes.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} params.routingTableId - The routing table identifier.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.RouteCollection>>}
   */
  public listVpcRoutingTableRoutes(params: VpcV1.ListVpcRoutingTableRoutesParams): Promise<VpcV1.Response<VpcV1.RouteCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId', 'routingTableId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit
    };

    const path = {
      'vpc_id': _params.vpcId,
      'routing_table_id': _params.routingTableId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listVpcRoutingTableRoutes');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/routing_tables/{routing_table_id}/routes',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a VPC route.
   *
   * This request creates a new VPC route from a VPC route prototype object. The prototype object is structured in the
   * same way as a retrieved VPC route and contains the information necessary to create the route.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} params.routingTableId - The routing table identifier.
   * @param {string} params.destination - The destination of the route. At most two routes per `zone` in a table can
   * have the same destination, and only if both routes have an `action` of `deliver` and the
   * `next_hop` is an IP address.
   * @param {RouteNextHopPrototype} params.nextHop - If `action` is `deliver`, the next hop that packets will be
   * delivered to.  For
   * other `action` values, its `address` will be `0.0.0.0`.
   * @param {ZoneIdentity} params.zone - The zone to apply the route to. (Traffic from subnets in this zone will be
   * subject to this route.).
   * @param {string} [params.action] - The action to perform with a packet matching the route:
   * - `delegate`: delegate to the system's built-in routes
   * - `deliver`: deliver the packet to the specified `next_hop`
   * - `drop`: drop the packet.
   * @param {string} [params.name] - The user-defined name for this route. If unspecified, the name will be a hyphenated
   * list of randomly-selected words. Names must be unique within the VPC routing table the route resides in.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Route>>}
   */
  public createVpcRoutingTableRoute(params: VpcV1.CreateVpcRoutingTableRouteParams): Promise<VpcV1.Response<VpcV1.Route>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId', 'routingTableId', 'destination', 'nextHop', 'zone'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'destination': _params.destination,
      'next_hop': _params.nextHop,
      'zone': _params.zone,
      'action': _params.action,
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpc_id': _params.vpcId,
      'routing_table_id': _params.routingTableId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createVpcRoutingTableRoute');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/routing_tables/{routing_table_id}/routes',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete the specified VPC route.
   *
   * This request deletes a VPC route. This operation cannot be reversed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} params.routingTableId - The routing table identifier.
   * @param {string} params.id - The VPC routing table route identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteVpcRoutingTableRoute(params: VpcV1.DeleteVpcRoutingTableRouteParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId', 'routingTableId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpc_id': _params.vpcId,
      'routing_table_id': _params.routingTableId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteVpcRoutingTableRoute');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/routing_tables/{routing_table_id}/routes/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve the specified VPC route.
   *
   * This request retrieves a single VPC route specified by the identifier in the URL path.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} params.routingTableId - The routing table identifier.
   * @param {string} params.id - The VPC routing table route identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Route>>}
   */
  public getVpcRoutingTableRoute(params: VpcV1.GetVpcRoutingTableRouteParams): Promise<VpcV1.Response<VpcV1.Route>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId', 'routingTableId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpc_id': _params.vpcId,
      'routing_table_id': _params.routingTableId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getVpcRoutingTableRoute');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/routing_tables/{routing_table_id}/routes/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update the specified VPC route.
   *
   * This request updates a VPC route with the information provided in a route patch object. The patch object is
   * structured in the same way as a retrieved VPC route and needs to contain only the information to be updated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpcId - The VPC identifier.
   * @param {string} params.routingTableId - The routing table identifier.
   * @param {string} params.id - The VPC routing table route identifier.
   * @param {string} [params.name] - The user-defined name for this route. Names must be unique within the VPC routing
   * table the route resides in.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Route>>}
   */
  public updateVpcRoutingTableRoute(params: VpcV1.UpdateVpcRoutingTableRouteParams): Promise<VpcV1.Response<VpcV1.Route>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpcId', 'routingTableId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpc_id': _params.vpcId,
      'routing_table_id': _params.routingTableId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateVpcRoutingTableRoute');

    const parameters = {
      options: {
        url: '/vpcs/{vpc_id}/routing_tables/{routing_table_id}/routes/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * subnets
   ************************/

  /**
   * List all subnets.
   *
   * This request lists all subnets in the region. Subnets are contiguous ranges of IP addresses specified in CIDR block
   * notation. Each subnet is within a particular zone and cannot span multiple zones or regions.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {string} [params.resourceGroupId] - Filters the collection to resources within one of the resource groups
   * identified in a comma-separated list of resource group identifiers.
   * @param {string} [params.routingTableId] - Filters the collection to subnets with the routing table of the specified
   * identifier.
   * @param {string} [params.routingTableName] - Filters the collection to subnets with the routing table of the
   * specified name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.SubnetCollection>>}
   */
  public listSubnets(params?: VpcV1.ListSubnetsParams): Promise<VpcV1.Response<VpcV1.SubnetCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit,
      'resource_group.id': _params.resourceGroupId,
      'routing_table.id': _params.routingTableId,
      'routing_table.name': _params.routingTableName
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listSubnets');

    const parameters = {
      options: {
        url: '/subnets',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a subnet.
   *
   * This request creates a new subnet from a subnet prototype object. The prototype object is structured in the same
   * way as a retrieved subnet, and contains the information necessary to create the new subnet. For this request to
   * succeed, the prototype's CIDR block must not overlap with an existing subnet in the VPC.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {SubnetPrototype} params.subnetPrototype - The subnet prototype object.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Subnet>>}
   */
  public createSubnet(params: VpcV1.CreateSubnetParams): Promise<VpcV1.Response<VpcV1.Subnet>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['subnetPrototype'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.subnetPrototype;
    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createSubnet');

    const parameters = {
      options: {
        url: '/subnets',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete specified subnet.
   *
   * This request deletes a subnet. This operation cannot be reversed. For this request to succeed, the subnet must not
   * be referenced by any network interfaces, VPN gateways, or load balancers. A delete operation automatically detaches
   * the subnet from any network ACLs, public gateways, or endpoint gateways. All flow log collectors with `auto_delete`
   * set to `true` targeting the subnet or any resource in the subnet are automatically deleted.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The subnet identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteSubnet(params: VpcV1.DeleteSubnetParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteSubnet');

    const parameters = {
      options: {
        url: '/subnets/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified subnet.
   *
   * This request retrieves a single subnet specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The subnet identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Subnet>>}
   */
  public getSubnet(params: VpcV1.GetSubnetParams): Promise<VpcV1.Response<VpcV1.Subnet>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getSubnet');

    const parameters = {
      options: {
        url: '/subnets/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update specified subnet.
   *
   * This request updates a subnet with the information in a provided subnet patch. The subnet patch object is
   * structured in the same way as a retrieved subnet and contains only the information to be updated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The subnet identifier.
   * @param {string} [params.name] - The user-defined name for this subnet. Names must be unique within the VPC the
   * subnet resides in.
   * @param {NetworkACLIdentity} [params.networkAcl] - The network ACL to use for this subnet.
   * @param {PublicGatewayIdentity} [params.publicGateway] - The public gateway to handle internet bound traffic for
   * this subnet.
   * @param {RoutingTableIdentity} [params.routingTable] - The routing table to use for this subnet.  The routing table
   * properties
   * `route_direct_link_ingress`, `route_transit_gateway_ingress`, and
   * `route_vpc_zone_ingress` must be `false`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Subnet>>}
   */
  public updateSubnet(params: VpcV1.UpdateSubnetParams): Promise<VpcV1.Response<VpcV1.Subnet>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name,
      'network_acl': _params.networkAcl,
      'public_gateway': _params.publicGateway,
      'routing_table': _params.routingTable
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateSubnet');

    const parameters = {
      options: {
        url: '/subnets/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve a subnet's attached network ACL.
   *
   * This request retrieves the network ACL attached to the subnet specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The subnet identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.NetworkACL>>}
   */
  public getSubnetNetworkAcl(params: VpcV1.GetSubnetNetworkAclParams): Promise<VpcV1.Response<VpcV1.NetworkACL>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getSubnetNetworkAcl');

    const parameters = {
      options: {
        url: '/subnets/{id}/network_acl',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Attach a network ACL to a subnet.
   *
   * This request attaches the network ACL, specified in the request body, to the subnet specified by the subnet
   * identifier in the URL. This replaces the existing network ACL on the subnet.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The subnet identifier.
   * @param {NetworkACLIdentity} params.networkAclIdentity - The network ACL identity.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.NetworkACL>>}
   */
  public replaceSubnetNetworkAcl(params: VpcV1.ReplaceSubnetNetworkAclParams): Promise<VpcV1.Response<VpcV1.NetworkACL>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id', 'networkAclIdentity'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.networkAclIdentity;
    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'replaceSubnetNetworkAcl');

    const parameters = {
      options: {
        url: '/subnets/{id}/network_acl',
        method: 'PUT',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Detach a public gateway from a subnet.
   *
   * This request detaches the public gateway from the subnet specified by the subnet identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The subnet identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public unsetSubnetPublicGateway(params: VpcV1.UnsetSubnetPublicGatewayParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'unsetSubnetPublicGateway');

    const parameters = {
      options: {
        url: '/subnets/{id}/public_gateway',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve a subnet's attached public gateway.
   *
   * This request retrieves the public gateway attached to the subnet specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The subnet identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.PublicGateway>>}
   */
  public getSubnetPublicGateway(params: VpcV1.GetSubnetPublicGatewayParams): Promise<VpcV1.Response<VpcV1.PublicGateway>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getSubnetPublicGateway');

    const parameters = {
      options: {
        url: '/subnets/{id}/public_gateway',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Attach a public gateway to a subnet.
   *
   * This request attaches the public gateway, specified in the request body, to the subnet specified by the subnet
   * identifier in the URL. The public gateway must have the same VPC and zone as the subnet.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The subnet identifier.
   * @param {PublicGatewayIdentity} params.publicGatewayIdentity - The public gateway identity.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.PublicGateway>>}
   */
  public setSubnetPublicGateway(params: VpcV1.SetSubnetPublicGatewayParams): Promise<VpcV1.Response<VpcV1.PublicGateway>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id', 'publicGatewayIdentity'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.publicGatewayIdentity;
    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'setSubnetPublicGateway');

    const parameters = {
      options: {
        url: '/subnets/{id}/public_gateway',
        method: 'PUT',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve a subnet's attached routing table.
   *
   * This request retrieves the routing table attached to the subnet specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The subnet identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.RoutingTable>>}
   */
  public getSubnetRoutingTable(params: VpcV1.GetSubnetRoutingTableParams): Promise<VpcV1.Response<VpcV1.RoutingTable>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getSubnetRoutingTable');

    const parameters = {
      options: {
        url: '/subnets/{id}/routing_table',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Attach a routing table to a subnet.
   *
   * This request attaches the routing table, specified in the request body, to the subnet specified by the subnet
   * identifier in the URL. This replaces the existing routing table on the subnet.
   *
   * For this request to succeed, the routing table `route_direct_link_ingress`,
   * `route_transit_gateway_ingress`, and `route_vpc_zone_ingress` properties must be `false`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The subnet identifier.
   * @param {RoutingTableIdentity} params.routingTableIdentity - The routing table identity.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.RoutingTable>>}
   */
  public replaceSubnetRoutingTable(params: VpcV1.ReplaceSubnetRoutingTableParams): Promise<VpcV1.Response<VpcV1.RoutingTable>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id', 'routingTableIdentity'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.routingTableIdentity;
    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'replaceSubnetRoutingTable');

    const parameters = {
      options: {
        url: '/subnets/{id}/routing_table',
        method: 'PUT',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all reserved IPs in a subnet.
   *
   * This request lists reserved IPs in the subnet that are unbound or bound to an endpoint gateway.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.subnetId - The subnet identifier.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {string} [params.sort] - Sorts the returned collection by the specified field name in ascending order. A `-`
   * may be prepended to the field name to sort in descending order. For example, the value
   * `-created_at` sorts the collection by the `created_at` field in descending order, and the value `name` sorts it by
   * the `name` field in ascending order.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.ReservedIPCollection>>}
   */
  public listSubnetReservedIps(params: VpcV1.ListSubnetReservedIpsParams): Promise<VpcV1.Response<VpcV1.ReservedIPCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['subnetId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit,
      'sort': _params.sort
    };

    const path = {
      'subnet_id': _params.subnetId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listSubnetReservedIps');

    const parameters = {
      options: {
        url: '/subnets/{subnet_id}/reserved_ips',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Reserve an IP in a subnet.
   *
   * This request reserves a system-selected IP address in a subnet.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.subnetId - The subnet identifier.
   * @param {boolean} [params.autoDelete] - If set to `true`, this reserved IP will be automatically deleted when the
   * target is deleted or when the reserved IP is unbound. The value cannot be set to `true` if the reserved IP is
   * unbound.
   * @param {string} [params.name] - The user-defined name for this reserved IP. If not specified, the name will be a
   * hyphenated list of randomly-selected words. Names must be unique within the subnet the reserved IP resides in.
   * Names beginning with `ibm-` are reserved for provider-owned resources.
   * @param {ReservedIPTargetPrototype} [params.target] - The target this reserved IP is to be bound to.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.ReservedIP>>}
   */
  public createSubnetReservedIp(params: VpcV1.CreateSubnetReservedIpParams): Promise<VpcV1.Response<VpcV1.ReservedIP>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['subnetId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'auto_delete': _params.autoDelete,
      'name': _params.name,
      'target': _params.target
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'subnet_id': _params.subnetId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createSubnetReservedIp');

    const parameters = {
      options: {
        url: '/subnets/{subnet_id}/reserved_ips',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Release specified reserved IP.
   *
   * This request releases a reserved IP. This operation cannot be reversed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.subnetId - The subnet identifier.
   * @param {string} params.id - The reserved IP identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteSubnetReservedIp(params: VpcV1.DeleteSubnetReservedIpParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['subnetId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'subnet_id': _params.subnetId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteSubnetReservedIp');

    const parameters = {
      options: {
        url: '/subnets/{subnet_id}/reserved_ips/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified reserved IP.
   *
   * This request retrieves a single reserved IP specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.subnetId - The subnet identifier.
   * @param {string} params.id - The reserved IP identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.ReservedIP>>}
   */
  public getSubnetReservedIp(params: VpcV1.GetSubnetReservedIpParams): Promise<VpcV1.Response<VpcV1.ReservedIP>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['subnetId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'subnet_id': _params.subnetId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getSubnetReservedIp');

    const parameters = {
      options: {
        url: '/subnets/{subnet_id}/reserved_ips/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update specified reserved IP.
   *
   * This request updates a reserved IP with the information in a provided reserved IP patch. The reserved IP patch
   * object is structured in the same way as a retrieved reserved IP and contains only the information to be updated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.subnetId - The subnet identifier.
   * @param {string} params.id - The reserved IP identifier.
   * @param {boolean} [params.autoDelete] - If set to `true`, this reserved IP will be automatically deleted when the
   * target is deleted or when the reserved IP is unbound. The value cannot be set to `true` if the reserved IP is
   * unbound.
   * @param {string} [params.name] - The user-defined name for this reserved IP. Names must be unique within the subnet
   * the reserved IP resides in. Names beginning with `ibm-` are reserved for provider-owned resources.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.ReservedIP>>}
   */
  public updateSubnetReservedIp(params: VpcV1.UpdateSubnetReservedIpParams): Promise<VpcV1.Response<VpcV1.ReservedIP>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['subnetId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'auto_delete': _params.autoDelete,
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'subnet_id': _params.subnetId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateSubnetReservedIp');

    const parameters = {
      options: {
        url: '/subnets/{subnet_id}/reserved_ips/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * images
   ************************/

  /**
   * List all images.
   *
   * This request lists all provisionable images available in the region. An image provides source data for a volume.
   * Images are either system-provided, or created from another source, such as importing from object storage.
   *
   * The images will be sorted by their `created_at` property values, with the newest first. Images with identical
   * `created_at` values will be secondarily sorted by ascending `id` property values.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {string} [params.resourceGroupId] - Filters the collection to resources within one of the resource groups
   * identified in a comma-separated list of resource group identifiers.
   * @param {string} [params.name] - Filters the collection to resources with the exact specified name.
   * @param {string} [params.visibility] - Filters the collection to images with the specified `visibility`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.ImageCollection>>}
   */
  public listImages(params?: VpcV1.ListImagesParams): Promise<VpcV1.Response<VpcV1.ImageCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit,
      'resource_group.id': _params.resourceGroupId,
      'name': _params.name,
      'visibility': _params.visibility
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listImages');

    const parameters = {
      options: {
        url: '/images',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create an image.
   *
   * This request creates a new image from an image prototype object. The prototype object is structured in the same way
   * as a retrieved image, and contains the information necessary to create the new image. A URL to the image file on
   * object storage must be provided.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {ImagePrototype} params.imagePrototype - The image prototype object.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Image>>}
   */
  public createImage(params: VpcV1.CreateImageParams): Promise<VpcV1.Response<VpcV1.Image>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['imagePrototype'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.imagePrototype;
    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createImage');

    const parameters = {
      options: {
        url: '/images',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete specified image.
   *
   * This request deletes an image. This operation cannot be reversed. System-provided images are not allowed to be
   * deleted. An image with a `status` of `pending`, `tentative`, or `deleting` cannot be deleted.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The image identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteImage(params: VpcV1.DeleteImageParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteImage');

    const parameters = {
      options: {
        url: '/images/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve the specified image.
   *
   * This request retrieves a single image specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The image identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Image>>}
   */
  public getImage(params: VpcV1.GetImageParams): Promise<VpcV1.Response<VpcV1.Image>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getImage');

    const parameters = {
      options: {
        url: '/images/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update specified image.
   *
   * This request updates an image with the information in a provided image patch. The image patch object is structured
   * in the same way as a retrieved image and contains only the information to be updated. System-provided images are
   * not allowed to be updated. An image with a `status` of `deleting` cannot be updated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The image identifier.
   * @param {string} [params.name] - The unique user-defined name for this image. Names starting with "ibm-" are not
   * allowed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Image>>}
   */
  public updateImage(params: VpcV1.UpdateImageParams): Promise<VpcV1.Response<VpcV1.Image>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateImage');

    const parameters = {
      options: {
        url: '/images/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieves all operating systems.
   *
   * This request retrieves all operating systems.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.OperatingSystemCollection>>}
   */
  public listOperatingSystems(params?: VpcV1.ListOperatingSystemsParams): Promise<VpcV1.Response<VpcV1.OperatingSystemCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listOperatingSystems');

    const parameters = {
      options: {
        url: '/operating_systems',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieves an operating system.
   *
   * This request retrieves a single operating system specified by the name in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The operating system name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.OperatingSystem>>}
   */
  public getOperatingSystem(params: VpcV1.GetOperatingSystemParams): Promise<VpcV1.Response<VpcV1.OperatingSystem>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['name'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'name': _params.name
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getOperatingSystem');

    const parameters = {
      options: {
        url: '/operating_systems/{name}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * keys
   ************************/

  /**
   * List all keys.
   *
   * This request lists all keys. A key contains a public SSH key which may be installed on instances when they are
   * created. Private keys are not stored.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.resourceGroupId] - Filters the collection to resources within one of the resource groups
   * identified in a comma-separated list of resource group identifiers.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.KeyCollection>>}
   */
  public listKeys(params?: VpcV1.ListKeysParams): Promise<VpcV1.Response<VpcV1.KeyCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation,
      'resource_group.id': _params.resourceGroupId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listKeys');

    const parameters = {
      options: {
        url: '/keys',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a key.
   *
   * This request creates a new SSH key from an key prototype object. The prototype object is structured in the same way
   * as a retrieved key, and contains the information necessary to create the new key. The public key value must be
   * provided.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.publicKey - A unique public SSH key to import, encoded in PEM format. The key (prior to
   * encoding) must be either 2048 or 4096 bits long.
   * @param {string} [params.name] - The unique user-defined name for this key. If unspecified, the name will be a
   * hyphenated list of randomly-selected words.
   * @param {ResourceGroupIdentity} [params.resourceGroup] - The resource group to use. If unspecified, the account's
   * [default resource
   * group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
   * @param {string} [params.type] - The crypto-system used by this key.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Key>>}
   */
  public createKey(params: VpcV1.CreateKeyParams): Promise<VpcV1.Response<VpcV1.Key>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['publicKey'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'public_key': _params.publicKey,
      'name': _params.name,
      'resource_group': _params.resourceGroup,
      'type': _params.type
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createKey');

    const parameters = {
      options: {
        url: '/keys',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete specified key.
   *
   * This request deletes a key. This operation cannot be reversed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The key identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteKey(params: VpcV1.DeleteKeyParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteKey');

    const parameters = {
      options: {
        url: '/keys/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified key.
   *
   * This request retrieves a single key specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The key identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Key>>}
   */
  public getKey(params: VpcV1.GetKeyParams): Promise<VpcV1.Response<VpcV1.Key>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getKey');

    const parameters = {
      options: {
        url: '/keys/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update specified key.
   *
   * This request updates a key's name.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The key identifier.
   * @param {string} [params.name] - The user-defined name for this key.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Key>>}
   */
  public updateKey(params: VpcV1.UpdateKeyParams): Promise<VpcV1.Response<VpcV1.Key>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateKey');

    const parameters = {
      options: {
        url: '/keys/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * instances
   ************************/

  /**
   * List all instance profiles.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceProfileCollection>>}
   */
  public listInstanceProfiles(params?: VpcV1.ListInstanceProfilesParams): Promise<VpcV1.Response<VpcV1.InstanceProfileCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listInstanceProfiles');

    const parameters = {
      options: {
        url: '/instance/profiles',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified instance profile.
   *
   * This request retrieves a single instance profile specified by the name in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The instance profile name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceProfile>>}
   */
  public getInstanceProfile(params: VpcV1.GetInstanceProfileParams): Promise<VpcV1.Response<VpcV1.InstanceProfile>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['name'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'name': _params.name
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstanceProfile');

    const parameters = {
      options: {
        url: '/instance/profiles/{name}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get instance templates.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceTemplateCollection>>}
   */
  public listInstanceTemplates(params?: VpcV1.ListInstanceTemplatesParams): Promise<VpcV1.Response<VpcV1.InstanceTemplateCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listInstanceTemplates');

    const parameters = {
      options: {
        url: '/instance/templates',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create an instance template.
   *
   * This request creates a new instance template.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {InstanceTemplatePrototype} params.instanceTemplatePrototype - The instance template prototype object.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceTemplate>>}
   */
  public createInstanceTemplate(params: VpcV1.CreateInstanceTemplateParams): Promise<VpcV1.Response<VpcV1.InstanceTemplate>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceTemplatePrototype'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.instanceTemplatePrototype;
    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createInstanceTemplate');

    const parameters = {
      options: {
        url: '/instance/templates',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete specified instance template.
   *
   * This request deletes the instance template. This operation cannot be reversed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The instance template identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteInstanceTemplate(params: VpcV1.DeleteInstanceTemplateParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteInstanceTemplate');

    const parameters = {
      options: {
        url: '/instance/templates/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified instance template.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The instance template identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceTemplate>>}
   */
  public getInstanceTemplate(params: VpcV1.GetInstanceTemplateParams): Promise<VpcV1.Response<VpcV1.InstanceTemplate>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstanceTemplate');

    const parameters = {
      options: {
        url: '/instance/templates/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update specified instance template.
   *
   * This request updates an instance template with the information provided in the instance template patch. The
   * instance template patch object is structured in the same way as a retrieved instance template and contains only the
   * information to be updated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The instance template identifier.
   * @param {string} [params.name] - The unique user-defined name for this instance template.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceTemplate>>}
   */
  public updateInstanceTemplate(params: VpcV1.UpdateInstanceTemplateParams): Promise<VpcV1.Response<VpcV1.InstanceTemplate>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateInstanceTemplate');

    const parameters = {
      options: {
        url: '/instance/templates/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all instances.
   *
   * This request lists all instances in the region.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {string} [params.resourceGroupId] - Filters the collection to resources within one of the resource groups
   * identified in a comma-separated list of resource group identifiers.
   * @param {string} [params.name] - Filters the collection to resources with the exact specified name.
   * @param {string} [params.vpcId] - Filters the collection to resources in the VPC with the specified identifier.
   * @param {string} [params.vpcCrn] - Filters the collection to resources in the VPC with the specified CRN.
   * @param {string} [params.vpcName] - Filters the collection to resources in the VPC with the exact specified name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceCollection>>}
   */
  public listInstances(params?: VpcV1.ListInstancesParams): Promise<VpcV1.Response<VpcV1.InstanceCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit,
      'resource_group.id': _params.resourceGroupId,
      'name': _params.name,
      'vpc.id': _params.vpcId,
      'vpc.crn': _params.vpcCrn,
      'vpc.name': _params.vpcName
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listInstances');

    const parameters = {
      options: {
        url: '/instances',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create an instance.
   *
   * This request provisions a new instance from an instance prototype object. The prototype object is structured in the
   * same way as a retrieved instance, and contains the information necessary to provision the new instance. The
   * instance is automatically started.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {InstancePrototype} params.instancePrototype - The instance prototype object.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Instance>>}
   */
  public createInstance(params: VpcV1.CreateInstanceParams): Promise<VpcV1.Response<VpcV1.Instance>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instancePrototype'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.instancePrototype;
    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createInstance');

    const parameters = {
      options: {
        url: '/instances',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete specified instance.
   *
   * This request deletes an instance. This operation cannot be reversed. Any floating IPs associated with the
   * instance's network interfaces are implicitly disassociated. All flow log collectors with `auto_delete` set to
   * `true` targeting the instance and/or the instance's network interfaces are automatically deleted.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The instance identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteInstance(params: VpcV1.DeleteInstanceParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteInstance');

    const parameters = {
      options: {
        url: '/instances/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve an instance.
   *
   * This request retrieves a single instance specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The instance identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Instance>>}
   */
  public getInstance(params: VpcV1.GetInstanceParams): Promise<VpcV1.Response<VpcV1.Instance>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstance');

    const parameters = {
      options: {
        url: '/instances/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update specified instance.
   *
   * This request updates an instance with the information in a provided instance patch. The instance patch object is
   * structured in the same way as a retrieved instance and contains only the information to be updated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The instance identifier.
   * @param {string} [params.name] - The user-defined name for this virtual server instance (and default system
   * hostname).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Instance>>}
   */
  public updateInstance(params: VpcV1.UpdateInstanceParams): Promise<VpcV1.Response<VpcV1.Instance>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateInstance');

    const parameters = {
      options: {
        url: '/instances/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve configuration used to initialize the instance.
   *
   * This request retrieves configuration variables used to initialize the instance, such as SSH keys and the Windows
   * administrator password.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The instance identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceInitialization>>}
   */
  public getInstanceInitialization(params: VpcV1.GetInstanceInitializationParams): Promise<VpcV1.Response<VpcV1.InstanceInitialization>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstanceInitialization');

    const parameters = {
      options: {
        url: '/instances/{id}/initialization',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create an instance action.
   *
   * This request creates a new action which will be queued up to run as soon as any pending or running actions have
   * completed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The instance identifier.
   * @param {string} params.type - The type of action.
   * @param {boolean} [params.force] - If set to true, the action will be forced immediately, and all queued actions
   * deleted. Ignored for the start action.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceAction>>}
   */
  public createInstanceAction(params: VpcV1.CreateInstanceActionParams): Promise<VpcV1.Response<VpcV1.InstanceAction>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceId', 'type'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'type': _params.type,
      'force': _params.force
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_id': _params.instanceId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createInstanceAction');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/actions',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all network interfaces on an instance.
   *
   * This request lists all network interfaces on an instance. A network interface is an abstract representation of a
   * network interface card and connects an instance to a subnet. While each network interface can attach to only one
   * subnet, multiple network interfaces can be created to attach to multiple subnets. Multiple interfaces may also
   * attach to the same subnet.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The instance identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.NetworkInterfaceUnpaginatedCollection>>}
   */
  public listInstanceNetworkInterfaces(params: VpcV1.ListInstanceNetworkInterfacesParams): Promise<VpcV1.Response<VpcV1.NetworkInterfaceUnpaginatedCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_id': _params.instanceId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listInstanceNetworkInterfaces');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/network_interfaces',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a network interface.
   *
   * This request creates a new network interface from a network interface prototype object. The prototype object is
   * structured in the same way as a retrieved network interface, and contains the information necessary to create the
   * new network interface. Any subnet in the instance's VPC may be specified, even if it is already attached to another
   * network interface. Addresses on the network interface must be within the specified subnet's CIDR blocks.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The instance identifier.
   * @param {SubnetIdentity} params.subnet - The associated subnet.
   * @param {boolean} [params.allowIpSpoofing] - Indicates whether IP spoofing is allowed on this interface. If false,
   * IP spoofing is prevented on this interface. If true, IP spoofing is allowed on this interface.
   * @param {string} [params.name] - The user-defined name for this network interface. If unspecified, the name will be
   * a hyphenated list of randomly-selected words.
   * @param {string} [params.primaryIpv4Address] - The primary IPv4 address. If specified, it must be an available
   * address on the network interface's subnet. If unspecified, an available address on the subnet will be automatically
   * selected.
   * @param {SecurityGroupIdentity[]} [params.securityGroups] - Collection of security groups.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.NetworkInterface>>}
   */
  public createInstanceNetworkInterface(params: VpcV1.CreateInstanceNetworkInterfaceParams): Promise<VpcV1.Response<VpcV1.NetworkInterface>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceId', 'subnet'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'subnet': _params.subnet,
      'allow_ip_spoofing': _params.allowIpSpoofing,
      'name': _params.name,
      'primary_ipv4_address': _params.primaryIpv4Address,
      'security_groups': _params.securityGroups
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_id': _params.instanceId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createInstanceNetworkInterface');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/network_interfaces',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete specified network interface.
   *
   * This request deletes a network interface. This operation cannot be reversed. Any floating IPs associated with the
   * network interface are implicitly disassociated. All flow log collectors with `auto_delete` set to `true` targeting
   * the network interface are automatically deleted. The primary network interface is not allowed to be deleted.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The instance identifier.
   * @param {string} params.id - The network interface identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteInstanceNetworkInterface(params: VpcV1.DeleteInstanceNetworkInterfaceParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_id': _params.instanceId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteInstanceNetworkInterface');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/network_interfaces/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified network interface.
   *
   * This request retrieves a single network interface specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The instance identifier.
   * @param {string} params.id - The network interface identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.NetworkInterface>>}
   */
  public getInstanceNetworkInterface(params: VpcV1.GetInstanceNetworkInterfaceParams): Promise<VpcV1.Response<VpcV1.NetworkInterface>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_id': _params.instanceId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstanceNetworkInterface');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/network_interfaces/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update a network interface.
   *
   * This request updates a network interface with the information in a provided network interface patch. The network
   * interface patch object is structured in the same way as a retrieved network interface and can contain an updated
   * name and/or port speed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The instance identifier.
   * @param {string} params.id - The network interface identifier.
   * @param {boolean} [params.allowIpSpoofing] - Indicates whether IP spoofing is allowed on this interface. Updating to
   * true allows IP spoofing on this interface. Updating to false prevents IP spoofing on this interface.
   * @param {string} [params.name] - The user-defined name for this network interface.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.NetworkInterface>>}
   */
  public updateInstanceNetworkInterface(params: VpcV1.UpdateInstanceNetworkInterfaceParams): Promise<VpcV1.Response<VpcV1.NetworkInterface>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'allow_ip_spoofing': _params.allowIpSpoofing,
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_id': _params.instanceId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateInstanceNetworkInterface');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/network_interfaces/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all floating IPs associated with a network interface.
   *
   * This request lists all floating IPs associated with a network interface.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The instance identifier.
   * @param {string} params.networkInterfaceId - The network interface identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.FloatingIPUnpaginatedCollection>>}
   */
  public listInstanceNetworkInterfaceFloatingIps(params: VpcV1.ListInstanceNetworkInterfaceFloatingIpsParams): Promise<VpcV1.Response<VpcV1.FloatingIPUnpaginatedCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceId', 'networkInterfaceId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_id': _params.instanceId,
      'network_interface_id': _params.networkInterfaceId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listInstanceNetworkInterfaceFloatingIps');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/network_interfaces/{network_interface_id}/floating_ips',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Disassociate specified floating IP.
   *
   * This request disassociates the specified floating IP from the specified network interface.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The instance identifier.
   * @param {string} params.networkInterfaceId - The network interface identifier.
   * @param {string} params.id - The floating IP identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public removeInstanceNetworkInterfaceFloatingIp(params: VpcV1.RemoveInstanceNetworkInterfaceFloatingIpParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceId', 'networkInterfaceId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_id': _params.instanceId,
      'network_interface_id': _params.networkInterfaceId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'removeInstanceNetworkInterfaceFloatingIp');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/network_interfaces/{network_interface_id}/floating_ips/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve associated floating IP.
   *
   * This request a retrieves a specified floating IP address if it is associated with the network interface and
   * instance specified in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The instance identifier.
   * @param {string} params.networkInterfaceId - The network interface identifier.
   * @param {string} params.id - The floating IP identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.FloatingIP>>}
   */
  public getInstanceNetworkInterfaceFloatingIp(params: VpcV1.GetInstanceNetworkInterfaceFloatingIpParams): Promise<VpcV1.Response<VpcV1.FloatingIP>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceId', 'networkInterfaceId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_id': _params.instanceId,
      'network_interface_id': _params.networkInterfaceId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstanceNetworkInterfaceFloatingIp');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/network_interfaces/{network_interface_id}/floating_ips/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Associate a floating IP with a network interface.
   *
   * This request associates the specified floating IP with the specified network interface, replacing any existing
   * association. For this request to succeed, the existing floating IP must not be required by another resource, such
   * as a public gateway. A request body is not required, and if supplied, is ignored.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The instance identifier.
   * @param {string} params.networkInterfaceId - The network interface identifier.
   * @param {string} params.id - The floating IP identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.FloatingIP>>}
   */
  public addInstanceNetworkInterfaceFloatingIp(params: VpcV1.AddInstanceNetworkInterfaceFloatingIpParams): Promise<VpcV1.Response<VpcV1.FloatingIP>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceId', 'networkInterfaceId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_id': _params.instanceId,
      'network_interface_id': _params.networkInterfaceId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'addInstanceNetworkInterfaceFloatingIp');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/network_interfaces/{network_interface_id}/floating_ips/{id}',
        method: 'PUT',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all volumes attached to an instance.
   *
   * This request lists all volume attachments for an instance. A volume attachment connects a volume to an instance.
   * Each instance may have many volume attachments but each volume attachment connects exactly one instance to exactly
   * one volume.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The instance identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VolumeAttachmentCollection>>}
   */
  public listInstanceVolumeAttachments(params: VpcV1.ListInstanceVolumeAttachmentsParams): Promise<VpcV1.Response<VpcV1.VolumeAttachmentCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_id': _params.instanceId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listInstanceVolumeAttachments');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/volume_attachments',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a volume attachment, connecting a volume to an instance.
   *
   * This request creates a new volume attachment from a volume attachment prototype object. The prototype object is
   * structured in the same way as a retrieved volume attachment, and contains the information necessary to create the
   * new volume attachment. The creation of a new volume attachment connects a volume to an instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The instance identifier.
   * @param {VolumeIdentity} params.volume - The identity of the volume to attach to the instance.
   * @param {boolean} [params.deleteVolumeOnInstanceDelete] - If set to true, when deleting the instance the volume will
   * also be deleted.
   * @param {string} [params.name] - The user-defined name for this volume attachment. If unspecified, the name will be
   * a hyphenated list of randomly-selected words.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VolumeAttachment>>}
   */
  public createInstanceVolumeAttachment(params: VpcV1.CreateInstanceVolumeAttachmentParams): Promise<VpcV1.Response<VpcV1.VolumeAttachment>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceId', 'volume'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'volume': _params.volume,
      'delete_volume_on_instance_delete': _params.deleteVolumeOnInstanceDelete,
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_id': _params.instanceId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createInstanceVolumeAttachment');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/volume_attachments',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete a volume attachment, detaching a volume from an instance.
   *
   * This request deletes a volume attachment. The deletion of a volume attachment detaches a volume from an instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The instance identifier.
   * @param {string} params.id - The volume attachment identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteInstanceVolumeAttachment(params: VpcV1.DeleteInstanceVolumeAttachmentParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_id': _params.instanceId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteInstanceVolumeAttachment');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/volume_attachments/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified volume attachment.
   *
   * This request retrieves a single volume attachment specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The instance identifier.
   * @param {string} params.id - The volume attachment identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VolumeAttachment>>}
   */
  public getInstanceVolumeAttachment(params: VpcV1.GetInstanceVolumeAttachmentParams): Promise<VpcV1.Response<VpcV1.VolumeAttachment>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_id': _params.instanceId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstanceVolumeAttachment');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/volume_attachments/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update a volume attachment.
   *
   * This request updates a volume attachment with the information in a provided volume attachment patch. The volume
   * attachment patch object is structured in the same way as a retrieved volume attachment and can contain an updated
   * name.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The instance identifier.
   * @param {string} params.id - The volume attachment identifier.
   * @param {boolean} [params.deleteVolumeOnInstanceDelete] - If set to true, when deleting the instance the volume will
   * also be deleted.
   * @param {string} [params.name] - The user-defined name for this volume attachment.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VolumeAttachment>>}
   */
  public updateInstanceVolumeAttachment(params: VpcV1.UpdateInstanceVolumeAttachmentParams): Promise<VpcV1.Response<VpcV1.VolumeAttachment>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'delete_volume_on_instance_delete': _params.deleteVolumeOnInstanceDelete,
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_id': _params.instanceId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateInstanceVolumeAttachment');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/volume_attachments/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * instanceGroups
   ************************/

  /**
   * List all instance groups.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceGroupCollection>>}
   */
  public listInstanceGroups(params?: VpcV1.ListInstanceGroupsParams): Promise<VpcV1.Response<VpcV1.InstanceGroupCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listInstanceGroups');

    const parameters = {
      options: {
        url: '/instance_groups',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create an instance group.
   *
   * This request creates a new instance group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {InstanceTemplateIdentity} params.instanceTemplate - Instance template to use when creating new instances.
   * @param {SubnetIdentity[]} params.subnets - Array of identities to subnets to use when creating new instances.
   * @param {number} [params.applicationPort] - Required if specifying a load balancer pool only. Used by the instance
   * group when scaling up instances to supply the port for the load balancer pool member.
   * @param {LoadBalancerIdentity} [params.loadBalancer] - The load balancer that the load balancer pool used by this
   * group
   * is in. Must be supplied when using a load balancer pool.
   * @param {LoadBalancerPoolIdentity} [params.loadBalancerPool] - When specified, the load balancer pool will be
   * managed by this
   * group. Instances created by this group will have a new load
   * balancer pool member in that pool created. Must be used with
   * `application_port`.
   * @param {number} [params.membershipCount] - The number of instances in the instance group.
   * @param {string} [params.name] - The user-defined name for this instance group.
   * @param {ResourceGroupIdentity} [params.resourceGroup] - The resource group to use. If unspecified, the account's
   * [default resource
   * group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceGroup>>}
   */
  public createInstanceGroup(params: VpcV1.CreateInstanceGroupParams): Promise<VpcV1.Response<VpcV1.InstanceGroup>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceTemplate', 'subnets'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'instance_template': _params.instanceTemplate,
      'subnets': _params.subnets,
      'application_port': _params.applicationPort,
      'load_balancer': _params.loadBalancer,
      'load_balancer_pool': _params.loadBalancerPool,
      'membership_count': _params.membershipCount,
      'name': _params.name,
      'resource_group': _params.resourceGroup
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createInstanceGroup');

    const parameters = {
      options: {
        url: '/instance_groups',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete specified instance group.
   *
   * This request deletes an instance group. This operation cannot be reversed. Any instances associated with the group
   * will be deleted.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The instance group identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteInstanceGroup(params: VpcV1.DeleteInstanceGroupParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteInstanceGroup');

    const parameters = {
      options: {
        url: '/instance_groups/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified instance group.
   *
   * This request retrieves a single instance group specified by identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The instance group identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceGroup>>}
   */
  public getInstanceGroup(params: VpcV1.GetInstanceGroupParams): Promise<VpcV1.Response<VpcV1.InstanceGroup>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstanceGroup');

    const parameters = {
      options: {
        url: '/instance_groups/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update specified instance group.
   *
   * This request updates an instance group with the information provided instance group patch. The instance group patch
   * object is structured in the same way as a retrieved instance group and contains only the information to be updated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The instance group identifier.
   * @param {number} [params.applicationPort] - Required if specifying a load balancer pool only. Used by the instance
   * group when scaling up instances to supply the port for the load balancer pool member.
   * @param {InstanceTemplateIdentity} [params.instanceTemplate] - Instance template to use when creating new instances.
   * @param {LoadBalancerIdentity} [params.loadBalancer] - The load balancer that the load balancer pool used by this
   * group
   * is in. Must be supplied when using a load balancer pool.
   * @param {LoadBalancerPoolIdentity} [params.loadBalancerPool] - When specified, the load balancer pool will be
   * managed by this
   * group. Instances created by this group will have a new load
   * balancer pool member in that pool created. Must be used with
   * `application_port`.
   * @param {number} [params.membershipCount] - The number of instances in the instance group.
   * @param {string} [params.name] - The user-defined name for this instance group.
   * @param {SubnetIdentity[]} [params.subnets] - Array of identities to subnets to use when creating new instances.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceGroup>>}
   */
  public updateInstanceGroup(params: VpcV1.UpdateInstanceGroupParams): Promise<VpcV1.Response<VpcV1.InstanceGroup>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'application_port': _params.applicationPort,
      'instance_template': _params.instanceTemplate,
      'load_balancer': _params.loadBalancer,
      'load_balancer_pool': _params.loadBalancerPool,
      'membership_count': _params.membershipCount,
      'name': _params.name,
      'subnets': _params.subnets
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateInstanceGroup');

    const parameters = {
      options: {
        url: '/instance_groups/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete specified instance group load balancer.
   *
   * This request unbinds the instance group from the load balancer pool, and deletes the load balancer pool members.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceGroupId - The instance group identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteInstanceGroupLoadBalancer(params: VpcV1.DeleteInstanceGroupLoadBalancerParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceGroupId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_group_id': _params.instanceGroupId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteInstanceGroupLoadBalancer');

    const parameters = {
      options: {
        url: '/instance_groups/{instance_group_id}/load_balancer',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all managers for an instance group.
   *
   * This request retrieves instance group managers.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceGroupId - The instance group identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceGroupManagerCollection>>}
   */
  public listInstanceGroupManagers(params: VpcV1.ListInstanceGroupManagersParams): Promise<VpcV1.Response<VpcV1.InstanceGroupManagerCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceGroupId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_group_id': _params.instanceGroupId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listInstanceGroupManagers');

    const parameters = {
      options: {
        url: '/instance_groups/{instance_group_id}/managers',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create an instance group manager.
   *
   * This request creates a new instance group manager.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceGroupId - The instance group identifier.
   * @param {InstanceGroupManagerPrototype} params.instanceGroupManagerPrototype - The instance group manager prototype
   * object.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceGroupManager>>}
   */
  public createInstanceGroupManager(params: VpcV1.CreateInstanceGroupManagerParams): Promise<VpcV1.Response<VpcV1.InstanceGroupManager>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceGroupId', 'instanceGroupManagerPrototype'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.instanceGroupManagerPrototype;
    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_group_id': _params.instanceGroupId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createInstanceGroupManager');

    const parameters = {
      options: {
        url: '/instance_groups/{instance_group_id}/managers',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete specified instance group manager.
   *
   * This request deletes an instance group manager. This operation cannot be reversed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceGroupId - The instance group identifier.
   * @param {string} params.id - The instance group manager identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteInstanceGroupManager(params: VpcV1.DeleteInstanceGroupManagerParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceGroupId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_group_id': _params.instanceGroupId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteInstanceGroupManager');

    const parameters = {
      options: {
        url: '/instance_groups/{instance_group_id}/managers/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified instance group.
   *
   * This request retrieves a single instance group manager specified by identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceGroupId - The instance group identifier.
   * @param {string} params.id - The instance group manager identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceGroupManager>>}
   */
  public getInstanceGroupManager(params: VpcV1.GetInstanceGroupManagerParams): Promise<VpcV1.Response<VpcV1.InstanceGroupManager>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceGroupId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_group_id': _params.instanceGroupId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstanceGroupManager');

    const parameters = {
      options: {
        url: '/instance_groups/{instance_group_id}/managers/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update specified instance group manager.
   *
   * This request updates an instance group manager with the information provided instance group manager patch.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceGroupId - The instance group identifier.
   * @param {string} params.id - The instance group manager identifier.
   * @param {number} [params.aggregationWindow] - The time window in seconds to aggregate metrics prior to evaluation.
   * @param {number} [params.cooldown] - The duration of time in seconds to pause further scale actions after scaling
   * has taken place.
   * @param {boolean} [params.managementEnabled] - If set to `true`, this manager will control the instance group.
   * @param {number} [params.maxMembershipCount] - The maximum number of members in a managed instance group.
   * @param {number} [params.minMembershipCount] - The minimum number of members in a managed instance group.
   * @param {string} [params.name] - The user-defined name for this instance group manager. Names must be unique within
   * the instance group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceGroupManager>>}
   */
  public updateInstanceGroupManager(params: VpcV1.UpdateInstanceGroupManagerParams): Promise<VpcV1.Response<VpcV1.InstanceGroupManager>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceGroupId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'aggregation_window': _params.aggregationWindow,
      'cooldown': _params.cooldown,
      'management_enabled': _params.managementEnabled,
      'max_membership_count': _params.maxMembershipCount,
      'min_membership_count': _params.minMembershipCount,
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_group_id': _params.instanceGroupId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateInstanceGroupManager');

    const parameters = {
      options: {
        url: '/instance_groups/{instance_group_id}/managers/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all policies for an instance group manager.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceGroupId - The instance group identifier.
   * @param {string} params.instanceGroupManagerId - The instance group manager identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceGroupManagerPolicyCollection>>}
   */
  public listInstanceGroupManagerPolicies(params: VpcV1.ListInstanceGroupManagerPoliciesParams): Promise<VpcV1.Response<VpcV1.InstanceGroupManagerPolicyCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceGroupId', 'instanceGroupManagerId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_group_id': _params.instanceGroupId,
      'instance_group_manager_id': _params.instanceGroupManagerId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listInstanceGroupManagerPolicies');

    const parameters = {
      options: {
        url: '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/policies',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create an instance group manager policy.
   *
   * This request creates a new instance group manager policy.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceGroupId - The instance group identifier.
   * @param {string} params.instanceGroupManagerId - The instance group manager identifier.
   * @param {InstanceGroupManagerPolicyPrototype} params.instanceGroupManagerPolicyPrototype - The instance group
   * manager policy prototype object.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceGroupManagerPolicy>>}
   */
  public createInstanceGroupManagerPolicy(params: VpcV1.CreateInstanceGroupManagerPolicyParams): Promise<VpcV1.Response<VpcV1.InstanceGroupManagerPolicy>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceGroupId', 'instanceGroupManagerId', 'instanceGroupManagerPolicyPrototype'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.instanceGroupManagerPolicyPrototype;
    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_group_id': _params.instanceGroupId,
      'instance_group_manager_id': _params.instanceGroupManagerId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createInstanceGroupManagerPolicy');

    const parameters = {
      options: {
        url: '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/policies',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete specified instance group manager policy.
   *
   * This request deletes an instance group manager policy. This operation cannot be reversed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceGroupId - The instance group identifier.
   * @param {string} params.instanceGroupManagerId - The instance group manager identifier.
   * @param {string} params.id - The instance group manager policy identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteInstanceGroupManagerPolicy(params: VpcV1.DeleteInstanceGroupManagerPolicyParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceGroupId', 'instanceGroupManagerId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_group_id': _params.instanceGroupId,
      'instance_group_manager_id': _params.instanceGroupManagerId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteInstanceGroupManagerPolicy');

    const parameters = {
      options: {
        url: '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/policies/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified instance group manager policy.
   *
   * This request retrieves a single instance group manager policy specified by identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceGroupId - The instance group identifier.
   * @param {string} params.instanceGroupManagerId - The instance group manager identifier.
   * @param {string} params.id - The instance group manager policy identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceGroupManagerPolicy>>}
   */
  public getInstanceGroupManagerPolicy(params: VpcV1.GetInstanceGroupManagerPolicyParams): Promise<VpcV1.Response<VpcV1.InstanceGroupManagerPolicy>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceGroupId', 'instanceGroupManagerId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_group_id': _params.instanceGroupId,
      'instance_group_manager_id': _params.instanceGroupManagerId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstanceGroupManagerPolicy');

    const parameters = {
      options: {
        url: '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/policies/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update specified instance group manager policy.
   *
   * This request updates an instance group manager policy.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceGroupId - The instance group identifier.
   * @param {string} params.instanceGroupManagerId - The instance group manager identifier.
   * @param {string} params.id - The instance group manager policy identifier.
   * @param {string} [params.metricType] - The type of metric to be evaluated.
   * @param {number} [params.metricValue] - The metric value to be evaluated.
   * @param {string} [params.name] - The user-defined name for this instance group manager policy. Names must be unique
   * within the instance group manager.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceGroupManagerPolicy>>}
   */
  public updateInstanceGroupManagerPolicy(params: VpcV1.UpdateInstanceGroupManagerPolicyParams): Promise<VpcV1.Response<VpcV1.InstanceGroupManagerPolicy>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceGroupId', 'instanceGroupManagerId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'metric_type': _params.metricType,
      'metric_value': _params.metricValue,
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_group_id': _params.instanceGroupId,
      'instance_group_manager_id': _params.instanceGroupManagerId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateInstanceGroupManagerPolicy');

    const parameters = {
      options: {
        url: '/instance_groups/{instance_group_id}/managers/{instance_group_manager_id}/policies/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete all memberships from the instance group.
   *
   * This request deletes all memberships of an instance group. This operation cannot be reversed. reversed. Any
   * memberships that have `delete_instance_on_membership_delete` set to `true` will also have their instances deleted.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceGroupId - The instance group identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteInstanceGroupMemberships(params: VpcV1.DeleteInstanceGroupMembershipsParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceGroupId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_group_id': _params.instanceGroupId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteInstanceGroupMemberships');

    const parameters = {
      options: {
        url: '/instance_groups/{instance_group_id}/memberships',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all memberships for the instance group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceGroupId - The instance group identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceGroupMembershipCollection>>}
   */
  public listInstanceGroupMemberships(params: VpcV1.ListInstanceGroupMembershipsParams): Promise<VpcV1.Response<VpcV1.InstanceGroupMembershipCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceGroupId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_group_id': _params.instanceGroupId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listInstanceGroupMemberships');

    const parameters = {
      options: {
        url: '/instance_groups/{instance_group_id}/memberships',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete specified instance group membership.
   *
   * This request deletes a memberships of an instance group. This operation cannot be reversed. reversed. If the
   * membership has `delete_instance_on_membership_delete` set to `true`, the instance will also be deleted.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceGroupId - The instance group identifier.
   * @param {string} params.id - The instance group membership identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteInstanceGroupMembership(params: VpcV1.DeleteInstanceGroupMembershipParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceGroupId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_group_id': _params.instanceGroupId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteInstanceGroupMembership');

    const parameters = {
      options: {
        url: '/instance_groups/{instance_group_id}/memberships/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified instance group membership.
   *
   * This request retrieves a single instance group membership specified by identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceGroupId - The instance group identifier.
   * @param {string} params.id - The instance group membership identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceGroupMembership>>}
   */
  public getInstanceGroupMembership(params: VpcV1.GetInstanceGroupMembershipParams): Promise<VpcV1.Response<VpcV1.InstanceGroupMembership>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceGroupId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_group_id': _params.instanceGroupId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstanceGroupMembership');

    const parameters = {
      options: {
        url: '/instance_groups/{instance_group_id}/memberships/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update specified instance group membership.
   *
   * This request updates an instance group membership with the information provided instance group membership patch.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceGroupId - The instance group identifier.
   * @param {string} params.id - The instance group membership identifier.
   * @param {string} [params.name] - The user-defined name for this instance group membership. Names must be unique
   * within the instance group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.InstanceGroupMembership>>}
   */
  public updateInstanceGroupMembership(params: VpcV1.UpdateInstanceGroupMembershipParams): Promise<VpcV1.Response<VpcV1.InstanceGroupMembership>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['instanceGroupId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'instance_group_id': _params.instanceGroupId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateInstanceGroupMembership');

    const parameters = {
      options: {
        url: '/instance_groups/{instance_group_id}/memberships/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * volumes
   ************************/

  /**
   * List all volume profiles.
   *
   * This request lists all volume profiles available in the region. A volume profile specifies the performance
   * characteristics and pricing model for a volume.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VolumeProfileCollection>>}
   */
  public listVolumeProfiles(params?: VpcV1.ListVolumeProfilesParams): Promise<VpcV1.Response<VpcV1.VolumeProfileCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listVolumeProfiles');

    const parameters = {
      options: {
        url: '/volume/profiles',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified volume profile.
   *
   * This request retrieves a single volume profile specified by the name in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The volume profile name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VolumeProfile>>}
   */
  public getVolumeProfile(params: VpcV1.GetVolumeProfileParams): Promise<VpcV1.Response<VpcV1.VolumeProfile>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['name'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'name': _params.name
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getVolumeProfile');

    const parameters = {
      options: {
        url: '/volume/profiles/{name}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all volumes.
   *
   * This request lists all volumes in the region. Volumes are network-connected block storage devices that may be
   * attached to one or more instances in the same region.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {string} [params.name] - Filters the collection to resources with the exact specified name.
   * @param {string} [params.zoneName] - Filters the collection to resources in the zone with the exact specified name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VolumeCollection>>}
   */
  public listVolumes(params?: VpcV1.ListVolumesParams): Promise<VpcV1.Response<VpcV1.VolumeCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit,
      'name': _params.name,
      'zone.name': _params.zoneName
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listVolumes');

    const parameters = {
      options: {
        url: '/volumes',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a volume.
   *
   * This request creates a new volume from a volume prototype object. The prototype object is structured in the same
   * way as a retrieved volume, and contains the information necessary to create the new volume.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {VolumePrototype} params.volumePrototype - The volume prototype object.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Volume>>}
   */
  public createVolume(params: VpcV1.CreateVolumeParams): Promise<VpcV1.Response<VpcV1.Volume>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['volumePrototype'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.volumePrototype;
    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createVolume');

    const parameters = {
      options: {
        url: '/volumes',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete specified volume.
   *
   * This request deletes a volume. This operation cannot be reversed. For this request to succeed, the volume must not
   * be attached to any instances.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The volume identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteVolume(params: VpcV1.DeleteVolumeParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteVolume');

    const parameters = {
      options: {
        url: '/volumes/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified volume.
   *
   * This request retrieves a single volume specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The volume identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Volume>>}
   */
  public getVolume(params: VpcV1.GetVolumeParams): Promise<VpcV1.Response<VpcV1.Volume>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getVolume');

    const parameters = {
      options: {
        url: '/volumes/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update specified volume.
   *
   * This request updates a volume with the information in a provided volume patch. The volume patch object is
   * structured in the same way as a retrieved volume and contains only the information to be updated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The volume identifier.
   * @param {string} [params.name] - The unique user-defined name for this volume.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Volume>>}
   */
  public updateVolume(params: VpcV1.UpdateVolumeParams): Promise<VpcV1.Response<VpcV1.Volume>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateVolume');

    const parameters = {
      options: {
        url: '/volumes/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * geography
   ************************/

  /**
   * List all regions.
   *
   * This request lists all regions. Each region is a separate geographic area that contains multiple isolated zones.
   * Resources can be provisioned into a one or more zones in a region. Each zone is isolated, but connected to other
   * zones in the same region with low-latency and high-bandwidth links. Regions represent the top-level of fault
   * isolation available. Resources deployed within a single region also benefit from the low latency afforded by
   * geographic proximity.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.RegionCollection>>}
   */
  public listRegions(params?: VpcV1.ListRegionsParams): Promise<VpcV1.Response<VpcV1.RegionCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listRegions');

    const parameters = {
      options: {
        url: '/regions',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve a region.
   *
   * This request retrieves a single region specified by the name in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The region name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Region>>}
   */
  public getRegion(params: VpcV1.GetRegionParams): Promise<VpcV1.Response<VpcV1.Region>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['name'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'name': _params.name
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getRegion');

    const parameters = {
      options: {
        url: '/regions/{name}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all zones in a region.
   *
   * This request lists all zones in a region. Zones represent logically-isolated data centers with high-bandwidth and
   * low-latency interconnects to other zones in the same region. Faults in a zone do not affect other zones.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.regionName - The region name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.ZoneCollection>>}
   */
  public listRegionZones(params: VpcV1.ListRegionZonesParams): Promise<VpcV1.Response<VpcV1.ZoneCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['regionName'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'region_name': _params.regionName
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listRegionZones');

    const parameters = {
      options: {
        url: '/regions/{region_name}/zones',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve a zone.
   *
   * This request retrieves a single zone specified by the region and zone names in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.regionName - The region name.
   * @param {string} params.name - The zone name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Zone>>}
   */
  public getRegionZone(params: VpcV1.GetRegionZoneParams): Promise<VpcV1.Response<VpcV1.Zone>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['regionName', 'name'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'region_name': _params.regionName,
      'name': _params.name
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getRegionZone');

    const parameters = {
      options: {
        url: '/regions/{region_name}/zones/{name}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * publicGateways
   ************************/

  /**
   * List all public gateways.
   *
   * This request lists all public gateways. A public gateway is a virtual network device associated with a VPC, which
   * allows access to the Internet. A public gateway resides in a zone and can be connected to subnets in the same zone
   * only.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {string} [params.resourceGroupId] - Filters the collection to resources within one of the resource groups
   * identified in a comma-separated list of resource group identifiers.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.PublicGatewayCollection>>}
   */
  public listPublicGateways(params?: VpcV1.ListPublicGatewaysParams): Promise<VpcV1.Response<VpcV1.PublicGatewayCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit,
      'resource_group.id': _params.resourceGroupId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listPublicGateways');

    const parameters = {
      options: {
        url: '/public_gateways',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a public gateway.
   *
   * This request creates a new public gateway from a public gateway prototype object. For this to succeed, the VPC must
   * not already have a public gateway in the specified zone.
   *
   * If a floating IP is provided, it must be unbound. If a floating IP is not provided, one will be created and bound
   * to the public gateway. Once a public gateway has been created, its floating IP cannot be unbound. A public gateway
   * must be explicitly attached to each subnet it will provide connectivity for.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {VPCIdentity} params.vpc - The VPC this public gateway will serve.
   * @param {ZoneIdentity} params.zone - The zone where this public gateway will be created.
   * @param {PublicGatewayFloatingIPPrototype} [params.floatingIp] -
   * @param {string} [params.name] - The user-defined name for this public gateway. Names must be unique within the VPC
   * the public gateway resides in. If unspecified, the name will be a hyphenated list of randomly-selected words.
   * @param {ResourceGroupIdentity} [params.resourceGroup] - The resource group to use. If unspecified, the account's
   * [default resource
   * group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.PublicGateway>>}
   */
  public createPublicGateway(params: VpcV1.CreatePublicGatewayParams): Promise<VpcV1.Response<VpcV1.PublicGateway>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpc', 'zone'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'vpc': _params.vpc,
      'zone': _params.zone,
      'floating_ip': _params.floatingIp,
      'name': _params.name,
      'resource_group': _params.resourceGroup
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createPublicGateway');

    const parameters = {
      options: {
        url: '/public_gateways',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete specified public gateway.
   *
   * This request deletes a public gateway. This operation cannot be reversed. For this request to succeed, the public
   * gateway must not be attached to any subnets. The public gateway's floating IP will be automatically unbound. If the
   * floating IP was created when the public gateway was created, it will be deleted.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The public gateway identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deletePublicGateway(params: VpcV1.DeletePublicGatewayParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deletePublicGateway');

    const parameters = {
      options: {
        url: '/public_gateways/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified public gateway.
   *
   * This request retrieves a single public gateway specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The public gateway identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.PublicGateway>>}
   */
  public getPublicGateway(params: VpcV1.GetPublicGatewayParams): Promise<VpcV1.Response<VpcV1.PublicGateway>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getPublicGateway');

    const parameters = {
      options: {
        url: '/public_gateways/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update a public gateway's name.
   *
   * This request updates a public gateway's name.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The public gateway identifier.
   * @param {string} [params.name] - The user-defined name for this public gateway. Names must be unique within the VPC
   * the public gateway resides in.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.PublicGateway>>}
   */
  public updatePublicGateway(params: VpcV1.UpdatePublicGatewayParams): Promise<VpcV1.Response<VpcV1.PublicGateway>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updatePublicGateway');

    const parameters = {
      options: {
        url: '/public_gateways/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * floatingIPs
   ************************/

  /**
   * List all floating IPs.
   *
   * This request retrieves all floating IPs in the region. Floating IPs allow inbound and outbound traffic from the
   * Internet to an instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {string} [params.resourceGroupId] - Filters the collection to resources within one of the resource groups
   * identified in a comma-separated list of resource group identifiers.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.FloatingIPCollection>>}
   */
  public listFloatingIps(params?: VpcV1.ListFloatingIpsParams): Promise<VpcV1.Response<VpcV1.FloatingIPCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit,
      'resource_group.id': _params.resourceGroupId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listFloatingIps');

    const parameters = {
      options: {
        url: '/floating_ips',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Reserve a floating IP.
   *
   * This request reserves a new floating IP.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {FloatingIPPrototype} params.floatingIpPrototype - The floating IP prototype object.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.FloatingIP>>}
   */
  public createFloatingIp(params: VpcV1.CreateFloatingIpParams): Promise<VpcV1.Response<VpcV1.FloatingIP>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['floatingIpPrototype'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.floatingIpPrototype;
    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createFloatingIp');

    const parameters = {
      options: {
        url: '/floating_ips',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Release the specified floating IP.
   *
   * This request disassociates (if associated) and releases a floating IP. This operation cannot be reversed. For this
   * request to succeed, the floating IP must not be required by another resource, such as a public gateway.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The floating IP identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteFloatingIp(params: VpcV1.DeleteFloatingIpParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteFloatingIp');

    const parameters = {
      options: {
        url: '/floating_ips/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve the specified floating IP.
   *
   * This request retrieves a single floating IP specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The floating IP identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.FloatingIP>>}
   */
  public getFloatingIp(params: VpcV1.GetFloatingIpParams): Promise<VpcV1.Response<VpcV1.FloatingIP>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getFloatingIp');

    const parameters = {
      options: {
        url: '/floating_ips/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update the specified floating IP.
   *
   * This request updates a floating IP's name and/or target.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The floating IP identifier.
   * @param {string} [params.name] - The unique user-defined name for this floating IP.
   * @param {FloatingIPPatchTargetNetworkInterfaceIdentity} [params.target] - A new network interface to bind this
   * floating IP to, replacing any existing binding.
   * For this request to succeed, the existing floating IP must not be required by another
   * resource, such as a public gateway.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.FloatingIP>>}
   */
  public updateFloatingIp(params: VpcV1.UpdateFloatingIpParams): Promise<VpcV1.Response<VpcV1.FloatingIP>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name,
      'target': _params.target
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateFloatingIp');

    const parameters = {
      options: {
        url: '/floating_ips/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * networkACLs
   ************************/

  /**
   * List all network ACLs.
   *
   * This request lists all network ACLs in the region. A network ACL defines a set of packet filtering (5-tuple) rules
   * for all traffic in and out of a subnet. Both allow and deny rules can be defined, and rules are stateless such that
   * reverse traffic in response to allowed traffic is not automatically permitted.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {string} [params.resourceGroupId] - Filters the collection to resources within one of the resource groups
   * identified in a comma-separated list of resource group identifiers.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.NetworkACLCollection>>}
   */
  public listNetworkAcls(params?: VpcV1.ListNetworkAclsParams): Promise<VpcV1.Response<VpcV1.NetworkACLCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit,
      'resource_group.id': _params.resourceGroupId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listNetworkAcls');

    const parameters = {
      options: {
        url: '/network_acls',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a network ACL.
   *
   * This request creates a new network ACL from a network ACL prototype object. The prototype object is structured in
   * the same way as a retrieved network ACL, and contains the information necessary to create the new network ACL.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {NetworkACLPrototype} [params.networkAclPrototype] - The network ACL prototype object.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.NetworkACL>>}
   */
  public createNetworkAcl(params?: VpcV1.CreateNetworkAclParams): Promise<VpcV1.Response<VpcV1.NetworkACL>> {
    const _params = Object.assign({}, params);

    const body = _params.networkAclPrototype;
    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createNetworkAcl');

    const parameters = {
      options: {
        url: '/network_acls',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete specified network ACL.
   *
   * This request deletes a network ACL. This operation cannot be reversed. For this request to succeed, the network ACL
   * must not be the default network ACL for any VPCs, and the network ACL must not be attached to any subnets.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The network ACL identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteNetworkAcl(params: VpcV1.DeleteNetworkAclParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteNetworkAcl');

    const parameters = {
      options: {
        url: '/network_acls/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified network ACL.
   *
   * This request retrieves a single network ACL specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The network ACL identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.NetworkACL>>}
   */
  public getNetworkAcl(params: VpcV1.GetNetworkAclParams): Promise<VpcV1.Response<VpcV1.NetworkACL>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getNetworkAcl');

    const parameters = {
      options: {
        url: '/network_acls/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update a network ACL.
   *
   * This request updates a network ACL's name.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The network ACL identifier.
   * @param {string} [params.name] - The user-defined name for this network ACL. Names must be unique within the VPC the
   * network ACL resides in.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.NetworkACL>>}
   */
  public updateNetworkAcl(params: VpcV1.UpdateNetworkAclParams): Promise<VpcV1.Response<VpcV1.NetworkACL>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateNetworkAcl');

    const parameters = {
      options: {
        url: '/network_acls/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all rules for a network ACL.
   *
   * This request lists all rules for a network ACL. These rules can allow or deny traffic between a source CIDR block
   * and a destination CIDR block over a particular protocol and port range.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.networkAclId - The network ACL identifier.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {string} [params.direction] - Filters the collection to rules with the specified direction.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.NetworkACLRuleCollection>>}
   */
  public listNetworkAclRules(params: VpcV1.ListNetworkAclRulesParams): Promise<VpcV1.Response<VpcV1.NetworkACLRuleCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['networkAclId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit,
      'direction': _params.direction
    };

    const path = {
      'network_acl_id': _params.networkAclId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listNetworkAclRules');

    const parameters = {
      options: {
        url: '/network_acls/{network_acl_id}/rules',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a rule.
   *
   * This request creates a new rule from a network ACL rule prototype object. The prototype object is structured in the
   * same way as a retrieved rule, and contains the information necessary to create the new rule.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.networkAclId - The network ACL identifier.
   * @param {NetworkACLRulePrototype} params.networkAclRulePrototype - The network ACL rule prototype object.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.NetworkACLRule>>}
   */
  public createNetworkAclRule(params: VpcV1.CreateNetworkAclRuleParams): Promise<VpcV1.Response<VpcV1.NetworkACLRule>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['networkAclId', 'networkAclRulePrototype'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.networkAclRulePrototype;
    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'network_acl_id': _params.networkAclId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createNetworkAclRule');

    const parameters = {
      options: {
        url: '/network_acls/{network_acl_id}/rules',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete specified rule.
   *
   * This request deletes a rule. This operation cannot be reversed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.networkAclId - The network ACL identifier.
   * @param {string} params.id - The rule identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteNetworkAclRule(params: VpcV1.DeleteNetworkAclRuleParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['networkAclId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'network_acl_id': _params.networkAclId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteNetworkAclRule');

    const parameters = {
      options: {
        url: '/network_acls/{network_acl_id}/rules/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified rule.
   *
   * This request retrieves a single rule specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.networkAclId - The network ACL identifier.
   * @param {string} params.id - The rule identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.NetworkACLRule>>}
   */
  public getNetworkAclRule(params: VpcV1.GetNetworkAclRuleParams): Promise<VpcV1.Response<VpcV1.NetworkACLRule>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['networkAclId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'network_acl_id': _params.networkAclId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getNetworkAclRule');

    const parameters = {
      options: {
        url: '/network_acls/{network_acl_id}/rules/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update a rule.
   *
   * This request updates a rule with the information in a provided rule patch. The rule patch object contains only the
   * information to be updated. The request will fail if the information is not applicable to the rule's protocol.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.networkAclId - The network ACL identifier.
   * @param {string} params.id - The rule identifier.
   * @param {string} [params.action] - Whether to allow or deny matching traffic.
   * @param {NetworkACLRuleBeforePatch} [params.before] - The rule to move this rule immediately before. Specify `null`
   * to move this rule after
   * all existing rules.
   * @param {number} [params.code] - The ICMP traffic code to allow.
   * @param {string} [params.destination] - The destination IP address or CIDR block. The CIDR block `0.0.0.0/0` applies
   * to all addresses.
   * @param {number} [params.destinationPortMax] - The inclusive upper bound of TCP/UDP destination port range.
   * @param {number} [params.destinationPortMin] - The inclusive lower bound of TCP/UDP destination port range.
   * @param {string} [params.direction] - Whether the traffic to be matched is `inbound` or `outbound`.
   * @param {string} [params.name] - The user-defined name for this rule. Names must be unique within the network ACL
   * the rule resides in.
   * @param {string} [params.source] - The source IP address or CIDR block.  The CIDR block `0.0.0.0/0` applies to all
   * addresses.
   * @param {number} [params.sourcePortMax] - The inclusive upper bound of TCP/UDP source port range.
   * @param {number} [params.sourcePortMin] - The inclusive lower bound of TCP/UDP source port range.
   * @param {number} [params.type] - The ICMP traffic type to allow.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.NetworkACLRule>>}
   */
  public updateNetworkAclRule(params: VpcV1.UpdateNetworkAclRuleParams): Promise<VpcV1.Response<VpcV1.NetworkACLRule>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['networkAclId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'action': _params.action,
      'before': _params.before,
      'code': _params.code,
      'destination': _params.destination,
      'destination_port_max': _params.destinationPortMax,
      'destination_port_min': _params.destinationPortMin,
      'direction': _params.direction,
      'name': _params.name,
      'source': _params.source,
      'source_port_max': _params.sourcePortMax,
      'source_port_min': _params.sourcePortMin,
      'type': _params.type
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'network_acl_id': _params.networkAclId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateNetworkAclRule');

    const parameters = {
      options: {
        url: '/network_acls/{network_acl_id}/rules/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * securityGroups
   ************************/

  /**
   * List all security groups.
   *
   * This request lists all existing security groups. Security groups provide a convenient way to apply IP filtering
   * rules to instances in the associated VPC. With security groups, all traffic is denied by default, and rules added
   * to security groups define which traffic the security group permits. Security group rules are stateful such that
   * reverse traffic in response to allowed traffic is automatically permitted.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {string} [params.resourceGroupId] - Filters the collection to resources within one of the resource groups
   * identified in a comma-separated list of resource group identifiers.
   * @param {string} [params.vpcId] - Filters the collection to resources in the VPC with the specified identifier.
   * @param {string} [params.vpcCrn] - Filters the collection to resources in the VPC with the specified CRN.
   * @param {string} [params.vpcName] - Filters the collection to resources in the VPC with the exact specified name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.SecurityGroupCollection>>}
   */
  public listSecurityGroups(params?: VpcV1.ListSecurityGroupsParams): Promise<VpcV1.Response<VpcV1.SecurityGroupCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit,
      'resource_group.id': _params.resourceGroupId,
      'vpc.id': _params.vpcId,
      'vpc.crn': _params.vpcCrn,
      'vpc.name': _params.vpcName
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listSecurityGroups');

    const parameters = {
      options: {
        url: '/security_groups',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a security group.
   *
   * This request creates a new security group from a security group prototype object. The prototype object is
   * structured in the same way as a retrieved security group, and contains the information necessary to create the new
   * security group. If security group rules are included in the prototype object, those rules will be added to the
   * security group. Each security group is scoped to one VPC. Only network interfaces on instances in that VPC can be
   * added to the security group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {VPCIdentity} params.vpc - The VPC this security group is to be a part of.
   * @param {string} [params.name] - The user-defined name for this security group. If unspecified, the name will be a
   * hyphenated list of randomly-selected words. Names must be unique within the VPC the security group resides in.
   * @param {ResourceGroupIdentity} [params.resourceGroup] - The resource group to use. If unspecified, the account's
   * [default resource
   * group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
   * @param {SecurityGroupRulePrototype[]} [params.rules] - Array of rule prototype objects for rules to be created for
   * this security group. If unspecified, no rules will be created, resulting in all traffic being denied.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.SecurityGroup>>}
   */
  public createSecurityGroup(params: VpcV1.CreateSecurityGroupParams): Promise<VpcV1.Response<VpcV1.SecurityGroup>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpc'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'vpc': _params.vpc,
      'name': _params.name,
      'resource_group': _params.resourceGroup,
      'rules': _params.rules
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createSecurityGroup');

    const parameters = {
      options: {
        url: '/security_groups',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete a security group.
   *
   * This request deletes a security group. A security group cannot be deleted if it is referenced by any network
   * interfaces or other security group rules. Additionally, a VPC's default security group cannot be deleted. This
   * operation cannot be reversed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The security group identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteSecurityGroup(params: VpcV1.DeleteSecurityGroupParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteSecurityGroup');

    const parameters = {
      options: {
        url: '/security_groups/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve a security group.
   *
   * This request retrieves a single security group specified by the identifier in the URL path.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The security group identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.SecurityGroup>>}
   */
  public getSecurityGroup(params: VpcV1.GetSecurityGroupParams): Promise<VpcV1.Response<VpcV1.SecurityGroup>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getSecurityGroup');

    const parameters = {
      options: {
        url: '/security_groups/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update a security group.
   *
   * This request updates a security group with the information provided in a security group patch object. The security
   * group patch object is structured in the same way as a retrieved security group and contains only the information to
   * be updated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The security group identifier.
   * @param {string} [params.name] - The user-defined name for this security group. Names must be unique within the VPC
   * the security group resides in.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.SecurityGroup>>}
   */
  public updateSecurityGroup(params: VpcV1.UpdateSecurityGroupParams): Promise<VpcV1.Response<VpcV1.SecurityGroup>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateSecurityGroup');

    const parameters = {
      options: {
        url: '/security_groups/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List a security group's network interfaces.
   *
   * This request lists all network interfaces associated with the security group, to which the rules in the security
   * group are applied.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.securityGroupId - The security group identifier.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.NetworkInterfaceCollection>>}
   */
  public listSecurityGroupNetworkInterfaces(params: VpcV1.ListSecurityGroupNetworkInterfacesParams): Promise<VpcV1.Response<VpcV1.NetworkInterfaceCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['securityGroupId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit
    };

    const path = {
      'security_group_id': _params.securityGroupId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listSecurityGroupNetworkInterfaces');

    const parameters = {
      options: {
        url: '/security_groups/{security_group_id}/network_interfaces',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Remove a network interface from a security group.
   *
   * This request removes a network interface from a security group. Security groups are stateful, so any changes to a
   * network interface's security groups are applied to new connections. Existing connections are not affected. If the
   * network interface being removed has no other security groups, it will be attached to the VPC's default security
   * group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.securityGroupId - The security group identifier.
   * @param {string} params.id - The network interface identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public removeSecurityGroupNetworkInterface(params: VpcV1.RemoveSecurityGroupNetworkInterfaceParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['securityGroupId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'security_group_id': _params.securityGroupId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'removeSecurityGroupNetworkInterface');

    const parameters = {
      options: {
        url: '/security_groups/{security_group_id}/network_interfaces/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve a network interface in a security group.
   *
   * This request retrieves a single network interface specified by the identifier in the URL path. The network
   * interface must be an existing member of the security group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.securityGroupId - The security group identifier.
   * @param {string} params.id - The network interface identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.NetworkInterface>>}
   */
  public getSecurityGroupNetworkInterface(params: VpcV1.GetSecurityGroupNetworkInterfaceParams): Promise<VpcV1.Response<VpcV1.NetworkInterface>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['securityGroupId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'security_group_id': _params.securityGroupId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getSecurityGroupNetworkInterface');

    const parameters = {
      options: {
        url: '/security_groups/{security_group_id}/network_interfaces/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Add a network interface to a security group.
   *
   * This request adds an existing network interface to an existing security group. When a network interface is added to
   * a security group, the security group rules are applied to the network interface. A request body is not required,
   * and if supplied, is ignored.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.securityGroupId - The security group identifier.
   * @param {string} params.id - The network interface identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.NetworkInterface>>}
   */
  public addSecurityGroupNetworkInterface(params: VpcV1.AddSecurityGroupNetworkInterfaceParams): Promise<VpcV1.Response<VpcV1.NetworkInterface>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['securityGroupId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'security_group_id': _params.securityGroupId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'addSecurityGroupNetworkInterface');

    const parameters = {
      options: {
        url: '/security_groups/{security_group_id}/network_interfaces/{id}',
        method: 'PUT',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all the rules of a security group.
   *
   * This request lists all the security group rules for a particular security group. These rules define what traffic
   * the security group permits. Security group rules are stateful, such that reverse traffic in response to allowed
   * traffic is automatically permitted.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.securityGroupId - The security group identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.SecurityGroupRuleCollection>>}
   */
  public listSecurityGroupRules(params: VpcV1.ListSecurityGroupRulesParams): Promise<VpcV1.Response<VpcV1.SecurityGroupRuleCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['securityGroupId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'security_group_id': _params.securityGroupId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listSecurityGroupRules');

    const parameters = {
      options: {
        url: '/security_groups/{security_group_id}/rules',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a security group rule.
   *
   * This request creates a new security group rule from a security group rule prototype object. The prototype object is
   * structured in the same way as a retrieved security group rule and contains the information necessary to create the
   * rule. As part of creating a new rule in a security group, the rule is applied to all the networking interfaces in
   * the security group. Rules specify which IP traffic a security group should allow. Security group rules are
   * stateful, such that reverse traffic in response to allowed traffic is automatically permitted. A rule allowing
   * inbound TCP traffic on port 80 also allows outbound TCP traffic on port 80 without the need for an additional rule.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.securityGroupId - The security group identifier.
   * @param {SecurityGroupRulePrototype} params.securityGroupRulePrototype - The properties of the security group rule
   * to be created.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.SecurityGroupRule>>}
   */
  public createSecurityGroupRule(params: VpcV1.CreateSecurityGroupRuleParams): Promise<VpcV1.Response<VpcV1.SecurityGroupRule>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['securityGroupId', 'securityGroupRulePrototype'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.securityGroupRulePrototype;
    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'security_group_id': _params.securityGroupId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createSecurityGroupRule');

    const parameters = {
      options: {
        url: '/security_groups/{security_group_id}/rules',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete a security group rule.
   *
   * This request deletes a security group rule. This operation cannot be reversed. Removing a security group rule will
   * not end existing connections allowed by that rule.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.securityGroupId - The security group identifier.
   * @param {string} params.id - The rule identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteSecurityGroupRule(params: VpcV1.DeleteSecurityGroupRuleParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['securityGroupId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'security_group_id': _params.securityGroupId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteSecurityGroupRule');

    const parameters = {
      options: {
        url: '/security_groups/{security_group_id}/rules/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve a security group rule.
   *
   * This request retrieves a single security group rule specified by the identifier in the URL path.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.securityGroupId - The security group identifier.
   * @param {string} params.id - The rule identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.SecurityGroupRule>>}
   */
  public getSecurityGroupRule(params: VpcV1.GetSecurityGroupRuleParams): Promise<VpcV1.Response<VpcV1.SecurityGroupRule>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['securityGroupId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'security_group_id': _params.securityGroupId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getSecurityGroupRule');

    const parameters = {
      options: {
        url: '/security_groups/{security_group_id}/rules/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update a security group rule.
   *
   * This request updates a security group rule with the information in a provided rule patch object. The rule patch
   * object contains only the information to be updated. The request will fail if the information is not applicable to
   * the rule's protocol.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.securityGroupId - The security group identifier.
   * @param {string} params.id - The rule identifier.
   * @param {number} [params.code] - The ICMP traffic code to allow.
   * @param {string} [params.direction] - The direction of traffic to enforce, either `inbound` or `outbound`.
   * @param {string} [params.ipVersion] - The IP version to enforce. The format of `remote.address` or
   * `remote.cidr_block` must match this field, if they are used. Alternatively, if `remote` references a security
   * group, then this rule only applies to IP addresses (network interfaces) in that group matching this IP version.
   * @param {number} [params.portMax] - The inclusive upper bound of TCP/UDP port range.
   * @param {number} [params.portMin] - The inclusive lower bound of TCP/UDP port range.
   * @param {SecurityGroupRuleRemotePatch} [params.remote] - The IP addresses or security groups from which this rule
   * will allow traffic (or to
   * which, for outbound rules). Can be specified as an IP address, a CIDR block, or a
   * security group. A CIDR block of `0.0.0.0/0` will allow traffic from any source (or to
   * any source, for outbound rules).
   * @param {number} [params.type] - The ICMP traffic type to allow.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.SecurityGroupRule>>}
   */
  public updateSecurityGroupRule(params: VpcV1.UpdateSecurityGroupRuleParams): Promise<VpcV1.Response<VpcV1.SecurityGroupRule>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['securityGroupId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'code': _params.code,
      'direction': _params.direction,
      'ip_version': _params.ipVersion,
      'port_max': _params.portMax,
      'port_min': _params.portMin,
      'remote': _params.remote,
      'type': _params.type
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'security_group_id': _params.securityGroupId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateSecurityGroupRule');

    const parameters = {
      options: {
        url: '/security_groups/{security_group_id}/rules/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * vPNGateways
   ************************/

  /**
   * List all IKE policies.
   *
   * This request retrieves a paginated list of all IKE policies that belong to this account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.IKEPolicyCollection>>}
   */
  public listIkePolicies(params?: VpcV1.ListIkePoliciesParams): Promise<VpcV1.Response<VpcV1.IKEPolicyCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listIkePolicies');

    const parameters = {
      options: {
        url: '/ike_policies',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create an IKE policy.
   *
   * This request creates a new IKE policy.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.authenticationAlgorithm - The authentication algorithm.
   * @param {number} params.dhGroup - The Diffie-Hellman group.
   * @param {string} params.encryptionAlgorithm - The encryption algorithm.
   * @param {number} params.ikeVersion - The IKE protocol version.
   * @param {number} [params.keyLifetime] - The key lifetime in seconds.
   * @param {string} [params.name] - The user-defined name for this IKE policy.
   * @param {ResourceGroupIdentity} [params.resourceGroup] - The resource group to use. If unspecified, the account's
   * [default resource
   * group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.IKEPolicy>>}
   */
  public createIkePolicy(params: VpcV1.CreateIkePolicyParams): Promise<VpcV1.Response<VpcV1.IKEPolicy>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['authenticationAlgorithm', 'dhGroup', 'encryptionAlgorithm', 'ikeVersion'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'authentication_algorithm': _params.authenticationAlgorithm,
      'dh_group': _params.dhGroup,
      'encryption_algorithm': _params.encryptionAlgorithm,
      'ike_version': _params.ikeVersion,
      'key_lifetime': _params.keyLifetime,
      'name': _params.name,
      'resource_group': _params.resourceGroup
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createIkePolicy');

    const parameters = {
      options: {
        url: '/ike_policies',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete an IKE policy.
   *
   * This request deletes an IKE policy. This operation cannot be reversed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The IKE policy identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteIkePolicy(params: VpcV1.DeleteIkePolicyParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteIkePolicy');

    const parameters = {
      options: {
        url: '/ike_policies/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve the specified IKE policy.
   *
   * This request retrieves a single IKE policy specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The IKE policy identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.IKEPolicy>>}
   */
  public getIkePolicy(params: VpcV1.GetIkePolicyParams): Promise<VpcV1.Response<VpcV1.IKEPolicy>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getIkePolicy');

    const parameters = {
      options: {
        url: '/ike_policies/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update an IKE policy.
   *
   * This request updates the properties of an existing IKE policy.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The IKE policy identifier.
   * @param {string} [params.authenticationAlgorithm] - The authentication algorithm.
   * @param {number} [params.dhGroup] - The Diffie-Hellman group.
   * @param {string} [params.encryptionAlgorithm] - The encryption algorithm.
   * @param {number} [params.ikeVersion] - The IKE protocol version.
   * @param {number} [params.keyLifetime] - The key lifetime in seconds.
   * @param {string} [params.name] - The user-defined name for this IKE policy.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.IKEPolicy>>}
   */
  public updateIkePolicy(params: VpcV1.UpdateIkePolicyParams): Promise<VpcV1.Response<VpcV1.IKEPolicy>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'authentication_algorithm': _params.authenticationAlgorithm,
      'dh_group': _params.dhGroup,
      'encryption_algorithm': _params.encryptionAlgorithm,
      'ike_version': _params.ikeVersion,
      'key_lifetime': _params.keyLifetime,
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateIkePolicy');

    const parameters = {
      options: {
        url: '/ike_policies/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all connections that use the specified IKE policy.
   *
   * This request lists all the connections that use the specified policy.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The IKE policy identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VPNGatewayConnectionCollection>>}
   */
  public listIkePolicyConnections(params: VpcV1.ListIkePolicyConnectionsParams): Promise<VpcV1.Response<VpcV1.VPNGatewayConnectionCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listIkePolicyConnections');

    const parameters = {
      options: {
        url: '/ike_policies/{id}/connections',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all IPsec policies.
   *
   * This request retrieves a paginated list of all IPsec policies that belong to this account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.IPsecPolicyCollection>>}
   */
  public listIpsecPolicies(params?: VpcV1.ListIpsecPoliciesParams): Promise<VpcV1.Response<VpcV1.IPsecPolicyCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listIpsecPolicies');

    const parameters = {
      options: {
        url: '/ipsec_policies',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create an IPsec policy.
   *
   * This request creates a new IPsec policy.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.authenticationAlgorithm - The authentication algorithm.
   * @param {string} params.encryptionAlgorithm - The encryption algorithm.
   * @param {string} params.pfs - Perfect Forward Secrecy.
   * @param {number} [params.keyLifetime] - The key lifetime in seconds.
   * @param {string} [params.name] - The user-defined name for this IPsec policy.
   * @param {ResourceGroupIdentity} [params.resourceGroup] - The resource group to use. If unspecified, the account's
   * [default resource
   * group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.IPsecPolicy>>}
   */
  public createIpsecPolicy(params: VpcV1.CreateIpsecPolicyParams): Promise<VpcV1.Response<VpcV1.IPsecPolicy>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['authenticationAlgorithm', 'encryptionAlgorithm', 'pfs'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'authentication_algorithm': _params.authenticationAlgorithm,
      'encryption_algorithm': _params.encryptionAlgorithm,
      'pfs': _params.pfs,
      'key_lifetime': _params.keyLifetime,
      'name': _params.name,
      'resource_group': _params.resourceGroup
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createIpsecPolicy');

    const parameters = {
      options: {
        url: '/ipsec_policies',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete an IPsec policy.
   *
   * This request deletes an IPsec policy. This operation cannot be reversed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The IPsec policy identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteIpsecPolicy(params: VpcV1.DeleteIpsecPolicyParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteIpsecPolicy');

    const parameters = {
      options: {
        url: '/ipsec_policies/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve the specified IPsec policy.
   *
   * This request retrieves a single IPsec policy specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The IPsec policy identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.IPsecPolicy>>}
   */
  public getIpsecPolicy(params: VpcV1.GetIpsecPolicyParams): Promise<VpcV1.Response<VpcV1.IPsecPolicy>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getIpsecPolicy');

    const parameters = {
      options: {
        url: '/ipsec_policies/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update an IPsec policy.
   *
   * This request updates the properties of an existing IPsec policy.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The IPsec policy identifier.
   * @param {string} [params.authenticationAlgorithm] - The authentication algorithm.
   * @param {string} [params.encryptionAlgorithm] - The encryption algorithm.
   * @param {number} [params.keyLifetime] - The key lifetime in seconds.
   * @param {string} [params.name] - The user-defined name for this IPsec policy.
   * @param {string} [params.pfs] - Perfect Forward Secrecy.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.IPsecPolicy>>}
   */
  public updateIpsecPolicy(params: VpcV1.UpdateIpsecPolicyParams): Promise<VpcV1.Response<VpcV1.IPsecPolicy>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'authentication_algorithm': _params.authenticationAlgorithm,
      'encryption_algorithm': _params.encryptionAlgorithm,
      'key_lifetime': _params.keyLifetime,
      'name': _params.name,
      'pfs': _params.pfs
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateIpsecPolicy');

    const parameters = {
      options: {
        url: '/ipsec_policies/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all connections that use the specified IPsec policy.
   *
   * This request lists all the connections that use the specified policy.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The IPsec policy identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VPNGatewayConnectionCollection>>}
   */
  public listIpsecPolicyConnections(params: VpcV1.ListIpsecPolicyConnectionsParams): Promise<VpcV1.Response<VpcV1.VPNGatewayConnectionCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listIpsecPolicyConnections');

    const parameters = {
      options: {
        url: '/ipsec_policies/{id}/connections',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all VPN gateways.
   *
   * This request retrieves a paginated list of all VPN gateways that belong to this account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {string} [params.resourceGroupId] - Filters the collection to resources within one of the resource groups
   * identified in a comma-separated list of resource group identifiers.
   * @param {string} [params.mode] - Filters the collection to VPN gateways with the specified mode.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VPNGatewayCollection>>}
   */
  public listVpnGateways(params?: VpcV1.ListVpnGatewaysParams): Promise<VpcV1.Response<VpcV1.VPNGatewayCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit,
      'resource_group.id': _params.resourceGroupId,
      'mode': _params.mode
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listVpnGateways');

    const parameters = {
      options: {
        url: '/vpn_gateways',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a VPN gateway.
   *
   * This request creates a new VPN gateway.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {VPNGatewayPrototype} params.vpnGatewayPrototype - The VPN gateway prototype object.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VPNGateway>>}
   */
  public createVpnGateway(params: VpcV1.CreateVpnGatewayParams): Promise<VpcV1.Response<VpcV1.VPNGateway>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpnGatewayPrototype'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.vpnGatewayPrototype;
    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createVpnGateway');

    const parameters = {
      options: {
        url: '/vpn_gateways',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete a VPN gateway.
   *
   * This request deletes a VPN gateway. A VPN gateway with a `status` of `pending` cannot be deleted. This operation
   * deletes all VPN gateway connections associated with this VPN gateway.  This operation cannot be reversed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The VPN gateway identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteVpnGateway(params: VpcV1.DeleteVpnGatewayParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteVpnGateway');

    const parameters = {
      options: {
        url: '/vpn_gateways/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve the specified VPN gateway.
   *
   * This request retrieves a single VPN gateway specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The VPN gateway identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VPNGateway>>}
   */
  public getVpnGateway(params: VpcV1.GetVpnGatewayParams): Promise<VpcV1.Response<VpcV1.VPNGateway>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getVpnGateway');

    const parameters = {
      options: {
        url: '/vpn_gateways/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update a VPN gateway.
   *
   * This request updates the properties of an existing VPN gateway.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The VPN gateway identifier.
   * @param {string} [params.name] - The user-defined name for this VPN gateway.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VPNGateway>>}
   */
  public updateVpnGateway(params: VpcV1.UpdateVpnGatewayParams): Promise<VpcV1.Response<VpcV1.VPNGateway>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateVpnGateway');

    const parameters = {
      options: {
        url: '/vpn_gateways/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all connections of a VPN gateway.
   *
   * This request lists all the connections of a particular VPN gateway.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpnGatewayId - The VPN gateway identifier.
   * @param {string} [params.status] - Filters the collection to VPN gateway connections with the specified status.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VPNGatewayConnectionCollection>>}
   */
  public listVpnGatewayConnections(params: VpcV1.ListVpnGatewayConnectionsParams): Promise<VpcV1.Response<VpcV1.VPNGatewayConnectionCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpnGatewayId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation,
      'status': _params.status
    };

    const path = {
      'vpn_gateway_id': _params.vpnGatewayId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listVpnGatewayConnections');

    const parameters = {
      options: {
        url: '/vpn_gateways/{vpn_gateway_id}/connections',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a VPN gateway connection.
   *
   * This request creates a new VPN gateway connection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpnGatewayId - The VPN gateway identifier.
   * @param {VPNGatewayConnectionPrototype} params.vpnGatewayConnectionPrototype - The VPN gateway connection prototype
   * object.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VPNGatewayConnection>>}
   */
  public createVpnGatewayConnection(params: VpcV1.CreateVpnGatewayConnectionParams): Promise<VpcV1.Response<VpcV1.VPNGatewayConnection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpnGatewayId', 'vpnGatewayConnectionPrototype'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.vpnGatewayConnectionPrototype;
    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpn_gateway_id': _params.vpnGatewayId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createVpnGatewayConnection');

    const parameters = {
      options: {
        url: '/vpn_gateways/{vpn_gateway_id}/connections',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete a VPN gateway connection.
   *
   * This request deletes a VPN gateway connection. This operation cannot be reversed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpnGatewayId - The VPN gateway identifier.
   * @param {string} params.id - The VPN gateway connection identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteVpnGatewayConnection(params: VpcV1.DeleteVpnGatewayConnectionParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpnGatewayId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpn_gateway_id': _params.vpnGatewayId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteVpnGatewayConnection');

    const parameters = {
      options: {
        url: '/vpn_gateways/{vpn_gateway_id}/connections/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve the specified VPN gateway connection.
   *
   * This request retrieves a single VPN gateway connection specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpnGatewayId - The VPN gateway identifier.
   * @param {string} params.id - The VPN gateway connection identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VPNGatewayConnection>>}
   */
  public getVpnGatewayConnection(params: VpcV1.GetVpnGatewayConnectionParams): Promise<VpcV1.Response<VpcV1.VPNGatewayConnection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpnGatewayId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpn_gateway_id': _params.vpnGatewayId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getVpnGatewayConnection');

    const parameters = {
      options: {
        url: '/vpn_gateways/{vpn_gateway_id}/connections/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update a VPN gateway connection.
   *
   * This request updates the properties of an existing VPN gateway connection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpnGatewayId - The VPN gateway identifier.
   * @param {string} params.id - The VPN gateway connection identifier.
   * @param {VPNGatewayConnectionPatch} params.vpnGatewayConnectionPatch - The VPN gateway connection patch.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VPNGatewayConnection>>}
   */
  public updateVpnGatewayConnection(params: VpcV1.UpdateVpnGatewayConnectionParams): Promise<VpcV1.Response<VpcV1.VPNGatewayConnection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpnGatewayId', 'id', 'vpnGatewayConnectionPatch'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.vpnGatewayConnectionPatch;
    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpn_gateway_id': _params.vpnGatewayId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateVpnGatewayConnection');

    const parameters = {
      options: {
        url: '/vpn_gateways/{vpn_gateway_id}/connections/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all local CIDRs for a VPN gateway connection.
   *
   * This request lists all local CIDRs for a VPN gateway connection specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpnGatewayId - The VPN gateway identifier.
   * @param {string} params.id - The VPN gateway connection identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VPNGatewayConnectionLocalCIDRs>>}
   */
  public listVpnGatewayConnectionLocalCidrs(params: VpcV1.ListVpnGatewayConnectionLocalCidrsParams): Promise<VpcV1.Response<VpcV1.VPNGatewayConnectionLocalCIDRs>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpnGatewayId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpn_gateway_id': _params.vpnGatewayId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listVpnGatewayConnectionLocalCidrs');

    const parameters = {
      options: {
        url: '/vpn_gateways/{vpn_gateway_id}/connections/{id}/local_cidrs',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Remove a local CIDR from a VPN gateway connection.
   *
   * This request removes a CIDR from a VPN gateway connection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpnGatewayId - The VPN gateway identifier.
   * @param {string} params.id - The VPN gateway connection identifier.
   * @param {string} params.cidrPrefix - The address prefix part of the CIDR.
   * @param {string} params.prefixLength - The prefix length part of the CIDR.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public removeVpnGatewayConnectionLocalCidr(params: VpcV1.RemoveVpnGatewayConnectionLocalCidrParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpnGatewayId', 'id', 'cidrPrefix', 'prefixLength'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpn_gateway_id': _params.vpnGatewayId,
      'id': _params.id,
      'cidr_prefix': _params.cidrPrefix,
      'prefix_length': _params.prefixLength
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'removeVpnGatewayConnectionLocalCidr');

    const parameters = {
      options: {
        url: '/vpn_gateways/{vpn_gateway_id}/connections/{id}/local_cidrs/{cidr_prefix}/{prefix_length}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Check if the specified local CIDR exists on a VPN gateway connection.
   *
   * This request succeeds if a CIDR exists on the specified VPN gateway connection and fails otherwise.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpnGatewayId - The VPN gateway identifier.
   * @param {string} params.id - The VPN gateway connection identifier.
   * @param {string} params.cidrPrefix - The address prefix part of the CIDR.
   * @param {string} params.prefixLength - The prefix length part of the CIDR.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public checkVpnGatewayConnectionLocalCidr(params: VpcV1.CheckVpnGatewayConnectionLocalCidrParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpnGatewayId', 'id', 'cidrPrefix', 'prefixLength'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpn_gateway_id': _params.vpnGatewayId,
      'id': _params.id,
      'cidr_prefix': _params.cidrPrefix,
      'prefix_length': _params.prefixLength
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'checkVpnGatewayConnectionLocalCidr');

    const parameters = {
      options: {
        url: '/vpn_gateways/{vpn_gateway_id}/connections/{id}/local_cidrs/{cidr_prefix}/{prefix_length}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Set a local CIDR on a VPN gateway connection.
   *
   * This request adds the specified CIDR to the specified VPN gateway connection. A request body is not required, and
   * if supplied, is ignored. This request succeeds if the CIDR already exists on the specified VPN gateway connection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpnGatewayId - The VPN gateway identifier.
   * @param {string} params.id - The VPN gateway connection identifier.
   * @param {string} params.cidrPrefix - The address prefix part of the CIDR.
   * @param {string} params.prefixLength - The prefix length part of the CIDR.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public addVpnGatewayConnectionLocalCidr(params: VpcV1.AddVpnGatewayConnectionLocalCidrParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpnGatewayId', 'id', 'cidrPrefix', 'prefixLength'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpn_gateway_id': _params.vpnGatewayId,
      'id': _params.id,
      'cidr_prefix': _params.cidrPrefix,
      'prefix_length': _params.prefixLength
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'addVpnGatewayConnectionLocalCidr');

    const parameters = {
      options: {
        url: '/vpn_gateways/{vpn_gateway_id}/connections/{id}/local_cidrs/{cidr_prefix}/{prefix_length}',
        method: 'PUT',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all peer CIDRs for a VPN gateway connection.
   *
   * This request lists all peer CIDRs for a VPN gateway connection specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpnGatewayId - The VPN gateway identifier.
   * @param {string} params.id - The VPN gateway connection identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.VPNGatewayConnectionPeerCIDRs>>}
   */
  public listVpnGatewayConnectionPeerCidrs(params: VpcV1.ListVpnGatewayConnectionPeerCidrsParams): Promise<VpcV1.Response<VpcV1.VPNGatewayConnectionPeerCIDRs>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpnGatewayId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpn_gateway_id': _params.vpnGatewayId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listVpnGatewayConnectionPeerCidrs');

    const parameters = {
      options: {
        url: '/vpn_gateways/{vpn_gateway_id}/connections/{id}/peer_cidrs',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Remove a peer CIDR from a VPN gateway connection.
   *
   * This request removes a CIDR from a VPN gateway connection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpnGatewayId - The VPN gateway identifier.
   * @param {string} params.id - The VPN gateway connection identifier.
   * @param {string} params.cidrPrefix - The address prefix part of the CIDR.
   * @param {string} params.prefixLength - The prefix length part of the CIDR.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public removeVpnGatewayConnectionPeerCidr(params: VpcV1.RemoveVpnGatewayConnectionPeerCidrParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpnGatewayId', 'id', 'cidrPrefix', 'prefixLength'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpn_gateway_id': _params.vpnGatewayId,
      'id': _params.id,
      'cidr_prefix': _params.cidrPrefix,
      'prefix_length': _params.prefixLength
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'removeVpnGatewayConnectionPeerCidr');

    const parameters = {
      options: {
        url: '/vpn_gateways/{vpn_gateway_id}/connections/{id}/peer_cidrs/{cidr_prefix}/{prefix_length}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Check if the specified peer CIDR exists on a VPN gateway connection.
   *
   * This request succeeds if a CIDR exists on the specified VPN gateway connection and fails otherwise.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpnGatewayId - The VPN gateway identifier.
   * @param {string} params.id - The VPN gateway connection identifier.
   * @param {string} params.cidrPrefix - The address prefix part of the CIDR.
   * @param {string} params.prefixLength - The prefix length part of the CIDR.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public checkVpnGatewayConnectionPeerCidr(params: VpcV1.CheckVpnGatewayConnectionPeerCidrParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpnGatewayId', 'id', 'cidrPrefix', 'prefixLength'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpn_gateway_id': _params.vpnGatewayId,
      'id': _params.id,
      'cidr_prefix': _params.cidrPrefix,
      'prefix_length': _params.prefixLength
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'checkVpnGatewayConnectionPeerCidr');

    const parameters = {
      options: {
        url: '/vpn_gateways/{vpn_gateway_id}/connections/{id}/peer_cidrs/{cidr_prefix}/{prefix_length}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Set a peer CIDR on a VPN gateway connection.
   *
   * This request adds the specified CIDR to the specified VPN gateway connection. A request body is not required, and
   * if supplied, is ignored. This request succeeds if the CIDR already exists on the specified VPN gateway connection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.vpnGatewayId - The VPN gateway identifier.
   * @param {string} params.id - The VPN gateway connection identifier.
   * @param {string} params.cidrPrefix - The address prefix part of the CIDR.
   * @param {string} params.prefixLength - The prefix length part of the CIDR.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public addVpnGatewayConnectionPeerCidr(params: VpcV1.AddVpnGatewayConnectionPeerCidrParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['vpnGatewayId', 'id', 'cidrPrefix', 'prefixLength'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'vpn_gateway_id': _params.vpnGatewayId,
      'id': _params.id,
      'cidr_prefix': _params.cidrPrefix,
      'prefix_length': _params.prefixLength
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'addVpnGatewayConnectionPeerCidr');

    const parameters = {
      options: {
        url: '/vpn_gateways/{vpn_gateway_id}/connections/{id}/peer_cidrs/{cidr_prefix}/{prefix_length}',
        method: 'PUT',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * loadBalancers
   ************************/

  /**
   * List all load balancer profiles.
   *
   * This request lists all load balancer profiles available in the region. A load balancer profile specifies the
   * performance characteristics and pricing model for a load balancer.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerProfileCollection>>}
   */
  public listLoadBalancerProfiles(params?: VpcV1.ListLoadBalancerProfilesParams): Promise<VpcV1.Response<VpcV1.LoadBalancerProfileCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listLoadBalancerProfiles');

    const parameters = {
      options: {
        url: '/load_balancer/profiles',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve specified load balancer profile.
   *
   * This request retrieves a load balancer profile specified by the name in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The load balancer profile name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerProfile>>}
   */
  public getLoadBalancerProfile(params: VpcV1.GetLoadBalancerProfileParams): Promise<VpcV1.Response<VpcV1.LoadBalancerProfile>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['name'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'name': _params.name
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getLoadBalancerProfile');

    const parameters = {
      options: {
        url: '/load_balancer/profiles/{name}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all load balancers.
   *
   * This request retrieves a paginated list of all load balancers that belong to this account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerCollection>>}
   */
  public listLoadBalancers(params?: VpcV1.ListLoadBalancersParams): Promise<VpcV1.Response<VpcV1.LoadBalancerCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listLoadBalancers');

    const parameters = {
      options: {
        url: '/load_balancers',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create and provision a load balancer.
   *
   * This request creates and provisions a new load balancer.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {boolean} params.isPublic - Indicates whether this load balancer is public or private.
   * @param {SubnetIdentity[]} params.subnets - The subnets to provision this load balancer.
   * @param {LoadBalancerListenerPrototypeLoadBalancerContext[]} [params.listeners] - The listeners of this load
   * balancer.
   * @param {string} [params.name] - The user-defined name for this load balancer. If unspecified, the name will be a
   * hyphenated list of randomly-selected words.
   * @param {LoadBalancerPoolPrototype[]} [params.pools] - The pools of this load balancer.
   * @param {LoadBalancerProfileIdentity} [params.profile] - The profile to use for this load balancer.
   * @param {ResourceGroupIdentity} [params.resourceGroup] - The resource group to use. If unspecified, the account's
   * [default resource
   * group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancer>>}
   */
  public createLoadBalancer(params: VpcV1.CreateLoadBalancerParams): Promise<VpcV1.Response<VpcV1.LoadBalancer>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['isPublic', 'subnets'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'is_public': _params.isPublic,
      'subnets': _params.subnets,
      'listeners': _params.listeners,
      'name': _params.name,
      'pools': _params.pools,
      'profile': _params.profile,
      'resource_group': _params.resourceGroup
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createLoadBalancer');

    const parameters = {
      options: {
        url: '/load_balancers',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete a load balancer.
   *
   * This request deletes a load balancer. This operation cannot be reversed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The load balancer identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteLoadBalancer(params: VpcV1.DeleteLoadBalancerParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteLoadBalancer');

    const parameters = {
      options: {
        url: '/load_balancers/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve a load balancer.
   *
   * This request retrieves a single load balancer specified by the identifier in the URL path.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The load balancer identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancer>>}
   */
  public getLoadBalancer(params: VpcV1.GetLoadBalancerParams): Promise<VpcV1.Response<VpcV1.LoadBalancer>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getLoadBalancer');

    const parameters = {
      options: {
        url: '/load_balancers/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update a load balancer.
   *
   * This request updates a load balancer.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The load balancer identifier.
   * @param {string} [params.name] - The unique user-defined name for this load balancer.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancer>>}
   */
  public updateLoadBalancer(params: VpcV1.UpdateLoadBalancerParams): Promise<VpcV1.Response<VpcV1.LoadBalancer>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateLoadBalancer');

    const parameters = {
      options: {
        url: '/load_balancers/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List statistics of a load balancer.
   *
   * This request lists statistics of a load balancer specified by the identifier in the URL path.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The load balancer identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerStatistics>>}
   */
  public getLoadBalancerStatistics(params: VpcV1.GetLoadBalancerStatisticsParams): Promise<VpcV1.Response<VpcV1.LoadBalancerStatistics>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getLoadBalancerStatistics');

    const parameters = {
      options: {
        url: '/load_balancers/{id}/statistics',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all listeners of the load balancer.
   *
   * This request retrieves a list of all listeners that belong to the load balancer.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerListenerCollection>>}
   */
  public listLoadBalancerListeners(params: VpcV1.ListLoadBalancerListenersParams): Promise<VpcV1.Response<VpcV1.LoadBalancerListenerCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listLoadBalancerListeners');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/listeners',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a listener.
   *
   * This request creates a new listener to the load balancer.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {number} params.port - The listener port number. Each listener in the load balancer must have a unique
   * `port` and `protocol` combination.
   * @param {string} params.protocol - The listener protocol. Load balancers in the `network` family support `tcp`. Load
   * balancers in the `application` family support `tcp`, `http`, and `https`. Each listener in the load balancer must
   * have a unique `port` and `protocol` combination.
   * @param {boolean} [params.acceptProxyProtocol] - If set to `true`, this listener will accept and forward PROXY
   * protocol information. Supported by load balancers in the `application` family (otherwise always `false`).
   * @param {CertificateInstanceIdentity} [params.certificateInstance] - The certificate instance used for SSL
   * termination. It is applicable only to `https`
   * protocol.
   * @param {number} [params.connectionLimit] - The connection limit of the listener.
   * @param {LoadBalancerPoolIdentity} [params.defaultPool] - The default pool associated with the listener. The
   * specified pool must:
   *
   * - Belong to this load balancer
   * - Have the same `protocol` as this listener
   * - Not already be the default pool for another listener.
   * @param {LoadBalancerListenerPolicyPrototype[]} [params.policies] - The list of policies of this listener.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerListener>>}
   */
  public createLoadBalancerListener(params: VpcV1.CreateLoadBalancerListenerParams): Promise<VpcV1.Response<VpcV1.LoadBalancerListener>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'port', 'protocol'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'port': _params.port,
      'protocol': _params.protocol,
      'accept_proxy_protocol': _params.acceptProxyProtocol,
      'certificate_instance': _params.certificateInstance,
      'connection_limit': _params.connectionLimit,
      'default_pool': _params.defaultPool,
      'policies': _params.policies
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createLoadBalancerListener');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/listeners',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete a listener.
   *
   * This request deletes a load balancer listener. This operation cannot be reversed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.id - The listener identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteLoadBalancerListener(params: VpcV1.DeleteLoadBalancerListenerParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteLoadBalancerListener');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/listeners/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve a listener.
   *
   * This request retrieves a single listener specified by the identifier in the URL path.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.id - The listener identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerListener>>}
   */
  public getLoadBalancerListener(params: VpcV1.GetLoadBalancerListenerParams): Promise<VpcV1.Response<VpcV1.LoadBalancerListener>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getLoadBalancerListener');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/listeners/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update a listener.
   *
   * This request updates a load balancer listener from a listener patch.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.id - The listener identifier.
   * @param {boolean} [params.acceptProxyProtocol] - If set to `true`, this listener will accept and forward PROXY
   * protocol information. Supported by load balancers in the `application` family (otherwise always `false`).
   * @param {CertificateInstanceIdentity} [params.certificateInstance] - The certificate instance used for SSL
   * termination. It is applicable only to `https`
   * protocol.
   * @param {number} [params.connectionLimit] - The connection limit of the listener.
   * @param {LoadBalancerPoolIdentity} [params.defaultPool] - The default pool associated with the listener. The
   * specified pool must:
   *
   * - Belong to this load balancer
   * - Have the same `protocol` as this listener
   * - Not already be the default pool for another listener.
   * @param {number} [params.port] - The listener port number. Each listener in the load balancer must have a unique
   * `port` and `protocol` combination.
   * @param {string} [params.protocol] - The listener protocol. Load balancers in the `network` family support `tcp`.
   * Load balancers in the `application` family support `tcp`, `http`, and `https`. Each listener in the load balancer
   * must have a unique `port` and `protocol` combination.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerListener>>}
   */
  public updateLoadBalancerListener(params: VpcV1.UpdateLoadBalancerListenerParams): Promise<VpcV1.Response<VpcV1.LoadBalancerListener>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'accept_proxy_protocol': _params.acceptProxyProtocol,
      'certificate_instance': _params.certificateInstance,
      'connection_limit': _params.connectionLimit,
      'default_pool': _params.defaultPool,
      'port': _params.port,
      'protocol': _params.protocol
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateLoadBalancerListener');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/listeners/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all policies of the load balancer listener.
   *
   * Retrieves a list of all policies belonging to the load balancer listener.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.listenerId - The listener identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerListenerPolicyCollection>>}
   */
  public listLoadBalancerListenerPolicies(params: VpcV1.ListLoadBalancerListenerPoliciesParams): Promise<VpcV1.Response<VpcV1.LoadBalancerListenerPolicyCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'listenerId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'listener_id': _params.listenerId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listLoadBalancerListenerPolicies');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a policy for the load balancer listener.
   *
   * Creates a new policy to the load balancer listener.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.listenerId - The listener identifier.
   * @param {string} params.action - The policy action.
   * @param {number} params.priority - Priority of the policy. Lower value indicates higher priority.
   * @param {string} [params.name] - The user-defined name for this policy. Names must be unique within the load
   * balancer listener the policy resides in.
   * @param {LoadBalancerListenerPolicyRulePrototype[]} [params.rules] - The list of rules of this policy.
   * @param {LoadBalancerListenerPolicyTargetPrototype} [params.target] - When `action` is `forward`,
   * `LoadBalancerPoolIdentity` is required to specify which
   * pool the load balancer forwards the traffic to. When `action` is `redirect`,
   * `LoadBalancerListenerPolicyRedirectURLPrototype` is required to specify the url and
   * http status code used in the redirect response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerListenerPolicy>>}
   */
  public createLoadBalancerListenerPolicy(params: VpcV1.CreateLoadBalancerListenerPolicyParams): Promise<VpcV1.Response<VpcV1.LoadBalancerListenerPolicy>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'listenerId', 'action', 'priority'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'action': _params.action,
      'priority': _params.priority,
      'name': _params.name,
      'rules': _params.rules,
      'target': _params.target
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'listener_id': _params.listenerId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createLoadBalancerListenerPolicy');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete a policy of the load balancer listener.
   *
   * Deletes a policy of the load balancer listener. This operation cannot be reversed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.listenerId - The listener identifier.
   * @param {string} params.id - The policy identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteLoadBalancerListenerPolicy(params: VpcV1.DeleteLoadBalancerListenerPolicyParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'listenerId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'listener_id': _params.listenerId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteLoadBalancerListenerPolicy');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve a policy of the load balancer listener.
   *
   * Retrieve a single policy specified by the identifier in the URL path.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.listenerId - The listener identifier.
   * @param {string} params.id - The policy identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerListenerPolicy>>}
   */
  public getLoadBalancerListenerPolicy(params: VpcV1.GetLoadBalancerListenerPolicyParams): Promise<VpcV1.Response<VpcV1.LoadBalancerListenerPolicy>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'listenerId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'listener_id': _params.listenerId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getLoadBalancerListenerPolicy');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update a policy of the load balancer listener.
   *
   * Updates a policy from a policy patch.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.listenerId - The listener identifier.
   * @param {string} params.id - The policy identifier.
   * @param {string} [params.name] - The user-defined name for this policy. Names must be unique within the load
   * balancer listener the policy resides in.
   * @param {number} [params.priority] - Priority of the policy. Lower value indicates higher priority.
   * @param {LoadBalancerListenerPolicyTargetPatch} [params.target] - When `action` is `forward`,
   * `LoadBalancerPoolIdentity` specifies which pool the load
   * balancer forwards the traffic to. When `action` is `redirect`,
   * `LoadBalancerListenerPolicyRedirectURLPatch` specifies the url and http
   * status code used in the redirect response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerListenerPolicy>>}
   */
  public updateLoadBalancerListenerPolicy(params: VpcV1.UpdateLoadBalancerListenerPolicyParams): Promise<VpcV1.Response<VpcV1.LoadBalancerListenerPolicy>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'listenerId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name,
      'priority': _params.priority,
      'target': _params.target
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'listener_id': _params.listenerId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateLoadBalancerListenerPolicy');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all rules of the load balancer listener policy.
   *
   * Retrieves a list of all rules belonging to the load balancer listener policy.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.listenerId - The listener identifier.
   * @param {string} params.policyId - The policy identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerListenerPolicyRuleCollection>>}
   */
  public listLoadBalancerListenerPolicyRules(params: VpcV1.ListLoadBalancerListenerPolicyRulesParams): Promise<VpcV1.Response<VpcV1.LoadBalancerListenerPolicyRuleCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'listenerId', 'policyId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'listener_id': _params.listenerId,
      'policy_id': _params.policyId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listLoadBalancerListenerPolicyRules');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{policy_id}/rules',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a rule for the load balancer listener policy.
   *
   * Creates a new rule for the load balancer listener policy.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.listenerId - The listener identifier.
   * @param {string} params.policyId - The policy identifier.
   * @param {string} params.condition - The condition of the rule.
   * @param {string} params.type - The type of the rule.
   * @param {string} params.value - Value to be matched for rule condition.
   * @param {string} [params.field] - HTTP header field. This is only applicable to "header" rule type.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerListenerPolicyRule>>}
   */
  public createLoadBalancerListenerPolicyRule(params: VpcV1.CreateLoadBalancerListenerPolicyRuleParams): Promise<VpcV1.Response<VpcV1.LoadBalancerListenerPolicyRule>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'listenerId', 'policyId', 'condition', 'type', 'value'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'condition': _params.condition,
      'type': _params.type,
      'value': _params.value,
      'field': _params.field
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'listener_id': _params.listenerId,
      'policy_id': _params.policyId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createLoadBalancerListenerPolicyRule');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{policy_id}/rules',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete a rule from the load balancer listener policy.
   *
   * Deletes a rule from the load balancer listener policy. This operation cannot be reversed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.listenerId - The listener identifier.
   * @param {string} params.policyId - The policy identifier.
   * @param {string} params.id - The rule identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteLoadBalancerListenerPolicyRule(params: VpcV1.DeleteLoadBalancerListenerPolicyRuleParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'listenerId', 'policyId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'listener_id': _params.listenerId,
      'policy_id': _params.policyId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteLoadBalancerListenerPolicyRule');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{policy_id}/rules/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve a rule of the load balancer listener policy.
   *
   * Retrieves a single rule specified by the identifier in the URL path.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.listenerId - The listener identifier.
   * @param {string} params.policyId - The policy identifier.
   * @param {string} params.id - The rule identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerListenerPolicyRule>>}
   */
  public getLoadBalancerListenerPolicyRule(params: VpcV1.GetLoadBalancerListenerPolicyRuleParams): Promise<VpcV1.Response<VpcV1.LoadBalancerListenerPolicyRule>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'listenerId', 'policyId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'listener_id': _params.listenerId,
      'policy_id': _params.policyId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getLoadBalancerListenerPolicyRule');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{policy_id}/rules/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update a rule of the load balancer listener policy.
   *
   * Updates a rule of the load balancer listener policy.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.listenerId - The listener identifier.
   * @param {string} params.policyId - The policy identifier.
   * @param {string} params.id - The rule identifier.
   * @param {string} [params.condition] - The condition of the rule.
   * @param {string} [params.field] - HTTP header field. This is only applicable to "header" rule type.
   * @param {string} [params.type] - The type of the rule.
   * @param {string} [params.value] - Value to be matched for rule condition.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerListenerPolicyRule>>}
   */
  public updateLoadBalancerListenerPolicyRule(params: VpcV1.UpdateLoadBalancerListenerPolicyRuleParams): Promise<VpcV1.Response<VpcV1.LoadBalancerListenerPolicyRule>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'listenerId', 'policyId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'condition': _params.condition,
      'field': _params.field,
      'type': _params.type,
      'value': _params.value
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'listener_id': _params.listenerId,
      'policy_id': _params.policyId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateLoadBalancerListenerPolicyRule');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/listeners/{listener_id}/policies/{policy_id}/rules/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all pools of the load balancer.
   *
   * This request lists all pools that belong to the load balancer.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerPoolCollection>>}
   */
  public listLoadBalancerPools(params: VpcV1.ListLoadBalancerPoolsParams): Promise<VpcV1.Response<VpcV1.LoadBalancerPoolCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listLoadBalancerPools');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/pools',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a load balancer pool.
   *
   * This request creates a new pool from a pool prototype object.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.algorithm - The load balancing algorithm.
   * @param {LoadBalancerPoolHealthMonitorPrototype} params.healthMonitor - The health monitor of this pool.
   * @param {string} params.protocol - The protocol used for this load balancer pool. Load balancers in the `network`
   * family support `tcp`. Load balancers in the `application` family support `tcp`, `http`, and
   * `https`.
   * @param {LoadBalancerPoolMemberPrototype[]} [params.members] - The members for this load balancer pool. For load
   * balancers in the `network` family, the same `port` and `target` tuple cannot be shared by a pool member of any
   * other load balancer in the same VPC.
   * @param {string} [params.name] - The user-defined name for this load balancer pool. If unspecified, the name will be
   * a hyphenated list of randomly-selected words.
   * @param {string} [params.proxyProtocol] - The PROXY protocol setting for this pool:
   * - `v1`: Enabled with version 1 (human-readable header format)
   * - `v2`: Enabled with version 2 (binary header format)
   * - `disabled`: Disabled
   *
   * Supported by load balancers in the `application` family (otherwise always `disabled`).
   * @param {LoadBalancerPoolSessionPersistencePrototype} [params.sessionPersistence] - The session persistence of this
   * pool.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerPool>>}
   */
  public createLoadBalancerPool(params: VpcV1.CreateLoadBalancerPoolParams): Promise<VpcV1.Response<VpcV1.LoadBalancerPool>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'algorithm', 'healthMonitor', 'protocol'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'algorithm': _params.algorithm,
      'health_monitor': _params.healthMonitor,
      'protocol': _params.protocol,
      'members': _params.members,
      'name': _params.name,
      'proxy_protocol': _params.proxyProtocol,
      'session_persistence': _params.sessionPersistence
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createLoadBalancerPool');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/pools',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete a pool.
   *
   * This request deletes a load balancer pool. This operation cannot be reversed. The pool must not currently be the
   * default pool for any listener in the load balancer.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.id - The pool identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteLoadBalancerPool(params: VpcV1.DeleteLoadBalancerPoolParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteLoadBalancerPool');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/pools/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve a load balancer pool.
   *
   * This request retrieves a single pool specified by the identifier in the URL path.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.id - The pool identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerPool>>}
   */
  public getLoadBalancerPool(params: VpcV1.GetLoadBalancerPoolParams): Promise<VpcV1.Response<VpcV1.LoadBalancerPool>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getLoadBalancerPool');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/pools/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update a load balancer pool.
   *
   * This request updates a load balancer pool from a pool patch.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.id - The pool identifier.
   * @param {string} [params.algorithm] - The load balancing algorithm.
   * @param {LoadBalancerPoolHealthMonitorPatch} [params.healthMonitor] - The health monitor of this pool.
   * @param {string} [params.name] - The user-defined name for this load balancer pool.
   * @param {string} [params.protocol] - The protocol used for this load balancer pool.
   *
   * The enumerated values for this property are expected to expand in the future. When processing this property, check
   * for and log unknown values. Optionally halt processing and surface the error, or bypass the pool on which the
   * unexpected property value was encountered.
   * @param {string} [params.proxyProtocol] - The PROXY protocol setting for this pool:
   * - `v1`: Enabled with version 1 (human-readable header format)
   * - `v2`: Enabled with version 2 (binary header format)
   * - `disabled`: Disabled
   *
   * Supported by load balancers in the `application` family (otherwise always `disabled`).
   * @param {LoadBalancerPoolSessionPersistencePatch} [params.sessionPersistence] - The session persistence of this
   * pool.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerPool>>}
   */
  public updateLoadBalancerPool(params: VpcV1.UpdateLoadBalancerPoolParams): Promise<VpcV1.Response<VpcV1.LoadBalancerPool>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'algorithm': _params.algorithm,
      'health_monitor': _params.healthMonitor,
      'name': _params.name,
      'protocol': _params.protocol,
      'proxy_protocol': _params.proxyProtocol,
      'session_persistence': _params.sessionPersistence
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateLoadBalancerPool');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/pools/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all members of the load balancer pool.
   *
   * This request retrieves a paginated list of all members that belong to the pool.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.poolId - The pool identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerPoolMemberCollection>>}
   */
  public listLoadBalancerPoolMembers(params: VpcV1.ListLoadBalancerPoolMembersParams): Promise<VpcV1.Response<VpcV1.LoadBalancerPoolMemberCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'poolId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'pool_id': _params.poolId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listLoadBalancerPoolMembers');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/pools/{pool_id}/members',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a member in the load balancer pool.
   *
   * This request creates a new member and adds the member to the pool.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.poolId - The pool identifier.
   * @param {number} params.port - The port number of the application running in the server member.
   * @param {LoadBalancerPoolMemberTargetPrototype} params.target - The pool member target. Load balancers in the
   * `network` family support virtual server
   * instances. Load balancers in the `application` family support IP addresses.
   * @param {number} [params.weight] - Weight of the server member. Applicable only if the pool algorithm is
   * `weighted_round_robin`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerPoolMember>>}
   */
  public createLoadBalancerPoolMember(params: VpcV1.CreateLoadBalancerPoolMemberParams): Promise<VpcV1.Response<VpcV1.LoadBalancerPoolMember>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'poolId', 'port', 'target'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'port': _params.port,
      'target': _params.target,
      'weight': _params.weight
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'pool_id': _params.poolId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createLoadBalancerPoolMember');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/pools/{pool_id}/members',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update members of the load balancer pool.
   *
   * This request updates members of the load balancer pool from a collection of member prototype objects.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.poolId - The pool identifier.
   * @param {LoadBalancerPoolMemberPrototype[]} params.members - Array of pool member prototype objects.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerPoolMemberCollection>>}
   */
  public replaceLoadBalancerPoolMembers(params: VpcV1.ReplaceLoadBalancerPoolMembersParams): Promise<VpcV1.Response<VpcV1.LoadBalancerPoolMemberCollection>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'poolId', 'members'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'members': _params.members
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'pool_id': _params.poolId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'replaceLoadBalancerPoolMembers');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/pools/{pool_id}/members',
        method: 'PUT',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete a member from the load balancer pool.
   *
   * This request deletes a member from the pool. This operation cannot be reversed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.poolId - The pool identifier.
   * @param {string} params.id - The member identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteLoadBalancerPoolMember(params: VpcV1.DeleteLoadBalancerPoolMemberParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'poolId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'pool_id': _params.poolId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteLoadBalancerPoolMember');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/pools/{pool_id}/members/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve a member in the load balancer pool.
   *
   * This request retrieves a single member specified by the identifier in the URL path.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.poolId - The pool identifier.
   * @param {string} params.id - The member identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerPoolMember>>}
   */
  public getLoadBalancerPoolMember(params: VpcV1.GetLoadBalancerPoolMemberParams): Promise<VpcV1.Response<VpcV1.LoadBalancerPoolMember>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'poolId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'pool_id': _params.poolId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getLoadBalancerPoolMember');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/pools/{pool_id}/members/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update a member in the load balancer pool.
   *
   * This request updates an existing member from a member patch.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerId - The load balancer identifier.
   * @param {string} params.poolId - The pool identifier.
   * @param {string} params.id - The member identifier.
   * @param {number} [params.port] - The port number of the application running in the server member.
   * @param {LoadBalancerPoolMemberTargetPrototype} [params.target] - The pool member target. Load balancers in the
   * `network` family support virtual server
   * instances. Load balancers in the `application` family support IP addresses.
   * @param {number} [params.weight] - Weight of the server member. Applicable only if the pool algorithm is
   * `weighted_round_robin`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.LoadBalancerPoolMember>>}
   */
  public updateLoadBalancerPoolMember(params: VpcV1.UpdateLoadBalancerPoolMemberParams): Promise<VpcV1.Response<VpcV1.LoadBalancerPoolMember>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerId', 'poolId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'port': _params.port,
      'target': _params.target,
      'weight': _params.weight
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'load_balancer_id': _params.loadBalancerId,
      'pool_id': _params.poolId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateLoadBalancerPoolMember');

    const parameters = {
      options: {
        url: '/load_balancers/{load_balancer_id}/pools/{pool_id}/members/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * endpointGateways
   ************************/

  /**
   * List all endpoint gateways.
   *
   * This request lists all endpoint gateways. An endpoint gateway maps one or more reserved IPs in a VPC to a target
   * outside the VPC.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - Filters the collection to resources with the exact specified name.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {string} [params.resourceGroupId] - Filters the collection to resources within one of the resource groups
   * identified in a comma-separated list of resource group identifiers.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.EndpointGatewayCollection>>}
   */
  public listEndpointGateways(params?: VpcV1.ListEndpointGatewaysParams): Promise<VpcV1.Response<VpcV1.EndpointGatewayCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation,
      'name': _params.name,
      'start': _params.start,
      'limit': _params.limit,
      'resource_group.id': _params.resourceGroupId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listEndpointGateways');

    const parameters = {
      options: {
        url: '/endpoint_gateways',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create an endpoint gateway.
   *
   * This request creates a new endpoint gateway. An endpoint gateway maps one or more reserved IPs in a VPC to a target
   * outside the VPC.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {EndpointGatewayTargetPrototype} params.target - The target for this endpoint gateway.
   * @param {VPCIdentity} params.vpc - The VPC this endpoint gateway will serve.
   * @param {EndpointGatewayReservedIP[]} [params.ips] - A list of reserved IPs to attach to this endpoint gateway.
   * @param {string} [params.name] - The user-defined name for this endpoint gateway. If unspecified, the name will be a
   * hyphenated list of randomly-selected words. Names must be unique within the VPC this endpoint gateway is serving.
   * @param {ResourceGroupIdentity} [params.resourceGroup] - The resource group to use. If unspecified, the account's
   * [default resource
   * group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.EndpointGateway>>}
   */
  public createEndpointGateway(params: VpcV1.CreateEndpointGatewayParams): Promise<VpcV1.Response<VpcV1.EndpointGateway>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['target', 'vpc'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'target': _params.target,
      'vpc': _params.vpc,
      'ips': _params.ips,
      'name': _params.name,
      'resource_group': _params.resourceGroup
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createEndpointGateway');

    const parameters = {
      options: {
        url: '/endpoint_gateways',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all reserved IPs bound to an endpoint gateway.
   *
   * This request retrieves all reserved IPs bound to an endpoint gateway.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.endpointGatewayId - The endpoint gateway identifier.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {string} [params.sort] - Sorts the returned collection by the specified field name in ascending order. A `-`
   * may be prepended to the field name to sort in descending order. For example, the value
   * `-created_at` sorts the collection by the `created_at` field in descending order, and the value `name` sorts it by
   * the `name` field in ascending order.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.ReservedIPCollectionEndpointGatewayContext>>}
   */
  public listEndpointGatewayIps(params: VpcV1.ListEndpointGatewayIpsParams): Promise<VpcV1.Response<VpcV1.ReservedIPCollectionEndpointGatewayContext>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['endpointGatewayId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit,
      'sort': _params.sort
    };

    const path = {
      'endpoint_gateway_id': _params.endpointGatewayId
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listEndpointGatewayIps');

    const parameters = {
      options: {
        url: '/endpoint_gateways/{endpoint_gateway_id}/ips',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Unbind a reserved IP from an endpoint gateway.
   *
   * This request unbinds the specified reserved IP from the specified endpoint gateway. If the reserved IP has
   * `auto_delete` set to `true`, the reserved IP will be deleted.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.endpointGatewayId - The endpoint gateway identifier.
   * @param {string} params.id - The reserved IP identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public removeEndpointGatewayIp(params: VpcV1.RemoveEndpointGatewayIpParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['endpointGatewayId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'endpoint_gateway_id': _params.endpointGatewayId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'removeEndpointGatewayIp');

    const parameters = {
      options: {
        url: '/endpoint_gateways/{endpoint_gateway_id}/ips/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve a reserved IP bound to an endpoint gateway.
   *
   * This request a retrieves the specified reserved IP address if it is bound to the endpoint gateway specified in the
   * URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.endpointGatewayId - The endpoint gateway identifier.
   * @param {string} params.id - The reserved IP identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.ReservedIP>>}
   */
  public getEndpointGatewayIp(params: VpcV1.GetEndpointGatewayIpParams): Promise<VpcV1.Response<VpcV1.ReservedIP>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['endpointGatewayId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'endpoint_gateway_id': _params.endpointGatewayId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getEndpointGatewayIp');

    const parameters = {
      options: {
        url: '/endpoint_gateways/{endpoint_gateway_id}/ips/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Bind a reserved IP to an endpoint gateway.
   *
   * This request binds the specified reserved IP to the specified endpoint gateway. For this request to succeed, the
   * reserved IP must currently be unbound and must not have a floating IP bound to it.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.endpointGatewayId - The endpoint gateway identifier.
   * @param {string} params.id - The reserved IP identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.ReservedIP>>}
   */
  public addEndpointGatewayIp(params: VpcV1.AddEndpointGatewayIpParams): Promise<VpcV1.Response<VpcV1.ReservedIP>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['endpointGatewayId', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'endpoint_gateway_id': _params.endpointGatewayId,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'addEndpointGatewayIp');

    const parameters = {
      options: {
        url: '/endpoint_gateways/{endpoint_gateway_id}/ips/{id}',
        method: 'PUT',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete an endpoint gateway.
   *
   * This request deletes an endpoint gateway. This operation cannot be reversed.
   *
   * Reserved IPs that were bound to the endpoint gateway will be released if their
   * `auto_delete` property is set to true.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The endpoint gateway identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteEndpointGateway(params: VpcV1.DeleteEndpointGatewayParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteEndpointGateway');

    const parameters = {
      options: {
        url: '/endpoint_gateways/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve an endpoint gateway.
   *
   * This request retrieves a single endpoint gateway specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The endpoint gateway identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.EndpointGateway>>}
   */
  public getEndpointGateway(params: VpcV1.GetEndpointGatewayParams): Promise<VpcV1.Response<VpcV1.EndpointGateway>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getEndpointGateway');

    const parameters = {
      options: {
        url: '/endpoint_gateways/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update an endpoint gateway.
   *
   * This request updates an endpoint gateway's name.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The endpoint gateway identifier.
   * @param {string} [params.name] - The user-defined name for this endpoint gateway. Names must be unique within the
   * VPC this endpoint gateway is serving.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.EndpointGateway>>}
   */
  public updateEndpointGateway(params: VpcV1.UpdateEndpointGatewayParams): Promise<VpcV1.Response<VpcV1.EndpointGateway>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateEndpointGateway');

    const parameters = {
      options: {
        url: '/endpoint_gateways/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * flowLogCollectors
   ************************/

  /**
   * List all flow log collectors.
   *
   * This request retrieves all flow log collectors in the region. A flow log collector summarizes data sent over one or
   * more network interfaces within a VPC, depending on the chosen target.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - A server-supplied token determining what resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {string} [params.resourceGroupId] - Filters the collection to resources within one of the resource groups
   * identified in a comma-separated list of resource group identifiers.
   * @param {string} [params.name] - Filters the collection to resources with the exact specified name.
   * @param {string} [params.vpcId] - Filters the collection to resources in the VPC with the specified identifier.
   * @param {string} [params.vpcCrn] - Filters the collection to resources in the VPC with the specified CRN.
   * @param {string} [params.vpcName] - Filters the collection to resources in the VPC with the exact specified name.
   * @param {string} [params.targetId] - Filters the collection to flow log collectors that target the specified
   * resource.
   * @param {string} [params.targetResourceType] - Filters the collection to flow log collectors that target the
   * specified resource type.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.FlowLogCollectorCollection>>}
   */
  public listFlowLogCollectors(params?: VpcV1.ListFlowLogCollectorsParams): Promise<VpcV1.Response<VpcV1.FlowLogCollectorCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'version': this.version,
      'generation': this.generation,
      'start': _params.start,
      'limit': _params.limit,
      'resource_group.id': _params.resourceGroupId,
      'name': _params.name,
      'vpc.id': _params.vpcId,
      'vpc.crn': _params.vpcCrn,
      'vpc.name': _params.vpcName,
      'target.id': _params.targetId,
      'target.resource_type': _params.targetResourceType
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'listFlowLogCollectors');

    const parameters = {
      options: {
        url: '/flow_log_collectors',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create a flow log collector.
   *
   * This request creates and starts a new flow log collector from a flow log collector prototype object. The prototype
   * object is structured in the same way as a retrieved flow log collector, and contains the information necessary to
   * create and start the new flow log collector.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {CloudObjectStorageBucketIdentity} params.storageBucket - The Cloud Object Storage bucket where the
   * collected flows will be logged.
   * The bucket must exist and an IAM service authorization must grant
   * `IBM Cloud Flow Logs` resources of `VPC Infrastructure Services` writer
   * access to the bucket.
   * @param {FlowLogCollectorTargetPrototype} params.target - The target this collector will collect flow logs for. If
   * the target is an instance,
   * subnet, or VPC, flow logs will not be collected for any network interfaces within the
   * target that are themselves the target of a more specific flow log collector.
   * @param {boolean} [params.active] - Indicates whether this collector is active. If false, this collector is created
   * in inactive mode.
   * @param {string} [params.name] - The unique user-defined name for this flow log collector. If unspecified, the name
   * will be a hyphenated list of randomly-selected words.
   * @param {ResourceGroupIdentity} [params.resourceGroup] - The resource group to use. If unspecified, the account's
   * [default resource
   * group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.FlowLogCollector>>}
   */
  public createFlowLogCollector(params: VpcV1.CreateFlowLogCollectorParams): Promise<VpcV1.Response<VpcV1.FlowLogCollector>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['storageBucket', 'target'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'storage_bucket': _params.storageBucket,
      'target': _params.target,
      'active': _params.active,
      'name': _params.name,
      'resource_group': _params.resourceGroup
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'createFlowLogCollector');

    const parameters = {
      options: {
        url: '/flow_log_collectors',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete the specified flow log collector.
   *
   * This request stops and deletes a flow log collector. Collected flow logs remain available within the flow log
   * collector's bucket.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The flow log collector identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.Empty>>}
   */
  public deleteFlowLogCollector(params: VpcV1.DeleteFlowLogCollectorParams): Promise<VpcV1.Response<VpcV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteFlowLogCollector');

    const parameters = {
      options: {
        url: '/flow_log_collectors/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Retrieve the specified flow log collector.
   *
   * This request retrieves a single flow log collector specified by the identifier in the URL.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The flow log collector identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.FlowLogCollector>>}
   */
  public getFlowLogCollector(params: VpcV1.GetFlowLogCollectorParams): Promise<VpcV1.Response<VpcV1.FlowLogCollector>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'getFlowLogCollector');

    const parameters = {
      options: {
        url: '/flow_log_collectors/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update the specified flow log collector.
   *
   * This request updates a flow log collector with the information in a provided flow log collector patch. The flow log
   * collector patch object is structured in the same way as a retrieved flow log collector and contains only the
   * information to be updated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The flow log collector identifier.
   * @param {boolean} [params.active] - Indicates whether this collector is active. Updating to false deactivates the
   * collector and updating to true activates the collector.
   * @param {string} [params.name] - The unique user-defined name for this flow log collector.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<VpcV1.Response<VpcV1.FlowLogCollector>>}
   */
  public updateFlowLogCollector(params: VpcV1.UpdateFlowLogCollectorParams): Promise<VpcV1.Response<VpcV1.FlowLogCollector>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'active': _params.active,
      'name': _params.name
    };

    const query = {
      'version': this.version,
      'generation': this.generation
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(VpcV1.DEFAULT_SERVICE_NAME, 'v1', 'updateFlowLogCollector');

    const parameters = {
      options: {
        url: '/flow_log_collectors/{id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

}

/*************************
 * interfaces
 ************************/

namespace VpcV1 {

  /** Options for the `VpcV1` constructor. */
  export interface Options extends UserOptions {

    /** Requests the version of the API as of a date in the format `YYYY-MM-DD`. Any date up to the current date may
     *  be provided. Specify the current date to request the latest version.
     */
    version: string;

    /** The infrastructure generation for the request. For the API behavior documented here, use `2`. */
    generation?: number;
  }

  /** An operation response. */
  export interface Response<T = any>  {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `listVpcs` operation. */
  export interface ListVpcsParams {
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    /** Filters the collection to resources within one of the resource groups identified in a comma-separated list
     *  of resource group identifiers.
     */
    resourceGroupId?: string;
    /** The `classic_access` parameter filters the returned collection by the supplied field. If the supplied field
     *  is `true`, only Classic Access VPCs will be returned. If the supplied field is `false`, only VPCs without
     *  Classic Access will be returned.
     */
    classicAccess?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createVpc` operation. */
  export interface CreateVpcParams {
    /** Indicates whether a default address prefix should be automatically created for each zone in this VPC. If
     *  `manual`, this VPC will be created with no default address prefixes.
     */
    addressPrefixManagement?: CreateVpcConstants.AddressPrefixManagement | string;
    /** Indicates whether this VPC should be connected to Classic Infrastructure. If true, this VPC's resources will
     *  have private network connectivity to the account's Classic Infrastructure resources. Only one VPC, per region,
     *  may be connected in this way. This value is set at creation and subsequently immutable.
     */
    classicAccess?: boolean;
    /** The unique user-defined name for this VPC. If unspecified, the name will be a hyphenated list of
     *  randomly-selected words.
     */
    name?: string;
    /** The resource group to use. If unspecified, the account's [default resource
     *  group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
     */
    resourceGroup?: ResourceGroupIdentity;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createVpc` operation. */
  export namespace CreateVpcConstants {
    /** Indicates whether a default address prefix should be automatically created for each zone in this VPC. If `manual`, this VPC will be created with no default address prefixes. */
    export enum AddressPrefixManagement {
      AUTO = 'auto',
      MANUAL = 'manual',
    }
  }

  /** Parameters for the `deleteVpc` operation. */
  export interface DeleteVpcParams {
    /** The VPC identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getVpc` operation. */
  export interface GetVpcParams {
    /** The VPC identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateVpc` operation. */
  export interface UpdateVpcParams {
    /** The VPC identifier. */
    id: string;
    /** The unique user-defined name for this VPC. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getVpcDefaultNetworkAcl` operation. */
  export interface GetVpcDefaultNetworkAclParams {
    /** The VPC identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getVpcDefaultRoutingTable` operation. */
  export interface GetVpcDefaultRoutingTableParams {
    /** The VPC identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getVpcDefaultSecurityGroup` operation. */
  export interface GetVpcDefaultSecurityGroupParams {
    /** The VPC identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listVpcAddressPrefixes` operation. */
  export interface ListVpcAddressPrefixesParams {
    /** The VPC identifier. */
    vpcId: string;
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createVpcAddressPrefix` operation. */
  export interface CreateVpcAddressPrefixParams {
    /** The VPC identifier. */
    vpcId: string;
    /** The IPv4 range of the address prefix, expressed in CIDR format. The request must not overlap with any
     *  existing address prefixes in the VPC, and must fall within the [RFC 1918](https://tools.ietf.org/html/rfc1918)
     *  address ranges. The prefix length of the address prefix's CIDR must be between `/9` (8,388,608 addresses) and
     *  `/29` (8 addresses).
     */
    cidr: string;
    /** The zone this address prefix is to belong to. */
    zone: ZoneIdentity;
    /** Indicates whether this is the default prefix for this zone in this VPC. If true, this prefix will become the
     *  default prefix for this zone in this VPC. This fails if the VPC currently has a default address prefix for this
     *  zone.
     */
    isDefault?: boolean;
    /** The user-defined name for this address prefix. Names must be unique within the VPC the address prefix
     *  resides in. If unspecified, the name will be a hyphenated list of randomly-selected words.
     */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteVpcAddressPrefix` operation. */
  export interface DeleteVpcAddressPrefixParams {
    /** The VPC identifier. */
    vpcId: string;
    /** The prefix identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getVpcAddressPrefix` operation. */
  export interface GetVpcAddressPrefixParams {
    /** The VPC identifier. */
    vpcId: string;
    /** The prefix identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateVpcAddressPrefix` operation. */
  export interface UpdateVpcAddressPrefixParams {
    /** The VPC identifier. */
    vpcId: string;
    /** The prefix identifier. */
    id: string;
    /** Indicates whether this is the default prefix for this zone in this VPC. Updating to true makes this prefix
     *  the default prefix for this zone in this VPC, provided the VPC currently has no default address prefix for this
     *  zone. Updating to false removes the default prefix for this zone in this VPC.
     */
    isDefault?: boolean;
    /** The user-defined name for this address prefix. Names must be unique within the VPC the address prefix
     *  resides in.
     */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listVpcRoutes` operation. */
  export interface ListVpcRoutesParams {
    /** The VPC identifier. */
    vpcId: string;
    /** Filters the collection to resources in the zone with the exact specified name. */
    zoneName?: string;
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createVpcRoute` operation. */
  export interface CreateVpcRouteParams {
    /** The VPC identifier. */
    vpcId: string;
    /** The destination of the route. At most two routes per `zone` in a table can have the same destination, and
     *  only if both routes have an `action` of `deliver` and the
     *  `next_hop` is an IP address.
     */
    destination: string;
    /** If `action` is `deliver`, the next hop that packets will be delivered to.  For
     *  other `action` values, its `address` will be `0.0.0.0`.
     */
    nextHop: RouteNextHopPrototype;
    /** The zone to apply the route to. (Traffic from subnets in this zone will be subject to this route.). */
    zone: ZoneIdentity;
    /** The action to perform with a packet matching the route:
     *  - `delegate`: delegate to the system's built-in routes
     *  - `deliver`: deliver the packet to the specified `next_hop`
     *  - `drop`: drop the packet.
     */
    action?: CreateVpcRouteConstants.Action | string;
    /** The user-defined name for this route. If unspecified, the name will be a hyphenated list of
     *  randomly-selected words. Names must be unique within the VPC routing table the route resides in.
     */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createVpcRoute` operation. */
  export namespace CreateVpcRouteConstants {
    /** The action to perform with a packet matching the route: - `delegate`: delegate to the system's built-in routes - `deliver`: deliver the packet to the specified `next_hop` - `drop`: drop the packet. */
    export enum Action {
      DELEGATE = 'delegate',
      DELIVER = 'deliver',
      DROP = 'drop',
    }
  }

  /** Parameters for the `deleteVpcRoute` operation. */
  export interface DeleteVpcRouteParams {
    /** The VPC identifier. */
    vpcId: string;
    /** The route identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getVpcRoute` operation. */
  export interface GetVpcRouteParams {
    /** The VPC identifier. */
    vpcId: string;
    /** The route identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateVpcRoute` operation. */
  export interface UpdateVpcRouteParams {
    /** The VPC identifier. */
    vpcId: string;
    /** The route identifier. */
    id: string;
    /** The user-defined name for this route. Names must be unique within the VPC routing table the route resides
     *  in.
     */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listVpcRoutingTables` operation. */
  export interface ListVpcRoutingTablesParams {
    /** The VPC identifier. */
    vpcId: string;
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    /** If the supplied value is `true`, filters the routing table collection to only the default routing table. If
     *  the supplied value is `false`, filters the routing table collection to exclude the default routing table.
     */
    isDefault?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createVpcRoutingTable` operation. */
  export interface CreateVpcRoutingTableParams {
    /** The VPC identifier. */
    vpcId: string;
    /** The user-defined name for this routing table. Names must be unique within the VPC the routing table resides
     *  in. If unspecified, the name will be a hyphenated list of randomly-selected words.
     */
    name?: string;
    /** If set to `true`, this routing table will be used to route traffic that originates from [Direct
     *  Link](https://cloud.ibm.com/docs/dl/) to this VPC. For this to succeed, the VPC must not already have a routing
     *  table with this property set to `true`.
     *
     *  Incoming traffic will be routed according to the routing table with one exception: routes with an `action` of
     *  `deliver` are treated as `drop` unless the `next_hop` is an IP address within the VPC's address prefix ranges.
     *  Therefore, if an incoming packet matches a route with with a `next_hop` of an internet-bound IP address or a VPN
     *  gateway connection, the packet will be dropped.
     */
    routeDirectLinkIngress?: boolean;
    /** If set to `true`, this routing table will be used to route traffic that originates from [Transit
     *  Gateway](https://cloud.ibm.com/cloud/transit-gateway/) to this VPC. For this to succeed, the VPC must not
     *  already have a routing table with this property set to `true`.
     *
     *  Incoming traffic will be routed according to the routing table with one exception: routes with an `action` of
     *  `deliver` are treated as `drop` unless the `next_hop` is an IP address within the VPC's address prefix ranges.
     *  Therefore, if an incoming packet matches a route with with a `next_hop` of an internet-bound IP address or a VPN
     *  gateway connection, the packet will be dropped.
     *
     *  If [Classic Access](https://cloud.ibm.com/docs/vpc?topic=vpc-setting-up-access-to-classic-infrastructure) is
     *  enabled for this VPC, and this property is set to `true`, its incoming traffic will also be routed according to
     *  this routing table.
     */
    routeTransitGatewayIngress?: boolean;
    /** If set to `true`, this routing table will be used to route traffic that originates from subnets in other
     *  zones in this VPC. For this to succeed, the VPC must not already have a routing table with this property set to
     *  `true`.
     *
     *  Incoming traffic will be routed according to the routing table with one exception: routes with an `action` of
     *  `deliver` are treated as `drop` unless the `next_hop` is an IP address within the VPC's address prefix ranges.
     *  Therefore, if an incoming packet matches a route with with a `next_hop` of an internet-bound IP address or a VPN
     *  gateway connection, the packet will be dropped.
     */
    routeVpcZoneIngress?: boolean;
    /** Array of route prototype objects for routes to create for this routing table. If unspecified, the routing
     *  table will be created with no routes.
     */
    routes?: RoutePrototype[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteVpcRoutingTable` operation. */
  export interface DeleteVpcRoutingTableParams {
    /** The VPC identifier. */
    vpcId: string;
    /** The routing table identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getVpcRoutingTable` operation. */
  export interface GetVpcRoutingTableParams {
    /** The VPC identifier. */
    vpcId: string;
    /** The routing table identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateVpcRoutingTable` operation. */
  export interface UpdateVpcRoutingTableParams {
    /** The VPC identifier. */
    vpcId: string;
    /** The routing table identifier. */
    id: string;
    /** The user-defined name for this routing table. Names must be unique within the VPC the routing table resides
     *  in.
     */
    name?: string;
    /** Indicates whether this routing table is used to route traffic that originates from
     *  [Direct Link](https://cloud.ibm.com/docs/dl/) to this VPC. Updating to `true` selects this routing table,
     *  provided no other routing table in the VPC already has this property set to `true`, and no subnets are attached
     *  to this routing table. Updating to `false` deselects this routing table.
     *
     *  Incoming traffic will be routed according to the routing table with one exception: routes with an `action` of
     *  `deliver` are treated as `drop` unless the `next_hop` is an IP address within the VPC's address prefix ranges.
     *  Therefore, if an incoming packet matches a route with with a `next_hop` of an internet-bound IP address or a VPN
     *  gateway connection, the packet will be dropped.
     */
    routeDirectLinkIngress?: boolean;
    /** Indicates whether this routing table is used to route traffic that originates from
     *  [Transit Gateway](https://cloud.ibm.com/cloud/transit-gateway/) to this VPC. Updating to
     *  `true` selects this routing table, provided no other routing table in the VPC already has this property set to
     *  `true`, and no subnets are attached to this routing table. Updating to `false` deselects this routing table.
     *
     *  Incoming traffic will be routed according to the routing table with one exception: routes with an `action` of
     *  `deliver` are treated as `drop` unless the `next_hop` is an IP address within the VPC's address prefix ranges.
     *  Therefore, if an incoming packet matches a route with with a `next_hop` of an internet-bound IP address or a VPN
     *  gateway connection, the packet will be dropped.
     *
     *  If [Classic Access](https://cloud.ibm.com/docs/vpc?topic=vpc-setting-up-access-to-classic-infrastructure) is
     *  enabled for this VPC, and this property is set to `true`, its incoming traffic will also be routed according to
     *  this routing table.
     */
    routeTransitGatewayIngress?: boolean;
    /** Indicates whether this routing table is used to route traffic that originates from subnets in other zones in
     *  this VPC. Updating to `true` selects this routing table, provided no other routing table in the VPC already has
     *  this property set to `true`, and no subnets are attached to this routing table. Updating to `false` deselects
     *  this routing table.
     *
     *  Incoming traffic will be routed according to the routing table with one exception: routes with an `action` of
     *  `deliver` are treated as `drop` unless the `next_hop` is an IP address within the VPC's address prefix ranges.
     *  Therefore, if an incoming packet matches a route with with a `next_hop` of an internet-bound IP address or a VPN
     *  gateway connection, the packet will be dropped.
     */
    routeVpcZoneIngress?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listVpcRoutingTableRoutes` operation. */
  export interface ListVpcRoutingTableRoutesParams {
    /** The VPC identifier. */
    vpcId: string;
    /** The routing table identifier. */
    routingTableId: string;
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createVpcRoutingTableRoute` operation. */
  export interface CreateVpcRoutingTableRouteParams {
    /** The VPC identifier. */
    vpcId: string;
    /** The routing table identifier. */
    routingTableId: string;
    /** The destination of the route. At most two routes per `zone` in a table can have the same destination, and
     *  only if both routes have an `action` of `deliver` and the
     *  `next_hop` is an IP address.
     */
    destination: string;
    /** If `action` is `deliver`, the next hop that packets will be delivered to.  For
     *  other `action` values, its `address` will be `0.0.0.0`.
     */
    nextHop: RouteNextHopPrototype;
    /** The zone to apply the route to. (Traffic from subnets in this zone will be subject to this route.). */
    zone: ZoneIdentity;
    /** The action to perform with a packet matching the route:
     *  - `delegate`: delegate to the system's built-in routes
     *  - `deliver`: deliver the packet to the specified `next_hop`
     *  - `drop`: drop the packet.
     */
    action?: CreateVpcRoutingTableRouteConstants.Action | string;
    /** The user-defined name for this route. If unspecified, the name will be a hyphenated list of
     *  randomly-selected words. Names must be unique within the VPC routing table the route resides in.
     */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createVpcRoutingTableRoute` operation. */
  export namespace CreateVpcRoutingTableRouteConstants {
    /** The action to perform with a packet matching the route: - `delegate`: delegate to the system's built-in routes - `deliver`: deliver the packet to the specified `next_hop` - `drop`: drop the packet. */
    export enum Action {
      DELEGATE = 'delegate',
      DELIVER = 'deliver',
      DROP = 'drop',
    }
  }

  /** Parameters for the `deleteVpcRoutingTableRoute` operation. */
  export interface DeleteVpcRoutingTableRouteParams {
    /** The VPC identifier. */
    vpcId: string;
    /** The routing table identifier. */
    routingTableId: string;
    /** The VPC routing table route identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getVpcRoutingTableRoute` operation. */
  export interface GetVpcRoutingTableRouteParams {
    /** The VPC identifier. */
    vpcId: string;
    /** The routing table identifier. */
    routingTableId: string;
    /** The VPC routing table route identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateVpcRoutingTableRoute` operation. */
  export interface UpdateVpcRoutingTableRouteParams {
    /** The VPC identifier. */
    vpcId: string;
    /** The routing table identifier. */
    routingTableId: string;
    /** The VPC routing table route identifier. */
    id: string;
    /** The user-defined name for this route. Names must be unique within the VPC routing table the route resides
     *  in.
     */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSubnets` operation. */
  export interface ListSubnetsParams {
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    /** Filters the collection to resources within one of the resource groups identified in a comma-separated list
     *  of resource group identifiers.
     */
    resourceGroupId?: string;
    /** Filters the collection to subnets with the routing table of the specified identifier. */
    routingTableId?: string;
    /** Filters the collection to subnets with the routing table of the specified name. */
    routingTableName?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSubnet` operation. */
  export interface CreateSubnetParams {
    /** The subnet prototype object. */
    subnetPrototype: SubnetPrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteSubnet` operation. */
  export interface DeleteSubnetParams {
    /** The subnet identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSubnet` operation. */
  export interface GetSubnetParams {
    /** The subnet identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSubnet` operation. */
  export interface UpdateSubnetParams {
    /** The subnet identifier. */
    id: string;
    /** The user-defined name for this subnet. Names must be unique within the VPC the subnet resides in. */
    name?: string;
    /** The network ACL to use for this subnet. */
    networkAcl?: NetworkACLIdentity;
    /** The public gateway to handle internet bound traffic for this subnet. */
    publicGateway?: PublicGatewayIdentity;
    /** The routing table to use for this subnet.  The routing table properties
     *  `route_direct_link_ingress`, `route_transit_gateway_ingress`, and
     *  `route_vpc_zone_ingress` must be `false`.
     */
    routingTable?: RoutingTableIdentity;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSubnetNetworkAcl` operation. */
  export interface GetSubnetNetworkAclParams {
    /** The subnet identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceSubnetNetworkAcl` operation. */
  export interface ReplaceSubnetNetworkAclParams {
    /** The subnet identifier. */
    id: string;
    /** The network ACL identity. */
    networkAclIdentity: NetworkACLIdentity;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `unsetSubnetPublicGateway` operation. */
  export interface UnsetSubnetPublicGatewayParams {
    /** The subnet identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSubnetPublicGateway` operation. */
  export interface GetSubnetPublicGatewayParams {
    /** The subnet identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `setSubnetPublicGateway` operation. */
  export interface SetSubnetPublicGatewayParams {
    /** The subnet identifier. */
    id: string;
    /** The public gateway identity. */
    publicGatewayIdentity: PublicGatewayIdentity;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSubnetRoutingTable` operation. */
  export interface GetSubnetRoutingTableParams {
    /** The subnet identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceSubnetRoutingTable` operation. */
  export interface ReplaceSubnetRoutingTableParams {
    /** The subnet identifier. */
    id: string;
    /** The routing table identity. */
    routingTableIdentity: RoutingTableIdentity;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSubnetReservedIps` operation. */
  export interface ListSubnetReservedIpsParams {
    /** The subnet identifier. */
    subnetId: string;
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    /** Sorts the returned collection by the specified field name in ascending order. A `-` may be prepended to the
     *  field name to sort in descending order. For example, the value
     *  `-created_at` sorts the collection by the `created_at` field in descending order, and the value `name` sorts it
     *  by the `name` field in ascending order.
     */
    sort?: ListSubnetReservedIpsConstants.Sort | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listSubnetReservedIps` operation. */
  export namespace ListSubnetReservedIpsConstants {
    /** Sorts the returned collection by the specified field name in ascending order. A `-` may be prepended to the field name to sort in descending order. For example, the value `-created_at` sorts the collection by the `created_at` field in descending order, and the value `name` sorts it by the `name` field in ascending order. */
    export enum Sort {
      CREATED_AT = 'created_at',
      NAME = 'name',
      ADDRESS = 'address',
    }
  }

  /** Parameters for the `createSubnetReservedIp` operation. */
  export interface CreateSubnetReservedIpParams {
    /** The subnet identifier. */
    subnetId: string;
    /** If set to `true`, this reserved IP will be automatically deleted when the target is deleted or when the
     *  reserved IP is unbound. The value cannot be set to `true` if the reserved IP is unbound.
     */
    autoDelete?: boolean;
    /** The user-defined name for this reserved IP. If not specified, the name will be a hyphenated list of
     *  randomly-selected words. Names must be unique within the subnet the reserved IP resides in. Names beginning with
     *  `ibm-` are reserved for provider-owned resources.
     */
    name?: string;
    /** The target this reserved IP is to be bound to. */
    target?: ReservedIPTargetPrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteSubnetReservedIp` operation. */
  export interface DeleteSubnetReservedIpParams {
    /** The subnet identifier. */
    subnetId: string;
    /** The reserved IP identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSubnetReservedIp` operation. */
  export interface GetSubnetReservedIpParams {
    /** The subnet identifier. */
    subnetId: string;
    /** The reserved IP identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSubnetReservedIp` operation. */
  export interface UpdateSubnetReservedIpParams {
    /** The subnet identifier. */
    subnetId: string;
    /** The reserved IP identifier. */
    id: string;
    /** If set to `true`, this reserved IP will be automatically deleted when the target is deleted or when the
     *  reserved IP is unbound. The value cannot be set to `true` if the reserved IP is unbound.
     */
    autoDelete?: boolean;
    /** The user-defined name for this reserved IP. Names must be unique within the subnet the reserved IP resides
     *  in. Names beginning with `ibm-` are reserved for provider-owned resources.
     */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listImages` operation. */
  export interface ListImagesParams {
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    /** Filters the collection to resources within one of the resource groups identified in a comma-separated list
     *  of resource group identifiers.
     */
    resourceGroupId?: string;
    /** Filters the collection to resources with the exact specified name. */
    name?: string;
    /** Filters the collection to images with the specified `visibility`. */
    visibility?: ListImagesConstants.Visibility | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listImages` operation. */
  export namespace ListImagesConstants {
    /** Filters the collection to images with the specified `visibility`. */
    export enum Visibility {
      PRIVATE = 'private',
      PUBLIC = 'public',
    }
  }

  /** Parameters for the `createImage` operation. */
  export interface CreateImageParams {
    /** The image prototype object. */
    imagePrototype: ImagePrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteImage` operation. */
  export interface DeleteImageParams {
    /** The image identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getImage` operation. */
  export interface GetImageParams {
    /** The image identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateImage` operation. */
  export interface UpdateImageParams {
    /** The image identifier. */
    id: string;
    /** The unique user-defined name for this image. Names starting with "ibm-" are not allowed. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listOperatingSystems` operation. */
  export interface ListOperatingSystemsParams {
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getOperatingSystem` operation. */
  export interface GetOperatingSystemParams {
    /** The operating system name. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listKeys` operation. */
  export interface ListKeysParams {
    /** Filters the collection to resources within one of the resource groups identified in a comma-separated list
     *  of resource group identifiers.
     */
    resourceGroupId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createKey` operation. */
  export interface CreateKeyParams {
    /** A unique public SSH key to import, encoded in PEM format. The key (prior to encoding) must be either 2048 or
     *  4096 bits long.
     */
    publicKey: string;
    /** The unique user-defined name for this key. If unspecified, the name will be a hyphenated list of
     *  randomly-selected words.
     */
    name?: string;
    /** The resource group to use. If unspecified, the account's [default resource
     *  group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
     */
    resourceGroup?: ResourceGroupIdentity;
    /** The crypto-system used by this key. */
    type?: CreateKeyConstants.Type | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createKey` operation. */
  export namespace CreateKeyConstants {
    /** The crypto-system used by this key. */
    export enum Type {
      RSA = 'rsa',
    }
  }

  /** Parameters for the `deleteKey` operation. */
  export interface DeleteKeyParams {
    /** The key identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getKey` operation. */
  export interface GetKeyParams {
    /** The key identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateKey` operation. */
  export interface UpdateKeyParams {
    /** The key identifier. */
    id: string;
    /** The user-defined name for this key. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listInstanceProfiles` operation. */
  export interface ListInstanceProfilesParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getInstanceProfile` operation. */
  export interface GetInstanceProfileParams {
    /** The instance profile name. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listInstanceTemplates` operation. */
  export interface ListInstanceTemplatesParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createInstanceTemplate` operation. */
  export interface CreateInstanceTemplateParams {
    /** The instance template prototype object. */
    instanceTemplatePrototype: InstanceTemplatePrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteInstanceTemplate` operation. */
  export interface DeleteInstanceTemplateParams {
    /** The instance template identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getInstanceTemplate` operation. */
  export interface GetInstanceTemplateParams {
    /** The instance template identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateInstanceTemplate` operation. */
  export interface UpdateInstanceTemplateParams {
    /** The instance template identifier. */
    id: string;
    /** The unique user-defined name for this instance template. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listInstances` operation. */
  export interface ListInstancesParams {
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    /** Filters the collection to resources within one of the resource groups identified in a comma-separated list
     *  of resource group identifiers.
     */
    resourceGroupId?: string;
    /** Filters the collection to resources with the exact specified name. */
    name?: string;
    /** Filters the collection to resources in the VPC with the specified identifier. */
    vpcId?: string;
    /** Filters the collection to resources in the VPC with the specified CRN. */
    vpcCrn?: string;
    /** Filters the collection to resources in the VPC with the exact specified name. */
    vpcName?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createInstance` operation. */
  export interface CreateInstanceParams {
    /** The instance prototype object. */
    instancePrototype: InstancePrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteInstance` operation. */
  export interface DeleteInstanceParams {
    /** The instance identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getInstance` operation. */
  export interface GetInstanceParams {
    /** The instance identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateInstance` operation. */
  export interface UpdateInstanceParams {
    /** The instance identifier. */
    id: string;
    /** The user-defined name for this virtual server instance (and default system hostname). */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getInstanceInitialization` operation. */
  export interface GetInstanceInitializationParams {
    /** The instance identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createInstanceAction` operation. */
  export interface CreateInstanceActionParams {
    /** The instance identifier. */
    instanceId: string;
    /** The type of action. */
    type: CreateInstanceActionConstants.Type | string;
    /** If set to true, the action will be forced immediately, and all queued actions deleted. Ignored for the start
     *  action.
     */
    force?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createInstanceAction` operation. */
  export namespace CreateInstanceActionConstants {
    /** The type of action. */
    export enum Type {
      REBOOT = 'reboot',
      START = 'start',
      STOP = 'stop',
    }
  }

  /** Parameters for the `listInstanceNetworkInterfaces` operation. */
  export interface ListInstanceNetworkInterfacesParams {
    /** The instance identifier. */
    instanceId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createInstanceNetworkInterface` operation. */
  export interface CreateInstanceNetworkInterfaceParams {
    /** The instance identifier. */
    instanceId: string;
    /** The associated subnet. */
    subnet: SubnetIdentity;
    /** Indicates whether IP spoofing is allowed on this interface. If false, IP spoofing is prevented on this
     *  interface. If true, IP spoofing is allowed on this interface.
     */
    allowIpSpoofing?: boolean;
    /** The user-defined name for this network interface. If unspecified, the name will be a hyphenated list of
     *  randomly-selected words.
     */
    name?: string;
    /** The primary IPv4 address. If specified, it must be an available address on the network interface's subnet.
     *  If unspecified, an available address on the subnet will be automatically selected.
     */
    primaryIpv4Address?: string;
    /** Collection of security groups. */
    securityGroups?: SecurityGroupIdentity[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteInstanceNetworkInterface` operation. */
  export interface DeleteInstanceNetworkInterfaceParams {
    /** The instance identifier. */
    instanceId: string;
    /** The network interface identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getInstanceNetworkInterface` operation. */
  export interface GetInstanceNetworkInterfaceParams {
    /** The instance identifier. */
    instanceId: string;
    /** The network interface identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateInstanceNetworkInterface` operation. */
  export interface UpdateInstanceNetworkInterfaceParams {
    /** The instance identifier. */
    instanceId: string;
    /** The network interface identifier. */
    id: string;
    /** Indicates whether IP spoofing is allowed on this interface. Updating to true allows IP spoofing on this
     *  interface. Updating to false prevents IP spoofing on this interface.
     */
    allowIpSpoofing?: boolean;
    /** The user-defined name for this network interface. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listInstanceNetworkInterfaceFloatingIps` operation. */
  export interface ListInstanceNetworkInterfaceFloatingIpsParams {
    /** The instance identifier. */
    instanceId: string;
    /** The network interface identifier. */
    networkInterfaceId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `removeInstanceNetworkInterfaceFloatingIp` operation. */
  export interface RemoveInstanceNetworkInterfaceFloatingIpParams {
    /** The instance identifier. */
    instanceId: string;
    /** The network interface identifier. */
    networkInterfaceId: string;
    /** The floating IP identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getInstanceNetworkInterfaceFloatingIp` operation. */
  export interface GetInstanceNetworkInterfaceFloatingIpParams {
    /** The instance identifier. */
    instanceId: string;
    /** The network interface identifier. */
    networkInterfaceId: string;
    /** The floating IP identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addInstanceNetworkInterfaceFloatingIp` operation. */
  export interface AddInstanceNetworkInterfaceFloatingIpParams {
    /** The instance identifier. */
    instanceId: string;
    /** The network interface identifier. */
    networkInterfaceId: string;
    /** The floating IP identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listInstanceVolumeAttachments` operation. */
  export interface ListInstanceVolumeAttachmentsParams {
    /** The instance identifier. */
    instanceId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createInstanceVolumeAttachment` operation. */
  export interface CreateInstanceVolumeAttachmentParams {
    /** The instance identifier. */
    instanceId: string;
    /** The identity of the volume to attach to the instance. */
    volume: VolumeIdentity;
    /** If set to true, when deleting the instance the volume will also be deleted. */
    deleteVolumeOnInstanceDelete?: boolean;
    /** The user-defined name for this volume attachment. If unspecified, the name will be a hyphenated list of
     *  randomly-selected words.
     */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteInstanceVolumeAttachment` operation. */
  export interface DeleteInstanceVolumeAttachmentParams {
    /** The instance identifier. */
    instanceId: string;
    /** The volume attachment identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getInstanceVolumeAttachment` operation. */
  export interface GetInstanceVolumeAttachmentParams {
    /** The instance identifier. */
    instanceId: string;
    /** The volume attachment identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateInstanceVolumeAttachment` operation. */
  export interface UpdateInstanceVolumeAttachmentParams {
    /** The instance identifier. */
    instanceId: string;
    /** The volume attachment identifier. */
    id: string;
    /** If set to true, when deleting the instance the volume will also be deleted. */
    deleteVolumeOnInstanceDelete?: boolean;
    /** The user-defined name for this volume attachment. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listInstanceGroups` operation. */
  export interface ListInstanceGroupsParams {
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createInstanceGroup` operation. */
  export interface CreateInstanceGroupParams {
    /** Instance template to use when creating new instances. */
    instanceTemplate: InstanceTemplateIdentity;
    /** Array of identities to subnets to use when creating new instances. */
    subnets: SubnetIdentity[];
    /** Required if specifying a load balancer pool only. Used by the instance group when scaling up instances to
     *  supply the port for the load balancer pool member.
     */
    applicationPort?: number;
    /** The load balancer that the load balancer pool used by this group
     *  is in. Must be supplied when using a load balancer pool.
     */
    loadBalancer?: LoadBalancerIdentity;
    /** When specified, the load balancer pool will be managed by this
     *  group. Instances created by this group will have a new load
     *  balancer pool member in that pool created. Must be used with
     *  `application_port`.
     */
    loadBalancerPool?: LoadBalancerPoolIdentity;
    /** The number of instances in the instance group. */
    membershipCount?: number;
    /** The user-defined name for this instance group. */
    name?: string;
    /** The resource group to use. If unspecified, the account's [default resource
     *  group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
     */
    resourceGroup?: ResourceGroupIdentity;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteInstanceGroup` operation. */
  export interface DeleteInstanceGroupParams {
    /** The instance group identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getInstanceGroup` operation. */
  export interface GetInstanceGroupParams {
    /** The instance group identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateInstanceGroup` operation. */
  export interface UpdateInstanceGroupParams {
    /** The instance group identifier. */
    id: string;
    /** Required if specifying a load balancer pool only. Used by the instance group when scaling up instances to
     *  supply the port for the load balancer pool member.
     */
    applicationPort?: number;
    /** Instance template to use when creating new instances. */
    instanceTemplate?: InstanceTemplateIdentity;
    /** The load balancer that the load balancer pool used by this group
     *  is in. Must be supplied when using a load balancer pool.
     */
    loadBalancer?: LoadBalancerIdentity;
    /** When specified, the load balancer pool will be managed by this
     *  group. Instances created by this group will have a new load
     *  balancer pool member in that pool created. Must be used with
     *  `application_port`.
     */
    loadBalancerPool?: LoadBalancerPoolIdentity;
    /** The number of instances in the instance group. */
    membershipCount?: number;
    /** The user-defined name for this instance group. */
    name?: string;
    /** Array of identities to subnets to use when creating new instances. */
    subnets?: SubnetIdentity[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteInstanceGroupLoadBalancer` operation. */
  export interface DeleteInstanceGroupLoadBalancerParams {
    /** The instance group identifier. */
    instanceGroupId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listInstanceGroupManagers` operation. */
  export interface ListInstanceGroupManagersParams {
    /** The instance group identifier. */
    instanceGroupId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createInstanceGroupManager` operation. */
  export interface CreateInstanceGroupManagerParams {
    /** The instance group identifier. */
    instanceGroupId: string;
    /** The instance group manager prototype object. */
    instanceGroupManagerPrototype: InstanceGroupManagerPrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteInstanceGroupManager` operation. */
  export interface DeleteInstanceGroupManagerParams {
    /** The instance group identifier. */
    instanceGroupId: string;
    /** The instance group manager identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getInstanceGroupManager` operation. */
  export interface GetInstanceGroupManagerParams {
    /** The instance group identifier. */
    instanceGroupId: string;
    /** The instance group manager identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateInstanceGroupManager` operation. */
  export interface UpdateInstanceGroupManagerParams {
    /** The instance group identifier. */
    instanceGroupId: string;
    /** The instance group manager identifier. */
    id: string;
    /** The time window in seconds to aggregate metrics prior to evaluation. */
    aggregationWindow?: number;
    /** The duration of time in seconds to pause further scale actions after scaling has taken place. */
    cooldown?: number;
    /** If set to `true`, this manager will control the instance group. */
    managementEnabled?: boolean;
    /** The maximum number of members in a managed instance group. */
    maxMembershipCount?: number;
    /** The minimum number of members in a managed instance group. */
    minMembershipCount?: number;
    /** The user-defined name for this instance group manager. Names must be unique within the instance group. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listInstanceGroupManagerPolicies` operation. */
  export interface ListInstanceGroupManagerPoliciesParams {
    /** The instance group identifier. */
    instanceGroupId: string;
    /** The instance group manager identifier. */
    instanceGroupManagerId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createInstanceGroupManagerPolicy` operation. */
  export interface CreateInstanceGroupManagerPolicyParams {
    /** The instance group identifier. */
    instanceGroupId: string;
    /** The instance group manager identifier. */
    instanceGroupManagerId: string;
    /** The instance group manager policy prototype object. */
    instanceGroupManagerPolicyPrototype: InstanceGroupManagerPolicyPrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteInstanceGroupManagerPolicy` operation. */
  export interface DeleteInstanceGroupManagerPolicyParams {
    /** The instance group identifier. */
    instanceGroupId: string;
    /** The instance group manager identifier. */
    instanceGroupManagerId: string;
    /** The instance group manager policy identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getInstanceGroupManagerPolicy` operation. */
  export interface GetInstanceGroupManagerPolicyParams {
    /** The instance group identifier. */
    instanceGroupId: string;
    /** The instance group manager identifier. */
    instanceGroupManagerId: string;
    /** The instance group manager policy identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateInstanceGroupManagerPolicy` operation. */
  export interface UpdateInstanceGroupManagerPolicyParams {
    /** The instance group identifier. */
    instanceGroupId: string;
    /** The instance group manager identifier. */
    instanceGroupManagerId: string;
    /** The instance group manager policy identifier. */
    id: string;
    /** The type of metric to be evaluated. */
    metricType?: UpdateInstanceGroupManagerPolicyConstants.MetricType | string;
    /** The metric value to be evaluated. */
    metricValue?: number;
    /** The user-defined name for this instance group manager policy. Names must be unique within the instance group
     *  manager.
     */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateInstanceGroupManagerPolicy` operation. */
  export namespace UpdateInstanceGroupManagerPolicyConstants {
    /** The type of metric to be evaluated. */
    export enum MetricType {
      CPU = 'cpu',
      MEMORY = 'memory',
      NETWORK_IN = 'network_in',
      NETWORK_OUT = 'network_out',
    }
  }

  /** Parameters for the `deleteInstanceGroupMemberships` operation. */
  export interface DeleteInstanceGroupMembershipsParams {
    /** The instance group identifier. */
    instanceGroupId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listInstanceGroupMemberships` operation. */
  export interface ListInstanceGroupMembershipsParams {
    /** The instance group identifier. */
    instanceGroupId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteInstanceGroupMembership` operation. */
  export interface DeleteInstanceGroupMembershipParams {
    /** The instance group identifier. */
    instanceGroupId: string;
    /** The instance group membership identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getInstanceGroupMembership` operation. */
  export interface GetInstanceGroupMembershipParams {
    /** The instance group identifier. */
    instanceGroupId: string;
    /** The instance group membership identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateInstanceGroupMembership` operation. */
  export interface UpdateInstanceGroupMembershipParams {
    /** The instance group identifier. */
    instanceGroupId: string;
    /** The instance group membership identifier. */
    id: string;
    /** The user-defined name for this instance group membership. Names must be unique within the instance group. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listVolumeProfiles` operation. */
  export interface ListVolumeProfilesParams {
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getVolumeProfile` operation. */
  export interface GetVolumeProfileParams {
    /** The volume profile name. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listVolumes` operation. */
  export interface ListVolumesParams {
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    /** Filters the collection to resources with the exact specified name. */
    name?: string;
    /** Filters the collection to resources in the zone with the exact specified name. */
    zoneName?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createVolume` operation. */
  export interface CreateVolumeParams {
    /** The volume prototype object. */
    volumePrototype: VolumePrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteVolume` operation. */
  export interface DeleteVolumeParams {
    /** The volume identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getVolume` operation. */
  export interface GetVolumeParams {
    /** The volume identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateVolume` operation. */
  export interface UpdateVolumeParams {
    /** The volume identifier. */
    id: string;
    /** The unique user-defined name for this volume. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listRegions` operation. */
  export interface ListRegionsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getRegion` operation. */
  export interface GetRegionParams {
    /** The region name. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listRegionZones` operation. */
  export interface ListRegionZonesParams {
    /** The region name. */
    regionName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getRegionZone` operation. */
  export interface GetRegionZoneParams {
    /** The region name. */
    regionName: string;
    /** The zone name. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listPublicGateways` operation. */
  export interface ListPublicGatewaysParams {
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    /** Filters the collection to resources within one of the resource groups identified in a comma-separated list
     *  of resource group identifiers.
     */
    resourceGroupId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createPublicGateway` operation. */
  export interface CreatePublicGatewayParams {
    /** The VPC this public gateway will serve. */
    vpc: VPCIdentity;
    /** The zone where this public gateway will be created. */
    zone: ZoneIdentity;
    floatingIp?: PublicGatewayFloatingIPPrototype;
    /** The user-defined name for this public gateway. Names must be unique within the VPC the public gateway
     *  resides in. If unspecified, the name will be a hyphenated list of randomly-selected words.
     */
    name?: string;
    /** The resource group to use. If unspecified, the account's [default resource
     *  group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
     */
    resourceGroup?: ResourceGroupIdentity;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deletePublicGateway` operation. */
  export interface DeletePublicGatewayParams {
    /** The public gateway identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getPublicGateway` operation. */
  export interface GetPublicGatewayParams {
    /** The public gateway identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updatePublicGateway` operation. */
  export interface UpdatePublicGatewayParams {
    /** The public gateway identifier. */
    id: string;
    /** The user-defined name for this public gateway. Names must be unique within the VPC the public gateway
     *  resides in.
     */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listFloatingIps` operation. */
  export interface ListFloatingIpsParams {
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    /** Filters the collection to resources within one of the resource groups identified in a comma-separated list
     *  of resource group identifiers.
     */
    resourceGroupId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createFloatingIp` operation. */
  export interface CreateFloatingIpParams {
    /** The floating IP prototype object. */
    floatingIpPrototype: FloatingIPPrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteFloatingIp` operation. */
  export interface DeleteFloatingIpParams {
    /** The floating IP identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getFloatingIp` operation. */
  export interface GetFloatingIpParams {
    /** The floating IP identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateFloatingIp` operation. */
  export interface UpdateFloatingIpParams {
    /** The floating IP identifier. */
    id: string;
    /** The unique user-defined name for this floating IP. */
    name?: string;
    /** A new network interface to bind this floating IP to, replacing any existing binding.
     *  For this request to succeed, the existing floating IP must not be required by another
     *  resource, such as a public gateway.
     */
    target?: FloatingIPPatchTargetNetworkInterfaceIdentity;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listNetworkAcls` operation. */
  export interface ListNetworkAclsParams {
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    /** Filters the collection to resources within one of the resource groups identified in a comma-separated list
     *  of resource group identifiers.
     */
    resourceGroupId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createNetworkAcl` operation. */
  export interface CreateNetworkAclParams {
    /** The network ACL prototype object. */
    networkAclPrototype?: NetworkACLPrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteNetworkAcl` operation. */
  export interface DeleteNetworkAclParams {
    /** The network ACL identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getNetworkAcl` operation. */
  export interface GetNetworkAclParams {
    /** The network ACL identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateNetworkAcl` operation. */
  export interface UpdateNetworkAclParams {
    /** The network ACL identifier. */
    id: string;
    /** The user-defined name for this network ACL. Names must be unique within the VPC the network ACL resides in. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listNetworkAclRules` operation. */
  export interface ListNetworkAclRulesParams {
    /** The network ACL identifier. */
    networkAclId: string;
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    /** Filters the collection to rules with the specified direction. */
    direction?: ListNetworkAclRulesConstants.Direction | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listNetworkAclRules` operation. */
  export namespace ListNetworkAclRulesConstants {
    /** Filters the collection to rules with the specified direction. */
    export enum Direction {
      INBOUND = 'inbound',
      OUTBOUND = 'outbound',
    }
  }

  /** Parameters for the `createNetworkAclRule` operation. */
  export interface CreateNetworkAclRuleParams {
    /** The network ACL identifier. */
    networkAclId: string;
    /** The network ACL rule prototype object. */
    networkAclRulePrototype: NetworkACLRulePrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteNetworkAclRule` operation. */
  export interface DeleteNetworkAclRuleParams {
    /** The network ACL identifier. */
    networkAclId: string;
    /** The rule identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getNetworkAclRule` operation. */
  export interface GetNetworkAclRuleParams {
    /** The network ACL identifier. */
    networkAclId: string;
    /** The rule identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateNetworkAclRule` operation. */
  export interface UpdateNetworkAclRuleParams {
    /** The network ACL identifier. */
    networkAclId: string;
    /** The rule identifier. */
    id: string;
    /** Whether to allow or deny matching traffic. */
    action?: UpdateNetworkAclRuleConstants.Action | string;
    /** The rule to move this rule immediately before. Specify `null` to move this rule after all existing rules. */
    before?: NetworkACLRuleBeforePatch;
    /** The ICMP traffic code to allow. */
    code?: number;
    /** The destination IP address or CIDR block. The CIDR block `0.0.0.0/0` applies to all addresses. */
    destination?: string;
    /** The inclusive upper bound of TCP/UDP destination port range. */
    destinationPortMax?: number;
    /** The inclusive lower bound of TCP/UDP destination port range. */
    destinationPortMin?: number;
    /** Whether the traffic to be matched is `inbound` or `outbound`. */
    direction?: UpdateNetworkAclRuleConstants.Direction | string;
    /** The user-defined name for this rule. Names must be unique within the network ACL the rule resides in. */
    name?: string;
    /** The source IP address or CIDR block.  The CIDR block `0.0.0.0/0` applies to all addresses. */
    source?: string;
    /** The inclusive upper bound of TCP/UDP source port range. */
    sourcePortMax?: number;
    /** The inclusive lower bound of TCP/UDP source port range. */
    sourcePortMin?: number;
    /** The ICMP traffic type to allow. */
    type?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateNetworkAclRule` operation. */
  export namespace UpdateNetworkAclRuleConstants {
    /** Whether to allow or deny matching traffic. */
    export enum Action {
      ALLOW = 'allow',
      DENY = 'deny',
    }
    /** Whether the traffic to be matched is `inbound` or `outbound`. */
    export enum Direction {
      INBOUND = 'inbound',
      OUTBOUND = 'outbound',
    }
  }

  /** Parameters for the `listSecurityGroups` operation. */
  export interface ListSecurityGroupsParams {
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    /** Filters the collection to resources within one of the resource groups identified in a comma-separated list
     *  of resource group identifiers.
     */
    resourceGroupId?: string;
    /** Filters the collection to resources in the VPC with the specified identifier. */
    vpcId?: string;
    /** Filters the collection to resources in the VPC with the specified CRN. */
    vpcCrn?: string;
    /** Filters the collection to resources in the VPC with the exact specified name. */
    vpcName?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSecurityGroup` operation. */
  export interface CreateSecurityGroupParams {
    /** The VPC this security group is to be a part of. */
    vpc: VPCIdentity;
    /** The user-defined name for this security group. If unspecified, the name will be a hyphenated list of
     *  randomly-selected words. Names must be unique within the VPC the security group resides in.
     */
    name?: string;
    /** The resource group to use. If unspecified, the account's [default resource
     *  group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
     */
    resourceGroup?: ResourceGroupIdentity;
    /** Array of rule prototype objects for rules to be created for this security group. If unspecified, no rules
     *  will be created, resulting in all traffic being denied.
     */
    rules?: SecurityGroupRulePrototype[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteSecurityGroup` operation. */
  export interface DeleteSecurityGroupParams {
    /** The security group identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSecurityGroup` operation. */
  export interface GetSecurityGroupParams {
    /** The security group identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSecurityGroup` operation. */
  export interface UpdateSecurityGroupParams {
    /** The security group identifier. */
    id: string;
    /** The user-defined name for this security group. Names must be unique within the VPC the security group
     *  resides in.
     */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSecurityGroupNetworkInterfaces` operation. */
  export interface ListSecurityGroupNetworkInterfacesParams {
    /** The security group identifier. */
    securityGroupId: string;
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `removeSecurityGroupNetworkInterface` operation. */
  export interface RemoveSecurityGroupNetworkInterfaceParams {
    /** The security group identifier. */
    securityGroupId: string;
    /** The network interface identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSecurityGroupNetworkInterface` operation. */
  export interface GetSecurityGroupNetworkInterfaceParams {
    /** The security group identifier. */
    securityGroupId: string;
    /** The network interface identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addSecurityGroupNetworkInterface` operation. */
  export interface AddSecurityGroupNetworkInterfaceParams {
    /** The security group identifier. */
    securityGroupId: string;
    /** The network interface identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSecurityGroupRules` operation. */
  export interface ListSecurityGroupRulesParams {
    /** The security group identifier. */
    securityGroupId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSecurityGroupRule` operation. */
  export interface CreateSecurityGroupRuleParams {
    /** The security group identifier. */
    securityGroupId: string;
    /** The properties of the security group rule to be created. */
    securityGroupRulePrototype: SecurityGroupRulePrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteSecurityGroupRule` operation. */
  export interface DeleteSecurityGroupRuleParams {
    /** The security group identifier. */
    securityGroupId: string;
    /** The rule identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSecurityGroupRule` operation. */
  export interface GetSecurityGroupRuleParams {
    /** The security group identifier. */
    securityGroupId: string;
    /** The rule identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSecurityGroupRule` operation. */
  export interface UpdateSecurityGroupRuleParams {
    /** The security group identifier. */
    securityGroupId: string;
    /** The rule identifier. */
    id: string;
    /** The ICMP traffic code to allow. */
    code?: number;
    /** The direction of traffic to enforce, either `inbound` or `outbound`. */
    direction?: UpdateSecurityGroupRuleConstants.Direction | string;
    /** The IP version to enforce. The format of `remote.address` or `remote.cidr_block` must match this field, if
     *  they are used. Alternatively, if `remote` references a security group, then this rule only applies to IP
     *  addresses (network interfaces) in that group matching this IP version.
     */
    ipVersion?: UpdateSecurityGroupRuleConstants.IpVersion | string;
    /** The inclusive upper bound of TCP/UDP port range. */
    portMax?: number;
    /** The inclusive lower bound of TCP/UDP port range. */
    portMin?: number;
    /** The IP addresses or security groups from which this rule will allow traffic (or to
     *  which, for outbound rules). Can be specified as an IP address, a CIDR block, or a
     *  security group. A CIDR block of `0.0.0.0/0` will allow traffic from any source (or to
     *  any source, for outbound rules).
     */
    remote?: SecurityGroupRuleRemotePatch;
    /** The ICMP traffic type to allow. */
    type?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateSecurityGroupRule` operation. */
  export namespace UpdateSecurityGroupRuleConstants {
    /** The direction of traffic to enforce, either `inbound` or `outbound`. */
    export enum Direction {
      INBOUND = 'inbound',
      OUTBOUND = 'outbound',
    }
    /** The IP version to enforce. The format of `remote.address` or `remote.cidr_block` must match this field, if they are used. Alternatively, if `remote` references a security group, then this rule only applies to IP addresses (network interfaces) in that group matching this IP version. */
    export enum IpVersion {
      IPV4 = 'ipv4',
    }
  }

  /** Parameters for the `listIkePolicies` operation. */
  export interface ListIkePoliciesParams {
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createIkePolicy` operation. */
  export interface CreateIkePolicyParams {
    /** The authentication algorithm. */
    authenticationAlgorithm: CreateIkePolicyConstants.AuthenticationAlgorithm | string;
    /** The Diffie-Hellman group. */
    dhGroup: number;
    /** The encryption algorithm. */
    encryptionAlgorithm: CreateIkePolicyConstants.EncryptionAlgorithm | string;
    /** The IKE protocol version. */
    ikeVersion: number;
    /** The key lifetime in seconds. */
    keyLifetime?: number;
    /** The user-defined name for this IKE policy. */
    name?: string;
    /** The resource group to use. If unspecified, the account's [default resource
     *  group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
     */
    resourceGroup?: ResourceGroupIdentity;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createIkePolicy` operation. */
  export namespace CreateIkePolicyConstants {
    /** The authentication algorithm. */
    export enum AuthenticationAlgorithm {
      MD5 = 'md5',
      SHA1 = 'sha1',
      SHA256 = 'sha256',
    }
    /** The encryption algorithm. */
    export enum EncryptionAlgorithm {
      TRIPLE_DES = 'triple_des',
      AES128 = 'aes128',
      AES256 = 'aes256',
    }
  }

  /** Parameters for the `deleteIkePolicy` operation. */
  export interface DeleteIkePolicyParams {
    /** The IKE policy identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getIkePolicy` operation. */
  export interface GetIkePolicyParams {
    /** The IKE policy identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateIkePolicy` operation. */
  export interface UpdateIkePolicyParams {
    /** The IKE policy identifier. */
    id: string;
    /** The authentication algorithm. */
    authenticationAlgorithm?: UpdateIkePolicyConstants.AuthenticationAlgorithm | string;
    /** The Diffie-Hellman group. */
    dhGroup?: number;
    /** The encryption algorithm. */
    encryptionAlgorithm?: UpdateIkePolicyConstants.EncryptionAlgorithm | string;
    /** The IKE protocol version. */
    ikeVersion?: number;
    /** The key lifetime in seconds. */
    keyLifetime?: number;
    /** The user-defined name for this IKE policy. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateIkePolicy` operation. */
  export namespace UpdateIkePolicyConstants {
    /** The authentication algorithm. */
    export enum AuthenticationAlgorithm {
      MD5 = 'md5',
      SHA1 = 'sha1',
      SHA256 = 'sha256',
    }
    /** The encryption algorithm. */
    export enum EncryptionAlgorithm {
      TRIPLE_DES = 'triple_des',
      AES128 = 'aes128',
      AES256 = 'aes256',
    }
  }

  /** Parameters for the `listIkePolicyConnections` operation. */
  export interface ListIkePolicyConnectionsParams {
    /** The IKE policy identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listIpsecPolicies` operation. */
  export interface ListIpsecPoliciesParams {
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createIpsecPolicy` operation. */
  export interface CreateIpsecPolicyParams {
    /** The authentication algorithm. */
    authenticationAlgorithm: CreateIpsecPolicyConstants.AuthenticationAlgorithm | string;
    /** The encryption algorithm. */
    encryptionAlgorithm: CreateIpsecPolicyConstants.EncryptionAlgorithm | string;
    /** Perfect Forward Secrecy. */
    pfs: CreateIpsecPolicyConstants.Pfs | string;
    /** The key lifetime in seconds. */
    keyLifetime?: number;
    /** The user-defined name for this IPsec policy. */
    name?: string;
    /** The resource group to use. If unspecified, the account's [default resource
     *  group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
     */
    resourceGroup?: ResourceGroupIdentity;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createIpsecPolicy` operation. */
  export namespace CreateIpsecPolicyConstants {
    /** The authentication algorithm. */
    export enum AuthenticationAlgorithm {
      MD5 = 'md5',
      SHA1 = 'sha1',
      SHA256 = 'sha256',
    }
    /** The encryption algorithm. */
    export enum EncryptionAlgorithm {
      TRIPLE_DES = 'triple_des',
      AES128 = 'aes128',
      AES256 = 'aes256',
    }
    /** Perfect Forward Secrecy. */
    export enum Pfs {
      DISABLED = 'disabled',
      GROUP_14 = 'group_14',
      GROUP_2 = 'group_2',
      GROUP_5 = 'group_5',
    }
  }

  /** Parameters for the `deleteIpsecPolicy` operation. */
  export interface DeleteIpsecPolicyParams {
    /** The IPsec policy identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getIpsecPolicy` operation. */
  export interface GetIpsecPolicyParams {
    /** The IPsec policy identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateIpsecPolicy` operation. */
  export interface UpdateIpsecPolicyParams {
    /** The IPsec policy identifier. */
    id: string;
    /** The authentication algorithm. */
    authenticationAlgorithm?: UpdateIpsecPolicyConstants.AuthenticationAlgorithm | string;
    /** The encryption algorithm. */
    encryptionAlgorithm?: UpdateIpsecPolicyConstants.EncryptionAlgorithm | string;
    /** The key lifetime in seconds. */
    keyLifetime?: number;
    /** The user-defined name for this IPsec policy. */
    name?: string;
    /** Perfect Forward Secrecy. */
    pfs?: UpdateIpsecPolicyConstants.Pfs | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateIpsecPolicy` operation. */
  export namespace UpdateIpsecPolicyConstants {
    /** The authentication algorithm. */
    export enum AuthenticationAlgorithm {
      MD5 = 'md5',
      SHA1 = 'sha1',
      SHA256 = 'sha256',
    }
    /** The encryption algorithm. */
    export enum EncryptionAlgorithm {
      TRIPLE_DES = 'triple_des',
      AES128 = 'aes128',
      AES256 = 'aes256',
    }
    /** Perfect Forward Secrecy. */
    export enum Pfs {
      DISABLED = 'disabled',
      GROUP_14 = 'group_14',
      GROUP_2 = 'group_2',
      GROUP_5 = 'group_5',
    }
  }

  /** Parameters for the `listIpsecPolicyConnections` operation. */
  export interface ListIpsecPolicyConnectionsParams {
    /** The IPsec policy identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listVpnGateways` operation. */
  export interface ListVpnGatewaysParams {
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    /** Filters the collection to resources within one of the resource groups identified in a comma-separated list
     *  of resource group identifiers.
     */
    resourceGroupId?: string;
    /** Filters the collection to VPN gateways with the specified mode. */
    mode?: ListVpnGatewaysConstants.Mode | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listVpnGateways` operation. */
  export namespace ListVpnGatewaysConstants {
    /** Filters the collection to VPN gateways with the specified mode. */
    export enum Mode {
      POLICY = 'policy',
      ROUTE = 'route',
    }
  }

  /** Parameters for the `createVpnGateway` operation. */
  export interface CreateVpnGatewayParams {
    /** The VPN gateway prototype object. */
    vpnGatewayPrototype: VPNGatewayPrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteVpnGateway` operation. */
  export interface DeleteVpnGatewayParams {
    /** The VPN gateway identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getVpnGateway` operation. */
  export interface GetVpnGatewayParams {
    /** The VPN gateway identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateVpnGateway` operation. */
  export interface UpdateVpnGatewayParams {
    /** The VPN gateway identifier. */
    id: string;
    /** The user-defined name for this VPN gateway. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listVpnGatewayConnections` operation. */
  export interface ListVpnGatewayConnectionsParams {
    /** The VPN gateway identifier. */
    vpnGatewayId: string;
    /** Filters the collection to VPN gateway connections with the specified status. */
    status?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createVpnGatewayConnection` operation. */
  export interface CreateVpnGatewayConnectionParams {
    /** The VPN gateway identifier. */
    vpnGatewayId: string;
    /** The VPN gateway connection prototype object. */
    vpnGatewayConnectionPrototype: VPNGatewayConnectionPrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteVpnGatewayConnection` operation. */
  export interface DeleteVpnGatewayConnectionParams {
    /** The VPN gateway identifier. */
    vpnGatewayId: string;
    /** The VPN gateway connection identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getVpnGatewayConnection` operation. */
  export interface GetVpnGatewayConnectionParams {
    /** The VPN gateway identifier. */
    vpnGatewayId: string;
    /** The VPN gateway connection identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateVpnGatewayConnection` operation. */
  export interface UpdateVpnGatewayConnectionParams {
    /** The VPN gateway identifier. */
    vpnGatewayId: string;
    /** The VPN gateway connection identifier. */
    id: string;
    /** The VPN gateway connection patch. */
    vpnGatewayConnectionPatch: VPNGatewayConnectionPatch;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listVpnGatewayConnectionLocalCidrs` operation. */
  export interface ListVpnGatewayConnectionLocalCidrsParams {
    /** The VPN gateway identifier. */
    vpnGatewayId: string;
    /** The VPN gateway connection identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `removeVpnGatewayConnectionLocalCidr` operation. */
  export interface RemoveVpnGatewayConnectionLocalCidrParams {
    /** The VPN gateway identifier. */
    vpnGatewayId: string;
    /** The VPN gateway connection identifier. */
    id: string;
    /** The address prefix part of the CIDR. */
    cidrPrefix: string;
    /** The prefix length part of the CIDR. */
    prefixLength: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `checkVpnGatewayConnectionLocalCidr` operation. */
  export interface CheckVpnGatewayConnectionLocalCidrParams {
    /** The VPN gateway identifier. */
    vpnGatewayId: string;
    /** The VPN gateway connection identifier. */
    id: string;
    /** The address prefix part of the CIDR. */
    cidrPrefix: string;
    /** The prefix length part of the CIDR. */
    prefixLength: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addVpnGatewayConnectionLocalCidr` operation. */
  export interface AddVpnGatewayConnectionLocalCidrParams {
    /** The VPN gateway identifier. */
    vpnGatewayId: string;
    /** The VPN gateway connection identifier. */
    id: string;
    /** The address prefix part of the CIDR. */
    cidrPrefix: string;
    /** The prefix length part of the CIDR. */
    prefixLength: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listVpnGatewayConnectionPeerCidrs` operation. */
  export interface ListVpnGatewayConnectionPeerCidrsParams {
    /** The VPN gateway identifier. */
    vpnGatewayId: string;
    /** The VPN gateway connection identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `removeVpnGatewayConnectionPeerCidr` operation. */
  export interface RemoveVpnGatewayConnectionPeerCidrParams {
    /** The VPN gateway identifier. */
    vpnGatewayId: string;
    /** The VPN gateway connection identifier. */
    id: string;
    /** The address prefix part of the CIDR. */
    cidrPrefix: string;
    /** The prefix length part of the CIDR. */
    prefixLength: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `checkVpnGatewayConnectionPeerCidr` operation. */
  export interface CheckVpnGatewayConnectionPeerCidrParams {
    /** The VPN gateway identifier. */
    vpnGatewayId: string;
    /** The VPN gateway connection identifier. */
    id: string;
    /** The address prefix part of the CIDR. */
    cidrPrefix: string;
    /** The prefix length part of the CIDR. */
    prefixLength: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addVpnGatewayConnectionPeerCidr` operation. */
  export interface AddVpnGatewayConnectionPeerCidrParams {
    /** The VPN gateway identifier. */
    vpnGatewayId: string;
    /** The VPN gateway connection identifier. */
    id: string;
    /** The address prefix part of the CIDR. */
    cidrPrefix: string;
    /** The prefix length part of the CIDR. */
    prefixLength: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listLoadBalancerProfiles` operation. */
  export interface ListLoadBalancerProfilesParams {
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLoadBalancerProfile` operation. */
  export interface GetLoadBalancerProfileParams {
    /** The load balancer profile name. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listLoadBalancers` operation. */
  export interface ListLoadBalancersParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createLoadBalancer` operation. */
  export interface CreateLoadBalancerParams {
    /** Indicates whether this load balancer is public or private. */
    isPublic: boolean;
    /** The subnets to provision this load balancer. */
    subnets: SubnetIdentity[];
    /** The listeners of this load balancer. */
    listeners?: LoadBalancerListenerPrototypeLoadBalancerContext[];
    /** The user-defined name for this load balancer. If unspecified, the name will be a hyphenated list of
     *  randomly-selected words.
     */
    name?: string;
    /** The pools of this load balancer. */
    pools?: LoadBalancerPoolPrototype[];
    /** The profile to use for this load balancer. */
    profile?: LoadBalancerProfileIdentity;
    /** The resource group to use. If unspecified, the account's [default resource
     *  group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
     */
    resourceGroup?: ResourceGroupIdentity;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteLoadBalancer` operation. */
  export interface DeleteLoadBalancerParams {
    /** The load balancer identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLoadBalancer` operation. */
  export interface GetLoadBalancerParams {
    /** The load balancer identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateLoadBalancer` operation. */
  export interface UpdateLoadBalancerParams {
    /** The load balancer identifier. */
    id: string;
    /** The unique user-defined name for this load balancer. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLoadBalancerStatistics` operation. */
  export interface GetLoadBalancerStatisticsParams {
    /** The load balancer identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listLoadBalancerListeners` operation. */
  export interface ListLoadBalancerListenersParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createLoadBalancerListener` operation. */
  export interface CreateLoadBalancerListenerParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The listener port number. Each listener in the load balancer must have a unique
     *  `port` and `protocol` combination.
     */
    port: number;
    /** The listener protocol. Load balancers in the `network` family support `tcp`. Load balancers in the
     *  `application` family support `tcp`, `http`, and `https`. Each listener in the load balancer must have a unique
     *  `port` and `protocol` combination.
     */
    protocol: CreateLoadBalancerListenerConstants.Protocol | string;
    /** If set to `true`, this listener will accept and forward PROXY protocol information. Supported by load
     *  balancers in the `application` family (otherwise always `false`).
     */
    acceptProxyProtocol?: boolean;
    /** The certificate instance used for SSL termination. It is applicable only to `https` protocol. */
    certificateInstance?: CertificateInstanceIdentity;
    /** The connection limit of the listener. */
    connectionLimit?: number;
    /** The default pool associated with the listener. The specified pool must:
     *
     *  - Belong to this load balancer
     *  - Have the same `protocol` as this listener
     *  - Not already be the default pool for another listener.
     */
    defaultPool?: LoadBalancerPoolIdentity;
    /** The list of policies of this listener. */
    policies?: LoadBalancerListenerPolicyPrototype[];
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createLoadBalancerListener` operation. */
  export namespace CreateLoadBalancerListenerConstants {
    /** The listener protocol. Load balancers in the `network` family support `tcp`. Load balancers in the `application` family support `tcp`, `http`, and `https`. Each listener in the load balancer must have a unique `port` and `protocol` combination. */
    export enum Protocol {
      HTTP = 'http',
      HTTPS = 'https',
      TCP = 'tcp',
    }
  }

  /** Parameters for the `deleteLoadBalancerListener` operation. */
  export interface DeleteLoadBalancerListenerParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The listener identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLoadBalancerListener` operation. */
  export interface GetLoadBalancerListenerParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The listener identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateLoadBalancerListener` operation. */
  export interface UpdateLoadBalancerListenerParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The listener identifier. */
    id: string;
    /** If set to `true`, this listener will accept and forward PROXY protocol information. Supported by load
     *  balancers in the `application` family (otherwise always `false`).
     */
    acceptProxyProtocol?: boolean;
    /** The certificate instance used for SSL termination. It is applicable only to `https` protocol. */
    certificateInstance?: CertificateInstanceIdentity;
    /** The connection limit of the listener. */
    connectionLimit?: number;
    /** The default pool associated with the listener. The specified pool must:
     *
     *  - Belong to this load balancer
     *  - Have the same `protocol` as this listener
     *  - Not already be the default pool for another listener.
     */
    defaultPool?: LoadBalancerPoolIdentity;
    /** The listener port number. Each listener in the load balancer must have a unique
     *  `port` and `protocol` combination.
     */
    port?: number;
    /** The listener protocol. Load balancers in the `network` family support `tcp`. Load balancers in the
     *  `application` family support `tcp`, `http`, and `https`. Each listener in the load balancer must have a unique
     *  `port` and `protocol` combination.
     */
    protocol?: UpdateLoadBalancerListenerConstants.Protocol | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateLoadBalancerListener` operation. */
  export namespace UpdateLoadBalancerListenerConstants {
    /** The listener protocol. Load balancers in the `network` family support `tcp`. Load balancers in the `application` family support `tcp`, `http`, and `https`. Each listener in the load balancer must have a unique `port` and `protocol` combination. */
    export enum Protocol {
      HTTP = 'http',
      HTTPS = 'https',
      TCP = 'tcp',
    }
  }

  /** Parameters for the `listLoadBalancerListenerPolicies` operation. */
  export interface ListLoadBalancerListenerPoliciesParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The listener identifier. */
    listenerId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createLoadBalancerListenerPolicy` operation. */
  export interface CreateLoadBalancerListenerPolicyParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The listener identifier. */
    listenerId: string;
    /** The policy action. */
    action: CreateLoadBalancerListenerPolicyConstants.Action | string;
    /** Priority of the policy. Lower value indicates higher priority. */
    priority: number;
    /** The user-defined name for this policy. Names must be unique within the load balancer listener the policy
     *  resides in.
     */
    name?: string;
    /** The list of rules of this policy. */
    rules?: LoadBalancerListenerPolicyRulePrototype[];
    /** When `action` is `forward`, `LoadBalancerPoolIdentity` is required to specify which
     *  pool the load balancer forwards the traffic to. When `action` is `redirect`,
     *  `LoadBalancerListenerPolicyRedirectURLPrototype` is required to specify the url and
     *  http status code used in the redirect response.
     */
    target?: LoadBalancerListenerPolicyTargetPrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createLoadBalancerListenerPolicy` operation. */
  export namespace CreateLoadBalancerListenerPolicyConstants {
    /** The policy action. */
    export enum Action {
      FORWARD = 'forward',
      REDIRECT = 'redirect',
      REJECT = 'reject',
    }
  }

  /** Parameters for the `deleteLoadBalancerListenerPolicy` operation. */
  export interface DeleteLoadBalancerListenerPolicyParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The listener identifier. */
    listenerId: string;
    /** The policy identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLoadBalancerListenerPolicy` operation. */
  export interface GetLoadBalancerListenerPolicyParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The listener identifier. */
    listenerId: string;
    /** The policy identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateLoadBalancerListenerPolicy` operation. */
  export interface UpdateLoadBalancerListenerPolicyParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The listener identifier. */
    listenerId: string;
    /** The policy identifier. */
    id: string;
    /** The user-defined name for this policy. Names must be unique within the load balancer listener the policy
     *  resides in.
     */
    name?: string;
    /** Priority of the policy. Lower value indicates higher priority. */
    priority?: number;
    /** When `action` is `forward`, `LoadBalancerPoolIdentity` specifies which pool the load
     *  balancer forwards the traffic to. When `action` is `redirect`,
     *  `LoadBalancerListenerPolicyRedirectURLPatch` specifies the url and http
     *  status code used in the redirect response.
     */
    target?: LoadBalancerListenerPolicyTargetPatch;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listLoadBalancerListenerPolicyRules` operation. */
  export interface ListLoadBalancerListenerPolicyRulesParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The listener identifier. */
    listenerId: string;
    /** The policy identifier. */
    policyId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createLoadBalancerListenerPolicyRule` operation. */
  export interface CreateLoadBalancerListenerPolicyRuleParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The listener identifier. */
    listenerId: string;
    /** The policy identifier. */
    policyId: string;
    /** The condition of the rule. */
    condition: CreateLoadBalancerListenerPolicyRuleConstants.Condition | string;
    /** The type of the rule. */
    type: CreateLoadBalancerListenerPolicyRuleConstants.Type | string;
    /** Value to be matched for rule condition. */
    value: string;
    /** HTTP header field. This is only applicable to "header" rule type. */
    field?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createLoadBalancerListenerPolicyRule` operation. */
  export namespace CreateLoadBalancerListenerPolicyRuleConstants {
    /** The condition of the rule. */
    export enum Condition {
      CONTAINS = 'contains',
      EQUALS = 'equals',
      MATCHES_REGEX = 'matches_regex',
    }
    /** The type of the rule. */
    export enum Type {
      HEADER = 'header',
      HOSTNAME = 'hostname',
      PATH = 'path',
    }
  }

  /** Parameters for the `deleteLoadBalancerListenerPolicyRule` operation. */
  export interface DeleteLoadBalancerListenerPolicyRuleParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The listener identifier. */
    listenerId: string;
    /** The policy identifier. */
    policyId: string;
    /** The rule identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLoadBalancerListenerPolicyRule` operation. */
  export interface GetLoadBalancerListenerPolicyRuleParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The listener identifier. */
    listenerId: string;
    /** The policy identifier. */
    policyId: string;
    /** The rule identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateLoadBalancerListenerPolicyRule` operation. */
  export interface UpdateLoadBalancerListenerPolicyRuleParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The listener identifier. */
    listenerId: string;
    /** The policy identifier. */
    policyId: string;
    /** The rule identifier. */
    id: string;
    /** The condition of the rule. */
    condition?: UpdateLoadBalancerListenerPolicyRuleConstants.Condition | string;
    /** HTTP header field. This is only applicable to "header" rule type. */
    field?: string;
    /** The type of the rule. */
    type?: UpdateLoadBalancerListenerPolicyRuleConstants.Type | string;
    /** Value to be matched for rule condition. */
    value?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateLoadBalancerListenerPolicyRule` operation. */
  export namespace UpdateLoadBalancerListenerPolicyRuleConstants {
    /** The condition of the rule. */
    export enum Condition {
      CONTAINS = 'contains',
      EQUALS = 'equals',
      MATCHES_REGEX = 'matches_regex',
    }
    /** The type of the rule. */
    export enum Type {
      HEADER = 'header',
      HOSTNAME = 'hostname',
      PATH = 'path',
    }
  }

  /** Parameters for the `listLoadBalancerPools` operation. */
  export interface ListLoadBalancerPoolsParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createLoadBalancerPool` operation. */
  export interface CreateLoadBalancerPoolParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The load balancing algorithm. */
    algorithm: CreateLoadBalancerPoolConstants.Algorithm | string;
    /** The health monitor of this pool. */
    healthMonitor: LoadBalancerPoolHealthMonitorPrototype;
    /** The protocol used for this load balancer pool. Load balancers in the `network` family support `tcp`. Load
     *  balancers in the `application` family support `tcp`, `http`, and
     *  `https`.
     */
    protocol: CreateLoadBalancerPoolConstants.Protocol | string;
    /** The members for this load balancer pool. For load balancers in the `network` family, the same `port` and
     *  `target` tuple cannot be shared by a pool member of any other load balancer in the same VPC.
     */
    members?: LoadBalancerPoolMemberPrototype[];
    /** The user-defined name for this load balancer pool. If unspecified, the name will be a hyphenated list of
     *  randomly-selected words.
     */
    name?: string;
    /** The PROXY protocol setting for this pool:
     *  - `v1`: Enabled with version 1 (human-readable header format)
     *  - `v2`: Enabled with version 2 (binary header format)
     *  - `disabled`: Disabled
     *
     *  Supported by load balancers in the `application` family (otherwise always `disabled`).
     */
    proxyProtocol?: CreateLoadBalancerPoolConstants.ProxyProtocol | string;
    /** The session persistence of this pool. */
    sessionPersistence?: LoadBalancerPoolSessionPersistencePrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createLoadBalancerPool` operation. */
  export namespace CreateLoadBalancerPoolConstants {
    /** The load balancing algorithm. */
    export enum Algorithm {
      LEAST_CONNECTIONS = 'least_connections',
      ROUND_ROBIN = 'round_robin',
      WEIGHTED_ROUND_ROBIN = 'weighted_round_robin',
    }
    /** The protocol used for this load balancer pool. Load balancers in the `network` family support `tcp`. Load balancers in the `application` family support `tcp`, `http`, and `https`. */
    export enum Protocol {
      HTTP = 'http',
      TCP = 'tcp',
      HTTPS = 'https',
    }
    /** The PROXY protocol setting for this pool: - `v1`: Enabled with version 1 (human-readable header format) - `v2`: Enabled with version 2 (binary header format) - `disabled`: Disabled Supported by load balancers in the `application` family (otherwise always `disabled`). */
    export enum ProxyProtocol {
      DISABLED = 'disabled',
      V1 = 'v1',
      V2 = 'v2',
    }
  }

  /** Parameters for the `deleteLoadBalancerPool` operation. */
  export interface DeleteLoadBalancerPoolParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The pool identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLoadBalancerPool` operation. */
  export interface GetLoadBalancerPoolParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The pool identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateLoadBalancerPool` operation. */
  export interface UpdateLoadBalancerPoolParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The pool identifier. */
    id: string;
    /** The load balancing algorithm. */
    algorithm?: UpdateLoadBalancerPoolConstants.Algorithm | string;
    /** The health monitor of this pool. */
    healthMonitor?: LoadBalancerPoolHealthMonitorPatch;
    /** The user-defined name for this load balancer pool. */
    name?: string;
    /** The protocol used for this load balancer pool.
     *
     *  The enumerated values for this property are expected to expand in the future. When processing this property,
     *  check for and log unknown values. Optionally halt processing and surface the error, or bypass the pool on which
     *  the unexpected property value was encountered.
     */
    protocol?: UpdateLoadBalancerPoolConstants.Protocol | string;
    /** The PROXY protocol setting for this pool:
     *  - `v1`: Enabled with version 1 (human-readable header format)
     *  - `v2`: Enabled with version 2 (binary header format)
     *  - `disabled`: Disabled
     *
     *  Supported by load balancers in the `application` family (otherwise always `disabled`).
     */
    proxyProtocol?: UpdateLoadBalancerPoolConstants.ProxyProtocol | string;
    /** The session persistence of this pool. */
    sessionPersistence?: LoadBalancerPoolSessionPersistencePatch;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateLoadBalancerPool` operation. */
  export namespace UpdateLoadBalancerPoolConstants {
    /** The load balancing algorithm. */
    export enum Algorithm {
      LEAST_CONNECTIONS = 'least_connections',
      ROUND_ROBIN = 'round_robin',
      WEIGHTED_ROUND_ROBIN = 'weighted_round_robin',
    }
    /** The protocol used for this load balancer pool. The enumerated values for this property are expected to expand in the future. When processing this property, check for and log unknown values. Optionally halt processing and surface the error, or bypass the pool on which the unexpected property value was encountered. */
    export enum Protocol {
      HTTP = 'http',
      TCP = 'tcp',
      HTTPS = 'https',
    }
    /** The PROXY protocol setting for this pool: - `v1`: Enabled with version 1 (human-readable header format) - `v2`: Enabled with version 2 (binary header format) - `disabled`: Disabled Supported by load balancers in the `application` family (otherwise always `disabled`). */
    export enum ProxyProtocol {
      DISABLED = 'disabled',
      V1 = 'v1',
      V2 = 'v2',
    }
  }

  /** Parameters for the `listLoadBalancerPoolMembers` operation. */
  export interface ListLoadBalancerPoolMembersParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The pool identifier. */
    poolId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createLoadBalancerPoolMember` operation. */
  export interface CreateLoadBalancerPoolMemberParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The pool identifier. */
    poolId: string;
    /** The port number of the application running in the server member. */
    port: number;
    /** The pool member target. Load balancers in the `network` family support virtual server
     *  instances. Load balancers in the `application` family support IP addresses.
     */
    target: LoadBalancerPoolMemberTargetPrototype;
    /** Weight of the server member. Applicable only if the pool algorithm is `weighted_round_robin`. */
    weight?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceLoadBalancerPoolMembers` operation. */
  export interface ReplaceLoadBalancerPoolMembersParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The pool identifier. */
    poolId: string;
    /** Array of pool member prototype objects. */
    members: LoadBalancerPoolMemberPrototype[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteLoadBalancerPoolMember` operation. */
  export interface DeleteLoadBalancerPoolMemberParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The pool identifier. */
    poolId: string;
    /** The member identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLoadBalancerPoolMember` operation. */
  export interface GetLoadBalancerPoolMemberParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The pool identifier. */
    poolId: string;
    /** The member identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateLoadBalancerPoolMember` operation. */
  export interface UpdateLoadBalancerPoolMemberParams {
    /** The load balancer identifier. */
    loadBalancerId: string;
    /** The pool identifier. */
    poolId: string;
    /** The member identifier. */
    id: string;
    /** The port number of the application running in the server member. */
    port?: number;
    /** The pool member target. Load balancers in the `network` family support virtual server
     *  instances. Load balancers in the `application` family support IP addresses.
     */
    target?: LoadBalancerPoolMemberTargetPrototype;
    /** Weight of the server member. Applicable only if the pool algorithm is `weighted_round_robin`. */
    weight?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listEndpointGateways` operation. */
  export interface ListEndpointGatewaysParams {
    /** Filters the collection to resources with the exact specified name. */
    name?: string;
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    /** Filters the collection to resources within one of the resource groups identified in a comma-separated list
     *  of resource group identifiers.
     */
    resourceGroupId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createEndpointGateway` operation. */
  export interface CreateEndpointGatewayParams {
    /** The target for this endpoint gateway. */
    target: EndpointGatewayTargetPrototype;
    /** The VPC this endpoint gateway will serve. */
    vpc: VPCIdentity;
    /** A list of reserved IPs to attach to this endpoint gateway. */
    ips?: EndpointGatewayReservedIP[];
    /** The user-defined name for this endpoint gateway. If unspecified, the name will be a hyphenated list of
     *  randomly-selected words. Names must be unique within the VPC this endpoint gateway is serving.
     */
    name?: string;
    /** The resource group to use. If unspecified, the account's [default resource
     *  group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
     */
    resourceGroup?: ResourceGroupIdentity;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listEndpointGatewayIps` operation. */
  export interface ListEndpointGatewayIpsParams {
    /** The endpoint gateway identifier. */
    endpointGatewayId: string;
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    /** Sorts the returned collection by the specified field name in ascending order. A `-` may be prepended to the
     *  field name to sort in descending order. For example, the value
     *  `-created_at` sorts the collection by the `created_at` field in descending order, and the value `name` sorts it
     *  by the `name` field in ascending order.
     */
    sort?: ListEndpointGatewayIpsConstants.Sort | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listEndpointGatewayIps` operation. */
  export namespace ListEndpointGatewayIpsConstants {
    /** Sorts the returned collection by the specified field name in ascending order. A `-` may be prepended to the field name to sort in descending order. For example, the value `-created_at` sorts the collection by the `created_at` field in descending order, and the value `name` sorts it by the `name` field in ascending order. */
    export enum Sort {
      CREATED_AT = 'created_at',
      NAME = 'name',
      ADDRESS = 'address',
    }
  }

  /** Parameters for the `removeEndpointGatewayIp` operation. */
  export interface RemoveEndpointGatewayIpParams {
    /** The endpoint gateway identifier. */
    endpointGatewayId: string;
    /** The reserved IP identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getEndpointGatewayIp` operation. */
  export interface GetEndpointGatewayIpParams {
    /** The endpoint gateway identifier. */
    endpointGatewayId: string;
    /** The reserved IP identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addEndpointGatewayIp` operation. */
  export interface AddEndpointGatewayIpParams {
    /** The endpoint gateway identifier. */
    endpointGatewayId: string;
    /** The reserved IP identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteEndpointGateway` operation. */
  export interface DeleteEndpointGatewayParams {
    /** The endpoint gateway identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getEndpointGateway` operation. */
  export interface GetEndpointGatewayParams {
    /** The endpoint gateway identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateEndpointGateway` operation. */
  export interface UpdateEndpointGatewayParams {
    /** The endpoint gateway identifier. */
    id: string;
    /** The user-defined name for this endpoint gateway. Names must be unique within the VPC this endpoint gateway
     *  is serving.
     */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listFlowLogCollectors` operation. */
  export interface ListFlowLogCollectorsParams {
    /** A server-supplied token determining what resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    /** Filters the collection to resources within one of the resource groups identified in a comma-separated list
     *  of resource group identifiers.
     */
    resourceGroupId?: string;
    /** Filters the collection to resources with the exact specified name. */
    name?: string;
    /** Filters the collection to resources in the VPC with the specified identifier. */
    vpcId?: string;
    /** Filters the collection to resources in the VPC with the specified CRN. */
    vpcCrn?: string;
    /** Filters the collection to resources in the VPC with the exact specified name. */
    vpcName?: string;
    /** Filters the collection to flow log collectors that target the specified resource. */
    targetId?: string;
    /** Filters the collection to flow log collectors that target the specified resource type. */
    targetResourceType?: ListFlowLogCollectorsConstants.TargetResourceType | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listFlowLogCollectors` operation. */
  export namespace ListFlowLogCollectorsConstants {
    /** Filters the collection to flow log collectors that target the specified resource type. */
    export enum TargetResourceType {
      VPC = 'vpc',
      SUBNET = 'subnet',
      INSTANCE = 'instance',
      NETWORK_INTERFACE = 'network_interface',
    }
  }

  /** Parameters for the `createFlowLogCollector` operation. */
  export interface CreateFlowLogCollectorParams {
    /** The Cloud Object Storage bucket where the collected flows will be logged.
     *  The bucket must exist and an IAM service authorization must grant
     *  `IBM Cloud Flow Logs` resources of `VPC Infrastructure Services` writer
     *  access to the bucket.
     */
    storageBucket: CloudObjectStorageBucketIdentity;
    /** The target this collector will collect flow logs for. If the target is an instance,
     *  subnet, or VPC, flow logs will not be collected for any network interfaces within the
     *  target that are themselves the target of a more specific flow log collector.
     */
    target: FlowLogCollectorTargetPrototype;
    /** Indicates whether this collector is active. If false, this collector is created in inactive mode. */
    active?: boolean;
    /** The unique user-defined name for this flow log collector. If unspecified, the name will be a hyphenated list
     *  of randomly-selected words.
     */
    name?: string;
    /** The resource group to use. If unspecified, the account's [default resource
     *  group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
     */
    resourceGroup?: ResourceGroupIdentity;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteFlowLogCollector` operation. */
  export interface DeleteFlowLogCollectorParams {
    /** The flow log collector identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getFlowLogCollector` operation. */
  export interface GetFlowLogCollectorParams {
    /** The flow log collector identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateFlowLogCollector` operation. */
  export interface UpdateFlowLogCollectorParams {
    /** The flow log collector identifier. */
    id: string;
    /** Indicates whether this collector is active. Updating to false deactivates the collector and updating to true
     *  activates the collector.
     */
    active?: boolean;
    /** The unique user-defined name for this flow log collector. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** AddressPrefix. */
  export interface AddressPrefix {
    /** The CIDR block for this prefix. */
    cidr: string;
    /** The date and time that the prefix was created. */
    created_at: string;
    /** Indicates whether subnets exist with addresses from this prefix. */
    has_subnets: boolean;
    /** The URL for this address prefix. */
    href: string;
    /** The unique identifier for this address prefix. */
    id: string;
    /** Indicates whether this is the default prefix for this zone in this VPC. If a default prefix was
     *  automatically created when the VPC was created, the prefix is automatically named using a hyphenated list of
     *  randomly-selected words, but may be updated with a user-specified name.
     */
    is_default: boolean;
    /** The user-defined name for this address prefix. Names must be unique within the VPC the address prefix
     *  resides in.
     */
    name: string;
    /** The zone this address prefix resides in. */
    zone: ZoneReference;
  }

  /** AddressPrefixCollection. */
  export interface AddressPrefixCollection {
    /** Collection of address prefixes. */
    address_prefixes: AddressPrefix[];
    /** A link to the first page of resources. */
    first: AddressPrefixCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: AddressPrefixCollectionNext;
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface AddressPrefixCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface AddressPrefixCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** Identifies a certificate instance by a unique property. */
  export interface CertificateInstanceIdentity {
  }

  /** CertificateInstanceReference. */
  export interface CertificateInstanceReference {
    /** The CRN for this certificate instance. */
    crn: string;
  }

  /** Identifies a Cloud Object Storage bucket by a unique property. */
  export interface CloudObjectStorageBucketIdentity {
  }

  /** CloudObjectStorageBucketReference. */
  export interface CloudObjectStorageBucketReference {
    /** The globally unique name of this COS bucket. */
    name: string;
  }

  /** DefaultNetworkACL. */
  export interface DefaultNetworkACL {
    /** The date and time that the network ACL was created. */
    created_at: string;
    /** The CRN for this network ACL. */
    crn: string;
    /** The URL for this network ACL. */
    href: string;
    /** The unique identifier for this network ACL. */
    id: string;
    /** The name of the default network ACL created for a VPC. The name will be a hyphenated list of
     *  randomly-selected words at creation, but may be user-specified with a subsequent request.
     */
    name: string;
    /** The resource group for the default network ACL for a VPC. Set to the VPC's resource group at creation. */
    resource_group: ResourceGroupReference;
    /** The ordered rules for the default network ACL for a VPC.  Defaults to two rules which allow all inbound and
     *  outbound traffic, respectively.  Rules for the default network ACL may be changed, added, or removed.
     */
    rules: NetworkACLRuleItem[];
    /** The subnets to which this network ACL is attached. */
    subnets: SubnetReference[];
    /** The VPC this network ACL is a part of. */
    vpc: VPCReference;
  }

  /** DefaultRoutingTable. */
  export interface DefaultRoutingTable {
    /** The date and time that this routing table was created. */
    created_at: string;
    /** The URL for this routing table. */
    href: string;
    /** The unique identifier for this routing table. */
    id: string;
    /** Indicates whether this is the default routing table for this VPC. */
    is_default: boolean;
    /** The lifecycle state of the routing table. */
    lifecycle_state: string;
    /** The name of the default routing table created for this VPC. The name will be a hyphenated list of
     *  randomly-selected words at creation, but may be user-specified with a subsequent request.
     */
    name: string;
    /** The resource type. */
    resource_type: string;
    /** Indicates whether this routing table is used to route traffic that originates from
     *  [Direct Link](https://cloud.ibm.com/docs/dl/) to this VPC.
     *
     *  Incoming traffic will be routed according to the routing table with one exception: routes with an `action` of
     *  `deliver` are treated as `drop` unless the `next_hop` is an IP address within the VPC's address prefix ranges.
     *  Therefore, if an incoming packet matches a route with with a `next_hop` of an internet-bound IP address or a VPN
     *  gateway connection, the packet will be dropped.
     */
    route_direct_link_ingress: boolean;
    /** Indicates whether this routing table is used to route traffic that originates from from [Transit
     *  Gateway](https://cloud.ibm.com/cloud/transit-gateway/) to this VPC.
     *
     *  Incoming traffic will be routed according to the routing table with one exception: routes with an `action` of
     *  `deliver` are treated as `drop` unless the `next_hop` is an IP address within the VPC's address prefix ranges.
     *  Therefore, if an incoming packet matches a route with with a `next_hop` of an internet-bound IP address or a VPN
     *  gateway connection, the packet will be dropped.
     */
    route_transit_gateway_ingress: boolean;
    /** Indicates whether this routing table is used to route traffic that originates from subnets in other zones in
     *  this VPC.
     *
     *  Incoming traffic will be routed according to the routing table with one exception: routes with an `action` of
     *  `deliver` are treated as `drop` unless the `next_hop` is an IP address within the VPC's address prefix ranges.
     *  Therefore, if an incoming packet matches a route with with a `next_hop` of an internet-bound IP address or a VPN
     *  gateway connection, the packet will be dropped.
     */
    route_vpc_zone_ingress: boolean;
    /** The routes for the default routing table for this VPC. The table is created with no routes, but routes may
     *  be added, changed, or removed with a subsequent request.
     */
    routes: RouteReference[];
    /** The subnets to which this routing table is attached. */
    subnets: SubnetReference[];
  }

  /** Collection of rules in a default security group. */
  export interface DefaultSecurityGroup {
    /** The date and time that this security group was created. */
    created_at: string;
    /** The security group's CRN. */
    crn: string;
    /** The security group's canonical URL. */
    href: string;
    /** The unique identifier for this security group. */
    id: string;
    /** The name of the default security group created for a VPC. The name will be a hyphenated list of
     *  randomly-selected words at creation, but may be user-specified with a subsequent request.
     */
    name: string;
    /** The resource group for this security group. */
    resource_group: ResourceGroupReference;
    /** Array of rules for the default security group for a VPC. Defaults to allowing all outbound traffic, and
     *  allowing all inbound traffic from other interfaces in the VPC's default security group. Rules in the default
     *  security group may be changed, added or removed.
     */
    rules: SecurityGroupRule[];
    /** The VPC this security group is a part of. */
    vpc: VPCReference;
  }

  /** Identifies an encryption key by a unique property. */
  export interface EncryptionKeyIdentity {
  }

  /** EncryptionKeyReference. */
  export interface EncryptionKeyReference {
    /** The CRN of the [Key Protect Root
     *  Key](https://cloud.ibm.com/docs/key-protect?topic=key-protect-getting-started-tutorial) or [Hyper Protect Crypto
     *  Service Root Key](https://cloud.ibm.com/docs/hs-crypto?topic=hs-crypto-get-started) for this resource.
     */
    crn: string;
  }

  /** EndpointGateway. */
  export interface EndpointGateway {
    /** The date and time that the endpoint gateway was created. */
    created_at: string;
    /** The CRN for this endpoint gateway. */
    crn: string;
    /** The health of this resource.
     *  - `ok`: Healthy
     *  - `degraded`: Suffering from compromised performance, capacity, or connectivity
     *  - `faulted`: Completely unreachable, inoperative, or otherwise entirely incapacitated
     *  - `inapplicable`: The health state does not apply because of the current lifecycle state. A resource with a
     *  lifecycle state of `failed` or `deleting` will have a health state of `inapplicable`. A `pending` resource may
     *  also have this state.
     */
    health_state: string;
    /** The URL for this endpoint gateway. */
    href: string;
    /** The unique identifier for this endpoint gateway. */
    id: string;
    /** Collection of reserved IPs bound to an endpoint gateway. */
    ips: ReservedIPReference[];
    /** The lifecycle state of the endpoint gateway. */
    lifecycle_state: string;
    /** The unique user-defined name for this endpoint gateway. */
    name: string;
    /** The resource group for this endpoint gateway. */
    resource_group: ResourceGroupReference;
    /** The type of resource referenced. */
    resource_type: string;
    /** The fully qualified domain name for the target service. */
    service_endpoint?: string;
    /** Collection of fully qualified domain names for the target service. */
    service_endpoints: string[];
    /** The target for this endpoint gateway. */
    target: EndpointGatewayTarget;
    /** The VPC this endpoint gateway is serving. */
    vpc: VPCReference;
  }

  /** EndpointGatewayCollection. */
  export interface EndpointGatewayCollection {
    /** Collection of endpoint gateways. */
    endpoint_gateways: EndpointGateway[];
    /** A link to the first page of resources. */
    first: EndpointGatewayCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: EndpointGatewayCollectionNext;
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface EndpointGatewayCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface EndpointGatewayCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface EndpointGatewayReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** A reserved IP to bind to the endpoint gateway. This can be a an existing reserved IP, or a prototype used to allocate a reserved IP. The reserved IP will be bound to the endpoint gateway to function as a virtual private endpoint for the service. */
  export interface EndpointGatewayReservedIP {
  }

  /** The target for this endpoint gateway. */
  export interface EndpointGatewayTarget {
  }

  /** The target for this endpoint gateway. */
  export interface EndpointGatewayTargetPrototype {
    /** The type of target for this endpoint gateway. */
    resource_type: string;
  }

  /** FloatingIP. */
  export interface FloatingIP {
    /** The globally unique IP address. */
    address: string;
    /** The date and time that the floating IP was created. */
    created_at: string;
    /** The CRN for this floating IP. */
    crn: string;
    /** The URL for this floating IP. */
    href: string;
    /** The unique identifier for this floating IP. */
    id: string;
    /** The unique user-defined name for this floating IP. */
    name: string;
    /** The resource group for this floating IP. */
    resource_group: ResourceGroupReference;
    /** The status of the floating IP. */
    status: string;
    /** The target of this floating IP. */
    target?: FloatingIPTarget;
    /** The zone the floating IP resides in. */
    zone: ZoneReference;
  }

  /** The network interface this floating IP is to be bound to. */
  export interface FloatingIPByTargetNetworkInterfaceIdentity {
  }

  /** FloatingIPCollection. */
  export interface FloatingIPCollection {
    /** A link to the first page of resources. */
    first: FloatingIPCollectionFirst;
    /** Collection of floating IPs. */
    floating_ips: FloatingIP[];
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: FloatingIPCollectionNext;
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface FloatingIPCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface FloatingIPCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A new network interface to bind this floating IP to, replacing any existing binding. For this request to succeed, the existing floating IP must not be required by another resource, such as a public gateway. */
  export interface FloatingIPPatchTargetNetworkInterfaceIdentity {
  }

  /** FloatingIPPrototype. */
  export interface FloatingIPPrototype {
    /** The unique user-defined name for this floating IP. If unspecified, the name will be a hyphenated list of
     *  randomly-selected words.
     */
    name?: string;
    /** The resource group to use. If unspecified, the account's [default resource
     *  group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
     */
    resource_group?: ResourceGroupIdentity;
  }

  /** FloatingIPReference. */
  export interface FloatingIPReference {
    /** The globally unique IP address. */
    address: string;
    /** The CRN for this floating IP. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: FloatingIPReferenceDeleted;
    /** The URL for this floating IP. */
    href: string;
    /** The unique identifier for this floating IP. */
    id: string;
    /** The unique user-defined name for this floating IP. */
    name: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface FloatingIPReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** The target of this floating IP. */
  export interface FloatingIPTarget {
  }

  /** FloatingIPUnpaginatedCollection. */
  export interface FloatingIPUnpaginatedCollection {
    /** Collection of floating IPs. */
    floating_ips: FloatingIP[];
  }

  /** FlowLogCollector. */
  export interface FlowLogCollector {
    /** Indicates whether this collector is active. */
    active: boolean;
    /** If set to `true`, this flow log collector will be automatically deleted when the target is deleted. */
    auto_delete: boolean;
    /** The date and time that the flow log collector was created. */
    created_at: string;
    /** The CRN for this flow log collector. */
    crn: string;
    /** The URL for this flow log collector. */
    href: string;
    /** The unique identifier for this flow log collector. */
    id: string;
    /** The lifecycle state of the flow log collector. */
    lifecycle_state: string;
    /** The unique user-defined name for this flow log collector. */
    name: string;
    /** The resource group for this flow log collector. */
    resource_group: ResourceGroupReference;
    /** The Cloud Object Storage bucket where the collected flows are logged. */
    storage_bucket: CloudObjectStorageBucketReference;
    /** The target this collector is collecting flow logs for. If the target is an instance,
     *  subnet, or VPC, flow logs will not be collected for any network interfaces within the
     *  target that are themselves the target of a more specific flow log collector.
     */
    target: FlowLogCollectorTarget;
    /** The VPC this flow log collector is associated with. */
    vpc: VPCReference;
  }

  /** FlowLogCollectorCollection. */
  export interface FlowLogCollectorCollection {
    /** A link to the first page of resources. */
    first: FlowLogCollectorCollectionFirst;
    /** Collection of flow log collectors. */
    flow_log_collectors: FlowLogCollector[];
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: FlowLogCollectorCollectionNext;
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface FlowLogCollectorCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface FlowLogCollectorCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** The target this collector is collecting flow logs for. If the target is an instance, subnet, or VPC, flow logs will not be collected for any network interfaces within the target that are themselves the target of a more specific flow log collector. */
  export interface FlowLogCollectorTarget {
  }

  /** The target this collector will collect flow logs for. If the target is an instance, subnet, or VPC, flow logs will not be collected for any network interfaces within the target that are themselves the target of a more specific flow log collector. */
  export interface FlowLogCollectorTargetPrototype {
  }

  /** IKEPolicy. */
  export interface IKEPolicy {
    /** The authentication algorithm. */
    authentication_algorithm: string;
    /** Collection of references to VPN gateway connections that use this IKE policy. */
    connections: VPNGatewayConnectionReference[];
    /** The date and time that this IKE policy was created. */
    created_at: string;
    /** The Diffie-Hellman group. */
    dh_group: number;
    /** The encryption algorithm. */
    encryption_algorithm: string;
    /** The IKE policy's canonical URL. */
    href: string;
    /** The unique identifier for this IKE policy. */
    id: string;
    /** The IKE protocol version. */
    ike_version: number;
    /** The key lifetime in seconds. */
    key_lifetime: number;
    /** The user-defined name for this IKE policy. */
    name: string;
    /** The IKE negotiation mode. Only `main` is supported. */
    negotiation_mode: string;
    /** The resource group for this IKE policy. */
    resource_group: ResourceGroupReference;
    /** The resource type. */
    resource_type: string;
  }

  /** IKEPolicyCollection. */
  export interface IKEPolicyCollection {
    /** A link to the first page of resources. */
    first: IKEPolicyCollectionFirst;
    /** Collection of IKE policies. */
    ike_policies: IKEPolicy[];
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: IKEPolicyCollectionNext;
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface IKEPolicyCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface IKEPolicyCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** Identifies an IKE policy by a unique property. */
  export interface IKEPolicyIdentity {
  }

  /** IKEPolicyReference. */
  export interface IKEPolicyReference {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: IKEPolicyReferenceDeleted;
    /** The IKE policy's canonical URL. */
    href: string;
    /** The unique identifier for this IKE policy. */
    id: string;
    /** The user-defined name for this IKE policy. */
    name: string;
    /** The resource type. */
    resource_type: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface IKEPolicyReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** IP. */
  export interface IP {
    /** The IP address. This property may add support for IPv6 addresses in the future. When processing a value in
     *  this property, verify that the address is in an expected format. If it is not, log an error. Optionally halt
     *  processing and surface the error, or bypass the resource on which the unexpected IP address format was
     *  encountered.
     */
    address: string;
  }

  /** IPsecPolicy. */
  // tslint:disable-next-line: interface-name
  export interface IPsecPolicy {
    /** The authentication algorithm. */
    authentication_algorithm: string;
    /** Collection of references to VPN gateway connections that use this IPsec policy. */
    connections: VPNGatewayConnectionReference[];
    /** The date and time that this IPsec policy was created. */
    created_at: string;
    /** The encapsulation mode used. Only `tunnel` is supported. */
    encapsulation_mode: string;
    /** The encryption algorithm. */
    encryption_algorithm: string;
    /** The IPsec policy's canonical URL. */
    href: string;
    /** The unique identifier for this IPsec policy. */
    id: string;
    /** The key lifetime in seconds. */
    key_lifetime: number;
    /** The user-defined name for this IPsec policy. */
    name: string;
    /** Perfect Forward Secrecy. */
    pfs: string;
    /** The resource group for this IPsec policy. */
    resource_group: ResourceGroupReference;
    /** The resource type. */
    resource_type: string;
    /** The transform protocol used. Only `esp` is supported. */
    transform_protocol: string;
  }

  /** IPsecPolicyCollection. */
  // tslint:disable-next-line: interface-name
  export interface IPsecPolicyCollection {
    /** A link to the first page of resources. */
    first: IPsecPolicyCollectionFirst;
    /** Collection of IPsec policies. */
    ipsec_policies: IPsecPolicy[];
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: IPsecPolicyCollectionNext;
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  // tslint:disable-next-line: interface-name
  export interface IPsecPolicyCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  // tslint:disable-next-line: interface-name
  export interface IPsecPolicyCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** Identifies an IPsec policy by a unique property. */
  // tslint:disable-next-line: interface-name
  export interface IPsecPolicyIdentity {
  }

  /** IPsecPolicyReference. */
  // tslint:disable-next-line: interface-name
  export interface IPsecPolicyReference {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: IPsecPolicyReferenceDeleted;
    /** The IPsec policy's canonical URL. */
    href: string;
    /** The unique identifier for this IPsec policy. */
    id: string;
    /** The user-defined name for this IPsec policy. */
    name: string;
    /** The resource type. */
    resource_type: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  // tslint:disable-next-line: interface-name
  export interface IPsecPolicyReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** Image. */
  export interface Image {
    /** The date and time that the image was created. */
    created_at: string;
    /** The CRN for this image. */
    crn: string;
    /** The type of encryption used on the image. */
    encryption: string;
    /** The key that will be used to encrypt volumes created from this image (unless an
     *  alternate `encryption_key` is provided at volume creation).
     *
     *  This property will be present for images with an `encryption` type of `user_managed`.
     */
    encryption_key?: EncryptionKeyReference;
    /** Details for the stored image file. */
    file: ImageFile;
    /** The URL for this image. */
    href: string;
    /** The unique identifier for this image. */
    id: string;
    /** The minimum size (in gigabytes) of a volume onto which this image may be provisioned.
     *
     *  This property may be absent if the image has a `status` of `pending`, `tentative`, or
     *  `failed`.
     */
    minimum_provisioned_size?: number;
    /** The user-defined or system-provided name for this image. */
    name: string;
    /** The operating system included in this image. */
    operating_system?: OperatingSystem;
    /** The resource group for this image. */
    resource_group: ResourceGroupReference;
    /** The status of this image. */
    status: string;
    /** Whether the image is publicly visible or private to the account. */
    visibility: string;
  }

  /** ImageCollection. */
  export interface ImageCollection {
    /** A link to the first page of resources. */
    first: ImageCollectionFirst;
    /** Collection of images. */
    images: Image[];
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: ImageCollectionNext;
  }

  /** A link to the first page of resources. */
  export interface ImageCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface ImageCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** ImageFile. */
  export interface ImageFile {
    /** The size of the stored image file rounded up to the next gigabyte.
     *
     *  This property may be absent if the associated image has a `status` of `pending` or
     *  `failed`.
     */
    size?: number;
  }

  /** ImageFilePrototype. */
  export interface ImageFilePrototype {
    /** The Cloud Object Store (COS) location of the image file. */
    href: string;
  }

  /** Identifies an image by a unique property. */
  export interface ImageIdentity {
  }

  /** ImagePrototype. */
  export interface ImagePrototype {
    /** The unique user-defined name for this image. Names starting with "ibm-" are not allowed. If unspecified, the
     *  name will be a hyphenated list of randomly-selected words.
     */
    name?: string;
    /** The resource group to use. If unspecified, the account's [default resource
     *  group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
     */
    resource_group?: ResourceGroupIdentity;
  }

  /** ImageReference. */
  export interface ImageReference {
    /** The CRN for this image. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: ImageReferenceDeleted;
    /** The URL for this image. */
    href: string;
    /** The unique identifier for this image. */
    id: string;
    /** The user-defined or system-provided name for this image. */
    name: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface ImageReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** Instance. */
  export interface Instance {
    /** The total bandwidth (in megabits per second) shared across the virtual server instance's network interfaces. */
    bandwidth: number;
    /** Boot volume attachment. */
    boot_volume_attachment: VolumeAttachmentReferenceInstanceContext;
    /** The date and time that the virtual server instance was created. */
    created_at: string;
    /** The CRN for this virtual server instance. */
    crn: string;
    /** The virtual server instance GPU configuration. */
    gpu?: InstanceGPU;
    /** The URL for this virtual server instance. */
    href: string;
    /** The unique identifier for this virtual server instance. */
    id: string;
    /** The image the virtual server instance was provisioned from. */
    image?: ImageReference;
    /** The amount of memory in gigabytes. */
    memory: number;
    /** The user-defined name for this virtual server instance (and default system hostname). */
    name: string;
    /** Collection of the virtual server instance's network interfaces, including the primary network interface. */
    network_interfaces: NetworkInterfaceInstanceContextReference[];
    /** Primary network interface. */
    primary_network_interface: NetworkInterfaceInstanceContextReference;
    /** The profile this virtual server instance uses. */
    profile: InstanceProfileReference;
    /** The resource group for this instance. */
    resource_group: ResourceGroupReference;
    /** The status of the virtual server instance. */
    status: string;
    /** The virtual server instance VCPU configuration. */
    vcpu: InstanceVCPU;
    /** Collection of the virtual server instance's volume attachments, including the boot volume attachment. */
    volume_attachments: VolumeAttachmentReferenceInstanceContext[];
    /** The VPC the virtual server instance resides in. */
    vpc: VPCReference;
    /** The zone the virtual server instance resides in. */
    zone: ZoneReference;
  }

  /** InstanceAction. */
  export interface InstanceAction {
    /** The date and time that the action was completed. */
    completed_at?: string;
    /** The date and time that the action was created. */
    created_at: string;
    /** If set to true, the action will be forced immediately, and all queued actions deleted. Ignored for the start
     *  action.
     */
    force?: boolean;
    /** The URL for this instance action. */
    href: string;
    /** The identifier for this instance action. */
    id: string;
    /** The date and time that the action was started. */
    started_at?: string;
    /** The current status of this action. */
    status: string;
    /** The type of action. */
    type: string;
  }

  /** InstanceCollection. */
  export interface InstanceCollection {
    /** A link to the first page of resources. */
    first: InstanceCollectionFirst;
    /** Collection of virtual server instances. */
    instances: Instance[];
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: InstanceCollectionNext;
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface InstanceCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface InstanceCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** The virtual server instance GPU configuration. */
  export interface InstanceGPU {
    /** The number of GPUs assigned to the instance. */
    count: number;
    /** The GPU manufacturer. */
    manufacturer: string;
    /** The overall amount of GPU memory in GiB (gibibytes). */
    memory: number;
    /** The GPU model. */
    model: string;
  }

  /** InstanceGroup. */
  export interface InstanceGroup {
    /** Required if specifying a load balancer pool only. Used by the instance group when scaling up instances to
     *  supply the port for the load balancer pool member.
     */
    application_port?: number;
    /** The date and time that the instance group was created. */
    created_at: string;
    /** The CRN for this instance group. */
    crn: string;
    /** The URL for this instance group. */
    href: string;
    /** The unique identifier for this instance group. */
    id: string;
    /** The template used to create new instances for this group. */
    instance_template: InstanceTemplateReference;
    /** The load balancer pool managed by this group. Instances created
     *  by this group will have a new load balancer pool member in that
     *  pool created.
     */
    load_balancer_pool?: LoadBalancerPoolReference;
    /** Array of references to managers for the instance group. */
    managers: InstanceGroupManagerReference[];
    /** The number of instances in the instance group. */
    membership_count: number;
    /** The user-defined name for this instance group. */
    name: string;
    resource_group: ResourceGroupReference;
    /** The status of the instance group
     *  - `deleting`: Group is being deleted
     *  - `healthy`: Group has `membership_count` instances
     *  - `scaling`: Instances in the group are being created or deleted to reach
     *               `membership_count`
     *  - `unhealthy`: Group is unable to reach `membership_count` instances.
     */
    status: string;
    /** Array of references to subnets to use when creating new instances. */
    subnets: SubnetReference[];
    /** The VPC the instance group resides in. */
    vpc: VPCReference;
  }

  /** InstanceGroupCollection. */
  export interface InstanceGroupCollection {
    /** A link to the first page of resources. */
    first: InstanceGroupCollectionFirst;
    /** Collection of instance groups. */
    instance_groups: InstanceGroup[];
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: InstanceGroupCollectionNext;
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface InstanceGroupCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface InstanceGroupCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** InstanceGroupManager. */
  export interface InstanceGroupManager {
    /** The time window in seconds to aggregate metrics prior to evaluation. */
    aggregation_window?: number;
    /** The duration of time in seconds to pause further scale actions after scaling has taken place. */
    cooldown?: number;
    /** The URL for this instance group manager. */
    href: string;
    /** The unique identifier for this instance group manager. */
    id: string;
    /** If set to `true`, this manager will control the instance group. */
    management_enabled: boolean;
    /** The type of instance group manager. */
    manager_type: string;
    /** The maximum number of members in a managed instance group. */
    max_membership_count?: number;
    /** The minimum number of members in a managed instance group. */
    min_membership_count?: number;
    /** The user-defined name for this instance group manager. Names must be unique within the instance group. */
    name: string;
    /** The policies of the instance group manager. */
    policies: InstanceGroupManagerPolicyReference[];
  }

  /** InstanceGroupManagerCollection. */
  export interface InstanceGroupManagerCollection {
    /** A link to the first page of resources. */
    first: InstanceGroupManagerCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** Collection of instance group managers. */
    managers: InstanceGroupManager[];
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: InstanceGroupManagerCollectionNext;
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface InstanceGroupManagerCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface InstanceGroupManagerCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** InstanceGroupManagerPolicy. */
  export interface InstanceGroupManagerPolicy {
    /** The URL for this instance group manager policy. */
    href: string;
    /** The unique identifier for this instance group manager policy. */
    id: string;
    /** The user-defined name for this instance group manager policy. Names must be unique within the instance group
     *  manager.
     */
    name: string;
  }

  /** InstanceGroupManagerPolicyCollection. */
  export interface InstanceGroupManagerPolicyCollection {
    /** A link to the first page of resources. */
    first: InstanceGroupManagerPolicyCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: InstanceGroupManagerPolicyCollectionNext;
    /** Collection of instance group manager policies. */
    policies: InstanceGroupManagerPolicy[];
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface InstanceGroupManagerPolicyCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface InstanceGroupManagerPolicyCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** InstanceGroupManagerPolicyPrototype. */
  export interface InstanceGroupManagerPolicyPrototype {
    /** The user-defined name for this instance group manager policy. Names must be unique within the instance group
     *  manager.
     */
    name?: string;
  }

  /** InstanceGroupManagerPolicyReference. */
  export interface InstanceGroupManagerPolicyReference {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: InstanceGroupManagerPolicyReferenceDeleted;
    /** The URL for this instance group manager policy. */
    href: string;
    /** The unique identifier for this instance group manager policy. */
    id: string;
    /** The user-defined name for this instance group manager policy. Names must be unique within the instance group
     *  manager.
     */
    name: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface InstanceGroupManagerPolicyReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** InstanceGroupManagerPrototype. */
  export interface InstanceGroupManagerPrototype {
    /** If set to `true`, this manager will control the instance group. */
    management_enabled?: boolean;
    /** The user-defined name for this instance group manager. Names must be unique within the instance group. */
    name?: string;
  }

  /** InstanceGroupManagerReference. */
  export interface InstanceGroupManagerReference {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: InstanceGroupManagerReferenceDeleted;
    /** The URL for this instance group manager. */
    href: string;
    /** The unique identifier for this instance group manager. */
    id: string;
    /** The user-defined name for this instance group manager. Names must be unique within the instance group. */
    name: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface InstanceGroupManagerReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** InstanceGroupMembership. */
  export interface InstanceGroupMembership {
    /** If set to true, when deleting the membership the instance will also be deleted. */
    delete_instance_on_membership_delete: boolean;
    /** The URL for this instance group membership. */
    href: string;
    /** The unique identifier for this instance group membership. */
    id: string;
    instance: InstanceReference;
    instance_template: InstanceTemplateReference;
    /** The user-defined name for this instance group membership. Names must be unique within the instance group. */
    name: string;
    pool_member?: LoadBalancerPoolMemberReference;
    /** The status of the instance group membership
     *  - `deleting`: Membership is deleting dependent resources
     *  - `failed`: Membership was unable to maintain dependent resources
     *  - `healthy`: Membership is active and serving in the group
     *  - `pending`: Membership is waiting for dependent resources
     *  - `unhealthy`: Membership has unhealthy dependent resources.
     */
    status: string;
  }

  /** InstanceGroupMembershipCollection. */
  export interface InstanceGroupMembershipCollection {
    /** A link to the first page of resources. */
    first: InstanceGroupMembershipCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** Collection of instance group memberships. */
    memberships: InstanceGroupMembership[];
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: InstanceGroupMembershipCollectionNext;
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface InstanceGroupMembershipCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface InstanceGroupMembershipCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** InstanceGroupReference. */
  export interface InstanceGroupReference {
    /** The CRN for this instance group. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: InstanceGroupReferenceDeleted;
    /** The URL for this instance group. */
    href: string;
    /** The unique identifier for this instance group. */
    id: string;
    /** The user-defined name for this instance group. */
    name: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface InstanceGroupReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** InstanceInitialization. */
  export interface InstanceInitialization {
    /** Collection of references to public SSH keys used at instance initialization. */
    keys: KeyReferenceInstanceInitializationContext[];
    password?: InstanceInitializationPassword;
  }

  /** InstanceInitializationPassword. */
  export interface InstanceInitializationPassword {
    /** The administrator password at initialization, encrypted using `encryption_key`, and returned base64-encoded. */
    encrypted_password: string;
    /** The reference to the public SSH key used to encrypt the administrator password. */
    encryption_key: KeyReferenceInstanceInitializationContext;
  }

  /** InstanceProfile. */
  export interface InstanceProfile {
    bandwidth: InstanceProfileBandwidth;
    /** The product family this virtual server instance profile belongs to. */
    family?: string;
    /** The URL for this virtual server instance profile. */
    href: string;
    memory: InstanceProfileMemory;
    /** The globally unique name for this virtual server instance profile. */
    name: string;
    os_architecture: InstanceProfileOSArchitecture;
    port_speed: InstanceProfilePortSpeed;
    vcpu_architecture: InstanceProfileVCPUArchitecture;
    vcpu_count: InstanceProfileVCPU;
  }

  /** InstanceProfileBandwidth. */
  export interface InstanceProfileBandwidth {
  }

  /** InstanceProfileCollection. */
  export interface InstanceProfileCollection {
    /** Collection of virtual server instance profiles. */
    profiles: InstanceProfile[];
  }

  /** Identifies an instance profile by a unique property. */
  export interface InstanceProfileIdentity {
  }

  /** InstanceProfileMemory. */
  export interface InstanceProfileMemory {
  }

  /** InstanceProfileOSArchitecture. */
  export interface InstanceProfileOSArchitecture {
    /** The default OS architecture for an instance with this profile. */
    default: string;
    /** The type for this profile field. */
    type: string;
    /** The supported OS architecture(s) for an instance with this profile. */
    values: string[];
  }

  /** InstanceProfilePortSpeed. */
  export interface InstanceProfilePortSpeed {
  }

  /** InstanceProfileReference. */
  export interface InstanceProfileReference {
    /** The URL for this virtual server instance profile. */
    href: string;
    /** The globally unique name for this virtual server instance profile. */
    name: string;
  }

  /** InstanceProfileVCPU. */
  export interface InstanceProfileVCPU {
  }

  /** InstanceProfileVCPUArchitecture. */
  export interface InstanceProfileVCPUArchitecture {
    /** The default VCPU architecture for an instance with this profile. */
    default?: string;
    /** The type for this profile field. */
    type: string;
    /** The VCPU architecture for an instance with this profile. */
    value: string;
  }

  /** InstancePrototype. */
  export interface InstancePrototype {
    /** The public SSH keys for the administrative user of the virtual server instance. Up to 10 keys may be
     *  provided; if no keys are provided the instance will be inaccessible unless the image used provides another means
     *  of access. For Windows instances, one of the keys will be used to encrypt the administrator password.
     *
     *  Keys will be made available to the virtual server instance as cloud-init vendor data. For cloud-init enabled
     *  images, these keys will also be added as SSH authorized keys for the administrative user.
     */
    keys?: KeyIdentity[];
    /** The unique user-defined name for this virtual server instance (and default system hostname). If unspecified,
     *  the name will be a hyphenated list of randomly-selected words.
     */
    name?: string;
    /** Collection of additional network interfaces to create for the virtual server instance. */
    network_interfaces?: NetworkInterfacePrototype[];
    /** The profile to use for this virtual server instance. */
    profile?: InstanceProfileIdentity;
    /** The resource group to use. If unspecified, the account's [default resource
     *  group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
     */
    resource_group?: ResourceGroupIdentity;
    /** User data to be made available when setting up the virtual server instance. */
    user_data?: string;
    /** Collection of volume attachments. */
    volume_attachments?: VolumeAttachmentPrototypeInstanceContext[];
    /** The VPC the virtual server instance is to be a part of. If provided, must match the
     *  VPC tied to the subnets of the instance's network interfaces.
     */
    vpc?: VPCIdentity;
  }

  /** InstanceReference. */
  export interface InstanceReference {
    /** The CRN for this virtual server instance. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: InstanceReferenceDeleted;
    /** The URL for this virtual server instance. */
    href: string;
    /** The unique identifier for this virtual server instance. */
    id: string;
    /** The user-defined name for this virtual server instance (and default system hostname). */
    name: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface InstanceReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** InstanceTemplate. */
  export interface InstanceTemplate {
    /** The date and time that the instance template was created. */
    created_at: string;
    /** The CRN for this instance template. */
    crn: string;
    /** The URL for this instance template. */
    href: string;
    /** The unique identifier for this instance template. */
    id: string;
    /** The public SSH keys for the administrative user of the virtual server instance. Up to 10 keys may be
     *  provided; if no keys are provided the instance will be inaccessible unless the image used provides another means
     *  of access. For Windows instances, one of the keys will be used to encrypt the administrator password.
     *
     *  Keys will be made available to the virtual server instance as cloud-init vendor data. For cloud-init enabled
     *  images, these keys will also be added as SSH authorized keys for the administrative user.
     */
    keys?: KeyIdentity[];
    /** The unique user-defined name for this instance template. */
    name: string;
    /** Collection of additional network interfaces to create for the virtual server instance. */
    network_interfaces?: NetworkInterfacePrototype[];
    /** The profile to use for this virtual server instance. */
    profile?: InstanceProfileIdentity;
    /** The resource group for this instance template. */
    resource_group: ResourceGroupReference;
    /** User data to be made available when setting up the virtual server instance. */
    user_data?: string;
    /** Collection of volume attachments. */
    volume_attachments?: VolumeAttachmentPrototypeInstanceContext[];
    /** The VPC the virtual server instance is to be a part of. If provided, must match the
     *  VPC tied to the subnets of the instance's network interfaces.
     */
    vpc?: VPCIdentity;
  }

  /** InstanceTemplateCollection. */
  export interface InstanceTemplateCollection {
    /** A link to the first page of resources. */
    first: InstanceTemplateCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: InstanceTemplateCollectionNext;
    /** Collection of instance templates. */
    templates: InstanceTemplate[];
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface InstanceTemplateCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface InstanceTemplateCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** Identifies an instance template by a unique property. */
  export interface InstanceTemplateIdentity {
  }

  /** InstanceTemplatePrototype. */
  export interface InstanceTemplatePrototype {
    /** The public SSH keys for the administrative user of the virtual server instance. Up to 10 keys may be
     *  provided; if no keys are provided the instance will be inaccessible unless the image used provides another means
     *  of access. For Windows instances, one of the keys will be used to encrypt the administrator password.
     *
     *  Keys will be made available to the virtual server instance as cloud-init vendor data. For cloud-init enabled
     *  images, these keys will also be added as SSH authorized keys for the administrative user.
     */
    keys?: KeyIdentity[];
    /** The unique user-defined name for this virtual server instance (and default system hostname). If unspecified,
     *  the name will be a hyphenated list of randomly-selected words.
     */
    name?: string;
    /** Collection of additional network interfaces to create for the virtual server instance. */
    network_interfaces?: NetworkInterfacePrototype[];
    /** The profile to use for this virtual server instance. */
    profile?: InstanceProfileIdentity;
    /** The resource group to use. If unspecified, the account's [default resource
     *  group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
     */
    resource_group?: ResourceGroupIdentity;
    /** User data to be made available when setting up the virtual server instance. */
    user_data?: string;
    /** Collection of volume attachments. */
    volume_attachments?: VolumeAttachmentPrototypeInstanceContext[];
    /** The VPC the virtual server instance is to be a part of. If provided, must match the
     *  VPC tied to the subnets of the instance's network interfaces.
     */
    vpc?: VPCIdentity;
  }

  /** InstanceTemplateReference. */
  export interface InstanceTemplateReference {
    /** The CRN for this instance template. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: InstanceTemplateReferenceDeleted;
    /** The URL for this instance template. */
    href: string;
    /** The unique identifier for this instance template. */
    id: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface InstanceTemplateReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** The virtual server instance VCPU configuration. */
  export interface InstanceVCPU {
    /** The VCPU architecture. */
    architecture: string;
    /** The number of VCPUs assigned. */
    count: number;
  }

  /** Key. */
  export interface Key {
    /** The date and time that the key was created. */
    created_at: string;
    /** The CRN for this key. */
    crn: string;
    /** The fingerprint for this key.  The value is returned base64-encoded and prefixed with the hash algorithm
     *  (always `SHA256`).
     */
    fingerprint: string;
    /** The URL for this key. */
    href: string;
    /** The unique identifier for this key. */
    id: string;
    /** The length of this key (in bits). */
    length: number;
    /** The unique user-defined name for this key. If unspecified, the name will be a hyphenated list of
     *  randomly-selected words.
     */
    name: string;
    /** The public SSH key. */
    public_key: string;
    /** The resource group for this key. */
    resource_group: ResourceGroupReference;
    /** The crypto-system used by this key. */
    type: string;
  }

  /** KeyCollection. */
  export interface KeyCollection {
    /** Collection of keys. */
    keys: Key[];
  }

  /** Identifies a key by a unique property. */
  export interface KeyIdentity {
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface KeyReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** KeyReferenceInstanceInitializationContext. */
  export interface KeyReferenceInstanceInitializationContext {
  }

  /** LoadBalancer. */
  export interface LoadBalancer {
    /** The date and time that this load balancer was created. */
    created_at: string;
    /** The load balancer's CRN. */
    crn: string;
    /** Fully qualified domain name assigned to this load balancer. */
    hostname: string;
    /** The load balancer's canonical URL. */
    href: string;
    /** The unique identifier for this load balancer. */
    id: string;
    /** The type of this load balancer, public or private. */
    is_public: boolean;
    /** The listeners of this load balancer. */
    listeners: LoadBalancerListenerReference[];
    /** The unique user-defined name for this load balancer. */
    name: string;
    /** The operating status of this load balancer. */
    operating_status: string;
    /** The pools of this load balancer. */
    pools: LoadBalancerPoolReference[];
    /** The private IP addresses assigned to this load balancer. */
    private_ips: IP[];
    /** The profile to use for this load balancer. */
    profile: LoadBalancerProfileReference;
    /** The provisioning status of this load balancer. */
    provisioning_status: string;
    /** The public IP addresses assigned to this load balancer. Applicable only for public load balancers. */
    public_ips: IP[];
    /** The resource group for this load balancer. */
    resource_group: ResourceGroupReference;
    /** The subnets this load balancer is part of. */
    subnets: SubnetReference[];
  }

  /** LoadBalancerCollection. */
  export interface LoadBalancerCollection {
    /** Collection of load balancers. */
    load_balancers: LoadBalancer[];
  }

  /** Identifies a load balancer by a unique property. */
  export interface LoadBalancerIdentity {
  }

  /** LoadBalancerListener. */
  export interface LoadBalancerListener {
    /** If set to `true`, this listener will accept and forward PROXY protocol information. Supported by load
     *  balancers in the `application` family (otherwise always `false`).
     */
    accept_proxy_protocol: boolean;
    /** The certificate instance used for SSL termination. It is applicable only to `https` protocol. */
    certificate_instance?: CertificateInstanceReference;
    /** The connection limit of the listener. */
    connection_limit?: number;
    /** The date and time that this listener was created. */
    created_at: string;
    /** The default pool associated with the listener. */
    default_pool?: LoadBalancerPoolReference;
    /** The listener's canonical URL. */
    href: string;
    /** The unique identifier for this load balancer listener. */
    id: string;
    /** The list of policies of this listener. */
    policies?: LoadBalancerListenerPolicyReference[];
    /** The listener port number. Each listener in the load balancer must have a unique
     *  `port` and `protocol` combination.
     */
    port: number;
    /** The listener protocol. Load balancers in the `network` family support `tcp`. Load balancers in the
     *  `application` family support `tcp`, `http`, and `https`. Each listener in the load balancer must have a unique
     *  `port` and `protocol` combination.
     */
    protocol: string;
    /** The provisioning status of this listener. */
    provisioning_status: string;
  }

  /** LoadBalancerListenerCollection. */
  export interface LoadBalancerListenerCollection {
    /** Collection of listeners. */
    listeners: LoadBalancerListener[];
  }

  /** LoadBalancerListenerPolicy. */
  export interface LoadBalancerListenerPolicy {
    /** The policy action. */
    action: string;
    /** The date and time that this policy was created. */
    created_at: string;
    /** The listener policy's canonical URL. */
    href: string;
    /** The policy's unique identifier. */
    id: string;
    /** The user-defined name for this policy. */
    name: string;
    /** Priority of the policy. Lower value indicates higher priority. */
    priority: number;
    /** The provisioning status of this policy. */
    provisioning_status: string;
    /** The rules of this policy. */
    rules: LoadBalancerListenerPolicyRuleReference[];
    /** `LoadBalancerPoolReference` is in the response if `action` is `forward`.
     *  `LoadBalancerListenerPolicyRedirectURL` is in the response if `action` is `redirect`.
     */
    target?: LoadBalancerListenerPolicyTarget;
  }

  /** LoadBalancerListenerPolicyCollection. */
  export interface LoadBalancerListenerPolicyCollection {
    /** Collection of policies. */
    policies: LoadBalancerListenerPolicy[];
  }

  /** LoadBalancerListenerPolicyPrototype. */
  export interface LoadBalancerListenerPolicyPrototype {
    /** The policy action. */
    action: string;
    /** The user-defined name for this policy. Names must be unique within the load balancer listener the policy
     *  resides in.
     */
    name?: string;
    /** Priority of the policy. Lower value indicates higher priority. */
    priority: number;
    /** The list of rules of this policy. */
    rules?: LoadBalancerListenerPolicyRulePrototype[];
    /** When `action` is `forward`, `LoadBalancerPoolIdentity` is required to specify which
     *  pool the load balancer forwards the traffic to. When `action` is `redirect`,
     *  `LoadBalancerListenerPolicyRedirectURLPrototype` is required to specify the url and
     *  http status code used in the redirect response.
     */
    target?: LoadBalancerListenerPolicyTargetPrototype;
  }

  /** LoadBalancerListenerPolicyReference. */
  export interface LoadBalancerListenerPolicyReference {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: LoadBalancerListenerPolicyReferenceDeleted;
    /** The listener policy's canonical URL. */
    href: string;
    /** The policy's unique identifier. */
    id: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface LoadBalancerListenerPolicyReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** LoadBalancerListenerPolicyRule. */
  export interface LoadBalancerListenerPolicyRule {
    /** The condition of the rule. */
    condition: string;
    /** The date and time that this rule was created. */
    created_at: string;
    /** HTTP header field. This is only applicable to "header" rule type. */
    field?: string;
    /** The rule's canonical URL. */
    href: string;
    /** The rule's unique identifier. */
    id: string;
    /** The provisioning status of this rule. */
    provisioning_status: string;
    /** The type of the rule. */
    type: string;
    /** Value to be matched for rule condition. */
    value: string;
  }

  /** LoadBalancerListenerPolicyRuleCollection. */
  export interface LoadBalancerListenerPolicyRuleCollection {
    /** Collection of rules. */
    rules: LoadBalancerListenerPolicyRule[];
  }

  /** LoadBalancerListenerPolicyRulePrototype. */
  export interface LoadBalancerListenerPolicyRulePrototype {
    /** The condition of the rule. */
    condition: string;
    /** HTTP header field. This is only applicable to "header" rule type. */
    field?: string;
    /** The type of the rule. */
    type: string;
    /** Value to be matched for rule condition. */
    value: string;
  }

  /** LoadBalancerListenerPolicyRuleReference. */
  export interface LoadBalancerListenerPolicyRuleReference {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: LoadBalancerListenerPolicyRuleReferenceDeleted;
    /** The rule's canonical URL. */
    href: string;
    /** The rule's unique identifier. */
    id: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface LoadBalancerListenerPolicyRuleReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** `LoadBalancerPoolReference` is in the response if `action` is `forward`. `LoadBalancerListenerPolicyRedirectURL` is in the response if `action` is `redirect`. */
  export interface LoadBalancerListenerPolicyTarget {
  }

  /** When `action` is `forward`, `LoadBalancerPoolIdentity` specifies which pool the load balancer forwards the traffic to. When `action` is `redirect`, `LoadBalancerListenerPolicyRedirectURLPatch` specifies the url and http status code used in the redirect response. */
  export interface LoadBalancerListenerPolicyTargetPatch {
  }

  /** When `action` is `forward`, `LoadBalancerPoolIdentity` is required to specify which pool the load balancer forwards the traffic to. When `action` is `redirect`, `LoadBalancerListenerPolicyRedirectURLPrototype` is required to specify the url and http status code used in the redirect response. */
  export interface LoadBalancerListenerPolicyTargetPrototype {
  }

  /** LoadBalancerListenerPrototypeLoadBalancerContext. */
  export interface LoadBalancerListenerPrototypeLoadBalancerContext {
    /** If set to `true`, this listener will accept and forward PROXY protocol information. Supported by load
     *  balancers in the `application` family (otherwise always `false`).
     */
    accept_proxy_protocol?: boolean;
    /** The connection limit of the listener. */
    connection_limit?: number;
    /** The default pool associated with the listener. */
    default_pool?: LoadBalancerPoolIdentityByName;
    /** The listener port number. Each listener in the load balancer must have a unique
     *  `port` and `protocol` combination.
     */
    port: number;
    /** The listener protocol. Load balancers in the `network` family support `tcp`. Load balancers in the
     *  `application` family support `tcp`, `http`, and `https`. Each listener in the load balancer must have a unique
     *  `port` and `protocol` combination.
     */
    protocol: string;
  }

  /** LoadBalancerListenerReference. */
  export interface LoadBalancerListenerReference {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: LoadBalancerListenerReferenceDeleted;
    /** The listener's canonical URL. */
    href: string;
    /** The unique identifier for this load balancer listener. */
    id: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface LoadBalancerListenerReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** LoadBalancerPool. */
  export interface LoadBalancerPool {
    /** The load balancing algorithm. */
    algorithm: string;
    /** The date and time that this pool was created. */
    created_at: string;
    /** The health monitor of this pool. */
    health_monitor: LoadBalancerPoolHealthMonitor;
    /** The pool's canonical URL. */
    href: string;
    /** The unique identifier for this load balancer pool. */
    id: string;
    /** The instance group that is managing this pool. */
    instance_group?: InstanceGroupReference;
    /** The backend server members of the pool. */
    members?: LoadBalancerPoolMemberReference[];
    /** The user-defined name for this load balancer pool. */
    name: string;
    /** The protocol used for this load balancer pool.
     *
     *  The enumerated values for this property are expected to expand in the future. When processing this property,
     *  check for and log unknown values. Optionally halt processing and surface the error, or bypass the pool on which
     *  the unexpected property value was encountered.
     */
    protocol: string;
    /** The provisioning status of this pool. */
    provisioning_status: string;
    /** The PROXY protocol setting for this pool:
     *  - `v1`: Enabled with version 1 (human-readable header format)
     *  - `v2`: Enabled with version 2 (binary header format)
     *  - `disabled`: Disabled
     *
     *  Supported by load balancers in the `application` family (otherwise always `disabled`).
     */
    proxy_protocol: string;
    /** The session persistence of this pool. */
    session_persistence?: LoadBalancerPoolSessionPersistence;
  }

  /** LoadBalancerPoolCollection. */
  export interface LoadBalancerPoolCollection {
    /** Collection of pools. */
    pools: LoadBalancerPool[];
  }

  /** LoadBalancerPoolHealthMonitor. */
  export interface LoadBalancerPoolHealthMonitor {
    /** The health check interval in seconds. Interval must be greater than timeout value. */
    delay: number;
    /** The health check max retries. */
    max_retries: number;
    /** The health check port number. If specified, this overrides the ports specified in the server member
     *  resources.
     */
    port?: number;
    /** The health check timeout in seconds. */
    timeout: number;
    /** The protocol type of this load balancer pool health monitor.
     *
     *  The enumerated values for this property are expected to expand in the future. When processing this property,
     *  check for and log unknown values. Optionally halt processing and surface the error, or bypass the health monitor
     *  on which the unexpected property value was encountered.
     */
    type: string;
    /** The health check URL path. Applicable only if the health monitor `type` is `http` or `https`. */
    url_path?: string;
  }

  /** LoadBalancerPoolHealthMonitorPatch. */
  export interface LoadBalancerPoolHealthMonitorPatch {
    /** The health check interval in seconds. Interval must be greater than timeout value. */
    delay: number;
    /** The health check max retries. */
    max_retries: number;
    /** The health check port number. If specified, this overrides the ports specified in the server member
     *  resources. Specify `null` to remove an existing port value.
     */
    port?: number;
    /** The health check timeout in seconds. */
    timeout: number;
    /** The protocol type of this load balancer pool health monitor. */
    type: string;
    /** The health check URL path. Applicable only if the health monitor `type` is `http` or `https`. */
    url_path?: string;
  }

  /** LoadBalancerPoolHealthMonitorPrototype. */
  export interface LoadBalancerPoolHealthMonitorPrototype {
    /** The health check interval in seconds. Interval must be greater than timeout value. */
    delay: number;
    /** The health check max retries. */
    max_retries: number;
    /** The health check port number. If specified, this overrides the ports specified in the server member
     *  resources.
     */
    port?: number;
    /** The health check timeout in seconds. */
    timeout: number;
    /** The protocol type of this load balancer pool health monitor. */
    type: string;
    /** The health check URL path. Applicable only if the health monitor `type` is `http` or `https`. */
    url_path?: string;
  }

  /** Identifies a load balancer pool by a unique property. */
  export interface LoadBalancerPoolIdentity {
  }

  /** LoadBalancerPoolIdentityByName. */
  export interface LoadBalancerPoolIdentityByName {
    /** The user-defined name for this load balancer pool. */
    name: string;
  }

  /** LoadBalancerPoolMember. */
  export interface LoadBalancerPoolMember {
    /** The date and time that this member was created. */
    created_at: string;
    /** Health of the server member in the pool. */
    health: string;
    /** The member's canonical URL. */
    href: string;
    /** The unique identifier for this load balancer pool member. */
    id: string;
    /** The port number of the application running in the server member. */
    port: number;
    /** The provisioning status of this member. */
    provisioning_status: string;
    /** The pool member target. Load balancers in the `network` family support virtual server
     *  instances. Load balancers in the `application` family support IP addresses.
     */
    target: LoadBalancerPoolMemberTarget;
    /** Weight of the server member. Applicable only if the pool algorithm is `weighted_round_robin`. */
    weight?: number;
  }

  /** LoadBalancerPoolMemberCollection. */
  export interface LoadBalancerPoolMemberCollection {
    /** Collection of members. */
    members: LoadBalancerPoolMember[];
  }

  /** LoadBalancerPoolMemberPrototype. */
  export interface LoadBalancerPoolMemberPrototype {
    /** The port number of the application running in the server member. */
    port: number;
    /** The pool member target. Load balancers in the `network` family support virtual server
     *  instances. Load balancers in the `application` family support IP addresses.
     */
    target: LoadBalancerPoolMemberTargetPrototype;
    /** Weight of the server member. Applicable only if the pool algorithm is `weighted_round_robin`. */
    weight?: number;
  }

  /** LoadBalancerPoolMemberReference. */
  export interface LoadBalancerPoolMemberReference {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: LoadBalancerPoolMemberReferenceDeleted;
    /** The member's canonical URL. */
    href: string;
    /** The unique identifier for this load balancer pool member. */
    id: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface LoadBalancerPoolMemberReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** The pool member target. Load balancers in the `network` family support virtual server instances. Load balancers in the `application` family support IP addresses. */
  export interface LoadBalancerPoolMemberTarget {
  }

  /** The pool member target. Load balancers in the `network` family support virtual server instances. Load balancers in the `application` family support IP addresses. */
  export interface LoadBalancerPoolMemberTargetPrototype {
  }

  /** LoadBalancerPoolPrototype. */
  export interface LoadBalancerPoolPrototype {
    /** The load balancing algorithm. */
    algorithm: string;
    /** The health monitor of this pool. */
    health_monitor: LoadBalancerPoolHealthMonitorPrototype;
    /** The members for this load balancer pool. For load balancers in the `network` family, the same `port` and
     *  `target` tuple cannot be shared by a pool member of any other load balancer in the same VPC.
     */
    members?: LoadBalancerPoolMemberPrototype[];
    /** The user-defined name for this load balancer pool. If unspecified, the name will be a hyphenated list of
     *  randomly-selected words.
     */
    name?: string;
    /** The protocol used for this load balancer pool. Load balancers in the `network` family support `tcp`. Load
     *  balancers in the `application` family support `tcp`, `http`, and
     *  `https`.
     */
    protocol: string;
    /** The PROXY protocol setting for this pool:
     *  - `v1`: Enabled with version 1 (human-readable header format)
     *  - `v2`: Enabled with version 2 (binary header format)
     *  - `disabled`: Disabled
     *
     *  Supported by load balancers in the `application` family (otherwise always `disabled`).
     */
    proxy_protocol?: string;
    /** The session persistence of this pool. */
    session_persistence?: LoadBalancerPoolSessionPersistencePrototype;
  }

  /** LoadBalancerPoolReference. */
  export interface LoadBalancerPoolReference {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: LoadBalancerPoolReferenceDeleted;
    /** The pool's canonical URL. */
    href: string;
    /** The unique identifier for this load balancer pool. */
    id: string;
    /** The user-defined name for this load balancer pool. */
    name: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface LoadBalancerPoolReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** LoadBalancerPoolSessionPersistence. */
  export interface LoadBalancerPoolSessionPersistence {
    /** The session persistence type. */
    type: string;
  }

  /** LoadBalancerPoolSessionPersistencePatch. */
  export interface LoadBalancerPoolSessionPersistencePatch {
    /** The session persistence type. */
    type: string;
  }

  /** LoadBalancerPoolSessionPersistencePrototype. */
  export interface LoadBalancerPoolSessionPersistencePrototype {
    /** The session persistence type. */
    type: string;
  }

  /** LoadBalancerProfile. */
  export interface LoadBalancerProfile {
    /** The product family this load balancer profile belongs to. */
    family: string;
    /** The URL for this load balancer profile. */
    href: string;
    /** The globally unique name for this load balancer profile. */
    name: string;
  }

  /** LoadBalancerProfileCollection. */
  export interface LoadBalancerProfileCollection {
    /** A link to the first page of resources. */
    first: LoadBalancerProfileCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: LoadBalancerProfileCollectionNext;
    /** Collection of load balancer profiles. */
    profiles: LoadBalancerProfile[];
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface LoadBalancerProfileCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface LoadBalancerProfileCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** Identifies a load balancer profile by a unique property. */
  export interface LoadBalancerProfileIdentity {
  }

  /** LoadBalancerProfileReference. */
  export interface LoadBalancerProfileReference {
    /** The product family this load balancer profile belongs to. */
    family: string;
    /** The URL for this load balancer profile. */
    href: string;
    /** The globally unique name for this load balancer profile. */
    name: string;
  }

  /** LoadBalancerStatistics. */
  export interface LoadBalancerStatistics {
    /** Number of active connections of this load balancer. */
    active_connections: number;
    /** Current connection rate (connections per second) of this load balancer. */
    connection_rate: number;
    /** Total number of data processed (bytes) of this load balancer within current calendar month. */
    data_processed_this_month: number;
    /** Current throughput (Mbps) of this load balancer. */
    throughput: number;
  }

  /** NetworkACL. */
  export interface NetworkACL {
    /** The date and time that the network ACL was created. */
    created_at: string;
    /** The CRN for this network ACL. */
    crn: string;
    /** The URL for this network ACL. */
    href: string;
    /** The unique identifier for this network ACL. */
    id: string;
    /** The user-defined name for this network ACL. */
    name: string;
    /** The resource group for this network ACL. */
    resource_group: ResourceGroupReference;
    /** The ordered rules for this network ACL. If no rules exist, all traffic will be denied. */
    rules: NetworkACLRuleItem[];
    /** The subnets to which this network ACL is attached. */
    subnets: SubnetReference[];
    /** The VPC this network ACL is a part of. */
    vpc: VPCReference;
  }

  /** NetworkACLCollection. */
  export interface NetworkACLCollection {
    /** A link to the first page of resources. */
    first: NetworkACLCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** Collection of network ACLs. */
    network_acls: NetworkACL[];
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: NetworkACLCollectionNext;
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface NetworkACLCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface NetworkACLCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** Identifies a network ACL by a unique property. */
  export interface NetworkACLIdentity {
  }

  /** NetworkACLPrototype. */
  export interface NetworkACLPrototype {
    /** The user-defined name for this network ACL. Names must be unique within the VPC the network ACL resides in.
     *  If unspecified, the name will be a hyphenated list of randomly-selected words.
     */
    name?: string;
    /** The resource group to use. If unspecified, the account's [default resource
     *  group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
     */
    resource_group?: ResourceGroupIdentity;
    /** The VPC this network ACL is to be a part of. */
    vpc: VPCIdentity;
  }

  /** NetworkACLReference. */
  export interface NetworkACLReference {
    /** The CRN for this network ACL. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: NetworkACLReferenceDeleted;
    /** The URL for this network ACL. */
    href: string;
    /** The unique identifier for this network ACL. */
    id: string;
    /** The user-defined name for this network ACL. */
    name: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface NetworkACLReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** NetworkACLRule. */
  export interface NetworkACLRule {
    /** Whether to allow or deny matching traffic. */
    action: string;
    /** The rule that this rule is immediately before. If absent, this is the last rule. */
    before?: NetworkACLRuleReference;
    /** The date and time that the rule was created. */
    created_at: string;
    /** The destination CIDR block. The CIDR block `0.0.0.0/0` applies to all addresses. */
    destination: string;
    /** Whether the traffic to be matched is `inbound` or `outbound`. */
    direction: string;
    /** The URL for this network ACL rule. */
    href: string;
    /** The unique identifier for this network ACL rule. */
    id: string;
    /** The IP version for this rule. */
    ip_version: string;
    /** The user-defined name for this rule. Names must be unique within the network ACL the rule resides in. If
     *  unspecified, the name will be a hyphenated list of randomly-selected words.
     */
    name: string;
    /** The protocol to enforce. */
    protocol: string;
    /** The source CIDR block. The CIDR block `0.0.0.0/0` applies to all addresses. */
    source: string;
  }

  /** The rule to move this rule immediately before. Specify `null` to move this rule after all existing rules. */
  export interface NetworkACLRuleBeforePatch {
  }

  /** The rule to insert this rule immediately before. If omitted, this rule will be inserted after all existing rules. */
  export interface NetworkACLRuleBeforePrototype {
  }

  /** NetworkACLRuleCollection. */
  export interface NetworkACLRuleCollection {
    /** A link to the first page of resources. */
    first: NetworkACLRuleCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: NetworkACLRuleCollectionNext;
    /** Ordered collection of network ACL rules. */
    rules: NetworkACLRuleItem[];
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface NetworkACLRuleCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface NetworkACLRuleCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** NetworkACLRuleItem. */
  export interface NetworkACLRuleItem {
    /** Whether to allow or deny matching traffic. */
    action: string;
    /** The rule that this rule is immediately before. In a rule collection, this always
     *  refers to the next item in the collection. If absent, this is the last rule.
     */
    before?: NetworkACLRuleReference;
    /** The date and time that the rule was created. */
    created_at: string;
    /** The destination CIDR block. The CIDR block `0.0.0.0/0` applies to all addresses. */
    destination: string;
    /** Whether the traffic to be matched is `inbound` or `outbound`. */
    direction: string;
    /** The URL for this network ACL rule. */
    href: string;
    /** The unique identifier for this network ACL rule. */
    id: string;
    /** The IP version for this rule. */
    ip_version: string;
    /** The user-defined name for this rule. Names must be unique within the network ACL the rule resides in. If
     *  unspecified, the name will be a hyphenated list of randomly-selected words.
     */
    name: string;
    /** The protocol to enforce. */
    protocol: string;
    /** The source CIDR block. The CIDR block `0.0.0.0/0` applies to all addresses. */
    source: string;
  }

  /** NetworkACLRulePrototype. */
  export interface NetworkACLRulePrototype {
    /** Whether to allow or deny matching traffic. */
    action: string;
    /** The rule to insert this rule immediately before. If omitted, this rule will be
     *  inserted after all existing rules.
     */
    before?: NetworkACLRuleBeforePrototype;
    /** The destination IP address or CIDR block. The CIDR block `0.0.0.0/0` applies to all addresses. */
    destination: string;
    /** Whether the traffic to be matched is `inbound` or `outbound`. */
    direction: string;
    /** The user-defined name for this rule. Names must be unique within the network ACL the rule resides in. If
     *  unspecified, the name will be a hyphenated list of randomly-selected words.
     */
    name?: string;
    /** The protocol to enforce. */
    protocol: string;
    /** The source IP address or CIDR block.  The CIDR block `0.0.0.0/0` applies to all addresses. */
    source: string;
  }

  /** NetworkACLRulePrototypeNetworkACLContext. */
  export interface NetworkACLRulePrototypeNetworkACLContext {
    /** Whether to allow or deny matching traffic. */
    action: string;
    /** The destination IP address or CIDR block. The CIDR block `0.0.0.0/0` applies to all addresses. */
    destination: string;
    /** Whether the traffic to be matched is `inbound` or `outbound`. */
    direction: string;
    /** The user-defined name for this rule. Names must be unique within the network ACL the rule resides in. If
     *  unspecified, the name will be a hyphenated list of randomly-selected words.
     */
    name?: string;
    /** The protocol to enforce. */
    protocol: string;
    /** The source IP address or CIDR block.  The CIDR block `0.0.0.0/0` applies to all addresses. */
    source: string;
  }

  /** NetworkACLRuleReference. */
  export interface NetworkACLRuleReference {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: NetworkACLRuleReferenceDeleted;
    /** The URL for this network ACL rule. */
    href: string;
    /** The unique identifier for this network ACL rule. */
    id: string;
    /** The user-defined name for this network ACL rule. */
    name: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface NetworkACLRuleReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** NetworkInterface. */
  export interface NetworkInterface {
    /** Indicates whether IP spoofing is allowed on this interface. If false, IP spoofing is prevented on this
     *  interface. If true, IP spoofing is allowed on this interface.
     */
    allow_ip_spoofing: boolean;
    /** The date and time that the network interface was created. */
    created_at: string;
    /** Array of references to floating IPs associated with this network interface. */
    floating_ips?: FloatingIPReference[];
    /** The URL for this network interface. */
    href: string;
    /** The unique identifier for this network interface. */
    id: string;
    /** The user-defined name for this network interface. */
    name: string;
    /** The network interface port speed in Mbps. */
    port_speed: number;
    /** The primary IPv4 address. */
    primary_ipv4_address: string;
    /** The resource type. */
    resource_type: string;
    /** Collection of security groups. */
    security_groups: SecurityGroupReference[];
    /** The status of the network interface. */
    status: string;
    /** The associated subnet. */
    subnet: SubnetReference;
    /** The type of this network interface as it relates to an instance. */
    type: string;
  }

  /** NetworkInterfaceCollection. */
  export interface NetworkInterfaceCollection {
    /** A link to the first page of resources. */
    first: NetworkInterfaceCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** Collection of network interfaces. */
    network_interfaces: NetworkInterface[];
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: NetworkInterfaceCollectionNext;
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface NetworkInterfaceCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface NetworkInterfaceCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** NetworkInterfaceInstanceContextReference. */
  export interface NetworkInterfaceInstanceContextReference {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: NetworkInterfaceInstanceContextReferenceDeleted;
    /** The URL for this network interface. */
    href: string;
    /** The unique identifier for this network interface. */
    id: string;
    /** The user-defined name for this network interface. */
    name: string;
    /** The primary IPv4 address. */
    primary_ipv4_address: string;
    /** The resource type. */
    resource_type: string;
    /** The associated subnet. */
    subnet: SubnetReference;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface NetworkInterfaceInstanceContextReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** NetworkInterfacePrototype. */
  export interface NetworkInterfacePrototype {
    /** Indicates whether IP spoofing is allowed on this interface. If false, IP spoofing is prevented on this
     *  interface. If true, IP spoofing is allowed on this interface.
     */
    allow_ip_spoofing?: boolean;
    /** The user-defined name for this network interface. If unspecified, the name will be a hyphenated list of
     *  randomly-selected words.
     */
    name?: string;
    /** The primary IPv4 address. If specified, it must be an available address on the network interface's subnet.
     *  If unspecified, an available address on the subnet will be automatically selected.
     */
    primary_ipv4_address?: string;
    /** Collection of security groups. */
    security_groups?: SecurityGroupIdentity[];
    /** The associated subnet. */
    subnet: SubnetIdentity;
  }

  /** NetworkInterfaceReference. */
  export interface NetworkInterfaceReference {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: NetworkInterfaceReferenceDeleted;
    /** The URL for this network interface. */
    href: string;
    /** The unique identifier for this network interface. */
    id: string;
    /** The user-defined name for this network interface. */
    name: string;
    /** The primary IPv4 address. */
    primary_ipv4_address: string;
    /** The resource type. */
    resource_type: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface NetworkInterfaceReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface NetworkInterfaceReferenceTargetContextDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** NetworkInterfaceUnpaginatedCollection. */
  export interface NetworkInterfaceUnpaginatedCollection {
    /** Collection of network interfaces. */
    network_interfaces: NetworkInterface[];
  }

  /** OperatingSystem. */
  export interface OperatingSystem {
    /** The operating system architecture. */
    architecture: string;
    /** A unique, display-friendly name for the operating system. */
    display_name: string;
    /** The name of the software family this operating system belongs to. */
    family: string;
    /** The URL for this operating system. */
    href: string;
    /** The globally unique name for this operating system. */
    name: string;
    /** The vendor of the operating system. */
    vendor: string;
    /** The major release version of this operating system. */
    version: string;
  }

  /** OperatingSystemCollection. */
  export interface OperatingSystemCollection {
    /** A link to the first page of resources. */
    first: OperatingSystemCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: OperatingSystemCollectionNext;
    /** Collection of operating systems. */
    operating_systems: OperatingSystem[];
  }

  /** A link to the first page of resources. */
  export interface OperatingSystemCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface OperatingSystemCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** Identifies an operating system by a unique property. */
  export interface OperatingSystemIdentity {
  }

  /** PublicGateway. */
  export interface PublicGateway {
    /** The date and time that the public gateway was created. */
    created_at: string;
    /** The CRN for this public gateway. */
    crn: string;
    /** Reference to the floating IP which is bound to this public gateway. */
    floating_ip: PublicGatewayFloatingIp;
    /** The URL for this public gateway. */
    href: string;
    /** The unique identifier for this public gateway. */
    id: string;
    /** The user-defined name for this public gateway. */
    name: string;
    /** The resource group for this public gateway. */
    resource_group: ResourceGroupReference;
    /** The resource type. */
    resource_type: string;
    /** The status of the volume. */
    status: string;
    /** The VPC this public gateway serves. */
    vpc: VPCReference;
    /** The zone where this public gateway lives. */
    zone: ZoneReference;
  }

  /** PublicGatewayCollection. */
  export interface PublicGatewayCollection {
    /** A link to the first page of resources. */
    first: PublicGatewayCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: PublicGatewayCollectionNext;
    /** Collection of public gateways. */
    public_gateways: PublicGateway[];
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface PublicGatewayCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface PublicGatewayCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** PublicGatewayFloatingIPPrototype. */
  export interface PublicGatewayFloatingIPPrototype {
  }

  /** Reference to the floating IP which is bound to this public gateway. */
  export interface PublicGatewayFloatingIp {
    /** The globally unique IP address. */
    address: string;
    /** The CRN for this floating IP. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: FloatingIPReferenceDeleted;
    /** The URL for this floating IP. */
    href: string;
    /** The unique identifier for this floating IP. */
    id: string;
    /** The unique user-defined name for this floating IP. */
    name: string;
  }

  /** Identifies a public gateway by a unique property. */
  export interface PublicGatewayIdentity {
  }

  /** PublicGatewayReference. */
  export interface PublicGatewayReference {
    /** The CRN for this public gateway. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: PublicGatewayReferenceDeleted;
    /** The URL for this public gateway. */
    href: string;
    /** The unique identifier for this public gateway. */
    id: string;
    /** The user-defined name for this public gateway. */
    name: string;
    /** The resource type. */
    resource_type: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface PublicGatewayReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** Region. */
  export interface Region {
    /** The API endpoint for this region. */
    endpoint: string;
    /** The URL for this region. */
    href: string;
    /** The globally unique name for this region. */
    name: string;
    /** The availability status of this region. */
    status: string;
  }

  /** RegionCollection. */
  export interface RegionCollection {
    /** Collection of regions. */
    regions: Region[];
  }

  /** RegionReference. */
  export interface RegionReference {
    /** The URL for this region. */
    href: string;
    /** The globally unique name for this region. */
    name: string;
  }

  /** ReservedIP. */
  export interface ReservedIP {
    /** The IP address. This property may add support for IPv6 addresses in the future. When processing a value in
     *  this property, verify that the address is in an expected format. If it is not, log an error. Optionally halt
     *  processing and surface the error, or bypass the resource on which the unexpected IP address format was
     *  encountered.
     */
    address: string;
    /** If set to `true`, this reserved IP will be automatically deleted when the target is deleted or when the
     *  reserved IP is unbound.
     */
    auto_delete: boolean;
    /** The date and time that the reserved IP was created. */
    created_at: string;
    /** The URL for this reserved IP. */
    href: string;
    /** The unique identifier for this reserved IP. */
    id: string;
    /** The user-defined or system-provided name for this reserved IP. */
    name: string;
    /** The owner of a reserved IP, defining whether it is managed by the user or the provider. */
    owner: string;
    /** The resource type. */
    resource_type: string;
    /** The target of this reserved IP. */
    target?: ReservedIPTarget;
  }

  /** ReservedIPCollection. */
  export interface ReservedIPCollection {
    /** A link to the first page of resources. */
    first: ReservedIPCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: ReservedIPCollectionNext;
    /** Collection of reserved IPs in this subnet. */
    reserved_ips: ReservedIP[];
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** ReservedIPCollectionEndpointGatewayContext. */
  export interface ReservedIPCollectionEndpointGatewayContext {
    /** A link to the first page of resources. */
    first: ReservedIPCollectionEndpointGatewayContextFirst;
    /** Collection of reserved IPs bound to an endpoint gateway. */
    ips: ReservedIP[];
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: ReservedIPCollectionEndpointGatewayContextNext;
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface ReservedIPCollectionEndpointGatewayContextFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface ReservedIPCollectionEndpointGatewayContextNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the first page of resources. */
  export interface ReservedIPCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface ReservedIPCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** ReservedIPReference. */
  export interface ReservedIPReference {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: ReservedIPReferenceDeleted;
    /** The URL for this reserved IP. */
    href: string;
    /** The unique identifier for this reserved IP. */
    id: string;
    /** The user-defined or system-provided name for this reserved IP. */
    name: string;
    /** The resource type. */
    resource_type: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface ReservedIPReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** The target of this reserved IP. */
  export interface ReservedIPTarget {
  }

  /** The target this reserved IP is to be bound to. */
  export interface ReservedIPTargetPrototype {
  }

  /** The resource group to use. If unspecified, the account's [default resource group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used. */
  export interface ResourceGroupIdentity {
  }

  /** ResourceGroupReference. */
  export interface ResourceGroupReference {
    /** The URL for this resource group. */
    href: string;
    /** The unique identifier for this resource group. */
    id: string;
    /** The user-defined name for this resource group. */
    name: string;
  }

  /** Route. */
  export interface Route {
    /** The date and time that the route was created. */
    created_at: string;
    /** The destination of the route. */
    destination: string;
    /** The URL for this route. */
    href: string;
    /** The unique identifier for this route. */
    id: string;
    /** The lifecycle state of the route. */
    lifecycle_state: string;
    /** The user-defined name for this route. */
    name: string;
    /** If `action` is `deliver`, the next hop that packets will be delivered to.  For
     *  other `action` values, its `address` will be `0.0.0.0`.
     */
    next_hop: RouteNextHop;
    /** The zone the route applies to. (Traffic from subnets in this zone will be subject to this route.). */
    zone: ZoneReference;
  }

  /** RouteCollection. */
  export interface RouteCollection {
    /** A link to the first page of resources. */
    first: RouteCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: RouteCollectionNext;
    /** Collection of routes. */
    routes: Route[];
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface RouteCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface RouteCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** RouteNextHop. */
  export interface RouteNextHop {
  }

  /** The next hop packets will be routed to. */
  export interface RouteNextHopPrototype {
  }

  /** RoutePrototype. */
  export interface RoutePrototype {
    /** The action to perform with a packet matching the route:
     *  - `delegate`: delegate to the system's built-in routes
     *  - `deliver`: deliver the packet to the specified `next_hop`
     *  - `drop`: drop the packet.
     */
    action?: string;
    /** The destination of the route. At most two routes per `zone` in a table can have the same destination, and
     *  only if both routes have an `action` of `deliver` and the
     *  `next_hop` is an IP address.
     */
    destination: string;
    /** The user-defined name for this route. If unspecified, the name will be a hyphenated list of
     *  randomly-selected words. Names must be unique within the VPC routing table the route resides in.
     */
    name?: string;
    /** If `action` is `deliver`, the next hop that packets will be delivered to.  For
     *  other `action` values, its `address` will be `0.0.0.0`.
     */
    next_hop: RouteNextHopPrototype;
    /** The zone to apply the route to. (Traffic from subnets in this zone will be subject to this route.). */
    zone: ZoneIdentity;
  }

  /** RouteReference. */
  export interface RouteReference {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: RouteReferenceDeleted;
    /** The URL for this route. */
    href: string;
    /** The unique identifier for this route. */
    id: string;
    /** The user-defined name for this route. */
    name: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface RouteReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** RoutingTable. */
  export interface RoutingTable {
    /** The date and time that this routing table was created. */
    created_at: string;
    /** The URL for this routing table. */
    href: string;
    /** The unique identifier for this routing table. */
    id: string;
    /** Indicates whether this is the default routing table for this VPC. */
    is_default: boolean;
    /** The lifecycle state of the routing table. */
    lifecycle_state: string;
    /** The user-defined name for this routing table. */
    name: string;
    /** The resource type. */
    resource_type: string;
    /** Indicates whether this routing table is used to route traffic that originates from
     *  [Direct Link](https://cloud.ibm.com/docs/dl/) to this VPC.
     *
     *  Incoming traffic will be routed according to the routing table with one exception: routes with an `action` of
     *  `deliver` are treated as `drop` unless the `next_hop` is an IP address within the VPC's address prefix ranges.
     *  Therefore, if an incoming packet matches a route with with a `next_hop` of an internet-bound IP address or a VPN
     *  gateway connection, the packet will be dropped.
     */
    route_direct_link_ingress: boolean;
    /** Indicates whether this routing table is used to route traffic that originates from from [Transit
     *  Gateway](https://cloud.ibm.com/cloud/transit-gateway/) to this VPC.
     *
     *  Incoming traffic will be routed according to the routing table with one exception: routes with an `action` of
     *  `deliver` are treated as `drop` unless the `next_hop` is an IP address within the VPC's address prefix ranges.
     *  Therefore, if an incoming packet matches a route with with a `next_hop` of an internet-bound IP address or a VPN
     *  gateway connection, the packet will be dropped.
     */
    route_transit_gateway_ingress: boolean;
    /** Indicates whether this routing table is used to route traffic that originates from subnets in other zones in
     *  this VPC.
     *
     *  Incoming traffic will be routed according to the routing table with one exception: routes with an `action` of
     *  `deliver` are treated as `drop` unless the `next_hop` is an IP address within the VPC's address prefix ranges.
     *  Therefore, if an incoming packet matches a route with with a `next_hop` of an internet-bound IP address or a VPN
     *  gateway connection, the packet will be dropped.
     */
    route_vpc_zone_ingress: boolean;
    /** The routes for this routing table. */
    routes: RouteReference[];
    /** The subnets to which this routing table is attached. */
    subnets: SubnetReference[];
  }

  /** RoutingTableCollection. */
  export interface RoutingTableCollection {
    /** A link to the first page of resources. */
    first: RoutingTableCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: RoutingTableCollectionNext;
    /** Collection of routing tables. */
    routing_tables: RoutingTable[];
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface RoutingTableCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface RoutingTableCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** Identifies a routing table by a unique property. */
  export interface RoutingTableIdentity {
  }

  /** RoutingTableReference. */
  export interface RoutingTableReference {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: RoutingTableReferenceDeleted;
    /** The URL for this routing table. */
    href: string;
    /** The unique identifier for this routing table. */
    id: string;
    /** The user-defined name for this routing table. */
    name: string;
    /** The resource type. */
    resource_type: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface RoutingTableReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** SecurityGroup. */
  export interface SecurityGroup {
    /** The date and time that this security group was created. */
    created_at: string;
    /** The security group's CRN. */
    crn: string;
    /** The security group's canonical URL. */
    href: string;
    /** The unique identifier for this security group. */
    id: string;
    /** The user-defined name for this security group. Names must be unique within the VPC the security group
     *  resides in.
     */
    name: string;
    /** Array of references to network interfaces. */
    network_interfaces: NetworkInterfaceReference[];
    /** The resource group for this security group. */
    resource_group: ResourceGroupReference;
    /** Array of rules for this security group. If no rules exist, all traffic will be denied. */
    rules: SecurityGroupRule[];
    /** The VPC this security group is a part of. */
    vpc: VPCReference;
  }

  /** SecurityGroupCollection. */
  export interface SecurityGroupCollection {
    /** A link to the first page of resources. */
    first: SecurityGroupCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: SecurityGroupCollectionNext;
    /** Collection of security groups. */
    security_groups: SecurityGroup[];
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface SecurityGroupCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface SecurityGroupCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** Identifies a security group by a unique property. */
  export interface SecurityGroupIdentity {
  }

  /** SecurityGroupReference. */
  export interface SecurityGroupReference {
    /** The security group's CRN. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: SecurityGroupReferenceDeleted;
    /** The security group's canonical URL. */
    href: string;
    /** The unique identifier for this security group. */
    id: string;
    /** The user-defined name for this security group. Names must be unique within the VPC the security group
     *  resides in.
     */
    name: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface SecurityGroupReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** SecurityGroupRule. */
  export interface SecurityGroupRule {
    /** The direction of traffic to enforce, either `inbound` or `outbound`. */
    direction: string;
    /** The URL for this security group rule. */
    href: string;
    /** The unique identifier for this security group rule. */
    id: string;
    /** The IP version to enforce. The format of `remote.address` or `remote.cidr_block` must match this field, if
     *  they are used. Alternatively, if `remote` references a security group, then this rule only applies to IP
     *  addresses (network interfaces) in that group matching this IP version.
     */
    ip_version?: string;
    /** The protocol to enforce. */
    protocol?: string;
    /** The IP addresses or security groups from which this rule allows traffic (or to which,
     *  for outbound rules). Can be specified as an IP address, a CIDR block, or a security
     *  group. A CIDR block of `0.0.0.0/0` allows traffic from any source (or to any source,
     *  for outbound rules).
     */
    remote: SecurityGroupRuleRemote;
  }

  /** Collection of rules in a security group. */
  export interface SecurityGroupRuleCollection {
    /** Array of rules. */
    rules: SecurityGroupRule[];
  }

  /** SecurityGroupRulePrototype. */
  export interface SecurityGroupRulePrototype {
    /** The direction of traffic to enforce, either `inbound` or `outbound`. */
    direction: string;
    /** The IP version to enforce. The format of `remote.address` or `remote.cidr_block` must match this field, if
     *  they are used. Alternatively, if `remote` references a security group, then this rule only applies to IP
     *  addresses (network interfaces) in that group matching this IP version.
     */
    ip_version?: string;
    /** The protocol to enforce. */
    protocol?: string;
    /** The IP addresses or security groups from which this rule will allow traffic (or to
     *  which, for outbound rules). Can be specified as an IP address, a CIDR block, or a
     *  security group. If omitted, a CIDR block of `0.0.0.0/0` will be used to allow traffic
     *  from any source (or to any source, for outbound rules).
     */
    remote?: SecurityGroupRuleRemotePrototype;
  }

  /** The IP addresses or security groups from which this rule allows traffic (or to which, for outbound rules). Can be specified as an IP address, a CIDR block, or a security group. A CIDR block of `0.0.0.0/0` allows traffic from any source (or to any source, for outbound rules). */
  export interface SecurityGroupRuleRemote {
  }

  /** The IP addresses or security groups from which this rule will allow traffic (or to which, for outbound rules). Can be specified as an IP address, a CIDR block, or a security group. A CIDR block of `0.0.0.0/0` will allow traffic from any source (or to any source, for outbound rules). */
  export interface SecurityGroupRuleRemotePatch {
  }

  /** The IP addresses or security groups from which this rule will allow traffic (or to which, for outbound rules). Can be specified as an IP address, a CIDR block, or a security group. If omitted, a CIDR block of `0.0.0.0/0` will be used to allow traffic from any source (or to any source, for outbound rules). */
  export interface SecurityGroupRuleRemotePrototype {
  }

  /** Subnet. */
  export interface Subnet {
    /** The number of IPv4 addresses in this subnet that are not in-use, and have not been reserved by the user or
     *  the provider.
     */
    available_ipv4_address_count: number;
    /** The date and time that the subnet was created. */
    created_at: string;
    /** The CRN for this subnet. */
    crn: string;
    /** The URL for this subnet. */
    href: string;
    /** The unique identifier for this subnet. */
    id: string;
    /** The IP version(s) supported by this subnet. */
    ip_version: string;
    /** The IPv4 range of the subnet, expressed in CIDR format. */
    ipv4_cidr_block: string;
    /** The user-defined name for this subnet. */
    name: string;
    /** The network ACL for this subnet. */
    network_acl: NetworkACLReference;
    /** The public gateway to handle internet bound traffic for this subnet. */
    public_gateway?: PublicGatewayReference;
    /** The resource group for this subnet. */
    resource_group: ResourceGroupReference;
    /** The routing table for this subnet. */
    routing_table: RoutingTableReference;
    /** The status of the subnet. */
    status: string;
    /** The total number of IPv4 addresses in this subnet.
     *
     *  Note: This is calculated as 2<sup>(32 − prefix length)</sup>. For example, the prefix length `/24` gives:<br>
     *  2<sup>(32 − 24)</sup> = 2<sup>8</sup> = 256 addresses.
     */
    total_ipv4_address_count: number;
    /** The VPC this subnet is a part of. */
    vpc: VPCReference;
    /** The zone this subnet resides in. */
    zone: ZoneReference;
  }

  /** SubnetCollection. */
  export interface SubnetCollection {
    /** A link to the first page of resources. */
    first: SubnetCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: SubnetCollectionNext;
    /** Collection of subnets. */
    subnets: Subnet[];
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface SubnetCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface SubnetCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** Identifies a subnet by a unique property. */
  export interface SubnetIdentity {
  }

  /** SubnetPrototype. */
  export interface SubnetPrototype {
    /** The IP version(s) to support for this subnet. */
    ip_version?: string;
    /** The user-defined name for this subnet. Names must be unique within the VPC the subnet resides in. If
     *  unspecified, the name will be a hyphenated list of randomly-selected words.
     */
    name?: string;
    /** The network ACL to use for this subnet. */
    network_acl?: NetworkACLIdentity;
    /** The public gateway to handle internet bound traffic for this subnet. */
    public_gateway?: PublicGatewayIdentity;
    /** The resource group to use. If unspecified, the account's [default resource
     *  group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
     */
    resource_group?: ResourceGroupIdentity;
    /** The routing table to use for this subnet. If unspecified, the default routing table
     *  for the VPC is used. The routing table properties `route_direct_link_ingress`,
     *  `route_transit_gateway_ingress`, and `route_vpc_zone_ingress` must be `false`.
     */
    routing_table?: RoutingTableIdentity;
    /** The VPC the subnet is to be a part of. */
    vpc: VPCIdentity;
  }

  /** SubnetReference. */
  export interface SubnetReference {
    /** The CRN for this subnet. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: SubnetReferenceDeleted;
    /** The URL for this subnet. */
    href: string;
    /** The unique identifier for this subnet. */
    id: string;
    /** The user-defined name for this subnet. */
    name: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface SubnetReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** VPC. */
  export interface VPC {
    /** Indicates whether this VPC is connected to Classic Infrastructure. If true, this VPC's resources have
     *  private network connectivity to the account's Classic Infrastructure resources. Only one VPC, per region, may be
     *  connected in this way. This value is set at creation and subsequently immutable.
     */
    classic_access: boolean;
    /** The date and time that the VPC was created. */
    created_at: string;
    /** The CRN for this VPC. */
    crn: string;
    /** Array of CSE ([Cloud Service
     *  Endpoint](https://cloud.ibm.com/docs/resources?topic=resources-service-endpoints)) source IP addresses for the
     *  VPC. The VPC will have one CSE source IP address per zone.
     */
    cse_source_ips?: VPCCSESourceIP[];
    /** The default network ACL to use for subnets created in this VPC. */
    default_network_acl: NetworkACLReference;
    /** The default routing table to use for subnets created in this VPC. */
    default_routing_table: RoutingTableReference;
    /** The default security group to use for network interfaces created in this VPC. */
    default_security_group: SecurityGroupReference;
    /** The URL for this VPC. */
    href: string;
    /** The unique identifier for this VPC. */
    id: string;
    /** The unique user-defined name for this VPC. */
    name: string;
    /** The resource group for this VPC. */
    resource_group: ResourceGroupReference;
    /** The status of this VPC. */
    status: string;
  }

  /** VPCCSESourceIP. */
  export interface VPCCSESourceIP {
    /** The Cloud Service Endpoint source IP address for this zone. */
    ip: IP;
    /** The zone this Cloud Service Endpoint source IP belongs to. */
    zone: ZoneReference;
  }

  /** VPCCollection. */
  export interface VPCCollection {
    /** A link to the first page of resources. */
    first: VPCCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: VPCCollectionNext;
    /** The total number of resources across all pages. */
    total_count: number;
    /** Collection of VPCs. */
    vpcs: VPC[];
  }

  /** A link to the first page of resources. */
  export interface VPCCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface VPCCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** Identifies a VPC by a unique property. */
  export interface VPCIdentity {
  }

  /** VPCReference. */
  export interface VPCReference {
    /** The CRN for this VPC. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: VPCReferenceDeleted;
    /** The URL for this VPC. */
    href: string;
    /** The unique identifier for this VPC. */
    id: string;
    /** The unique user-defined name for this VPC. */
    name: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface VPCReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** VPNGateway. */
  export interface VPNGateway {
    /** Collection of references to VPN gateway connections. */
    connections: VPNGatewayConnectionReference[];
    /** The date and time that this VPN gateway was created. */
    created_at: string;
    /** The VPN gateway's CRN. */
    crn: string;
    /** The VPN gateway's canonical URL. */
    href: string;
    /** The unique identifier for this VPN gateway. */
    id: string;
    /** Collection of VPN gateway members. */
    members: VPNGatewayMember[];
    /** The user-defined name for this VPN gateway. */
    name: string;
    /** The resource group for this VPN gateway. */
    resource_group: ResourceGroupReference;
    /** The resource type. */
    resource_type: string;
    /** The status of the VPN gateway. */
    status: string;
    subnet: SubnetReference;
  }

  /** VPNGatewayCollection. */
  export interface VPNGatewayCollection {
    /** A link to the first page of resources. */
    first: VPNGatewayCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: VPNGatewayCollectionNext;
    /** The total number of resources across all pages. */
    total_count: number;
    /** Collection of VPN gateways. */
    vpn_gateways: VPNGateway[];
  }

  /** A link to the first page of resources. */
  export interface VPNGatewayCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface VPNGatewayCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** VPNGatewayConnection. */
  export interface VPNGatewayConnection {
    /** If set to false, the VPN gateway connection is shut down. */
    admin_state_up: boolean;
    /** The authentication mode. Only `psk` is currently supported. */
    authentication_mode: string;
    /** The date and time that this VPN gateway connection was created. */
    created_at: string;
    /** The Dead Peer Detection settings. */
    dead_peer_detection: VPNGatewayConnectionDPD;
    /** The VPN connection's canonical URL. */
    href: string;
    /** The unique identifier for this VPN gateway connection. */
    id: string;
    /** Optional IKE policy configuration. The absence of a policy indicates autonegotiation. */
    ike_policy?: IKEPolicyReference;
    /** Optional IPsec policy configuration. The absence of a policy indicates autonegotiation. */
    ipsec_policy?: IPsecPolicyReference;
    /** The mode of the VPN gateway. */
    mode: string;
    /** The user-defined name for this VPN gateway connection. */
    name: string;
    /** The IP address of the peer VPN gateway. */
    peer_address: string;
    /** The preshared key. */
    psk: string;
    /** The resource type. */
    resource_type: string;
    /** The status of a VPN gateway connection. */
    status: string;
  }

  /** Collection of VPN gateway connections in a VPN gateway. */
  export interface VPNGatewayConnectionCollection {
    /** Array of VPN gateway connections. */
    connections: VPNGatewayConnection[];
  }

  /** The Dead Peer Detection settings. */
  export interface VPNGatewayConnectionDPD {
    /** Dead Peer Detection actions. */
    action: string;
    /** Dead Peer Detection interval in seconds. */
    interval: number;
    /** Dead Peer Detection timeout in seconds. Must be at least the interval. */
    timeout: number;
  }

  /** The Dead Peer Detection settings. */
  export interface VPNGatewayConnectionDPDPrototype {
    /** Dead Peer Detection actions. */
    action?: string;
    /** Dead Peer Detection interval in seconds. */
    interval?: number;
    /** Dead Peer Detection timeout in seconds. Must be at least the interval. */
    timeout?: number;
  }

  /** VPNGatewayConnectionLocalCIDRs. */
  export interface VPNGatewayConnectionLocalCIDRs {
    /** A collection of local CIDRs for this resource. */
    local_cidrs?: string[];
  }

  /** VPNGatewayConnectionPatch. */
  export interface VPNGatewayConnectionPatch {
    /** If set to false, the VPN gateway connection is shut down. */
    admin_state_up?: boolean;
    /** The Dead Peer Detection settings. */
    dead_peer_detection?: VPNGatewayConnectionDPDPrototype;
    /** Optional IKE policy configuration. The absence of a policy indicates autonegotiation. */
    ike_policy?: IKEPolicyIdentity;
    /** Optional IPsec policy configuration. The absence of a policy indicates autonegotiation. */
    ipsec_policy?: IPsecPolicyIdentity;
    /** The user-defined name for this VPN gateway connection. */
    name?: string;
    /** The IP address of the peer VPN gateway. */
    peer_address?: string;
    /** The preshared key. */
    psk?: string;
  }

  /** VPNGatewayConnectionPeerCIDRs. */
  export interface VPNGatewayConnectionPeerCIDRs {
    /** A collection of peer CIDRs for this resource. */
    peer_cidrs?: string[];
  }

  /** VPNGatewayConnectionPrototype. */
  export interface VPNGatewayConnectionPrototype {
    /** If set to false, the VPN gateway connection is shut down. */
    admin_state_up?: boolean;
    /** The Dead Peer Detection settings. */
    dead_peer_detection?: VPNGatewayConnectionDPDPrototype;
    /** Optional IKE policy configuration. The absence of a policy indicates autonegotiation. */
    ike_policy?: IKEPolicyIdentity;
    /** Optional IPsec policy configuration. The absence of a policy indicates autonegotiation. */
    ipsec_policy?: IPsecPolicyIdentity;
    /** The user-defined name for this VPN gateway connection. */
    name?: string;
    /** The IP address of the peer VPN gateway. */
    peer_address: string;
    /** The preshared key. */
    psk: string;
  }

  /** VPNGatewayConnectionReference. */
  export interface VPNGatewayConnectionReference {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: VPNGatewayConnectionReferenceDeleted;
    /** The VPN connection's canonical URL. */
    href: string;
    /** The unique identifier for this VPN gateway connection. */
    id: string;
    /** The user-defined name for this VPN connection. */
    name: string;
    /** The resource type. */
    resource_type: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface VPNGatewayConnectionReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** VPNGatewayConnectionStaticRouteModeTunnel. */
  export interface VPNGatewayConnectionStaticRouteModeTunnel {
    /** The IP address of the VPN gateway member in which the tunnel resides. */
    public_ip: IP;
    /** The status of the VPN Tunnel. */
    status: string;
  }

  /** VPNGatewayMember. */
  export interface VPNGatewayMember {
    /** The public IP address assigned to the VPN gateway member. */
    public_ip: IP;
    /** The high availability role assigned to the VPN gateway member. */
    role: string;
    /** The status of the VPN gateway member. */
    status: string;
  }

  /** VPNGatewayPrototype. */
  export interface VPNGatewayPrototype {
    /** The user-defined name for this VPN gateway. */
    name?: string;
    /** The resource group to use. If unspecified, the account's [default resource
     *  group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
     */
    resource_group?: ResourceGroupIdentity;
    /** Identifies a subnet by a unique property. */
    subnet: SubnetIdentity;
  }

  /** Volume. */
  export interface Volume {
    /** The capacity of the volume in gigabytes. The specified minimum and maximum capacity values for creating or
     *  updating volumes may expand in the future.
     */
    capacity: number;
    /** The date and time that the volume was created. */
    created_at: string;
    /** The CRN for this volume. */
    crn: string;
    /** The type of encryption used on the volume. */
    encryption: string;
    /** A reference to the root key used to wrap the data encryption key for the volume.
     *
     *  This property will be present for volumes with an `encryption` type of
     *  `user_managed`.
     */
    encryption_key?: EncryptionKeyReference;
    /** The URL for this volume. */
    href: string;
    /** The unique identifier for this volume. */
    id: string;
    /** The bandwidth for the volume. */
    iops: number;
    /** The unique user-defined name for this volume. */
    name: string;
    /** The profile this volume uses. */
    profile: VolumeProfileReference;
    /** The resource group for this volume. */
    resource_group: ResourceGroupReference;
    /** The status of the volume.
     *
     *  The enumerated values for this property will expand in the future. When processing this property, check for and
     *  log unknown values. Optionally halt processing and surface the error, or bypass the volume on which the
     *  unexpected property value was encountered.
     */
    status: string;
    /** The collection of volume attachments attaching instances to the volume. */
    volume_attachments: VolumeAttachmentReferenceVolumeContext[];
    /** The zone this volume resides in. */
    zone: ZoneReference;
  }

  /** VolumeAttachment. */
  export interface VolumeAttachment {
    /** The date and time that the volume was attached. */
    created_at: string;
    /** If set to true, when deleting the instance the volume will also be deleted. */
    delete_volume_on_instance_delete?: boolean;
    /** Information about how the volume is exposed to the instance operating system.
     *
     *  This property may be absent if the volume attachment's `status` is not `attached`.
     */
    device?: VolumeAttachmentDevice;
    /** The URL for this volume attachment. */
    href: string;
    /** The unique identifier for this volume attachment. */
    id: string;
    /** The user-defined name for this volume attachment. */
    name: string;
    /** The status of this volume attachment. */
    status: string;
    /** The type of volume attachment. */
    type: string;
    /** The attached volume. */
    volume: VolumeReference;
  }

  /** VolumeAttachmentCollection. */
  export interface VolumeAttachmentCollection {
    /** Collection of volume attachments. */
    volume_attachments: VolumeAttachment[];
  }

  /** VolumeAttachmentDevice. */
  export interface VolumeAttachmentDevice {
    /** A unique identifier for the device which is exposed to the instance operating system. */
    id?: string;
  }

  /** VolumeAttachmentPrototypeInstanceByImageContext. */
  export interface VolumeAttachmentPrototypeInstanceByImageContext {
    /** If set to true, when deleting the instance the volume will also be deleted. */
    delete_volume_on_instance_delete?: boolean;
    /** The user-defined name for this volume attachment. */
    name?: string;
    /** A prototype object for a new volume. */
    volume: VolumePrototypeInstanceByImageContext;
  }

  /** VolumeAttachmentPrototypeInstanceContext. */
  export interface VolumeAttachmentPrototypeInstanceContext {
    /** If set to true, when deleting the instance the volume will also be deleted. */
    delete_volume_on_instance_delete?: boolean;
    /** The user-defined name for this volume attachment. */
    name?: string;
    /** The identity of the volume to attach to the instance, or a prototype object for a new volume. */
    volume: VolumeAttachmentVolumePrototypeInstanceContext;
  }

  /** VolumeAttachmentReferenceInstanceContext. */
  export interface VolumeAttachmentReferenceInstanceContext {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: VolumeAttachmentReferenceInstanceContextDeleted;
    /** Information about how the volume is exposed to the instance operating system.
     *
     *  This property may be absent if the volume attachment's `status` is not `attached`.
     */
    device?: VolumeAttachmentDevice;
    /** The URL for this volume attachment. */
    href: string;
    /** The unique identifier for this volume attachment. */
    id: string;
    /** The user-defined name for this volume attachment. */
    name: string;
    /** The attached volume. */
    volume: VolumeReference;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface VolumeAttachmentReferenceInstanceContextDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** VolumeAttachmentReferenceVolumeContext. */
  export interface VolumeAttachmentReferenceVolumeContext {
    /** If set to true, when deleting the instance the volume will also be deleted. */
    delete_volume_on_instance_delete: boolean;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: VolumeAttachmentReferenceVolumeContextDeleted;
    /** Information about how the volume is exposed to the instance operating system.
     *
     *  This property may be absent if the volume attachment's `status` is not `attached`.
     */
    device?: VolumeAttachmentDevice;
    /** The URL for this volume attachment. */
    href: string;
    /** The unique identifier for this volume attachment. */
    id: string;
    /** The attached instance. */
    instance: InstanceReference;
    /** The user-defined name for this volume attachment. */
    name: string;
    /** The type of volume attachment. */
    type: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface VolumeAttachmentReferenceVolumeContextDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** The identity of the volume to attach to the instance, or a prototype object for a new volume. */
  export interface VolumeAttachmentVolumePrototypeInstanceContext {
  }

  /** VolumeCollection. */
  export interface VolumeCollection {
    /** A link to the first page of resources. */
    first: VolumeCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: VolumeCollectionNext;
    /** Collection of volumes. */
    volumes: Volume[];
  }

  /** A link to the first page of resources. */
  export interface VolumeCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface VolumeCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** Identifies a volume by a unique property. */
  export interface VolumeIdentity {
  }

  /** VolumeProfile. */
  export interface VolumeProfile {
    /** The product family this volume profile belongs to. */
    family?: string;
    /** The URL for this volume profile. */
    href: string;
    /** The globally unique name for this volume profile. */
    name: string;
  }

  /** VolumeProfileCollection. */
  export interface VolumeProfileCollection {
    /** A link to the first page of resources. */
    first: VolumeProfileCollectionFirst;
    /** The maximum number of resources that can be returned by the request. */
    limit: number;
    /** A link to the next page of resources. This property is present for all pages except the last page. */
    next?: VolumeProfileCollectionNext;
    /** Collection of volume profiles. */
    profiles: VolumeProfile[];
    /** The total number of resources across all pages. */
    total_count: number;
  }

  /** A link to the first page of resources. */
  export interface VolumeProfileCollectionFirst {
    /** The URL for a page of resources. */
    href: string;
  }

  /** A link to the next page of resources. This property is present for all pages except the last page. */
  export interface VolumeProfileCollectionNext {
    /** The URL for a page of resources. */
    href: string;
  }

  /** Identifies a volume profile by a unique property. */
  export interface VolumeProfileIdentity {
  }

  /** VolumeProfileReference. */
  export interface VolumeProfileReference {
    /** The URL for this volume profile. */
    href: string;
    /** The globally unique name for this volume profile. */
    name: string;
  }

  /** VolumePrototype. */
  export interface VolumePrototype {
    /** The identity of the root key to use to wrap the data encryption key for the volume.
     *
     *  If this property is not provided, the `encryption` type for the volume will be
     *  `provider_managed`.
     */
    encryption_key?: EncryptionKeyIdentity;
    /** The bandwidth for the volume. */
    iops?: number;
    /** The unique user-defined name for this volume. */
    name?: string;
    /** The profile to use for this volume. */
    profile: VolumeProfileIdentity;
    /** The resource group to use. If unspecified, the account's [default resource
     *  group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
     */
    resource_group?: ResourceGroupIdentity;
    /** The location of the volume. */
    zone: ZoneIdentity;
  }

  /** VolumePrototypeInstanceByImageContext. */
  export interface VolumePrototypeInstanceByImageContext {
    /** The capacity of the volume in gigabytes. The specified minimum and maximum capacity values for creating or
     *  updating volumes may expand in the future.
     */
    capacity?: number;
    /** The identity of the root key to use to wrap the data encryption key for the volume.
     *
     *  If this property is not provided but the image is encrypted, the image's
     *  `encryption_key` will be used. Otherwise, the `encryption` type for the
     *  volume will be `provider_managed`.
     */
    encryption_key?: EncryptionKeyIdentity;
    /** The bandwidth for the volume. */
    iops?: number;
    /** The unique user-defined name for this volume. */
    name?: string;
    /** The profile to use for this volume. */
    profile: VolumeProfileIdentity;
  }

  /** VolumeReference. */
  export interface VolumeReference {
    /** The CRN for this volume. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: VolumeReferenceDeleted;
    /** The URL for this volume. */
    href: string;
    /** The unique identifier for this volume. */
    id: string;
    /** The unique user-defined name for this volume. */
    name: string;
  }

  /** If present, this property indicates the referenced resource has been deleted and provides some supplementary information. */
  export interface VolumeReferenceDeleted {
    /** Link to documentation about deleted resources. */
    more_info: string;
  }

  /** Zone. */
  export interface Zone {
    /** The URL for this zone. */
    href: string;
    /** The globally unique name for this zone. */
    name: string;
    /** The region this zone belongs to. */
    region: RegionReference;
    /** The availability status of this zone. */
    status: string;
  }

  /** ZoneCollection. */
  export interface ZoneCollection {
    /** Collection of zones. */
    zones: Zone[];
  }

  /** Identifies a zone by a unique property. */
  export interface ZoneIdentity {
  }

  /** ZoneReference. */
  export interface ZoneReference {
    /** The URL for this zone. */
    href: string;
    /** The globally unique name for this zone. */
    name: string;
  }

  /** CertificateInstanceIdentityByCRN. */
  export interface CertificateInstanceIdentityByCRN extends CertificateInstanceIdentity {
    /** The CRN for this certificate instance. */
    crn: string;
  }

  /** CloudObjectStorageBucketIdentityByName. */
  export interface CloudObjectStorageBucketIdentityByName extends CloudObjectStorageBucketIdentity {
    /** The globally unique name of this COS bucket. */
    name: string;
  }

  /** EncryptionKeyIdentityByCRN. */
  export interface EncryptionKeyIdentityByCRN extends EncryptionKeyIdentity {
    /** The CRN of the [Key Protect Root
     *  Key](https://cloud.ibm.com/docs/key-protect?topic=key-protect-getting-started-tutorial) or [Hyper Protect Crypto
     *  Service Root Key](https://cloud.ibm.com/docs/hs-crypto?topic=hs-crypto-get-started) for this resource.
     */
    crn: string;
  }

  /** Identifies a reserved IP by a unique property. */
  export interface EndpointGatewayReservedIPReservedIPIdentity extends EndpointGatewayReservedIP {
  }

  /** EndpointGatewayReservedIPReservedIPPrototypeTargetContext. */
  export interface EndpointGatewayReservedIPReservedIPPrototypeTargetContext extends EndpointGatewayReservedIP {
    /** If set to `true`, this reserved IP will be automatically deleted when the target is deleted or when the
     *  reserved IP is unbound.
     */
    auto_delete?: boolean;
    /** The user-defined name for this reserved IP. If not specified, the name will be a hyphenated list of
     *  randomly-selected words. Names must be unique within the subnet the reserved IP resides in. Names beginning with
     *  `ibm-` are reserved for provider-owned resources.
     */
    name?: string;
    /** The subnet in which to create this reserved IP. */
    subnet: SubnetIdentity;
  }

  /** EndpointGatewayTargetPrototypeProviderCloudServiceIdentity. */
  export interface EndpointGatewayTargetPrototypeProviderCloudServiceIdentity extends EndpointGatewayTargetPrototype {
  }

  /** EndpointGatewayTargetPrototypeProviderInfrastructureServiceIdentity. */
  export interface EndpointGatewayTargetPrototypeProviderInfrastructureServiceIdentity extends EndpointGatewayTargetPrototype {
  }

  /** EndpointGatewayTargetProviderCloudServiceReference. */
  export interface EndpointGatewayTargetProviderCloudServiceReference extends EndpointGatewayTarget {
    /** The CRN for this provider cloud service, or the CRN for the user's instance of a provider cloud service. */
    crn: string;
    /** The type of target. */
    resource_type: string;
  }

  /** The name of this provider infrastructure service. */
  export interface EndpointGatewayTargetProviderInfrastructureServiceReference extends EndpointGatewayTarget {
    /** The name of a provider infrastructure service. Must be:
     *  - `ibm-ntp-server`: An NTP (Network Time Protocol) server provided by IBM.
     */
    name: string;
    /** The type of target. */
    resource_type: string;
  }

  /** FloatingIPByTargetNetworkInterfaceIdentityNetworkInterfaceIdentityByHref. */
  export interface FloatingIPByTargetNetworkInterfaceIdentityNetworkInterfaceIdentityByHref extends FloatingIPByTargetNetworkInterfaceIdentity {
    /** The URL for this network interface. */
    href: string;
  }

  /** FloatingIPByTargetNetworkInterfaceIdentityNetworkInterfaceIdentityById. */
  export interface FloatingIPByTargetNetworkInterfaceIdentityNetworkInterfaceIdentityById extends FloatingIPByTargetNetworkInterfaceIdentity {
    /** The unique identifier for this network interface. */
    id: string;
  }

  /** FloatingIPPatchTargetNetworkInterfaceIdentityNetworkInterfaceIdentityByHref. */
  export interface FloatingIPPatchTargetNetworkInterfaceIdentityNetworkInterfaceIdentityByHref extends FloatingIPPatchTargetNetworkInterfaceIdentity {
    /** The URL for this network interface. */
    href: string;
  }

  /** FloatingIPPatchTargetNetworkInterfaceIdentityNetworkInterfaceIdentityById. */
  export interface FloatingIPPatchTargetNetworkInterfaceIdentityNetworkInterfaceIdentityById extends FloatingIPPatchTargetNetworkInterfaceIdentity {
    /** The unique identifier for this network interface. */
    id: string;
  }

  /** FloatingIPPrototypeFloatingIPByTarget. */
  export interface FloatingIPPrototypeFloatingIPByTarget extends FloatingIPPrototype {
    /** The network interface this floating IP is to be bound to. */
    target: FloatingIPByTargetNetworkInterfaceIdentity;
  }

  /** FloatingIPPrototypeFloatingIPByZone. */
  export interface FloatingIPPrototypeFloatingIPByZone extends FloatingIPPrototype {
    /** The identity of the zone to provision a floating IP in. */
    zone: ZoneIdentity;
  }

  /** FloatingIPTargetNetworkInterfaceReference. */
  export interface FloatingIPTargetNetworkInterfaceReference extends FloatingIPTarget {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: NetworkInterfaceReferenceDeleted;
    /** The URL for this network interface. */
    href: string;
    /** The unique identifier for this network interface. */
    id: string;
    /** The user-defined name for this network interface. */
    name: string;
    /** The primary IPv4 address. */
    primary_ipv4_address: string;
    /** The resource type. */
    resource_type: string;
  }

  /** FloatingIPTargetPublicGatewayReference. */
  export interface FloatingIPTargetPublicGatewayReference extends FloatingIPTarget {
    /** The CRN for this public gateway. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: PublicGatewayReferenceDeleted;
    /** The URL for this public gateway. */
    href: string;
    /** The unique identifier for this public gateway. */
    id: string;
    /** The user-defined name for this public gateway. */
    name: string;
    /** The resource type. */
    resource_type: string;
  }

  /** Identifies a virtual server instance by a unique property. */
  export interface FlowLogCollectorTargetPrototypeInstanceIdentity extends FlowLogCollectorTargetPrototype {
  }

  /** Identifies a network interface by a unique property. */
  export interface FlowLogCollectorTargetPrototypeNetworkInterfaceIdentity extends FlowLogCollectorTargetPrototype {
  }

  /** Identifies a subnet by a unique property. */
  export interface FlowLogCollectorTargetPrototypeSubnetIdentity extends FlowLogCollectorTargetPrototype {
  }

  /** Identifies a VPC by a unique property. */
  export interface FlowLogCollectorTargetPrototypeVPCIdentity extends FlowLogCollectorTargetPrototype {
  }

  /** FlowLogCollectorTargetInstanceReference. */
  export interface FlowLogCollectorTargetInstanceReference extends FlowLogCollectorTarget {
    /** The CRN for this virtual server instance. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: InstanceReferenceDeleted;
    /** The URL for this virtual server instance. */
    href: string;
    /** The unique identifier for this virtual server instance. */
    id: string;
    /** The user-defined name for this virtual server instance (and default system hostname). */
    name: string;
  }

  /** FlowLogCollectorTargetNetworkInterfaceReferenceTargetContext. */
  export interface FlowLogCollectorTargetNetworkInterfaceReferenceTargetContext extends FlowLogCollectorTarget {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: NetworkInterfaceReferenceTargetContextDeleted;
    /** The URL for this network interface. */
    href: string;
    /** The unique identifier for this network interface. */
    id: string;
    /** The user-defined name for this network interface. */
    name: string;
    /** The resource type. */
    resource_type: string;
  }

  /** FlowLogCollectorTargetSubnetReference. */
  export interface FlowLogCollectorTargetSubnetReference extends FlowLogCollectorTarget {
    /** The CRN for this subnet. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: SubnetReferenceDeleted;
    /** The URL for this subnet. */
    href: string;
    /** The unique identifier for this subnet. */
    id: string;
    /** The user-defined name for this subnet. */
    name: string;
  }

  /** FlowLogCollectorTargetVPCReference. */
  export interface FlowLogCollectorTargetVPCReference extends FlowLogCollectorTarget {
    /** The CRN for this VPC. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: VPCReferenceDeleted;
    /** The URL for this VPC. */
    href: string;
    /** The unique identifier for this VPC. */
    id: string;
    /** The unique user-defined name for this VPC. */
    name: string;
  }

  /** IKEPolicyIdentityByHref. */
  export interface IKEPolicyIdentityByHref extends IKEPolicyIdentity {
    /** The IKE policy's canonical URL. */
    href: string;
  }

  /** IKEPolicyIdentityById. */
  export interface IKEPolicyIdentityById extends IKEPolicyIdentity {
    /** The unique identifier for this IKE policy. */
    id: string;
  }

  /** IPsecPolicyIdentityByHref. */
  // tslint:disable-next-line: interface-name
  export interface IPsecPolicyIdentityByHref extends IPsecPolicyIdentity {
    /** The IPsec policy's canonical URL. */
    href: string;
  }

  /** IPsecPolicyIdentityById. */
  // tslint:disable-next-line: interface-name
  export interface IPsecPolicyIdentityById extends IPsecPolicyIdentity {
    /** The unique identifier for this IPsec policy. */
    id: string;
  }

  /** ImageIdentityByCRN. */
  export interface ImageIdentityByCRN extends ImageIdentity {
    /** The CRN for this image. */
    crn: string;
  }

  /** ImageIdentityByHref. */
  export interface ImageIdentityByHref extends ImageIdentity {
    /** The URL for this image. */
    href: string;
  }

  /** ImageIdentityById. */
  export interface ImageIdentityById extends ImageIdentity {
    /** The unique identifier for this image. */
    id: string;
  }

  /** ImagePrototypeImageByFile. */
  export interface ImagePrototypeImageByFile extends ImagePrototype {
    /** A base64-encoded, encrypted representation of the key that was used to encrypt the data for this image.
     *
     *  That representation is created by wrapping the key's value with the `encryption_key` root key (which must also
     *  be provided), using either [Key Protect](https://cloud.ibm.com/docs/key-protect?topic=key-protect-wrap-keys) or
     *  the
     *  [Hyper Protect Crypto Service](https://cloud.ibm.com/docs/services/hs-crypto?topic=hs-crypto-wrap-keys).
     *
     *  If this property is not provided, the imported image is treated as unencrypted.
     */
    encrypted_data_key?: string;
    /** The identity of the root key that was used to wrap the data key (which is ultimately
     *  represented as `encrypted_data_key`). Additionally, the root key will be used to encrypt
     *  volumes created from this image (unless an alternate `encryption_key` is provided at
     *  volume creation).
     *
     *  If this property is not provided, the imported image is treated as unencrypted.
     */
    encryption_key?: EncryptionKeyIdentity;
    /** The file from which to create the image. */
    file: ImageFilePrototype;
    /** The identity of the [supported operating
     *  system](https://cloud.ibm.com/apidocs/vpc#list-operating-systems) included in
     *  this image.
     */
    operating_system: OperatingSystemIdentity;
  }

  /** InstanceGroupManagerPolicyPrototypeInstanceGroupManagerTargetPolicyPrototype. */
  export interface InstanceGroupManagerPolicyPrototypeInstanceGroupManagerTargetPolicyPrototype extends InstanceGroupManagerPolicyPrototype {
    /** The type of metric to be evaluated. */
    metric_type: string;
    /** The metric value to be evaluated. */
    metric_value: number;
    /** The type of policy for the instance group. */
    policy_type: string;
  }

  /** InstanceGroupManagerPolicyInstanceGroupManagerTargetPolicy. */
  export interface InstanceGroupManagerPolicyInstanceGroupManagerTargetPolicy extends InstanceGroupManagerPolicy {
    /** The type of metric to be evaluated. */
    metric_type: string;
    /** The metric value to be evaluated. */
    metric_value: number;
    /** The type of policy for the instance group. */
    policy_type: string;
  }

  /** InstanceGroupManagerPrototypeInstanceGroupManagerAutoScalePrototype. */
  export interface InstanceGroupManagerPrototypeInstanceGroupManagerAutoScalePrototype extends InstanceGroupManagerPrototype {
    /** The time window in seconds to aggregate metrics prior to evaluation. */
    aggregation_window?: number;
    /** The duration of time in seconds to pause further scale actions after scaling has taken place. */
    cooldown?: number;
    /** The type of instance group manager. */
    manager_type: string;
    /** The maximum number of members in a managed instance group. */
    max_membership_count: number;
    /** The minimum number of members in a managed instance group. */
    min_membership_count?: number;
  }

  /** The total bandwidth shared across the network interfaces of an instance with this profile depends on its configuration. */
  export interface InstanceProfileBandwidthDependent extends InstanceProfileBandwidth {
    /** The type for this profile field. */
    type: string;
  }

  /** The permitted total bandwidth values (in megabits per second) shared across the network interfaces of an instance with this profile. */
  export interface InstanceProfileBandwidthEnum extends InstanceProfileBandwidth {
    /** The default value for this profile field. */
    default: number;
    /** The type for this profile field. */
    type: string;
    /** The permitted values for this profile field. */
    values: number[];
  }

  /** The total bandwidth (in megabits per second) shared across the network interfaces of an instance with this profile. */
  export interface InstanceProfileBandwidthFixed extends InstanceProfileBandwidth {
    /** The type for this profile field. */
    type: string;
    /** The value for this profile field. */
    value: number;
  }

  /** The permitted total bandwidth range (in megabits per second) shared across the network interfaces of an instance with this profile. */
  export interface InstanceProfileBandwidthRange extends InstanceProfileBandwidth {
    /** The default value for this profile field. */
    default: number;
    /** The maximum value for this profile field. */
    max: number;
    /** The minimum value for this profile field. */
    min: number;
    /** The increment step value for this profile field. */
    step: number;
    /** The type for this profile field. */
    type: string;
  }

  /** InstanceProfileIdentityByHref. */
  export interface InstanceProfileIdentityByHref extends InstanceProfileIdentity {
    /** The URL for this virtual server instance profile. */
    href: string;
  }

  /** InstanceProfileIdentityByName. */
  export interface InstanceProfileIdentityByName extends InstanceProfileIdentity {
    /** The globally unique name for this virtual server instance profile. */
    name: string;
  }

  /** The memory value for an instance with this profile depends on its configuration. */
  export interface InstanceProfileMemoryDependent extends InstanceProfileMemory {
    /** The type for this profile field. */
    type: string;
  }

  /** The permitted memory values (in gigabytes) for an instance with this profile. */
  export interface InstanceProfileMemoryEnum extends InstanceProfileMemory {
    /** The default value for this profile field. */
    default: number;
    /** The type for this profile field. */
    type: string;
    /** The permitted values for this profile field. */
    values: number[];
  }

  /** The memory (in gigabytes) for an instance with this profile. */
  export interface InstanceProfileMemoryFixed extends InstanceProfileMemory {
    /** The type for this profile field. */
    type: string;
    /** The value for this profile field. */
    value: number;
  }

  /** The permitted memory range (in gigabytes) for an instance with this profile. */
  export interface InstanceProfileMemoryRange extends InstanceProfileMemory {
    /** The default value for this profile field. */
    default: number;
    /** The maximum value for this profile field. */
    max: number;
    /** The minimum value for this profile field. */
    min: number;
    /** The increment step value for this profile field. */
    step: number;
    /** The type for this profile field. */
    type: string;
  }

  /** The port speed of each network interface of an instance with this profile depends on its configuration. */
  export interface InstanceProfilePortSpeedDependent extends InstanceProfilePortSpeed {
    /** The type for this profile field. */
    type: string;
  }

  /** The maximum speed (in megabits per second) of each network interface of an instance with this profile. */
  export interface InstanceProfilePortSpeedFixed extends InstanceProfilePortSpeed {
    /** The type for this profile field. */
    type: string;
    /** The value for this profile field. */
    value: number;
  }

  /** The VCPU count for an instance with this profile depends on its configuration. */
  export interface InstanceProfileVCPUDependent extends InstanceProfileVCPU {
    /** The type for this profile field. */
    type: string;
  }

  /** The permitted values for VCPU count for an instance with this profile. */
  export interface InstanceProfileVCPUEnum extends InstanceProfileVCPU {
    /** The default value for this profile field. */
    default: number;
    /** The type for this profile field. */
    type: string;
    /** The permitted values for this profile field. */
    values: number[];
  }

  /** The VCPU count for an instance with this profile. */
  export interface InstanceProfileVCPUFixed extends InstanceProfileVCPU {
    /** The type for this profile field. */
    type: string;
    /** The value for this profile field. */
    value: number;
  }

  /** The permitted range for VCPU count for an instance with this profile. */
  export interface InstanceProfileVCPURange extends InstanceProfileVCPU {
    /** The default value for this profile field. */
    default: number;
    /** The maximum value for this profile field. */
    max: number;
    /** The minimum value for this profile field. */
    min: number;
    /** The increment step value for this profile field. */
    step: number;
    /** The type for this profile field. */
    type: string;
  }

  /** InstancePrototypeInstanceByImage. */
  export interface InstancePrototypeInstanceByImage extends InstancePrototype {
    /** The boot volume attachment for the virtual server instance. */
    boot_volume_attachment?: VolumeAttachmentPrototypeInstanceByImageContext;
    /** The identity of the image to use when provisioning the virtual server instance. */
    image: ImageIdentity;
    /** Primary network interface. */
    primary_network_interface: NetworkInterfacePrototype;
    /** The identity of the zone to provision the virtual server instance in. */
    zone: ZoneIdentity;
  }

  /** InstancePrototypeInstanceBySourceTemplate. */
  export interface InstancePrototypeInstanceBySourceTemplate extends InstancePrototype {
    /** The boot volume attachment for the virtual server instance. */
    boot_volume_attachment?: VolumeAttachmentPrototypeInstanceByImageContext;
    /** The identity of the image to use when provisioning the virtual server instance. */
    image?: ImageIdentity;
    /** Primary network interface. */
    primary_network_interface?: NetworkInterfacePrototype;
    /** Identifies an instance template by a unique property. */
    source_template: InstanceTemplateIdentity;
    /** The identity of the zone to provision the virtual server instance in. */
    zone?: ZoneIdentity;
  }

  /** InstanceTemplateIdentityByCRN. */
  export interface InstanceTemplateIdentityByCRN extends InstanceTemplateIdentity {
    /** The CRN for this instance template. */
    crn: string;
  }

  /** InstanceTemplateIdentityByHref. */
  export interface InstanceTemplateIdentityByHref extends InstanceTemplateIdentity {
    /** The URL for this instance template. */
    href: string;
  }

  /** InstanceTemplateIdentityById. */
  export interface InstanceTemplateIdentityById extends InstanceTemplateIdentity {
    /** The unique identifier for this instance template. */
    id: string;
  }

  /** InstanceTemplatePrototypeInstanceByImage. */
  export interface InstanceTemplatePrototypeInstanceByImage extends InstanceTemplatePrototype {
    /** The boot volume attachment for the virtual server instance. */
    boot_volume_attachment?: VolumeAttachmentPrototypeInstanceByImageContext;
    /** The identity of the image to use when provisioning the virtual server instance. */
    image: ImageIdentity;
    /** Primary network interface. */
    primary_network_interface: NetworkInterfacePrototype;
    /** The identity of the zone to provision the virtual server instance in. */
    zone: ZoneIdentity;
  }

  /** InstanceTemplatePrototypeInstanceBySourceTemplate. */
  export interface InstanceTemplatePrototypeInstanceBySourceTemplate extends InstanceTemplatePrototype {
    /** The boot volume attachment for the virtual server instance. */
    boot_volume_attachment?: VolumeAttachmentPrototypeInstanceByImageContext;
    /** The identity of the image to use when provisioning the virtual server instance. */
    image?: ImageIdentity;
    /** Primary network interface. */
    primary_network_interface?: NetworkInterfacePrototype;
    /** Identifies an instance template by a unique property. */
    source_template: InstanceTemplateIdentity;
    /** The identity of the zone to provision the virtual server instance in. */
    zone?: ZoneIdentity;
  }

  /** InstanceTemplateInstanceByImage. */
  export interface InstanceTemplateInstanceByImage extends InstanceTemplate {
    /** The boot volume attachment for the virtual server instance. */
    boot_volume_attachment?: VolumeAttachmentPrototypeInstanceByImageContext;
    /** The identity of the image to use when provisioning the virtual server instance. */
    image: ImageIdentity;
    /** Primary network interface. */
    primary_network_interface: NetworkInterfacePrototype;
    /** The identity of the zone to provision the virtual server instance in. */
    zone: ZoneIdentity;
  }

  /** InstanceTemplateInstanceBySourceTemplate. */
  export interface InstanceTemplateInstanceBySourceTemplate extends InstanceTemplate {
    /** The boot volume attachment for the virtual server instance. */
    boot_volume_attachment?: VolumeAttachmentPrototypeInstanceByImageContext;
    /** The identity of the image to use when provisioning the virtual server instance. */
    image?: ImageIdentity;
    /** Primary network interface. */
    primary_network_interface?: NetworkInterfacePrototype;
    /** Identifies an instance template by a unique property. */
    source_template: InstanceTemplateIdentity;
    /** The identity of the zone to provision the virtual server instance in. */
    zone?: ZoneIdentity;
  }

  /** KeyIdentityByCRN. */
  export interface KeyIdentityByCRN extends KeyIdentity {
    /** The CRN for this key. */
    crn: string;
  }

  /** KeyIdentityByHref. */
  export interface KeyIdentityByHref extends KeyIdentity {
    /** The URL for this key. */
    href: string;
  }

  /** KeyIdentityById. */
  export interface KeyIdentityById extends KeyIdentity {
    /** The unique identifier for this key. */
    id: string;
  }

  /** KeyIdentityKeyIdentityByFingerprint. */
  export interface KeyIdentityKeyIdentityByFingerprint extends KeyIdentity {
    /** The fingerprint for this key.  The value is returned base64-encoded and prefixed with the hash algorithm
     *  (always `SHA256`).
     */
    fingerprint: string;
  }

  /** KeyReferenceInstanceInitializationContextKeyIdentityByFingerprint. */
  export interface KeyReferenceInstanceInitializationContextKeyIdentityByFingerprint extends KeyReferenceInstanceInitializationContext {
    /** The fingerprint for this key.  The value is returned base64-encoded and prefixed with the hash algorithm
     *  (always `SHA256`).
     */
    fingerprint: string;
  }

  /** KeyReferenceInstanceInitializationContextKeyReference. */
  export interface KeyReferenceInstanceInitializationContextKeyReference extends KeyReferenceInstanceInitializationContext {
    /** The CRN for this key. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: KeyReferenceDeleted;
    /** The fingerprint for this key.  The value is returned base64-encoded and prefixed with the hash algorithm
     *  (always `SHA256`).
     */
    fingerprint: string;
    /** The URL for this key. */
    href: string;
    /** The unique identifier for this key. */
    id: string;
    /** The user-defined name for this key. */
    name: string;
  }

  /** LoadBalancerIdentityByCRN. */
  export interface LoadBalancerIdentityByCRN extends LoadBalancerIdentity {
    /** The load balancer's CRN. */
    crn: string;
  }

  /** LoadBalancerIdentityByHref. */
  export interface LoadBalancerIdentityByHref extends LoadBalancerIdentity {
    /** The load balancer's canonical URL. */
    href: string;
  }

  /** LoadBalancerIdentityById. */
  export interface LoadBalancerIdentityById extends LoadBalancerIdentity {
    /** The unique identifier for this load balancer. */
    id: string;
  }

  /** LoadBalancerListenerPolicyTargetPatchLoadBalancerListenerPolicyRedirectURLPatch. */
  export interface LoadBalancerListenerPolicyTargetPatchLoadBalancerListenerPolicyRedirectURLPatch extends LoadBalancerListenerPolicyTargetPatch {
    /** The http status code in the redirect response. */
    http_status_code?: number;
    /** The redirect target URL. */
    url?: string;
  }

  /** Identifies a load balancer pool by a unique property. */
  export interface LoadBalancerListenerPolicyTargetPatchLoadBalancerPoolIdentity extends LoadBalancerListenerPolicyTargetPatch {
  }

  /** LoadBalancerListenerPolicyTargetPrototypeLoadBalancerListenerPolicyRedirectURLPrototype. */
  export interface LoadBalancerListenerPolicyTargetPrototypeLoadBalancerListenerPolicyRedirectURLPrototype extends LoadBalancerListenerPolicyTargetPrototype {
    /** The http status code in the redirect response. */
    http_status_code: number;
    /** The redirect target URL. */
    url: string;
  }

  /** Identifies a load balancer pool by a unique property. */
  export interface LoadBalancerListenerPolicyTargetPrototypeLoadBalancerPoolIdentity extends LoadBalancerListenerPolicyTargetPrototype {
  }

  /** LoadBalancerListenerPolicyTargetLoadBalancerListenerPolicyRedirectURL. */
  export interface LoadBalancerListenerPolicyTargetLoadBalancerListenerPolicyRedirectURL extends LoadBalancerListenerPolicyTarget {
    /** The http status code in the redirect response. */
    http_status_code: number;
    /** The redirect target URL. */
    url: string;
  }

  /** LoadBalancerListenerPolicyTargetLoadBalancerPoolReference. */
  export interface LoadBalancerListenerPolicyTargetLoadBalancerPoolReference extends LoadBalancerListenerPolicyTarget {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: LoadBalancerPoolReferenceDeleted;
    /** The pool's canonical URL. */
    href: string;
    /** The unique identifier for this load balancer pool. */
    id: string;
    /** The user-defined name for this load balancer pool. */
    name: string;
  }

  /** LoadBalancerPoolIdentityByHref. */
  export interface LoadBalancerPoolIdentityByHref extends LoadBalancerPoolIdentity {
    /** The pool's canonical URL. */
    href: string;
  }

  /** LoadBalancerPoolIdentityById. */
  export interface LoadBalancerPoolIdentityById extends LoadBalancerPoolIdentity {
    /** The unique identifier for this load balancer pool. */
    id: string;
  }

  /** LoadBalancerPoolMemberTargetPrototypeIP. */
  export interface LoadBalancerPoolMemberTargetPrototypeIP extends LoadBalancerPoolMemberTargetPrototype {
    /** The IP address. This property may add support for IPv6 addresses in the future. When processing a value in
     *  this property, verify that the address is in an expected format. If it is not, log an error. Optionally halt
     *  processing and surface the error, or bypass the resource on which the unexpected IP address format was
     *  encountered.
     */
    address: string;
  }

  /** Identifies a virtual server instance by a unique property. */
  export interface LoadBalancerPoolMemberTargetPrototypeInstanceIdentity extends LoadBalancerPoolMemberTargetPrototype {
  }

  /** LoadBalancerPoolMemberTargetIP. */
  export interface LoadBalancerPoolMemberTargetIP extends LoadBalancerPoolMemberTarget {
    /** The IP address. This property may add support for IPv6 addresses in the future. When processing a value in
     *  this property, verify that the address is in an expected format. If it is not, log an error. Optionally halt
     *  processing and surface the error, or bypass the resource on which the unexpected IP address format was
     *  encountered.
     */
    address: string;
  }

  /** LoadBalancerPoolMemberTargetInstanceReference. */
  export interface LoadBalancerPoolMemberTargetInstanceReference extends LoadBalancerPoolMemberTarget {
    /** The CRN for this virtual server instance. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: InstanceReferenceDeleted;
    /** The URL for this virtual server instance. */
    href: string;
    /** The unique identifier for this virtual server instance. */
    id: string;
    /** The user-defined name for this virtual server instance (and default system hostname). */
    name: string;
  }

  /** LoadBalancerProfileIdentityByHref. */
  export interface LoadBalancerProfileIdentityByHref extends LoadBalancerProfileIdentity {
    /** The URL for this load balancer profile. */
    href: string;
  }

  /** LoadBalancerProfileIdentityByName. */
  export interface LoadBalancerProfileIdentityByName extends LoadBalancerProfileIdentity {
    /** The globally unique name for this load balancer profile. */
    name: string;
  }

  /** NetworkACLIdentityByCRN. */
  export interface NetworkACLIdentityByCRN extends NetworkACLIdentity {
    /** The CRN for this network ACL. */
    crn: string;
  }

  /** NetworkACLIdentityByHref. */
  export interface NetworkACLIdentityByHref extends NetworkACLIdentity {
    /** The URL for this network ACL. */
    href: string;
  }

  /** NetworkACLIdentityById. */
  export interface NetworkACLIdentityById extends NetworkACLIdentity {
    /** The unique identifier for this network ACL. */
    id: string;
  }

  /** NetworkACLPrototypeNetworkACLByRules. */
  export interface NetworkACLPrototypeNetworkACLByRules extends NetworkACLPrototype {
    /** Array of prototype objects for rules to create along with this network ACL. If unspecified, no rules will be
     *  created, resulting in all traffic being denied.
     */
    rules?: NetworkACLRulePrototypeNetworkACLContext[];
  }

  /** NetworkACLPrototypeNetworkACLBySourceNetworkACL. */
  export interface NetworkACLPrototypeNetworkACLBySourceNetworkACL extends NetworkACLPrototype {
    /** Network ACL to copy rules from. */
    source_network_acl: NetworkACLIdentity;
  }

  /** NetworkACLRuleBeforePatchNetworkACLRuleIdentityByHref. */
  export interface NetworkACLRuleBeforePatchNetworkACLRuleIdentityByHref extends NetworkACLRuleBeforePatch {
    /** The URL for this network ACL rule. */
    href: string;
  }

  /** NetworkACLRuleBeforePatchNetworkACLRuleIdentityById. */
  export interface NetworkACLRuleBeforePatchNetworkACLRuleIdentityById extends NetworkACLRuleBeforePatch {
    /** The unique identifier for this network ACL rule. */
    id: string;
  }

  /** NetworkACLRuleBeforePrototypeNetworkACLRuleIdentityByHref. */
  export interface NetworkACLRuleBeforePrototypeNetworkACLRuleIdentityByHref extends NetworkACLRuleBeforePrototype {
    /** The URL for this network ACL rule. */
    href: string;
  }

  /** NetworkACLRuleBeforePrototypeNetworkACLRuleIdentityById. */
  export interface NetworkACLRuleBeforePrototypeNetworkACLRuleIdentityById extends NetworkACLRuleBeforePrototype {
    /** The unique identifier for this network ACL rule. */
    id: string;
  }

  /** NetworkACLRuleItemNetworkACLRuleProtocolAll. */
  export interface NetworkACLRuleItemNetworkACLRuleProtocolAll extends NetworkACLRuleItem {
    /** The protocol to enforce. */
    protocol: string;
  }

  /** NetworkACLRuleItemNetworkACLRuleProtocolICMP. */
  export interface NetworkACLRuleItemNetworkACLRuleProtocolICMP extends NetworkACLRuleItem {
    /** The ICMP traffic code to allow. If unspecified, all codes are allowed. This can only be specified if type is
     *  also specified.
     */
    code?: number;
    /** The protocol to enforce. */
    protocol: string;
    /** The ICMP traffic type to allow. If unspecified, all types are allowed by this rule. */
    type?: number;
  }

  /** NetworkACLRuleItemNetworkACLRuleProtocolTCPUDP. */
  export interface NetworkACLRuleItemNetworkACLRuleProtocolTCPUDP extends NetworkACLRuleItem {
    /** The inclusive upper bound of TCP/UDP destination port range. */
    destination_port_max?: number;
    /** The inclusive lower bound of TCP/UDP destination port range. */
    destination_port_min?: number;
    /** The protocol to enforce. */
    protocol: string;
    /** The inclusive upper bound of TCP/UDP source port range. */
    source_port_max?: number;
    /** The inclusive lower bound of TCP/UDP source port range. */
    source_port_min?: number;
  }

  /** NetworkACLRulePrototypeNetworkACLContextNetworkACLRuleProtocolAll. */
  export interface NetworkACLRulePrototypeNetworkACLContextNetworkACLRuleProtocolAll extends NetworkACLRulePrototypeNetworkACLContext {
    /** The protocol to enforce. */
    protocol: string;
  }

  /** NetworkACLRulePrototypeNetworkACLContextNetworkACLRuleProtocolICMP. */
  export interface NetworkACLRulePrototypeNetworkACLContextNetworkACLRuleProtocolICMP extends NetworkACLRulePrototypeNetworkACLContext {
    /** The ICMP traffic code to allow. If unspecified, all codes are allowed. This can only be specified if type is
     *  also specified.
     */
    code?: number;
    /** The protocol to enforce. */
    protocol: string;
    /** The ICMP traffic type to allow. If unspecified, all types are allowed by this rule. */
    type?: number;
  }

  /** NetworkACLRulePrototypeNetworkACLContextNetworkACLRuleProtocolTCPUDP. */
  export interface NetworkACLRulePrototypeNetworkACLContextNetworkACLRuleProtocolTCPUDP extends NetworkACLRulePrototypeNetworkACLContext {
    /** The inclusive upper bound of TCP/UDP destination port range. */
    destination_port_max?: number;
    /** The inclusive lower bound of TCP/UDP destination port range. */
    destination_port_min?: number;
    /** The protocol to enforce. */
    protocol: string;
    /** The inclusive upper bound of TCP/UDP source port range. */
    source_port_max?: number;
    /** The inclusive lower bound of TCP/UDP source port range. */
    source_port_min?: number;
  }

  /** NetworkACLRulePrototypeNetworkACLRuleProtocolAll. */
  export interface NetworkACLRulePrototypeNetworkACLRuleProtocolAll extends NetworkACLRulePrototype {
    /** The protocol to enforce. */
    protocol: string;
  }

  /** NetworkACLRulePrototypeNetworkACLRuleProtocolICMP. */
  export interface NetworkACLRulePrototypeNetworkACLRuleProtocolICMP extends NetworkACLRulePrototype {
    /** The ICMP traffic code to allow. If unspecified, all codes are allowed. This can only be specified if type is
     *  also specified.
     */
    code?: number;
    /** The protocol to enforce. */
    protocol: string;
    /** The ICMP traffic type to allow. If unspecified, all types are allowed by this rule. */
    type?: number;
  }

  /** NetworkACLRulePrototypeNetworkACLRuleProtocolTCPUDP. */
  export interface NetworkACLRulePrototypeNetworkACLRuleProtocolTCPUDP extends NetworkACLRulePrototype {
    /** The inclusive upper bound of TCP/UDP destination port range. */
    destination_port_max?: number;
    /** The inclusive lower bound of TCP/UDP destination port range. */
    destination_port_min?: number;
    /** The protocol to enforce. */
    protocol: string;
    /** The inclusive upper bound of TCP/UDP source port range. */
    source_port_max?: number;
    /** The inclusive lower bound of TCP/UDP source port range. */
    source_port_min?: number;
  }

  /** NetworkACLRuleNetworkACLRuleProtocolAll. */
  export interface NetworkACLRuleNetworkACLRuleProtocolAll extends NetworkACLRule {
    /** The protocol to enforce. */
    protocol: string;
  }

  /** NetworkACLRuleNetworkACLRuleProtocolICMP. */
  export interface NetworkACLRuleNetworkACLRuleProtocolICMP extends NetworkACLRule {
    /** The ICMP traffic code to allow. If unspecified, all codes are allowed. This can only be specified if type is
     *  also specified.
     */
    code?: number;
    /** The protocol to enforce. */
    protocol: string;
    /** The ICMP traffic type to allow. If unspecified, all types are allowed by this rule. */
    type?: number;
  }

  /** NetworkACLRuleNetworkACLRuleProtocolTCPUDP. */
  export interface NetworkACLRuleNetworkACLRuleProtocolTCPUDP extends NetworkACLRule {
    /** The inclusive upper bound of TCP/UDP destination port range. */
    destination_port_max?: number;
    /** The inclusive lower bound of TCP/UDP destination port range. */
    destination_port_min?: number;
    /** The protocol to enforce. */
    protocol: string;
    /** The inclusive upper bound of TCP/UDP source port range. */
    source_port_max?: number;
    /** The inclusive lower bound of TCP/UDP source port range. */
    source_port_min?: number;
  }

  /** OperatingSystemIdentityByHref. */
  export interface OperatingSystemIdentityByHref extends OperatingSystemIdentity {
    /** The URL for this operating system. */
    href: string;
  }

  /** OperatingSystemIdentityByName. */
  export interface OperatingSystemIdentityByName extends OperatingSystemIdentity {
    /** The globally unique name for this operating system. */
    name: string;
  }

  /** Identifies a floating IP by a unique property. */
  export interface PublicGatewayFloatingIPPrototypeFloatingIPIdentity extends PublicGatewayFloatingIPPrototype {
  }

  /** PublicGatewayFloatingIPPrototypeFloatingIPPrototypeTargetContext. */
  export interface PublicGatewayFloatingIPPrototypeFloatingIPPrototypeTargetContext extends PublicGatewayFloatingIPPrototype {
    /** The unique user-defined name for this floating IP. If unspecified, the name will be a hyphenated list of
     *  randomly-selected words.
     */
    name?: string;
    /** The resource group to use. If unspecified, the account's [default resource
     *  group](https://cloud.ibm.com/apidocs/resource-manager#introduction) is used.
     */
    resource_group?: ResourceGroupIdentity;
  }

  /** PublicGatewayIdentityByCRN. */
  export interface PublicGatewayIdentityByCRN extends PublicGatewayIdentity {
    /** The CRN for this public gateway. */
    crn: string;
  }

  /** PublicGatewayIdentityByHref. */
  export interface PublicGatewayIdentityByHref extends PublicGatewayIdentity {
    /** The URL for this public gateway. */
    href: string;
  }

  /** PublicGatewayIdentityById. */
  export interface PublicGatewayIdentityById extends PublicGatewayIdentity {
    /** The unique identifier for this public gateway. */
    id: string;
  }

  /** ReservedIPTargetPrototypeEndpointGatewayIdentity. */
  export interface ReservedIPTargetPrototypeEndpointGatewayIdentity extends ReservedIPTargetPrototype {
  }

  /** ReservedIPTargetEndpointGatewayReference. */
  export interface ReservedIPTargetEndpointGatewayReference extends ReservedIPTarget {
    /** The CRN for this endpoint gateway. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: EndpointGatewayReferenceDeleted;
    /** The URL for this endpoint gateway. */
    href: string;
    /** The unique identifier for this endpoint gateway. */
    id: string;
    /** The unique user-defined name for this endpoint gateway. */
    name: string;
    /** The type of resource referenced. */
    resource_type: string;
  }

  /** ResourceGroupIdentityById. */
  export interface ResourceGroupIdentityById extends ResourceGroupIdentity {
    /** The unique identifier for this resource group. */
    id: string;
  }

  /** RouteNextHopIP. */
  export interface RouteNextHopIP extends RouteNextHop {
    /** The IP address. This property may add support for IPv6 addresses in the future. When processing a value in
     *  this property, verify that the address is in an expected format. If it is not, log an error. Optionally halt
     *  processing and surface the error, or bypass the resource on which the unexpected IP address format was
     *  encountered.
     */
    address: string;
  }

  /** The IP address of the next hop to which to route packets. */
  export interface RouteNextHopPrototypeRouteNextHopIP extends RouteNextHopPrototype {
    /** The IP address. This property may add support for IPv6 addresses in the future. When processing a value in
     *  this property, verify that the address is in an expected format. If it is not, log an error. Optionally halt
     *  processing and surface the error, or bypass the resource on which the unexpected IP address format was
     *  encountered.
     */
    address: string;
  }

  /** RouteNextHopVPNGatewayConnectionReference. */
  export interface RouteNextHopVPNGatewayConnectionReference extends RouteNextHop {
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: VPNGatewayConnectionReferenceDeleted;
    /** The VPN connection's canonical URL. */
    href: string;
    /** The unique identifier for this VPN gateway connection. */
    id: string;
    /** The user-defined name for this VPN connection. */
    name: string;
    /** The resource type. */
    resource_type: string;
  }

  /** RoutingTableIdentityByHref. */
  export interface RoutingTableIdentityByHref extends RoutingTableIdentity {
    /** The URL for this routing table. */
    href: string;
  }

  /** RoutingTableIdentityById. */
  export interface RoutingTableIdentityById extends RoutingTableIdentity {
    /** The unique identifier for this routing table. */
    id: string;
  }

  /** SecurityGroupIdentityByCRN. */
  export interface SecurityGroupIdentityByCRN extends SecurityGroupIdentity {
    /** The security group's CRN. */
    crn: string;
  }

  /** SecurityGroupIdentityByHref. */
  export interface SecurityGroupIdentityByHref extends SecurityGroupIdentity {
    /** The security group's canonical URL. */
    href: string;
  }

  /** SecurityGroupIdentityById. */
  export interface SecurityGroupIdentityById extends SecurityGroupIdentity {
    /** The unique identifier for this security group. */
    id: string;
  }

  /** When `protocol` is `all`, then it's invalid to specify `port_min`, `port_max`, `type` or `code`. */
  export interface SecurityGroupRulePrototypeSecurityGroupRuleProtocolAll extends SecurityGroupRulePrototype {
    /** The protocol to enforce. */
    protocol: string;
  }

  /** When `protocol` is `icmp`, then the rule may also contain fields to specify an ICMP `type` and `code`. Field `code` may only be specified if `type` is also specified. If type is not specified, then traffic is allowed for all types and codes. If type is specified and code is not specified, then traffic is allowed with the specified type for all codes. */
  export interface SecurityGroupRulePrototypeSecurityGroupRuleProtocolICMP extends SecurityGroupRulePrototype {
    /** The ICMP traffic code to allow. */
    code?: number;
    /** The protocol to enforce. */
    protocol: string;
    /** The ICMP traffic type to allow. */
    type?: number;
  }

  /** If `protocol` is either `tcp` or `udp`, then the rule may also contain `port_min` and `port_max`. Either both should be set, or neither. When neither is set then traffic is allowed on all ports. For a single port, set both to the same value. */
  export interface SecurityGroupRulePrototypeSecurityGroupRuleProtocolTCPUDP extends SecurityGroupRulePrototype {
    /** The inclusive upper bound of TCP/UDP port range. */
    port_max?: number;
    /** The inclusive lower bound of TCP/UDP port range. */
    port_min?: number;
    /** The protocol to enforce. */
    protocol: string;
  }

  /** SecurityGroupRuleRemotePatchCIDR. */
  export interface SecurityGroupRuleRemotePatchCIDR extends SecurityGroupRuleRemotePatch {
    /** The CIDR block. This property may add support for IPv6 CIDR blocks in the future. When processing a value in
     *  this property, verify that the CIDR block is in an expected format. If it is not, log an error. Optionally halt
     *  processing and surface the error, or bypass the resource on which the unexpected CIDR block format was
     *  encountered.
     */
    cidr_block: string;
  }

  /** SecurityGroupRuleRemotePatchIP. */
  export interface SecurityGroupRuleRemotePatchIP extends SecurityGroupRuleRemotePatch {
    /** The IP address. This property may add support for IPv6 addresses in the future. When processing a value in
     *  this property, verify that the address is in an expected format. If it is not, log an error. Optionally halt
     *  processing and surface the error, or bypass the resource on which the unexpected IP address format was
     *  encountered.
     */
    address: string;
  }

  /** Identifies a security group by a unique property. */
  export interface SecurityGroupRuleRemotePatchSecurityGroupIdentity extends SecurityGroupRuleRemotePatch {
  }

  /** SecurityGroupRuleRemotePrototypeCIDR. */
  export interface SecurityGroupRuleRemotePrototypeCIDR extends SecurityGroupRuleRemotePrototype {
    /** The CIDR block. This property may add support for IPv6 CIDR blocks in the future. When processing a value in
     *  this property, verify that the CIDR block is in an expected format. If it is not, log an error. Optionally halt
     *  processing and surface the error, or bypass the resource on which the unexpected CIDR block format was
     *  encountered.
     */
    cidr_block: string;
  }

  /** SecurityGroupRuleRemotePrototypeIP. */
  export interface SecurityGroupRuleRemotePrototypeIP extends SecurityGroupRuleRemotePrototype {
    /** The IP address. This property may add support for IPv6 addresses in the future. When processing a value in
     *  this property, verify that the address is in an expected format. If it is not, log an error. Optionally halt
     *  processing and surface the error, or bypass the resource on which the unexpected IP address format was
     *  encountered.
     */
    address: string;
  }

  /** Identifies a security group by a unique property. */
  export interface SecurityGroupRuleRemotePrototypeSecurityGroupIdentity extends SecurityGroupRuleRemotePrototype {
  }

  /** SecurityGroupRuleRemoteCIDR. */
  export interface SecurityGroupRuleRemoteCIDR extends SecurityGroupRuleRemote {
    /** The CIDR block. This property may add support for IPv6 CIDR blocks in the future. When processing a value in
     *  this property, verify that the CIDR block is in an expected format. If it is not, log an error. Optionally halt
     *  processing and surface the error, or bypass the resource on which the unexpected CIDR block format was
     *  encountered.
     */
    cidr_block: string;
  }

  /** SecurityGroupRuleRemoteIP. */
  export interface SecurityGroupRuleRemoteIP extends SecurityGroupRuleRemote {
    /** The IP address. This property may add support for IPv6 addresses in the future. When processing a value in
     *  this property, verify that the address is in an expected format. If it is not, log an error. Optionally halt
     *  processing and surface the error, or bypass the resource on which the unexpected IP address format was
     *  encountered.
     */
    address: string;
  }

  /** SecurityGroupRuleRemoteSecurityGroupReference. */
  export interface SecurityGroupRuleRemoteSecurityGroupReference extends SecurityGroupRuleRemote {
    /** The security group's CRN. */
    crn: string;
    /** If present, this property indicates the referenced resource has been deleted and provides
     *  some supplementary information.
     */
    deleted?: SecurityGroupReferenceDeleted;
    /** The security group's canonical URL. */
    href: string;
    /** The unique identifier for this security group. */
    id: string;
    /** The user-defined name for this security group. Names must be unique within the VPC the security group
     *  resides in.
     */
    name: string;
  }

  /** When `protocol` is `all`, then it's invalid to specify `port_min`, `port_max`, `type` or `code`. */
  export interface SecurityGroupRuleSecurityGroupRuleProtocolAll extends SecurityGroupRule {
    /** The protocol to enforce. */
    protocol: string;
  }

  /** When `protocol` is `icmp`, then the rule may also contain fields to specify an ICMP `type` and `code`. Field `code` may only be specified if `type` is also specified. If type is not specified, then traffic is allowed for all types and codes. If type is specified and code is not specified, then traffic is allowed with the specified type for all codes. */
  export interface SecurityGroupRuleSecurityGroupRuleProtocolICMP extends SecurityGroupRule {
    /** The ICMP traffic code to allow. */
    code?: number;
    /** The protocol to enforce. */
    protocol: string;
    /** The ICMP traffic type to allow. */
    type?: number;
  }

  /** If `protocol` is either `tcp` or `udp`, then the rule may also contain `port_min` and `port_max`. Either both should be set, or neither. When neither is set then traffic is allowed on all ports. For a single port, set both to the same value. */
  export interface SecurityGroupRuleSecurityGroupRuleProtocolTCPUDP extends SecurityGroupRule {
    /** The inclusive upper bound of TCP/UDP port range. */
    port_max?: number;
    /** The inclusive lower bound of TCP/UDP port range. */
    port_min?: number;
    /** The protocol to enforce. */
    protocol: string;
  }

  /** SubnetIdentityByCRN. */
  export interface SubnetIdentityByCRN extends SubnetIdentity {
    /** The CRN for this subnet. */
    crn: string;
  }

  /** SubnetIdentityByHref. */
  export interface SubnetIdentityByHref extends SubnetIdentity {
    /** The URL for this subnet. */
    href: string;
  }

  /** SubnetIdentityById. */
  export interface SubnetIdentityById extends SubnetIdentity {
    /** The unique identifier for this subnet. */
    id: string;
  }

  /** SubnetPrototypeSubnetByCIDR. */
  export interface SubnetPrototypeSubnetByCIDR extends SubnetPrototype {
    /** The IPv4 range of the subnet, expressed in CIDR format. The prefix length of the subnet's CIDR must be
     *  between `/9` (8,388,608 addresses) and `/29` (8 addresses). The IPv4 range of the subnet's CIDR must fall within
     *  an existing address prefix in the VPC. The subnet will be created in the zone of the address prefix that
     *  contains the IPv4 CIDR. If zone is specified, it must match the zone of the address prefix that contains the
     *  subnet's IPv4 CIDR.
     */
    ipv4_cidr_block: string;
    /** The zone the subnet is to reside in. */
    zone?: ZoneIdentity;
  }

  /** SubnetPrototypeSubnetByTotalCount. */
  export interface SubnetPrototypeSubnetByTotalCount extends SubnetPrototype {
    /** The total number of IPv4 addresses required. Must be a power of 2. The VPC must have a default address
     *  prefix in the specified zone, and that prefix must have a free CIDR range with at least this number of
     *  addresses.
     */
    total_ipv4_address_count: number;
    /** The zone the subnet is to reside in. */
    zone: ZoneIdentity;
  }

  /** VPCIdentityByCRN. */
  export interface VPCIdentityByCRN extends VPCIdentity {
    /** The CRN for this VPC. */
    crn: string;
  }

  /** VPCIdentityByHref. */
  export interface VPCIdentityByHref extends VPCIdentity {
    /** The URL for this VPC. */
    href: string;
  }

  /** VPCIdentityById. */
  export interface VPCIdentityById extends VPCIdentity {
    /** The unique identifier for this VPC. */
    id: string;
  }

  /** VPNGatewayConnectionPatchVPNGatewayConnectionStaticRouteModePatch. */
  export interface VPNGatewayConnectionPatchVPNGatewayConnectionStaticRouteModePatch extends VPNGatewayConnectionPatch {
    /** Routing protocols are disabled for this VPN gateway connection. */
    routing_protocol?: string;
  }

  /** VPNGatewayConnectionPolicyMode. */
  export interface VPNGatewayConnectionPolicyMode extends VPNGatewayConnection {
    /** A collection of local CIDRs for this resource. */
    local_cidrs: string[];
    /** A collection of peer CIDRs for this resource. */
    peer_cidrs: string[];
  }

  /** VPNGatewayConnectionPrototypeVPNGatewayConnectionPolicyModePrototype. */
  export interface VPNGatewayConnectionPrototypeVPNGatewayConnectionPolicyModePrototype extends VPNGatewayConnectionPrototype {
    /** A collection of local CIDRs for this resource. */
    local_cidrs: string[];
    /** A collection of peer CIDRs for this resource. */
    peer_cidrs: string[];
  }

  /** VPNGatewayConnectionPrototypeVPNGatewayConnectionStaticRouteModePrototype. */
  export interface VPNGatewayConnectionPrototypeVPNGatewayConnectionStaticRouteModePrototype extends VPNGatewayConnectionPrototype {
    /** Routing protocols are disabled for this VPN gateway connection. */
    routing_protocol?: string;
  }

  /** VPNGatewayConnectionStaticRouteMode. */
  export interface VPNGatewayConnectionStaticRouteMode extends VPNGatewayConnection {
    /** Routing protocols are disabled for this VPN gateway connection. */
    routing_protocol: string;
    /** The VPN tunnel configuration for this VPN gateway connection (in static route mode). */
    tunnels: VPNGatewayConnectionStaticRouteModeTunnel[];
  }

  /** VPNGatewayPolicyMode. */
  export interface VPNGatewayPolicyMode extends VPNGateway {
    /** Policy mode VPN gateway. */
    mode: string;
  }

  /** VPNGatewayPrototypeVPNGatewayPolicyModePrototype. */
  export interface VPNGatewayPrototypeVPNGatewayPolicyModePrototype extends VPNGatewayPrototype {
    /** Policy mode VPN gateway. */
    mode?: string;
  }

  /** VPNGatewayPrototypeVPNGatewayRouteModePrototype. */
  export interface VPNGatewayPrototypeVPNGatewayRouteModePrototype extends VPNGatewayPrototype {
    /** Route mode VPN gateway. */
    mode?: string;
  }

  /** VPNGatewayRouteMode. */
  export interface VPNGatewayRouteMode extends VPNGateway {
    /** Route mode VPN gateway. */
    mode: string;
  }

  /** Identifies a volume by a unique property. */
  export interface VolumeAttachmentVolumePrototypeInstanceContextVolumeIdentity extends VolumeAttachmentVolumePrototypeInstanceContext {
  }

  /** VolumeAttachmentVolumePrototypeInstanceContextVolumePrototypeInstanceContext. */
  export interface VolumeAttachmentVolumePrototypeInstanceContextVolumePrototypeInstanceContext extends VolumeAttachmentVolumePrototypeInstanceContext {
    /** The identity of the root key to use to wrap the data encryption key for the volume.
     *
     *  If this property is not provided, the `encryption` type for the volume will be
     *  `provider_managed`.
     */
    encryption_key?: EncryptionKeyIdentity;
    /** The bandwidth for the volume. */
    iops?: number;
    /** The unique user-defined name for this volume. */
    name?: string;
    /** The profile to use for this volume. */
    profile: VolumeProfileIdentity;
  }

  /** VolumeIdentityByCRN. */
  export interface VolumeIdentityByCRN extends VolumeIdentity {
    /** The CRN for this volume. */
    crn: string;
  }

  /** VolumeIdentityByHref. */
  export interface VolumeIdentityByHref extends VolumeIdentity {
    /** The URL for this volume. */
    href: string;
  }

  /** VolumeIdentityById. */
  export interface VolumeIdentityById extends VolumeIdentity {
    /** The unique identifier for this volume. */
    id: string;
  }

  /** VolumeProfileIdentityByHref. */
  export interface VolumeProfileIdentityByHref extends VolumeProfileIdentity {
    /** The URL for this volume profile. */
    href: string;
  }

  /** VolumeProfileIdentityByName. */
  export interface VolumeProfileIdentityByName extends VolumeProfileIdentity {
    /** The globally unique name for this volume profile. */
    name: string;
  }

  /** VolumePrototypeVolumeByCapacity. */
  export interface VolumePrototypeVolumeByCapacity extends VolumePrototype {
    /** The capacity of the volume in gigabytes. The specified minimum and maximum capacity values for creating or
     *  updating volumes may expand in the future.
     */
    capacity: number;
  }

  /** ZoneIdentityByHref. */
  export interface ZoneIdentityByHref extends ZoneIdentity {
    /** The URL for this zone. */
    href: string;
  }

  /** ZoneIdentityByName. */
  export interface ZoneIdentityByName extends ZoneIdentity {
    /** The globally unique name for this zone. */
    name: string;
  }

  /** EndpointGatewayReservedIPReservedIPIdentityReservedIPIdentityByHref. */
  export interface EndpointGatewayReservedIPReservedIPIdentityReservedIPIdentityByHref extends EndpointGatewayReservedIPReservedIPIdentity {
    /** The URL for this reserved IP. */
    href: string;
  }

  /** EndpointGatewayReservedIPReservedIPIdentityReservedIPIdentityById. */
  export interface EndpointGatewayReservedIPReservedIPIdentityReservedIPIdentityById extends EndpointGatewayReservedIPReservedIPIdentity {
    /** The unique identifier for this reserved IP. */
    id: string;
  }

  /** EndpointGatewayTargetPrototypeProviderCloudServiceIdentityProviderCloudServiceIdentityByCRN. */
  export interface EndpointGatewayTargetPrototypeProviderCloudServiceIdentityProviderCloudServiceIdentityByCRN extends EndpointGatewayTargetPrototypeProviderCloudServiceIdentity {
    /** The CRN for this provider cloud service, or the CRN for the user's instance of a provider cloud service. */
    crn: string;
  }

  /** The name of this provider infrastructure service. */
  export interface EndpointGatewayTargetPrototypeProviderInfrastructureServiceIdentityProviderInfrastructureServiceIdentityByName extends EndpointGatewayTargetPrototypeProviderInfrastructureServiceIdentity {
    /** The name of a provider infrastructure service. Must be:
     *  - `ibm-ntp-server`: An NTP (Network Time Protocol) server provided by IBM.
     */
    name: string;
  }

  /** FlowLogCollectorTargetPrototypeInstanceIdentityInstanceIdentityByCRN. */
  export interface FlowLogCollectorTargetPrototypeInstanceIdentityInstanceIdentityByCRN extends FlowLogCollectorTargetPrototypeInstanceIdentity {
    /** The CRN for this virtual server instance. */
    crn: string;
  }

  /** FlowLogCollectorTargetPrototypeInstanceIdentityInstanceIdentityByHref. */
  export interface FlowLogCollectorTargetPrototypeInstanceIdentityInstanceIdentityByHref extends FlowLogCollectorTargetPrototypeInstanceIdentity {
    /** The URL for this virtual server instance. */
    href: string;
  }

  /** FlowLogCollectorTargetPrototypeInstanceIdentityInstanceIdentityById. */
  export interface FlowLogCollectorTargetPrototypeInstanceIdentityInstanceIdentityById extends FlowLogCollectorTargetPrototypeInstanceIdentity {
    /** The unique identifier for this virtual server instance. */
    id: string;
  }

  /** FlowLogCollectorTargetPrototypeNetworkInterfaceIdentityNetworkInterfaceIdentityNetworkInterfaceIdentityByHref. */
  export interface FlowLogCollectorTargetPrototypeNetworkInterfaceIdentityNetworkInterfaceIdentityNetworkInterfaceIdentityByHref extends FlowLogCollectorTargetPrototypeNetworkInterfaceIdentity {
    /** The URL for this network interface. */
    href: string;
  }

  /** FlowLogCollectorTargetPrototypeNetworkInterfaceIdentityNetworkInterfaceIdentityNetworkInterfaceIdentityById. */
  export interface FlowLogCollectorTargetPrototypeNetworkInterfaceIdentityNetworkInterfaceIdentityNetworkInterfaceIdentityById extends FlowLogCollectorTargetPrototypeNetworkInterfaceIdentity {
    /** The unique identifier for this network interface. */
    id: string;
  }

  /** FlowLogCollectorTargetPrototypeSubnetIdentitySubnetIdentityByCRN. */
  export interface FlowLogCollectorTargetPrototypeSubnetIdentitySubnetIdentityByCRN extends FlowLogCollectorTargetPrototypeSubnetIdentity {
    /** The CRN for this subnet. */
    crn: string;
  }

  /** FlowLogCollectorTargetPrototypeSubnetIdentitySubnetIdentityByHref. */
  export interface FlowLogCollectorTargetPrototypeSubnetIdentitySubnetIdentityByHref extends FlowLogCollectorTargetPrototypeSubnetIdentity {
    /** The URL for this subnet. */
    href: string;
  }

  /** FlowLogCollectorTargetPrototypeSubnetIdentitySubnetIdentityById. */
  export interface FlowLogCollectorTargetPrototypeSubnetIdentitySubnetIdentityById extends FlowLogCollectorTargetPrototypeSubnetIdentity {
    /** The unique identifier for this subnet. */
    id: string;
  }

  /** FlowLogCollectorTargetPrototypeVPCIdentityVPCIdentityByCRN. */
  export interface FlowLogCollectorTargetPrototypeVPCIdentityVPCIdentityByCRN extends FlowLogCollectorTargetPrototypeVPCIdentity {
    /** The CRN for this VPC. */
    crn: string;
  }

  /** FlowLogCollectorTargetPrototypeVPCIdentityVPCIdentityByHref. */
  export interface FlowLogCollectorTargetPrototypeVPCIdentityVPCIdentityByHref extends FlowLogCollectorTargetPrototypeVPCIdentity {
    /** The URL for this VPC. */
    href: string;
  }

  /** FlowLogCollectorTargetPrototypeVPCIdentityVPCIdentityById. */
  export interface FlowLogCollectorTargetPrototypeVPCIdentityVPCIdentityById extends FlowLogCollectorTargetPrototypeVPCIdentity {
    /** The unique identifier for this VPC. */
    id: string;
  }

  /** LoadBalancerListenerPolicyTargetPatchLoadBalancerPoolIdentityLoadBalancerPoolIdentityByHref. */
  export interface LoadBalancerListenerPolicyTargetPatchLoadBalancerPoolIdentityLoadBalancerPoolIdentityByHref extends LoadBalancerListenerPolicyTargetPatchLoadBalancerPoolIdentity {
    /** The pool's canonical URL. */
    href: string;
  }

  /** LoadBalancerListenerPolicyTargetPatchLoadBalancerPoolIdentityLoadBalancerPoolIdentityById. */
  export interface LoadBalancerListenerPolicyTargetPatchLoadBalancerPoolIdentityLoadBalancerPoolIdentityById extends LoadBalancerListenerPolicyTargetPatchLoadBalancerPoolIdentity {
    /** The unique identifier for this load balancer pool. */
    id: string;
  }

  /** LoadBalancerListenerPolicyTargetPrototypeLoadBalancerPoolIdentityLoadBalancerPoolIdentityByHref. */
  export interface LoadBalancerListenerPolicyTargetPrototypeLoadBalancerPoolIdentityLoadBalancerPoolIdentityByHref extends LoadBalancerListenerPolicyTargetPrototypeLoadBalancerPoolIdentity {
    /** The pool's canonical URL. */
    href: string;
  }

  /** LoadBalancerListenerPolicyTargetPrototypeLoadBalancerPoolIdentityLoadBalancerPoolIdentityById. */
  export interface LoadBalancerListenerPolicyTargetPrototypeLoadBalancerPoolIdentityLoadBalancerPoolIdentityById extends LoadBalancerListenerPolicyTargetPrototypeLoadBalancerPoolIdentity {
    /** The unique identifier for this load balancer pool. */
    id: string;
  }

  /** LoadBalancerPoolMemberTargetPrototypeInstanceIdentityInstanceIdentityByCRN. */
  export interface LoadBalancerPoolMemberTargetPrototypeInstanceIdentityInstanceIdentityByCRN extends LoadBalancerPoolMemberTargetPrototypeInstanceIdentity {
    /** The CRN for this virtual server instance. */
    crn: string;
  }

  /** LoadBalancerPoolMemberTargetPrototypeInstanceIdentityInstanceIdentityByHref. */
  export interface LoadBalancerPoolMemberTargetPrototypeInstanceIdentityInstanceIdentityByHref extends LoadBalancerPoolMemberTargetPrototypeInstanceIdentity {
    /** The URL for this virtual server instance. */
    href: string;
  }

  /** LoadBalancerPoolMemberTargetPrototypeInstanceIdentityInstanceIdentityById. */
  export interface LoadBalancerPoolMemberTargetPrototypeInstanceIdentityInstanceIdentityById extends LoadBalancerPoolMemberTargetPrototypeInstanceIdentity {
    /** The unique identifier for this virtual server instance. */
    id: string;
  }

  /** PublicGatewayFloatingIPPrototypeFloatingIPIdentityFloatingIPIdentityByAddress. */
  export interface PublicGatewayFloatingIPPrototypeFloatingIPIdentityFloatingIPIdentityByAddress extends PublicGatewayFloatingIPPrototypeFloatingIPIdentity {
    /** The globally unique IP address. */
    address: string;
  }

  /** PublicGatewayFloatingIPPrototypeFloatingIPIdentityFloatingIPIdentityByCRN. */
  export interface PublicGatewayFloatingIPPrototypeFloatingIPIdentityFloatingIPIdentityByCRN extends PublicGatewayFloatingIPPrototypeFloatingIPIdentity {
    /** The CRN for this floating IP. */
    crn: string;
  }

  /** PublicGatewayFloatingIPPrototypeFloatingIPIdentityFloatingIPIdentityByHref. */
  export interface PublicGatewayFloatingIPPrototypeFloatingIPIdentityFloatingIPIdentityByHref extends PublicGatewayFloatingIPPrototypeFloatingIPIdentity {
    /** The URL for this floating IP. */
    href: string;
  }

  /** PublicGatewayFloatingIPPrototypeFloatingIPIdentityFloatingIPIdentityById. */
  export interface PublicGatewayFloatingIPPrototypeFloatingIPIdentityFloatingIPIdentityById extends PublicGatewayFloatingIPPrototypeFloatingIPIdentity {
    /** The unique identifier for this floating IP. */
    id: string;
  }

  /** ReservedIPTargetPrototypeEndpointGatewayIdentityEndpointGatewayIdentityByCRN. */
  export interface ReservedIPTargetPrototypeEndpointGatewayIdentityEndpointGatewayIdentityByCRN extends ReservedIPTargetPrototypeEndpointGatewayIdentity {
    /** The CRN for this endpoint gateway. */
    crn: string;
  }

  /** ReservedIPTargetPrototypeEndpointGatewayIdentityEndpointGatewayIdentityByHref. */
  export interface ReservedIPTargetPrototypeEndpointGatewayIdentityEndpointGatewayIdentityByHref extends ReservedIPTargetPrototypeEndpointGatewayIdentity {
    /** The URL for this endpoint gateway. */
    href: string;
  }

  /** ReservedIPTargetPrototypeEndpointGatewayIdentityEndpointGatewayIdentityById. */
  export interface ReservedIPTargetPrototypeEndpointGatewayIdentityEndpointGatewayIdentityById extends ReservedIPTargetPrototypeEndpointGatewayIdentity {
    /** The unique identifier for this endpoint gateway. */
    id: string;
  }

  /** SecurityGroupRuleRemotePatchSecurityGroupIdentitySecurityGroupIdentityByCRN. */
  export interface SecurityGroupRuleRemotePatchSecurityGroupIdentitySecurityGroupIdentityByCRN extends SecurityGroupRuleRemotePatchSecurityGroupIdentity {
    /** The security group's CRN. */
    crn: string;
  }

  /** SecurityGroupRuleRemotePatchSecurityGroupIdentitySecurityGroupIdentityByHref. */
  export interface SecurityGroupRuleRemotePatchSecurityGroupIdentitySecurityGroupIdentityByHref extends SecurityGroupRuleRemotePatchSecurityGroupIdentity {
    /** The security group's canonical URL. */
    href: string;
  }

  /** SecurityGroupRuleRemotePatchSecurityGroupIdentitySecurityGroupIdentityById. */
  export interface SecurityGroupRuleRemotePatchSecurityGroupIdentitySecurityGroupIdentityById extends SecurityGroupRuleRemotePatchSecurityGroupIdentity {
    /** The unique identifier for this security group. */
    id: string;
  }

  /** SecurityGroupRuleRemotePrototypeSecurityGroupIdentitySecurityGroupIdentityByCRN. */
  export interface SecurityGroupRuleRemotePrototypeSecurityGroupIdentitySecurityGroupIdentityByCRN extends SecurityGroupRuleRemotePrototypeSecurityGroupIdentity {
    /** The security group's CRN. */
    crn: string;
  }

  /** SecurityGroupRuleRemotePrototypeSecurityGroupIdentitySecurityGroupIdentityByHref. */
  export interface SecurityGroupRuleRemotePrototypeSecurityGroupIdentitySecurityGroupIdentityByHref extends SecurityGroupRuleRemotePrototypeSecurityGroupIdentity {
    /** The security group's canonical URL. */
    href: string;
  }

  /** SecurityGroupRuleRemotePrototypeSecurityGroupIdentitySecurityGroupIdentityById. */
  export interface SecurityGroupRuleRemotePrototypeSecurityGroupIdentitySecurityGroupIdentityById extends SecurityGroupRuleRemotePrototypeSecurityGroupIdentity {
    /** The unique identifier for this security group. */
    id: string;
  }

  /** VolumeAttachmentVolumePrototypeInstanceContextVolumeIdentityVolumeIdentityByCRN. */
  export interface VolumeAttachmentVolumePrototypeInstanceContextVolumeIdentityVolumeIdentityByCRN extends VolumeAttachmentVolumePrototypeInstanceContextVolumeIdentity {
    /** The CRN for this volume. */
    crn: string;
  }

  /** VolumeAttachmentVolumePrototypeInstanceContextVolumeIdentityVolumeIdentityByHref. */
  export interface VolumeAttachmentVolumePrototypeInstanceContextVolumeIdentityVolumeIdentityByHref extends VolumeAttachmentVolumePrototypeInstanceContextVolumeIdentity {
    /** The URL for this volume. */
    href: string;
  }

  /** VolumeAttachmentVolumePrototypeInstanceContextVolumeIdentityVolumeIdentityById. */
  export interface VolumeAttachmentVolumePrototypeInstanceContextVolumeIdentityVolumeIdentityById extends VolumeAttachmentVolumePrototypeInstanceContextVolumeIdentity {
    /** The unique identifier for this volume. */
    id: string;
  }

  /** VolumeAttachmentVolumePrototypeInstanceContextVolumePrototypeInstanceContextVolumePrototypeInstanceContextVolumeByCapacity. */
  export interface VolumeAttachmentVolumePrototypeInstanceContextVolumePrototypeInstanceContextVolumePrototypeInstanceContextVolumeByCapacity extends VolumeAttachmentVolumePrototypeInstanceContextVolumePrototypeInstanceContext {
    /** The capacity of the volume in gigabytes. The specified minimum and maximum capacity values for creating or
     *  updating volumes may expand in the future.
     */
    capacity: number;
  }

}

export = VpcV1;
