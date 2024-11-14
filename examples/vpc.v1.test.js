/**
* @jest-environment node
*/
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

const VpcV1 = require('../dist/vpc/v1');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../test/resources/auth-helper.js');
const { displayPartsToString } = require('typescript');

//
// This file provides an example of how to use the vpc service.
//
// The following configuration properties are assumed to be defined:
// VPC_URL=<service base url>
// VPC_AUTH_TYPE=iam
// VPC_APIKEY=<IAM apikey>
// VPC_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'vpc_v1.env';

const describe = authHelper.prepareTests(configFile);
const data = {};
data.zone = "us-east-1"
data.region = "us-east"
const timeout = 60000;

// Save original console.log and console.warn
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');
jest.setTimeout(timeout);

describe('VpcV1', () => {

  // begin-common

  const vpcService = VpcV1.newInstance();

  // end-common

  const config = readExternalSources(VpcV1.DEFAULT_SERVICE_NAME);

  test('listVpcs request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_vpcs

    const params = {
      limit: 10,
    };
    const allResults = [];
    try {
      const pager = new VpcV1.VpcsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_vpcs
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createVpc request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_vpc

    const params = {
      name: 'my-vpc',
      addressPrefixManagement: 'manual',
      classicAccess: true,
    };

    var response = await vpcService.createVpc(params);

    // end-create_vpc

    data.vpcId = response.result.id;
    expect(response.result).not.toBeNull();


  });

  test('createHubVpcExample request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_vpc

    const zoneIdentityModel = {
      name: data.zone,
    };
    const dnsServerPrototype = {
      address: '192.168.3.4',
      zone_affinity: zoneIdentityModel,
    };
    const vpcDNSResolverPrototype = {
      manual_servers: [dnsServerPrototype],
      type: 'manual',
    };
    const vpcDnsPrototype = {
      enable_hub: false,
      resolver: vpcDNSResolverPrototype,
    };
    const params = {
      name: 'my-vpc-hub',
      addressPrefixManagement: 'manual',
      classicAccess: true,
      dns: vpcDnsPrototype,
    };

    var response = await vpcService.createVpc(params);

    // end-create_vpc

    expect(response.result).not.toBeNull();
    data.vpcHubID = response.result.id;

  });

  test('getVpc request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_vpc

    const params = {
      id: data.vpcId,
    };

    const response = await vpcService.getVpc(params);

    // end-get_vpc

    expect(response.result).not.toBeNull();

  });

  test('updateVpc request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_vpc

    const params = {
      id: data.vpcId,
      name: 'my-vpc-modified',
    };

    const response = await vpcService.updateVpc(params);

    // end-update_vpc

    expect(response.result).not.toBeNull();

  });

  test('getVpcDefaultNetworkAcl request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_vpc_default_network_acl

    const params = {
      id: data.vpcId,
    };

    const response = await vpcService.getVpcDefaultNetworkAcl(params);

    // end-get_vpc_default_network_acl
    expect(response.result).not.toBeNull();

  });

  test('getVpcDefaultRoutingTable request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_vpc_default_routing_table

    const params = {
      id: data.vpcId,
    };

    const response = await vpcService.getVpcDefaultRoutingTable(params);

    // end-get_vpc_default_routing_table
    expect(response.result).not.toBeNull();


  });

  test('getVpcDefaultSecurityGroup request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_vpc_default_security_group

    const params = {
      id: data.vpcId,
    };

    const response = await vpcService.getVpcDefaultSecurityGroup(params);

    // end-get_vpc_default_security_group
    expect(response.result).not.toBeNull();


  });


  test('listVpcAddressPrefixes request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_vpc_address_prefixes

    const params = {
      vpcId: data.vpcId,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.VpcAddressPrefixesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_vpc_address_prefixes
    console.log(JSON.stringify(allResults, null, 2));
  });

  test('createVpcAddressPrefix request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_vpc_address_prefix

    const params = {
      vpcId: data.vpcId,
      cidr: '10.0.0.0/24',
      zone: { name: data.zone },
      name: 'my-address-prefix',
    };

    const response = await vpcService.createVpcAddressPrefix(params);

    // end-create_vpc_address_prefix
    data.vpcAddressPrefixId = response.result.id;
    expect(response.result).not.toBeNull();


  });

  test('getVpcAddressPrefix request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_vpc_address_prefix

    const params = {
      vpcId: data.vpcId,
      id: data.vpcAddressPrefixId,
    };

    const response = await vpcService.getVpcAddressPrefix(params);

    // end-get_vpc_address_prefix

    expect(response.result).not.toBeNull();

  });

  test('updateVpcAddressPrefix request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_vpc_address_prefix

    const params = {
      vpcId: data.vpcId,
      id: data.vpcAddressPrefixId,
      name: 'my-address-prefix-updated',
    };

    const response = await vpcService.updateVpcAddressPrefix(params);

    // end-update_vpc_address_prefix
    expect(response.result).not.toBeNull();

  });

  test('createVpcDnsResolutionBinding request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_vpc_dns_resolution_binding

    const vpcIdentityModel = {
      id: data.vpcHubID,
    };
    const params = {
      vpcId: data.vpcId,
      name: 'my-vpc-dns-resolution-binding',
      vpc: vpcIdentityModel,
    };

    const response = await vpcService.createVpcDnsResolutionBinding(params);

    // end-create_vpc_dns_resolution_binding
    data.vpcDnsResolutionId = response.result.id;
    expect(response.result).not.toBeNull();

  });

  test('listVpcDnsResolutionBinding request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_vpc_dns_resolution_binding

    const params = {
      vpcId: data.vpcId,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.VpcDnsResolutionBindingsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_vpc_dns_resolution_binding
    console.log(JSON.stringify(allResults, null, 2));
  });

  test('getVpcDnsResolutionBinding request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get__vpc_dns_resolution_binding

    const params = {
      vpcId: data.vpcId,
      id: data.vpcDnsResolutionId,
    };

    const response = await vpcService.getVpcDnsResolutionBinding(params);

    // end-get_vpc_dns_resolution_binding

    expect(response.result).not.toBeNull();

  });

  test('updateVpcDnsResolutionBinding request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_vpc_dns_resolution_binding

    const params = {
      vpcId: data.vpcId,
      id: data.vpcDnsResolutionId,
      name: 'my-vpc-dns-resolution-binding-updated',
    };

    const response = await vpcService.updateVpcDnsResolutionBinding(params);

    // end-update_vpc_dns_resolution_binding
    expect(response.result).not.toBeNull();

  });

  test('listVpcRoutingTables request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_vpc_routing_tables

    const params = {
      vpcId: data.vpcId,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.VpcRoutingTablesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_vpc_routing_tables
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createVpcRoutingTable request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_vpc_routing_table

    const routeNextHopPrototypeModel = {
      address: '192.168.3.4',
    };

    const zoneIdentityModel = {
      name: data.zone,
    };

    const routePrototypeModel = {
      action: 'delegate',
      next_hop: routeNextHopPrototypeModel,
      name: 'my-route',
      destination: '192.168.3.0/24',
      zone: zoneIdentityModel,
    };

    const params = {
      vpcId: data.vpcId,
      name: 'my-routing-table',
      routes: [routePrototypeModel],
    };

    const response = await vpcService.createVpcRoutingTable(params);

    // end-create_vpc_routing_table
    data.vpcRoutingTableId = response.result.id;
    expect(response.result).not.toBeNull();

  });

  test('getVpcRoutingTable request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_vpc_routing_table

    const params = {
      vpcId: data.vpcId,
      id: data.vpcRoutingTableId,
    };

    const response = await vpcService.getVpcRoutingTable(params);

    // end-get_vpc_routing_table
    expect(response.result).not.toBeNull();

  });

  test('updateVpcRoutingTable request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_vpc_routing_table

    const params = {
      vpcId: data.vpcId,
      id: data.vpcRoutingTableId,
      name: 'my-routing-table-modified',
    };

    const response = await vpcService.updateVpcRoutingTable(params);

    // end-update_vpc_routing_table
    expect(response.result).not.toBeNull();

  });

  test('listVpcRoutingTableRoutes request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_vpc_routing_table_routes

    const params = {
      vpcId: data.vpcId,
      routingTableId: data.vpcRoutingTableId,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.VpcRoutingTableRoutesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_vpc_routing_table_routes
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createVpcRoutingTableRoute request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_vpc_routing_table_route

    const routeNextHopPrototypeModel = {
      address: '192.168.3.7',
    };

    const params = {
      vpcId: data.vpcId,
      routingTableId: data.vpcRoutingTableId,
      destination: '192.168.77.0/24',
      zone: {
        name: data.zone,
      },
      action: 'delegate',
      nextHop: routeNextHopPrototypeModel,
      name: 'my-routing-table-route',
      priority:1,
    };

    const response = await vpcService.createVpcRoutingTableRoute(params);

    // end-create_vpc_routing_table_route
    data.vpcRoutingTableRouteId = response.result.id;
    expect(response.result).not.toBeNull();

  });

  test('getVpcRoutingTableRoute request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_vpc_routing_table_route

    const params = {
      vpcId: data.vpcId,
      routingTableId: data.vpcRoutingTableId,
      id: data.vpcRoutingTableRouteId,
    };

    const response = await vpcService.getVpcRoutingTableRoute(params);

    // end-get_vpc_routing_table_route
    expect(response.result).not.toBeNull();

  });

  test('updateVpcRoutingTableRoute request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_vpc_routing_table_route

    const params = {
      vpcId: data.vpcId,
      routingTableId: data.vpcRoutingTableId,
      id: data.vpcRoutingTableRouteId,
      name: 'my-routing-table-route-updated',
    };

    const response = await vpcService.updateVpcRoutingTableRoute(params);

    // end-update_vpc_routing_table_route
    expect(response.result).not.toBeNull();

  });


  test('listSubnets request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_subnets
   const params = {
      limit: 10,
    }
    const allResults = [];
    try {
      const pager = new VpcV1.SubnetsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_subnets
    console.log(JSON.stringify(allResults, null, 2));
  });

  test('createSubnet request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_subnet

    const vpcIdentityModel = {
      id: data.vpcId,
    };

    const zoneIdentityModel = {
      name: data.zone,
    };

    const subnetPrototypeModel = {
      name: 'my-subnet',
      vpc: vpcIdentityModel,
      ipv4_cidr_block: '10.0.1.0/24',
      zone: zoneIdentityModel,
    };

    const params = {
      subnetPrototype: subnetPrototypeModel,
    };

    const response = await vpcService.createSubnet(params);

    // end-create_subnet
    expect(response.result).not.toBeNull();
    data.subnetId = response.result.id;

  });
  test('getSubnet request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_subnet

    const params = {
      id: data.subnetId,
    };

    const response = await vpcService.getSubnet(params);

    // end-get_subnet
    expect(response.result).not.toBeNull();

  });

  test('updateSubnet request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_subnet

    const params = {
      id: data.subnetId,
      name: 'my-subnet-updated',
    }
    const response = await vpcService.updateSubnet(params);

    // end-update_subnet
    expect(response.result).not.toBeNull();

  });

  test('getSubnetNetworkAcl request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_subnet_network_acl

    const params = {
      id: data.subnetId,
    };

    const response = await vpcService.getSubnetNetworkAcl(params);

    // end-get_subnet_network_acl
    expect(response.result).not.toBeNull();

  });

  test('replaceSubnetNetworkAcl request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-replace_subnet_network_acl
    const networkAclPrototypeModel = {
      name: 'my-subnet-network-acl',
      vpc: {
        id: data.vpcId,
      },
    };

    const networkAclPrototypeParams = {
      networkAclPrototype: networkAclPrototypeModel,
    };
    const networkAclResponse = await vpcService.createNetworkAcl(networkAclPrototypeParams);
    expect(networkAclResponse.result).not.toBeNull();

    const params = {
      id: data.subnetId,
      networkAclIdentity: {
        id: networkAclResponse.result.id,
      },
    };

    const response = await vpcService.replaceSubnetNetworkAcl(params);

    // end-replace_subnet_network_acl
    expect(response.result).not.toBeNull();

  });

  test('setSubnetPublicGateway request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-set_subnet_public_gateway
    const publicGatewayParams = {
      vpc: { id: data.vpcId },
      zone: { name: data.zone },
    };
    const publicGatewayResponse = await vpcService.createPublicGateway(publicGatewayParams);

    const params = {
      id: data.subnetId,
      publicGatewayIdentity: {
        id: publicGatewayResponse.result.id,
      },
    };
    const response = await vpcService.setSubnetPublicGateway(params);

    // end-set_subnet_public_gateway
    expect(response.result).not.toBeNull();

  });

  test('getSubnetPublicGateway request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_subnet_public_gateway

    const params = {
      id: data.subnetId,
    };

    const response = await vpcService.getSubnetPublicGateway(params);

    // end-get_subnet_public_gateway
    expect(response.result).not.toBeNull();

  });

  test('unsetSubnetPublicGateway request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-unset_subnet_public_gateway

    const params = {
      id: data.subnetId,
    };

    const response = await vpcService.unsetSubnetPublicGateway(params);

    // end-unset_subnet_public_gateway
    expect(response.result).not.toBeNull();

  });

  test('getSubnetRoutingTable request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_subnet_routing_table

    const params = {
      id: data.subnetId,
    };

    const response = await vpcService.getSubnetRoutingTable(params);

    // end-get_subnet_routing_table
    expect(response.result).not.toBeNull();

  });

  test('replaceSubnetRoutingTable request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-replace_subnet_routing_table


    const routingTableIdentityModel = {
      id: data.vpcRoutingTableId,
    };
    const params = {
      id: data.subnetId,
      routingTableIdentity: routingTableIdentityModel,
    };
    const response = await vpcService.replaceSubnetRoutingTable(params);

    // end-replace_subnet_routing_table
    expect(response.result).not.toBeNull();

  });

  test('listSubnetReservedIps request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_subnet_reserved_ips

    const params = {
      subnetId: data.subnetId,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.SubnetReservedIpsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_subnet_reserved_ips
    console.log(JSON.stringify(allResults, null, 2));
  });

  test('createSubnetReservedIp request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_subnet_reserved_ip

    const params = {
      subnetId: data.subnetId,
      name: 'my-subnet-reserved-ip',
    };

    const response = await vpcService.createSubnetReservedIp(params);

    // end-create_subnet_reserved_ip
    expect(response.result).not.toBeNull();
    data.subnetReservedIp = response.result.id;

  });

  test('getSubnetReservedIp request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_subnet_reserved_ip

    const params = {
      subnetId: data.subnetId,
      id: data.subnetReservedIp,
    };

    const response = await vpcService.getSubnetReservedIp(params);

    // end-get_subnet_reserved_ip
    expect(response.result).not.toBeNull();

  });

  test('updateSubnetReservedIp request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_subnet_reserved_ip

    const params = {
      subnetId: data.subnetId,
      id: data.subnetReservedIp,
      name: 'my-reserved-ip-updated',
    };

    const response = await vpcService.updateSubnetReservedIp(params);

    // end-update_subnet_reserved_ip
    expect(response.result).not.toBeNull();

  });

  test('deleteSubnetReservedIp request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    const responseNew = await vpcService.createSubnetReservedIp({
      subnetId: data.subnetId,
      name: 'my-subnet-reserved-ip-rip'
    });
    data.subnetReservedIpId = responseNew.result.id;

    // begin-delete_subnet_reserved_ip

    const params = {
      subnetId: data.subnetId,
      id: data.subnetReservedIp,
    };

    const response = await vpcService.deleteSubnetReservedIp(params);

    // end-delete_subnet_reserved_ip

    expect(response.result).not.toBeNull();
  });

  test('listImages request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_images
    const params = {
      userDataFormat: 'cloud_init',
      visibility: 'private',
      limit: 10,
    }

    const allResults = [];
    try {
      const pager = new VpcV1.ImagesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_images
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createImage request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_image

    const imageFilePrototypeModel = {
      href: "cos://us-south/my-bucket/my-image.qcow2",
    };

    const operatingSystemIdentityModel = {
      name: 'debian-9-amd64',
    };

    const imagePrototypeModel = {
      name: 'my-image',
      file: imageFilePrototypeModel,
      operating_system: operatingSystemIdentityModel,
    };

    const params = {
      imagePrototype: imagePrototypeModel,
    };

    const response = await vpcService.createImage(params);

    // end-create_image
    expect(response.result).not.toBeNull();
    data.imageId = response.result.id;

  });

  test('getImage request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_image

    const params = {
      id: data.imageId,
    };

    const response = await vpcService.getImage(params);

    // end-get_image
    expect(response.result).not.toBeNull();

  });

  test('updateImage request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_image

    const params = {
      id: data.imageId,
      name: 'my-image-updated',
    };

    const response = await vpcService.updateImage(params);

    // end-update_image
    expect(response.result).not.toBeNull();

  });

  test('listImageExportJobs request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });
    // begin-list_image_export_jobs
    const params = {
      imageId: data.imageId,
    };
    const response = await vpcService.listImageExportJobs(params);
    // end-list_image_export_jobs
    expect(response.result).not.toBeNull();
  });
  test('createImageExportJob request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_image_export_job
    const storageBucket = {
      name: 'bucket-27200-lwx4cfvcue',
    };

    const params1 = {
      storageBucket: storageBucket,
      imageId: data.imageId,
      name:'my-image-export-job',
    };
    const response1 = await vpcService.createImageExportJob(params1);
    data.imageExportJobId = response1.result.id;

    // end-create_image_export_job
    expect(response1.result).not.toBeNull();
  });
  test('getImageExportJob request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_image_export_job

    const params = {
      imageId: data.imageId,
      id: data.imageExportJobId,
    };

    const response = await vpcService.getImageExportJob(params);

    // end-get_image_export_job
    expect(response.result).not.toBeNull();

  });
  test('updateImageExportJob request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_image_export_job

    const params = {
      imageId: data.imageId,
      id: data.imageExportJobId,
      name:'my-image-export-job-updated',
    };

    const response = await vpcService.updateImageExportJob(params);

    // end-update_image_export_job
    expect(response.result).not.toBeNull();

  });
  test('deleteImageExportJob request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_image_export_job

    const params = {
      imageId: data.imageId,
      id: data.imageExportJobId,
    };

    const response = await vpcService.deleteImageExportJob(params);

    // end-delete_image_export_job
    expect(response.result).not.toBeNull();

  });
  test('listOperatingSystems request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_operating_systems

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.OperatingSystemsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_operating_systems
    expect(allResults.result).not.toBeNull();
    data.operatingSystemName = allResults[0].name;
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('getOperatingSystem request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_operating_system

    const params = {
      name: data.operatingSystemName,
    };

    const response = await vpcService.getOperatingSystem(params);

    // end-get_operating_system
    expect(response.result).not.toBeNull();

  });

  test('listKeys request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_keys
    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.KeysPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_keys
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createKey request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_key

    const params = {
      publicKey: 'AAAAB3NzaC1yc2EAAAADAQABAAABAQDDGe50Bxa5T5NDddrrtbx2Y4/VGbiCgXqnBsYToIUKoFSHTQl5IX3PasGnneKanhcLwWz5M5MoCRvhxTp66NKzIfAz7r+FX9rxgR+ZgcM253YAqOVeIpOU408simDZKriTlN8kYsXL7P34tsWuAJf4MgZtJAQxous/2byetpdCv8ddnT4X3ltOg9w+LqSCPYfNivqH00Eh7S1Ldz7I8aw5WOp5a+sQFP/RbwfpwHp+ny7DfeIOokcuI42tJkoBn7UsLTVpCSmXr2EDRlSWe/1M/iHNRBzaT3CK0+SwZWd2AEjePxSnWKNGIEUJDlUYp7hKhiQcgT5ZAnWU121oc5En',
      name: 'my-ssh-key',
    };
    const response = await vpcService.createKey(params);

    // end-create_key
    expect(response.result).not.toBeNull();
    data.keyId = response.result.id;

  });
  test('getKey request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_key

    const params = {
      id: data.keyId,
    };

    const response = await vpcService.getKey(params);

    // end-get_key
    expect(response.result).not.toBeNull();

  });

  test('updateKey request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_key

    const params = {
      id: data.keyId,
      name: 'my-ssh-key-updated',
    };

    const response = await vpcService.updateKey(params);

    // end-update_key
    expect(response.result).not.toBeNull();

  });

  test('listFloatingIps request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_floating_ips

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.FloatingIpsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_floating_ips
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createFloatingIp request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_floating_ip

    const params = {
      floatingIpPrototype: {
        name: 'my-floating-ip',
        zone: {
          name: data.zone,
        },
      },
    };
    const response = await vpcService.createFloatingIp(params);

    // end-create_floating_ip
    expect(response.result).not.toBeNull();
    data.floatingIpId = response.result.id;

  });

  test('getFloatingIp request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_floating_ip

    const params = {
      id: data.floatingIpId,
    };

    const response = await vpcService.getFloatingIp(params);

    // end-get_floating_ip
    data.floatingIpId = response.result.id;

  });
  test('updateFloatingIp request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_floating_ip

    const params = {
      id: data.floatingIpId,
      name: 'my-floating-ip-updated',
    };

    const response = await vpcService.updateFloatingIp(params);

    // end-update_floating_ip
    data.floatingIpId = response.result.id;

  });

  test('listVolumeProfiles request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_volume_profiles

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.VolumeProfilesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_volume_profiles
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('getVolumeProfile request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_volume_profile

    const params = {
      name: '10iops-tier',
    };

    const response = await vpcService.getVolumeProfile(params);

    // end-get_volume_profile
    expect(response.result).not.toBeNull();

  });

  test('listVolumes request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_volumes

    const params = {
      limit: 10,
      attachmentState:'attached',
      encryption:'provider_managed',
      operatingSystemFamily:'Ubuntu Server',
      operatingSystemArchitecture:'amd64',
    }
    const allResults = [];
    try {
      const pager = new VpcV1.VolumesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_volumes
    console.log(JSON.stringify(allResults, null, 2));
  });

  test('createVolume request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    const volumePrototypeModel1 = {
      name: 'my-volume-1',
      profile: { name: 'general-purpose' },
      zone: { name: data.zone },
      capacity: 100,
    };

    const params1 = {
      volumePrototype: volumePrototypeModel1,
    };
    const response1 = await vpcService.createVolume(params1);
    data.sourceVolumeId = response1.result.id;

    // begin-create_volume

    const volumePrototypeModel = {
      name: 'my-volume',
      profile: { name: 'general-purpose' },
      zone: { name: data.zone },
      capacity: 100,
    };

    const params = {
      volumePrototype: volumePrototypeModel,
    };
    const response = await vpcService.createVolume(params);

    // end-create_volume
    expect(response.result).not.toBeNull();
    data.volumeId = response.result.id;

  });

  test('getVolume request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_volume

    const params = {
      id: data.volumeId,
    };

    const response = await vpcService.getVolume(params);

    // end-get_volume
    expect(response.result).not.toBeNull();

  });

  test('updateVolume request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_volume

    const params = {
      id: data.volumeId,
      name: 'my-volume-updated',
    };

    const response = await vpcService.updateVolume(params);

    // end-update_volume
    expect(response.result).not.toBeNull();

  });

  test('listInstanceProfiles request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_instance_profiles

    const response = await vpcService.listInstanceProfiles();

    // end-list_instance_profiles
    expect(response.result).not.toBeNull();
    data.instanceProfileName = response.result.profiles[0].name;

  });

  test('getInstanceProfile request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_instance_profile

    const params = {
      name: data.instanceProfileName,
    };

    const response = await vpcService.getInstanceProfile(params);

    // end-get_instance_profile
    expect(response.result).not.toBeNull();

  });


  test('listInstanceTemplates request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_instance_templates

    const response = await vpcService.listInstanceTemplates();

    // end-list_instance_templates
    expect(response.result).not.toBeNull();

  });

  test('createInstanceTemplate request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_instance_template

    const keyIdentityModel = {
      id: data.keyId,
    };

    const subnetIdentityModel = {
      id: data.subnetId,
    };

    const networkInterfacePrototypeModel = {
      name: 'my-network-interface',
      subnet: subnetIdentityModel,
    };

    const instanceProfileIdentityModel = {
      name: data.instanceProfileName,
    };

    const vpcIdentityModel = {
      id: data.vpcId,
    };

    const zoneIdentityModel = {
      name: data.zone,
    };

    const imageIdentityModel = {
      id: data.imageId,
    };

    const instanceTemplatePrototypeModel = {
      name: 'my-instance-template',
      profile: instanceProfileIdentityModel,
      vpc: vpcIdentityModel,
      primary_network_interface: networkInterfacePrototypeModel,
      zone: zoneIdentityModel,
      image: imageIdentityModel,
      keys: [keyIdentityModel],
    };

    const params = {
      instanceTemplatePrototype: instanceTemplatePrototypeModel,
    };

    const response = await vpcService.createInstanceTemplate(params);

    // end-create_instance_template
    expect(response.result).not.toBeNull();
    data.instanceTemplateId = response.result.id;

  });

  test('getInstanceTemplate request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_instance_template

    const params = {
      id: data.instanceTemplateId,
    };

    const response = await vpcService.getInstanceTemplate(params);

    // end-get_instance_template
    expect(response.result).not.toBeNull();

  });

  test('updateInstanceTemplate request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_instance_template

    const params = {
      id: data.instanceTemplateId,
      name: 'my-instance-template-updated',
    };

    const response = await vpcService.updateInstanceTemplate(params);

    // end-update_instance_template
    expect(response.result).not.toBeNull();

  });

  test('listInstances request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_instances
    const params = {
      limit: 10,
    }
    const allResults = [];
    try {
      const pager = new VpcV1.InstancesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_instances
    console.log(JSON.stringify(allResults, null, 2));
  });

  test('createInstance request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_instance

    const subnetIdentityModel = {
      id: data.subnetId,
    };

    const networkInterfacePrototypeModel = {
      name: 'my-network-interface',
      subnet: subnetIdentityModel,
    };

    const instanceProfileIdentityModel = {
      name: 'bx2d-2x8',
    };

    const vpcIdentityModel = {
      id: data.vpcId,
    };

    const zoneIdentityModel = {
      name: data.zone,
    };

    const imageIdentityModel = {
      id: data.imageId,
    };

    const instancePrototypeModel = {
      name: 'my-instance',
      profile: instanceProfileIdentityModel,
      vpc: vpcIdentityModel,
      primary_network_interface: networkInterfacePrototypeModel,
      zone: zoneIdentityModel,
      image: imageIdentityModel,
    };

    const params = {
      instancePrototype: instancePrototypeModel,
    };

    const response = await vpcService.createInstance(params);

    // end-create_instance
    expect(response.result).not.toBeNull();
    data.instanceId = response.result.id;

  });

  test('getInstance request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_instance

    const params = {
      id: data.instanceId,
    };

    const response = await vpcService.getInstance(params);

    // end-get_instance
    expect(response.result).not.toBeNull();

  });

  test('updateInstance request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_instance

    const params = {
      id: data.instanceId,
      name: 'my-instance-updated',
    };

    const response = await vpcService.updateInstance(params);

    // end-update_instance
    expect(response.result).not.toBeNull();

  });

  test('getInstanceInitialization request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_instance_initialization

    const params = {
      id: data.instanceId,
    };

    const response = await vpcService.getInstanceInitialization(params);

    // end-get_instance_initialization
    expect(response.result).not.toBeNull();

  });

  test('createInstanceAction request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_instance_action

    const params = {
      instanceId: data.instanceId,
      type: 'reboot',
      force: true,
    };

    const response = await vpcService.createInstanceAction(params);

    // end-create_instance_action
    expect(response.result).not.toBeNull();

  });


  test('listInstanceClusterNetworkAttachments request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listInstanceClusterNetworkAttachments() result:');
    // begin-list_instance_cluster_network_attachments

    const params = {
      instanceId: data.instanceId,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.InstanceClusterNetworkAttachmentsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_instance_cluster_network_attachments
  });

  test('createClusterNetworkAttachment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createClusterNetworkAttachment() result:');
    // begin-create_cluster_network_attachment

    // Request models needed by this operation.

    // InstanceClusterNetworkAttachmentPrototypeClusterNetworkInterfaceInstanceClusterNetworkInterfacePrototypeInstanceClusterNetworkAttachment
    const instanceClusterNetworkAttachmentPrototypeClusterNetworkInterfaceModel = {
      name: 'my-instance-cluster-network-attachment',
    };

    const params = {
      instanceId: data.instanceId,
      clusterNetworkInterface: instanceClusterNetworkAttachmentPrototypeClusterNetworkInterfaceModel,
    };

    let res;
    try {
      res = await vpcService.createClusterNetworkAttachment(params);
    } catch (err) {
      console.warn(err);
    }
    expect(res.result).not.toBeNull();
    data.clusterNetworkAttachmentId = res.result.id;
    // end-create_cluster_network_attachment
  });

  test('getInstanceClusterNetworkAttachment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getInstanceClusterNetworkAttachment() result:');
    // begin-get_instance_cluster_network_attachment

    const params = {
      instanceId: data.instanceId,
      id: data.clusterNetworkAttachmentId,
    };

    let res;
    try {
      res = await vpcService.getInstanceClusterNetworkAttachment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    expect(res.result).not.toBeNull();

    // end-get_instance_cluster_network_attachment
  });

  test('updateInstanceClusterNetworkAttachment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateInstanceClusterNetworkAttachment() result:');
    // begin-update_instance_cluster_network_attachment

    const params = {
      instanceId: data.instanceId,
      id: data.clusterNetworkAttachmentId,
      name: 'my-instance-network-attachment-updated',
    };

    let res;
    try {
      res = await vpcService.updateInstanceClusterNetworkAttachment(params);
    } catch (err) {
      console.warn(err);
    }
    expect(res.result).not.toBeNull();

    // end-update_instance_cluster_network_attachment
  });

  test.skip('createInstanceConsoleAccessToken request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_instance_console_access_token

    const params = {
      instanceId: data.instanceId,
      consoleType: 'serial',
    };

    const response = await vpcService.createInstanceConsoleAccessToken(params);

    // end-create_instance_console_access_token
    expect(response.result).not.toBeNull();

  });

  test('listInstanceDisks request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_instance_disks

    const params = {
      instanceId: data.instanceId,
    };

    const response = await vpcService.listInstanceDisks(params);

    // end-list_instance_disks
    expect(response.result).not.toBeNull();
    data.instanceDiskId = response.result.disks[0].id;

  });

  test('getInstanceDisk request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_instance_disk
    const params = {
      instanceId: data.instanceId,
      id: data.instanceDiskId,
    };

    const response = await vpcService.getInstanceDisk(params);

    // end-get_instance_disk
    expect(response.result).not.toBeNull();

  });

  test('updateInstanceDisk request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_instance_disk

    const params = {
      instanceId: data.instanceId,
      id: data.instanceDiskId,
      name: 'my-instance-disk-updated',
    };

    const response = await vpcService.updateInstanceDisk(params);

    // end-update_instance_disk
    expect(response.result).not.toBeNull();

  });

  test('listInstanceNetworkInterfaces request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_instance_network_interfaces

    const params = {
      instanceId: data.instanceId,
    };

    const response = await vpcService.listInstanceNetworkInterfaces(params);

    // end-list_instance_network_interfaces
    expect(response.result).not.toBeNull();

  });

  test('createInstanceNetworkInterface request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_instance_network_interface

    const params = {
      instanceId: data.instanceId,
      subnet: { id: data.subnetId },
      name: 'my-network-interface',
    };
    const response = await vpcService.createInstanceNetworkInterface(params);

    // end-create_instance_network_interface
    expect(response.result).not.toBeNull();
    data.eth2Id = response.result.id;

  });

  test('getInstanceNetworkInterface request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_instance_network_interface

    const params = {
      instanceId: data.instanceId,
      id: data.eth2Id,
    };

    const response = await vpcService.getInstanceNetworkInterface(params);

    // end-get_instance_network_interface
    expect(response.result).not.toBeNull();

  });

  test('listInstanceNetworkInterfaceReservedIps request example', async () => {
 
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_instance_network_interface_reservedIps

    const params = {
      instanceId: data.instanceId,
      networkInterfaceId: data.eth2Id,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.InstanceNetworkInterfaceIpsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_instance_network_interface_reservedIps
    data.createdFirstReservedIpNi = allResults[0].id; 
    console.log(JSON.stringify(allResults, null, 2));

  });

   test('getInstanceNetworkInterfaceReservedIp request example', async () => {
 
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_instance_network_interface_reserved_ip

    const params = {
      instanceId: data.instanceId,
      networkInterfaceId: data.eth2Id,
      id: data.createdFirstReservedIpNi,
    };

    const response = await vpcService.getInstanceNetworkInterfaceIp(params);

    // end-get_instance_network_interface
    expect(response.result).not.toBeNull();

  });

  test('updateInstanceNetworkInterface request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_instance_network_interface

    const params = {
      instanceId: data.instanceId,
      id: data.eth2Id,
      name: 'my-network-interface-updated',
      allowIpSpoofing: true,
    };

    const response = await vpcService.updateInstanceNetworkInterface(params);

    // end-update_instance_network_interface
    expect(response.result).not.toBeNull();

  });

  test('addInstanceNetworkInterfaceFloatingIp request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-add_instance_network_interface_floating_ip

    const params = {
      instanceId: data.instanceId,
      networkInterfaceId: data.eth2Id,
      id: data.floatingIpId,
    };

    const response = await vpcService.addInstanceNetworkInterfaceFloatingIp(params);

    // end-add_instance_network_interface_floating_ip
    expect(response.result).not.toBeNull();

  });

  test('listInstanceNetworkInterfaceFloatingIps request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_instance_network_interface_floating_ips
    const params = {
      instanceId: data.instanceId,
      networkInterfaceId: data.eth2Id,
    };

    const response = await vpcService.listInstanceNetworkInterfaceFloatingIps(params);

    // end-list_instance_network_interface_floating_ips
    expect(response.result).not.toBeNull();

  });

  test('getInstanceNetworkInterfaceFloatingIp request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_instance_network_interface_floating_ip

    const params = {
      instanceId: data.instanceId,
      networkInterfaceId: data.eth2Id,
      id: data.floatingIpId,
    };

    const response = await vpcService.getInstanceNetworkInterfaceFloatingIp(params);

    // end-get_instance_network_interface_floating_ip
    expect(response.result).not.toBeNull();

  });

  test('listInstanceVolumeAttachments request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_instance_volume_attachments

    const params = {
      instanceId: data.instanceId,
    };

    const response = await vpcService.listInstanceVolumeAttachments(params);

    // end-list_instance_volume_attachments
    expect(response.result).not.toBeNull();

  });

  test('createInstanceVolumeAttachment request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_instance_volume_attachment

    const volumeIdentityModel = {
      id: data.volumeId,
    };

    const params = {
      instanceId: data.instanceId,
      volume: volumeIdentityModel,
      name: 'my-instance-volume-attachment',
      deleteVolumeOnInstanceDelete: true,
    };

    const response = await vpcService.createInstanceVolumeAttachment(params);

    // end-create_instance_volume_attachment
    expect(response.result).not.toBeNull();
    data.volumeAttachmentId = response.result.id;

  });

  test('getInstanceVolumeAttachment request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_instance_volume_attachment

    const params = {
      instanceId: data.instanceId,
      id: data.volumeAttachmentId,
    };

    const response = await vpcService.getInstanceVolumeAttachment(params);

    // end-get_instance_volume_attachment
    expect(response.result).not.toBeNull();

  });

  test('updateInstanceVolumeAttachment request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_instance_volume_attachment

    const params = {
      instanceId: data.instanceId,
      id: data.volumeAttachmentId,
      name: 'my-instance-volume-attachment-updated'
    };

    const response = await vpcService.updateInstanceVolumeAttachment(params);

    // end-update_instance_volume_attachment
    expect(response.result).not.toBeNull();

  });

  test('listReservations request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_reservations
    const response = await vpcService.listReservations();
    // end-list_instance_profiles
    expect(response.result).not.toBeNull();
  });

  test('createReservation request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_reservation

    const reservationCapacityModel = {
      total: 10,
    };
    const reservationCommittedUseModel = {
      term: 'one_year',
    };
    const reservationProfileModel = {
      name: 'ba2-2x8',
      resource_type: 'instance_profile',
    };
    const vpcIdentityModel = {
      id: data.vpcId,
    };

    const zoneIdentityModel = {
      name: data.zone,
    };

    const params = {
      capacity: reservationCapacityModel,
      committedUse: reservationCommittedUseModel,
      profile: reservationProfileModel,
      zone: zoneIdentityModel,
      name: "my-reservation",
    };

    const response = await vpcService.createReservation(params);

    // end-create_reservation
    expect(response.result).not.toBeNull();
    data.reservationId = response.result.id;

  });

  test('updateReservation request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_reservation

    const params = {
      id: data.reservationId,
      name: 'my-reservation-updated',
    }
    const response = await vpcService.updateReservation(params);

    // end-update_reservation
    expect(response.result).not.toBeNull();

  });

  test('activateReservation request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-activate_reservation

    const params = {
      id: data.reservationId,
    }
    const response = await vpcService.activateReservation(params);

    // end-activate_reservation
    expect(response.result).not.toBeNull();

  });

  test('getReservation request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_reservation

    const params = {
      id: data.reservationId,
    };

    const response = await vpcService.getReservation(params);

    // end-get_reservation
    expect(response.result).not.toBeNull();

  });

  test('createInstance with reservation request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_instance

    const subnetIdentityModel = {
      id: data.subnetId,
    };

    const networkInterfacePrototypeModel = {
      name: 'my-network-interface',
      subnet: subnetIdentityModel,
    };

    const instanceProfileIdentityModel = {
      name: 'bx2d-2x8',
    };

    const vpcIdentityModel = {
      id: data.vpcId,
    };

    const zoneIdentityModel = {
      name: data.zone,
    };

    const imageIdentityModel = {
      id: data.imageId,
    };

    //reservationIdentityById
    const reservationIdentityModel = {
      id: data.reservationId
    }

    const instanceReservationAffinityPrototypeModel = {
      policy: 'manual',
      pool: [reservationIdentityModel],
    }

    const instancePrototypeModel = {
      name: 'my-instance-with-res',
      reservation_affinity: instanceReservationAffinityPrototypeModel,
      profile: instanceProfileIdentityModel,
      vpc: vpcIdentityModel,
      primary_network_interface: networkInterfacePrototypeModel,
      zone: zoneIdentityModel,
      image: imageIdentityModel,
    };

    const params = {
      instancePrototype: instancePrototypeModel,
    };

    const response = await vpcService.createInstance(params);

    // end-create_instance
    expect(response.result).not.toBeNull();
    data.instanceIdWithReservation = response.result.id;

  });

  test.skip('deleteReservation request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_reservation

    const params = {
      id: data.reservationId,
    };

    //NOTE: A reservation cannot be deleted unless it is expired or failed

    const response = await vpcService.deleteReservation(params);

    // end-delete_reservation
    expect(response.result).not.toBeNull();

  });

  test('updateInstance with reservation request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_instance

    //reservationIdentityById
    const reservationIdentityModel = {
      id: data.reservationId
    }

    const instanceReservationAffinityPatchModel = {
      policy: 'manual',
      pool: [reservationIdentityModel],
    }

    const params = {
      id: data.instanceId,
      name: 'my-instance-updated',
      reservationAffinity: instanceReservationAffinityPatchModel,
    };

    const response = await vpcService.updateInstance(params);

    // end-update_instance
    expect(response.result).not.toBeNull();

  });
  
  test('listBackupPolicies request example', async () => {
 
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_backup_policies

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.BackupPoliciesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_backup_policies
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createBackupPolicy request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_backup_policy
    const backupPolicyPrototype = {
      match_resource_type: `volume`,
      matchUserTags: ["tag1", "tag2"],
      name: 'my-backup-policy',
    }
    const params = {
      backupPolicyPrototype: backupPolicyPrototype,
    };

    const response = await vpcService.createBackupPolicy(params);

    // end-create_backup_policy
    expect(response.result).not.toBeNull();
    data.backupPolicyId = response.result.id;

  });

  test('getBackupPolicy request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_backup_policy

    const params = {
      id: data.backupPolicyId,
    };

    const response = await vpcService.getBackupPolicy(params);

    // end-get_backup_policy
    expect(response.result).not.toBeNull();

  });

  test('updateBackupPolicy request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-backup_policy

    const params = {
      id: data.backupPolicyId,
      name: 'my-backup-policy-updated',
    };

    const response = await vpcService.updateBackupPolicy(params);

    // end-backup_policy
    expect(response.result).not.toBeNull();

  });

  test('listBackupPolicyPlans request example', async () => {
 
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_backup_policy_plans

    const params = {
      backupPolicyId: data.backupPolicyId,
    };

    const response = await vpcService.listBackupPolicyPlans (params);

    // end-list_backup_policies
    expect(response.result).not.toBeNull();

  });

  test('createBackupPolicyPlan request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_backup_policy_plan

    const BackupPolicyPlanDeletionTriggerPrototype = {
      delete_after: 20,
      delete_over_count: 20, 
    };

    // ZoneIdentityByName
    const zoneIdentityModel = {
      name: data.zone,
    };
    const SnapshotClonePrototype = {
      zone:zoneIdentityModel,
    }

    const BackupPolicyPlanRemoteRegionPolicyPrototype = {
      delete_over_count: 2,
      region: "us-south",
    }
    const params = {
      backupPolicyId: data.backupPolicyId,
      name: 'my-backup-policy-plan',
      cronSpec: '40 3 * * *',
      deletionTrigger: BackupPolicyPlanDeletionTriggerPrototype,
      clonePolicy: [SnapshotClonePrototype],
      remoteRegionPolicies:[BackupPolicyPlanRemoteRegionPolicyPrototype],
    };

    const response = await vpcService.createBackupPolicyPlan(params);

    // end-create_backup_policy_plan
    expect(response.result).not.toBeNull();
    data.backupPolicyPlanId = response.result.id;

  });

  test('getBackupPolicyPlan request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_backup_policy

    const params = {
      backupPolicyId: data.backupPolicyId,
      id: data.backupPolicyPlanId,
    };

    const response = await vpcService.getBackupPolicyPlan(params);

    // end-get_backup_policy
    expect(response.result).not.toBeNull();

  });
  test.skip('listBackupPolicyJobs request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_backup_policy_jobs

    const params = {
      backupPolicyId: data.backupPolicyId,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.BackupPolicyJobsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_backup_policy_jobs
    console.log(JSON.stringify(allResults, null, 2));
    data.backupPolicyJobId = allResults[0].id;

  });

  test.skip('getBackupPolicyJob request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_backup_policy_job

    const params = {
      backupPolicyId: data.backupPolicyId,
      id: data.backupPolicyJobId,
    };

    const response = await vpcService.getBackupPolicyJob(params);

    // end-get_backup_policy_job
    expect(response.result).not.toBeNull();

  });
  test('updateBackupPolicyPlan request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-backup_policy
    const BackupPolicyPlanRemoteRegionPolicyPrototype = {
      delete_over_count: 4,
      region: "jp-tok",
    }

    const params = {
      backupPolicyId: data.backupPolicyId,
      id: data.backupPolicyPlanId,
      name: 'my-backup-policy-plan-updated',
      remoteRegionPolicies: BackupPolicyPlanRemoteRegionPolicyPrototype
    };

    const response = await vpcService.updateBackupPolicyPlan(params);

    // end-backup_policy
    expect(response.result).not.toBeNull();

  });

  test('listInstanceGroups request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_instance_groups

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.InstanceGroupsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_instance_groups
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createInstanceGroup request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_instance_group

    const params = {
      instanceTemplate: {
        id: data.instanceTemplateId,
      },
      subnets: [{
        id: data.subnetId,
      }],
      name: 'my-instance-group',
    };

    const response = await vpcService.createInstanceGroup(params);

    // end-create_instance_group
    expect(response.result).not.toBeNull();
    data.instanceGroupId = response.result.id;

  });

  test('getInstanceGroup request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_instance_group

    const params = {
      id: data.instanceGroupId,
    };

    const response = await vpcService.getInstanceGroup(params);

    // end-get_instance_group
    expect(response.result).not.toBeNull();

  });

  test('updateInstanceGroup request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_instance_group

    const params = {
      id: data.instanceGroupId,
      name: 'my-instance-group-updated',
      instanceTemplate: {
        id: data.instanceTemplateId,
      },
      membershipCount: 5,
      subnets: [{
        id: data.subnetId,
      }],
    };

    const response = await vpcService.updateInstanceGroup(params);
    // end-update_instance_group
    expect(response.result).not.toBeNull();

  });

  test('listInstanceGroupManagers request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_instance_group_managers

    const params = {
      instanceGroupId: data.instanceGroupId,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.InstanceGroupManagersPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_instance_group_managers
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createInstanceGroupManager request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_instance_group_manager

    const instanceGroupManagerPrototypeModel = {
      name: 'my-instance-group-manager',
      management_enabled: true,
      max_membership_count: 5,
      manager_type: 'autoscale',
    };

    const params = {
      instanceGroupId: data.instanceGroupId,
      instanceGroupManagerPrototype: instanceGroupManagerPrototypeModel,
    };

    const response = await vpcService.createInstanceGroupManager(params);

    // end-create_instance_group_manager
    expect(response.result).not.toBeNull();
    data.instanceGroupManagerId = response.result.id;

  });

  test('getInstanceGroupManager request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_instance_group_manager

    const params = {
      instanceGroupId: data.instanceGroupId,
      id: data.instanceGroupManagerId,
    };

    const response = await vpcService.getInstanceGroupManager(params);

    // end-get_instance_group_manager
    expect(response.result).not.toBeNull();

  });

  test('updateInstanceGroupManager request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_instance_group_manager

    const params = {
      instanceGroupId: data.instanceGroupId,
      id: data.instanceGroupManagerId,
      name: 'my-instance-group-manager-updated',
    };

    const response = await vpcService.updateInstanceGroupManager(params);

    // end-update_instance_group_manager
    expect(response.result).not.toBeNull();

  });

  test('listInstanceGroupManagerActions request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_instance_group_manager_actions

    const params = {
      instanceGroupId: data.instanceGroupId,
      instanceGroupManagerId: data.instanceGroupManagerId,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.InstanceGroupManagerActionsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_instance_group_manager_actions
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createInstanceGroupManagerAction request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_instance_group_manager_action

    const instanceGroupManagerScheduledActionGroupPrototypeModel = {
      membership_count: 5,
    };
    const instanceGroupManagerActionPrototypeModel = {
      name: 'my-instance-group-manager-action',
      cronSpec: '*/5 1,2,3 * * *',
      group: instanceGroupManagerScheduledActionGroupPrototypeModel,
    };
    const params = {
      instanceGroupId: data.instanceGroupId,
      instanceGroupManagerId: data.instanceGroupManagerId,
      instanceGroupManagerActionPrototype: instanceGroupManagerActionPrototypeModel,
    };
    const response = await vpcService.createInstanceGroupManagerAction(params);

    // end-create_instance_group_manager_action
    expect(response.result).not.toBeNull();
    data.instanceGroupManagerActionId = response.result.id

  });

  test('getInstanceGroupManagerAction request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_instance_group_manager_action

    const params = {
      instanceGroupId: data.instanceGroupId,
      instanceGroupManagerId: data.instanceGroupManagerId,
      id: data.instanceGroupManagerActionId,
    };

    const response = await vpcService.getInstanceGroupManagerAction(params);

    // end-get_instance_group_manager_action
    expect(response.result).not.toBeNull();

  });

  test('updateInstanceGroupManagerAction request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_instance_group_manager_action

    const instanceGroupManagerScheduledActionByManagerPatchManagerModel = {
      max_membership_count: 10,
      min_membership_count: 5,
    };
    const params = {
      instanceGroupId: data.instanceGroupId,
      instanceGroupManagerId: data.instanceGroupManagerId,
      id: data.instanceGroupManagerActionId,
      name: 'my-instance-group-manager-action-updated',
      manager: instanceGroupManagerScheduledActionByManagerPatchManagerModel,
      cronSpec: '*/5 1,2,3 * * *',
    };
    const response = await vpcService.updateInstanceGroupManagerAction(params);

    // end-update_instance_group_manager_action
    expect(response.result).not.toBeNull();

  });

  test('listInstanceGroupManagerPolicies request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_instance_group_manager_policies

    const params = {
      instanceGroupId: data.instanceGroupId,
      instanceGroupManagerId: data.instanceGroupManagerId,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.InstanceGroupManagerPoliciesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_instance_group_manager_policies
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createInstanceGroupManagerPolicy request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });
    // begin-create_instance_group_manager_policy

    const params = {
      instanceGroupId: data.instanceGroupId,
      instanceGroupManagerId: data.instanceGroupManagerId,
      instanceGroupManagerPolicyPrototype: {
        metric_type: 'cpu',
        metric_value: 20,
        policy_type: 'target',
        name: 'my-instance-group-manager-policy',
      },
    };

    const response = await vpcService.createInstanceGroupManagerPolicy(params);
    // end-create_instance_group_manager_policy
    expect(response.result).not.toBeNull();

    //data.instanceGroupManagerPolicy = response.result;
    data.instanceGroupManagerPolicyId = response.result.id;

  });

  test('getInstanceGroupManagerPolicy request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });
    // begin-get_instance_group_manager_policy

    const params = {
      instanceGroupId: data.instanceGroupId,
      instanceGroupManagerId: data.instanceGroupManagerId,
      id: data.instanceGroupManagerPolicyId,
    };

    const response = await vpcService.getInstanceGroupManagerPolicy(params);

    // end-get_instance_group_manager_policy
    expect(response.result).not.toBeNull();

  });

  test('updateInstanceGroupManagerPolicy request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });
    // begin-update_instance_group_manager_policy

    const params = {
      instanceGroupId: data.instanceGroupId,
      instanceGroupManagerId: data.instanceGroupManagerId,
      id: data.instanceGroupManagerPolicyId,
      metricType: 'cpu',
      metricValue: 70,
      name: 'my-instance-group-manager-policy-updated',
    };

    const response = await vpcService.updateInstanceGroupManagerPolicy(params);

    // end-update_instance_group_manager_policy
    expect(response.result).not.toBeNull();

  });

  test('listInstanceGroupMemberships request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });
    // begin-list_instance_group_memberships

    const params = {
      instanceGroupId: data.instanceGroupId,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.InstanceGroupMembershipsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_instance_group_memberships
    data.instanceGroupMembershipId = allResults[0].id;
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('getInstanceGroupMembership request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });
    // begin-get_instance_group_membership

    const params = {
      instanceGroupId: data.instanceGroupId,
      id: data.instanceGroupMembershipId,
    };

    const response = await vpcService.getInstanceGroupMembership(params);

    // end-get_instance_group_membership
    expect(response.result).not.toBeNull();

  });

  test('updateInstanceGroupMembership request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });
    // begin-update_instance_group_membership

    const params = {
      instanceGroupId: data.instanceGroupId,
      id: data.instanceGroupMembershipId,
      name: 'my-instance-group-membership-updated',
    };

    const response = await vpcService.updateInstanceGroupMembership(params);

    // end-update_instance_group_membership
    expect(response.result).not.toBeNull();

  });

  test('listDedicatedHostGroups request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_dedicated_host_groups
    const params = {
      limit: 10,
    }
    const allResults = [];
    try {
      const pager = new VpcV1.DedicatedHostGroupsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    
    // end-list_dedicated_host_groups
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createDedicatedHostGroup request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_dedicated_host_group

    const params = {
      _class: 'mx2',
      family: 'balanced',
      name: 'my-dedicated-host-group',
      zone: { name: data.zone },
    };
    const response = await vpcService.createDedicatedHostGroup(params);

    // end-create_dedicated_host_group
    expect(response.result).not.toBeNull();
    data.dedicatedHostGroupId = response.result.id;

  });

  test('getDedicatedHostGroup request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_dedicated_host_group

    const params = {
      id: data.dedicatedHostGroupId,
    };

    const response = await vpcService.getDedicatedHostGroup(params);

    // end-get_dedicated_host_group
    expect(response.result).not.toBeNull();

  });

  test('updateDedicatedHostGroup request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_dedicated_host_group

    const params = {
      id: data.dedicatedHostGroupId,
      name: 'my-dedicated-host-group-updated',
    };

    const response = await vpcService.updateDedicatedHostGroup(params);

    // end-update_dedicated_host_group
    expect(response.result).not.toBeNull();

  });

  test('listDedicatedHostProfiles request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_dedicated_host_profiles

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.DedicatedHostProfilesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_dedicated_host_profiles
    data.dhProfile = allResults[0].name;
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('getDedicatedHostProfile request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_dedicated_host_profile

    const params = {
      name: data.dhProfile,
    };

    const response = await vpcService.getDedicatedHostProfile(params);

    // end-get_dedicated_host_profile
    expect(response.result).not.toBeNull();

  });

  test('listDedicatedHosts request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_dedicated_hosts
    const params = {
      limit: 10,
    }
    const allResults = [];
    try {
      const pager = new VpcV1.DedicatedHostsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_dedicated_hosts
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createDedicatedHost request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_dedicated_host

    const params = {
      dedicatedHostPrototype: {
        profile: { name: data.dhProfile },
        group: { id: data.dedicatedHostGroupId },
        name: 'my-dedicated-host',
      },
    };
    const response = await vpcService.createDedicatedHost(params);

    // end-create_dedicated_host
    expect(response.result).not.toBeNull();
    data.dedicatedHostId = response.result.id;

  });

  test('getDedicatedHost request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_dedicated_host

    const params = {
      id: data.dedicatedHostId,
    };

    const response = await vpcService.getDedicatedHost(params);

    // end-get_dedicated_host
    expect(response.result).not.toBeNull();

  });

  test.skip('listDedicatedHostDisks request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_dedicated_host_disks
    const listDedicatedHosts = await vpcService.listDedicatedHosts();
    for (let i = 0; i < listDedicatedHosts.result.dedicated_hosts.length; i++) {
      if (listDedicatedHosts.result.dedicated_hosts[i].disks.length > 0) {
        data.dhId = listDedicatedHosts.result.dedicated_hosts[i].id;
        break;
      }
    }
    const params = {
      dedicatedHostId: data.dhId,
    };

    const response = await vpcService.listDedicatedHostDisks(params)

    // end-list_dedicated_host_disks
    expect(response.result).not.toBeNull();
    data.diskId = response.result.disks[0].id;

  });

  test.skip('getDedicatedHostDisk request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_dedicated_host_disk

    const params = {
      dedicatedHostId: data.dhId,
      id: data.diskId,
    };

    const response = await vpcService.getDedicatedHostDisk(params)

    // end-get_dedicated_host_disk
    expect(response.result).not.toBeNull();

  });

  test.skip('updateDedicatedHostDisk request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_dedicated_host_disk

    const params = {
      dedicatedHostId: data.dhId,
      id: data.diskId,
      name: 'my-disk-updated',
    };

    const response = await vpcService.updateDedicatedHostDisk(params)

    // end-update_dedicated_host_disk
    expect(response.result).not.toBeNull();

  });

  test('updateDedicatedHost request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_dedicated_host

    const params = {
      id: data.dedicatedHostId,
      name: 'my-dedicated-host-updated',
      instancePlacementEnabled: false,
    };

    const response = await vpcService.updateDedicatedHost(params);

    // end-update_dedicated_host
    expect(response.result).not.toBeNull();

  });

  test('createSnapshot request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });
    // ZoneIdentityByName
    const zoneIdentityModel = {
      name: data.zone,
    };
    const SnapshotClonePrototype = {
      zone:zoneIdentityModel,
    }
    const params1 = {
      snapshotPrototype: {
        source_volume: {
          id: data.volumeId,
        },
        name: 'my-snapshot-one',
        clones: [SnapshotClonePrototype],
      }
    };

    const secondSnapshot = await vpcService.createSnapshot(params1);

    // begin-create_snapshot

    const params = {
      snapshotPrototype: {
        source_volume: {
          id: data.volumeId,
        },
        name: 'my-snapshot',
      }
    }

    const response = await vpcService.createSnapshot(params);

    // end-create_snapshot
    expect(response.result).not.toBeNull();
    data.snapshotId = response.result.id;
    data.snapshotIdCrn = response.result.crn;


    // source snapshot
    const paramsSrcSnap = {
      snapshotPrototype: {
        source_snapshot: {
          crn: data.snapshotIdCrn,
        },
        name: 'my-snapshot-crc',
      }
    };
    
    const sourceSnapshotResponse =  vpcService.createSnapshot(paramsSrcSnap);
    expect(sourceSnapshotResponse.result).not.toBeNull();
  });

  test('listSnapshots request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_snapshots
    const params = {
      limit: 10,
    }
    const allResults = [];
    try {
      const pager = new VpcV1.SnapshotsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_snapshots
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('getSnapshot request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_snapshot

    const params = {
      id: data.snapshotId,
    };

    const response = await vpcService.getSnapshot(params);

    // end-get_snapshot
    expect(response.result).not.toBeNull();

  });

  test('updateSnapshot request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_snapshot

    const params = {
      id: data.snapshotId,
      name: 'my-snapshot-updated',
    };

    const response = await vpcService.updateSnapshot(params);

    // end-update_snapshot
    expect(response.result).not.toBeNull();

  });
  test('createSnapshotClones request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    const params = {
      id: data.snapshotId,
      zoneName: data.zone,
    };

    const response = vpcService.createSnapshotClone(params);


    // end-create_snapshot
    expect(response.result).not.toBeNull();

  });

  test('listSnapshotClones request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_snapshot_clones

    const params = {
      id: data.snapshotId,
    };

    const response = vpcService.listSnapshotClones(params);

    // end-list_snapshots
    expect(response.result).not.toBeNull();

  });

  test('getSnapshotClones request example', async () => {  

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_snapshot_clone

    const params = {
      id: data.snapshotId,
      zoneName: data.zone,
    };

    const response = vpcService.getSnapshotClone(params);

    // end-get_snapshot_clone
    expect(response.result).not.toBeNull();

  });


  test('listShareProfiles request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listShareProfiles() result:');
    // begin-list_share_profiles

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.ShareProfilesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    
    // end-list_share_profiles
    console.log(JSON.stringify(allResults, null, 2));
    data.shareProfileName = allResults[0].name;
  });

  test('getShareProfile request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getShareProfile() result:');
    // begin-get_share_profile

    const params = {
      name: data.shareProfileName,
    };

    let res;
    try {
      res = await vpcService.getShareProfile(params);
    } catch (err) {
      console.warn(err);
    }
    
    // end-get_share_profile
    console.log(JSON.stringify(res.result, null, 2));
  });

  test('listShares request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listShares() result:');
    // begin-list_shares

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.SharesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_shares
  });

  test('createShare request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createShare() result:');
    // begin-create_share

    // Request models needed by this operation.

    // ShareProfileIdentityByName
    const shareProfileIdentityModel = {
      name: data.shareProfileName,
    };

    // ZoneIdentityByName
    const zoneIdentityModel = {
      name: 'us-east-1',
    };

    // SharePrototypeShareBySize
    const sharePrototypeModel = {
      profile: shareProfileIdentityModel,
      zone: zoneIdentityModel,
      size: 200,
      name: 'my-share',
    };

    const params = {
      sharePrototype: sharePrototypeModel,
    };

    let res;
    try {
      res = await vpcService.createShare(params);
      data.shareId = res.result.id;
      data.shareCRN = res.result.crn;
    } catch (err) {
      console.warn(err);
    }

    // share replica
    const shareIdentity = {
      id: data.shareId,
    }
    const shareReplicaPrototypeModel = {
      profile: shareProfileIdentityModel,
      zone: zoneIdentityModel,
      source_share: shareIdentity,
      replication_cron_spec: '0 */5 * * *',
      name: 'my-replica-share',
    };

    const replicaParams = {
      sharePrototype: shareReplicaPrototypeModel,
    };

    let replicaRes;
    try {
      replicaRes = await vpcService.createShare(replicaParams);
      data.shareReplicaId = replicaRes.result.id;
    } catch (err) {
      console.warn(err);
    }

    // end-create_share
  });


  test('createAccessorShare request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createShare() result:');
    // begin-create_share

    // Request models needed by this operation.

    // ShareIdentityModel
    const shareIdentityModel = {
      crn: data.shareCRN,
    };

    // SharePrototypeShareByOriginShare
    const sharePrototypeModel = {
      origin_share: shareIdentityModel,
      name: 'my-accessor-share',
    };

    const params = {
      sharePrototype: sharePrototypeModel,
    };

    let res;
    try {
      res = await vpcService.createShare(params);
      data.shareAccessorId = res.result.id;
    } catch (err) {
      console.warn(err);
    }
    // end-create_share
  });

  test('getShare request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getShare() result:');
    // begin-get_share

    const params = {
      id: data.shareId,
    };

    let res;
    try {
      res = await vpcService.getShare(params);
    } catch (err) {
      console.warn(err);
    }

    // end-get_share
  });

  test('updateShare request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateShare() result:');
    // begin-update_share

    const params = {
      id: data.shareId,
      name: 'my-share-updated',
      ifMatch: 'W/"96d225c4-56bd-43d9-98fc-d7148e5c5028"',
    };

    let res;
    try {
      res = await vpcService.updateShare(params);
    } catch (err) {
      console.warn(err);
    }

    // end-update_share
  });

  test('listShareAccessorBindings request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listShareAccessorBindings() result:');
    // begin-list_shares_accessor_bindings

    const params = {
      id: data.shareId,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.ShareAccessorBindingsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      data.shareAccessorBindingId = allResults[0].id;
    } catch (err) {
      console.warn(err);
    }

    // end-list_shares_accessor_bindings
  });

  test('getShareAccessorBinding request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getShareAccessorBinding() result:');
    // begin-get_share-accessor-bindings

    const params = {
      id: data.shareAccessorBindingId,
      shareId: data.shareId,
    };

    let res;
    try {
      res = await vpcService.getShareAccessorBinding(params);
    } catch (err) {
      console.warn(err);
    }

    // end-get_share-accessor-bindings
  });

  test('deleteShareAccessorBinding request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteShareAccessorBinding() result:');
    // begin-delete_share_accessor_binding

    const params = {
      shareId: data.shareId,
      id: data.shareAccessorBindingId,
    };

    let res;
    try {
      res = await vpcService.deleteShareAccessorBinding(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_share_accessor_binding
  });

  test('failoverShare request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-failover_share

    const params = {
      shareId: data.shareReplicaId,
    };

    try {
      await vpcService.failoverShare(params);
    } catch (err) {
      console.warn(err);
    }

    // end-failover_share
  });

  test('listShareMountTargets request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listShareMountTargets() result:');
    // begin-list_share_mount_targets

    const params = {
      shareId: data.shareId,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.ShareMountTargetsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_share_mount_targets
  });

  test('createShareMountTarget request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createShareMountTarget() result:');
    // begin-create_share_mount_target

    // Request models needed by this operation.

    // ShareMountTargetVirtualNetworkInterfacePrototypeVirtualNetworkInterfacePrototypeShareMountTargetContext
    const subnetIdentityModel = {
      id: data.subnetId,
    };

    const shareMountTargetVirtualNetworkInterfacePrototypeModel = {
      name: 'my-share-mount-target-vni',
      subnet: subnetIdentityModel,
    };

    // ShareMountTargetPrototypeShareMountTargetByAccessControlModeSecurityGroup
    const shareMountTargetPrototypeModel = {
      virtual_network_interface: shareMountTargetVirtualNetworkInterfacePrototypeModel,
    };

    const params = {
      shareId: data.shareId,
      shareMountTargetPrototype: shareMountTargetPrototypeModel,
    };

    let res;
    try {
      res = await vpcService.createShareMountTarget(params);
      data.shareMountTargetId = res.result.id
    } catch (err) {
      console.warn(err);
    }

    // end-create_share_mount_target
  });

  test('getShareMountTarget request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getShareMountTarget() result:');
    // begin-get_share_mount_target

    const params = {
      id: data.shareMountTargetId,
      shareId: data.shareId,
    };

    let res;
    try {
      res = await vpcService.getShareMountTarget(params);
    } catch (err) {
      console.warn(err);
    }

    // end-get_share_mount_target
  });

  test('updateShareMountTarget request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateShareMountTarget() result:');
    // begin-update_share_mount_target

    const params = {
      shareId: data.shareId,
      id: data.shareMountTargetId,
    };

    let res;
    try {
      res = await vpcService.updateShareMountTarget(params);
    } catch (err) {
      console.warn(err);
    }

    // end-update_share_mount_target
  });

  test.skip('getShareSource request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getShareSource() result:');
    // begin-get_share_source

    const params = {
      shareId: data.shareId,
    };

    let res;
    try {
      res = await vpcService.getShareSource(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_share_source
  });

  test('listRegions request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_regions

    const response = await vpcService.listRegions()

    // end-list_regions
    expect(response.result).not.toBeNull();

  });

  test('getRegion request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_region

    const params = {
      name: 'us-east',
    };

    const response = vpcService.getRegion(params);

    // end-get_region
    expect(response.result).not.toBeNull();

  });

  test('listRegionZones request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_region_zones

    const params = {
      regionName: 'us-east',
    };

    const response = await vpcService.listRegionZones(params);

    // end-list_region_zones
    expect(response.result).not.toBeNull();

  });

  test('getRegionZone request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_region_zone

    const params = {
      regionName: 'us-east',
      name: 'us-east-1',
    };

    const response = await vpcService.getRegionZone(params);

    // end-get_region_zone
    expect(response.result).not.toBeNull();

  });


  test('listClusterNetworkProfiles request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listClusterNetworkProfiles() result:');
    // begin-list_cluster_network_profiles

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.ClusterNetworkProfilesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }
    data.clusterNetworkProfileName = allResults[0].name;
    // end-list_cluster_network_profiles
  });

  test('getClusterNetworkProfile request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getClusterNetworkProfile() result:');
    // begin-get_cluster_network_profile

    const params = {
      name: data.clusterNetworkProfileName,
    };

    let res;
    try {
      res = await vpcService.getClusterNetworkProfile(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_cluster_network_profile
  });

  test('listClusterNetworks request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listClusterNetworks() result:');
    // begin-list_cluster_networks

    const params = {
      limit: 10,
      sort: 'name',
      vpcId: data.vpcId,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.ClusterNetworksPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_cluster_networks
  });

  test('createClusterNetwork request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createClusterNetwork() result:');
    // begin-create_cluster_network

    // Request models needed by this operation.

    // ClusterNetworkProfileIdentityByName
    const clusterNetworkProfileIdentityModel = {
      name: data.clusterNetworkProfileName,
    };

    // VPCIdentityById
    const vpcIdentityModel = {
      id: data.vpcId,
    };

    // ZoneIdentityByName
    const zoneIdentityModel = {
      name: data.zone,
    };

    const params = {
      profile: clusterNetworkProfileIdentityModel,
      vpc: vpcIdentityModel,
      zone: zoneIdentityModel,
    };

    let res;
    try {
      res = await vpcService.createClusterNetwork(params);
      data.clusterNetworkId = res.result.id;
    } catch (err) {
      console.warn(err);
    }

    // end-create_cluster_network
  });

  test('listClusterNetworkInterfaces request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listClusterNetworkInterfaces() result:');
    // begin-list_cluster_network_interfaces

    const params = {
      clusterNetworkId: data.clusterNetworkId,
      limit: 10,
      name: 'my-name',
      sort: 'name',
    };

    const allResults = [];
    try {
      const pager = new VpcV1.ClusterNetworkInterfacesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_cluster_network_interfaces
  });

  test('createClusterNetworkInterface request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createClusterNetworkInterface() result:');
    // begin-create_cluster_network_interface

    const params = {
      clusterNetworkId: data.clusterNetworkId,
    };

    let res;
    try {
      res = await vpcService.createClusterNetworkInterface(params);
      data.clusterNetworkInterfaceId = res.result.id;
    } catch (err) {
      console.warn(err);
    }

    // end-create_cluster_network_interface
  });

  test('getClusterNetworkInterface request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getClusterNetworkInterface() result:');
    // begin-get_cluster_network_interface

    const params = {
      clusterNetworkId: data.clusterNetworkId,
      id: data.clusterNetworkInterfaceId,
    };

    let res;
    try {
      res = await vpcService.getClusterNetworkInterface(params);
    } catch (err) {
      console.warn(err);
    }

    // end-get_cluster_network_interface
  });

  test('updateClusterNetworkInterface request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateClusterNetworkInterface() result:');
    // begin-update_cluster_network_interface

    const params = {
      clusterNetworkId: data.clusterNetworkId,
      id: data.clusterNetworkInterfaceId,
      name: 'my-cluster-network-interface-updated',
      ifMatch: 'W/"96d225c4-56bd-43d9-98fc-d7148e5c5028"',
    };

    let res;
    try {
      res = await vpcService.updateClusterNetworkInterface(params);
    } catch (err) {
      console.warn(err);
    }

    // end-update_cluster_network_interface
  });

  test('listClusterNetworkSubnets request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listClusterNetworkSubnets() result:');
    // begin-list_cluster_network_subnets

    const params = {
      clusterNetworkId: data.clusterNetworkId,
      limit: 10,
      name: 'my-name',
      sort: 'name',
    };

    const allResults = [];
    try {
      const pager = new VpcV1.ClusterNetworkSubnetsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_cluster_network_subnets
  });

  test('createClusterNetworkSubnet request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createClusterNetworkSubnet() result:');
    // begin-create_cluster_network_subnet

    // Request models needed by this operation.

    // ClusterNetworkSubnetPrototypeClusterNetworkSubnetByTotalCountPrototype
    const clusterNetworkSubnetPrototypeModel = {
      total_ipv4_address_count: 256,
    };

    const params = {
      clusterNetworkId: data.clusterNetworkId,
      clusterNetworkSubnetPrototype: clusterNetworkSubnetPrototypeModel,
    };

    let res;
    try {
      res = await vpcService.createClusterNetworkSubnet(params);
      data.clusterNetworkSubnetId = res.result.id;
    } catch (err) {
      console.warn(err);
    }

    // end-create_cluster_network_subnet
  });

  test('listClusterNetworkSubnetReservedIps request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listClusterNetworkSubnetReservedIps() result:');
    // begin-list_cluster_network_subnet_reserved_ips

    const params = {
      clusterNetworkId: data.clusterNetworkId,
      clusterNetworkSubnetId: data.clusterNetworkSubnetId,
      limit: 10,
      name: 'my-name',
      sort: 'name',
    };

    const allResults = [];
    try {
      const pager = new VpcV1.ClusterNetworkSubnetReservedIpsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_cluster_network_subnet_reserved_ips
  });

  test('createClusterNetworkSubnetReservedIp request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createClusterNetworkSubnetReservedIp() result:');
    // begin-create_cluster_network_subnet_reserved_ip

    const params = {
      clusterNetworkId: data.clusterNetworkId,
      clusterNetworkSubnetId: data.clusterNetworkSubnetId,
    };

    let res;
    try {
      res = await vpcService.createClusterNetworkSubnetReservedIp(params);
    } catch (err) {
      console.warn(err);
    }
    data.clusterNetworkSubnetReservedIpId = res.result.id;
    // end-create_cluster_network_subnet_reserved_ip
  });

  test('getClusterNetworkSubnetReservedIp request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getClusterNetworkSubnetReservedIp() result:');
    // begin-get_cluster_network_subnet_reserved_ip

    const params = {
      clusterNetworkId: data.clusterNetworkId,
      clusterNetworkSubnetId: data.clusterNetworkSubnetId,
      id: data.clusterNetworkSubnetReservedIpId,
    };

    let res;
    try {
      res = await vpcService.getClusterNetworkSubnetReservedIp(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_cluster_network_subnet_reserved_ip
  });

  test('updateClusterNetworkSubnetReservedIp request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateClusterNetworkSubnetReservedIp() result:');
    // begin-update_cluster_network_subnet_reserved_ip

    const params = {
      clusterNetworkId: data.clusterNetworkId,
      clusterNetworkSubnetId: data.clusterNetworkSubnetId,
      id: data.clusterNetworkSubnetReservedIpId,
      name: 'my-cluster-network-subnet-reserved-ip-updated',
      ifMatch: 'W/"96d225c4-56bd-43d9-98fc-d7148e5c5028"',
    };

    let res;
    try {
      res = await vpcService.updateClusterNetworkSubnetReservedIp(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_cluster_network_subnet_reserved_ip
  });

  test('getClusterNetworkSubnet request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getClusterNetworkSubnet() result:');
    // begin-get_cluster_network_subnet

    const params = {
      clusterNetworkId: data.clusterNetworkId,
      id: data.clusterNetworkSubnetId,
    };

    let res;
    try {
      res = await vpcService.getClusterNetworkSubnet(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_cluster_network_subnet
  });

  test('updateClusterNetworkSubnet request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateClusterNetworkSubnet() result:');
    // begin-update_cluster_network_subnet

    const params = {
      clusterNetworkId: data.clusterNetworkId,
      id: data.clusterNetworkSubnetId,
      name: 'my-cluster-network-subnet-updated',
      ifMatch: 'W/"96d225c4-56bd-43d9-98fc-d7148e5c5028"',
    };

    let res;
    try {
      res = await vpcService.updateClusterNetworkSubnet(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_cluster_network_subnet
  });

  test('getClusterNetwork request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getClusterNetwork() result:');
    // begin-get_cluster_network

    const params = {
      id: data.clusterNetworkId,
    };

    let res;
    try {
      res = await vpcService.getClusterNetwork(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_cluster_network
  });

  test('updateClusterNetwork request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateClusterNetwork() result:');
    // begin-update_cluster_network

    const params = {
      id: data.clusterNetworkId,
      name: 'my-cluster-network-updated',
      ifMatch: 'W/"96d225c4-56bd-43d9-98fc-d7148e5c5028"',
    };

    let res;
    try {
      res = await vpcService.updateClusterNetwork(params);
    } catch (err) {
      console.warn(err);
    }

    // end-update_cluster_network
  });


  test('listPublicGateways request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_public_gateways

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.PublicGatewaysPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_public_gateways
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createPublicGateway request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_public_gateway

    const params = {
      vpc: { id: data.vpcId },
      zone: { name: data.zone },
      name: 'my-public-gateway',
    };

    const response = await vpcService.createPublicGateway(params);

    // end-create_public_gateway
    expect(response.result).not.toBeNull();
    data.publicGatewayId = response.result.id;

  });

  test('getPublicGateway request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_public_gateway

    const params = {
      id: data.publicGatewayId,
    };

    const response = await vpcService.getPublicGateway(params);

    // end-get_public_gateway
    expect(response.result).not.toBeNull();

  });

  test('updatePublicGateway request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_public_gateway

    const params = {
      id: data.publicGatewayId,
      name: 'my-public-gateway-updated',
    };

    const response = await vpcService.updatePublicGateway(params);

    // end-update_public_gateway
    expect(response.result).not.toBeNull();

  });

  test('listNetworkAcls request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_network_acls

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.NetworkAclsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_network_acls
    console.log(JSON.stringify(allResults, null, 2));
  });

  test('createNetworkAcl request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_network_acl

    const networkAclRulePrototypeNetworkAclContextModel = {
      name: 'my-network-acl-rule',
      action: 'allow',
      destination: '192.168.3.2/32',
      direction: 'inbound',
      source: '192.168.3.2/32',
      protocol: 'tcp',
    };

    const networkAclPrototypeModel = {
      name: 'my-network-acl',
      vpc: {
        id: data.vpcId,
      },
      rules: [networkAclRulePrototypeNetworkAclContextModel],
    };

    const params = {
      networkAclPrototype: networkAclPrototypeModel,
    };
    const response = await vpcService.createNetworkAcl(params);

    // end-create_network_acl
    expect(response.result).not.toBeNull();
    data.networkACLId = response.result.id;

  });

  test('getNetworkAcl request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_network_acl

    const params = {
      id: data.networkACLId,
    };

    const response = await vpcService.getNetworkAcl(params);

    // end-get_network_acl
    expect(response.result).not.toBeNull();

  });

  test('updateNetworkAcl request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_network_acl

    const params = {
      id: data.networkACLId,
      name: 'my-network-acl-updated',
    };

    const response = await vpcService.updateNetworkAcl(params);

    // end-update_network_acl
    expect(response.result).not.toBeNull();

  });

  test('listNetworkAclRules request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_network_acl_rules

    const params = {
      networkAclId: data.networkACLId,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.NetworkAclRulesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_network_acl_rules
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createNetworkAclRule request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_network_acl_rule

    const networkAclRulePrototypeModel = {
      name: 'my-network-acl-rule',
      action: 'allow',
      destination: '192.168.3.2/32',
      direction: 'inbound',
      source: '192.168.3.2/32',
      protocol: 'all',
      code: 0,
      type: 8,
    };

    const params = {
      networkAclId: data.networkACLId,
      networkAclRulePrototype: networkAclRulePrototypeModel,
    };

    const response = await vpcService.createNetworkAclRule(params);

    // end-create_network_acl_rule
    expect(response.result).not.toBeNull();
    data.networkACLRuleId = response.result.id;

  });

  test('getNetworkAclRule request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_network_acl_rule

    const params = {
      networkAclId: data.networkACLId,
      id: data.networkACLRuleId,
    };

    const response = await vpcService.getNetworkAclRule(params);

    // end-get_network_acl_rule
    expect(response.result).not.toBeNull();

  });


  test('updateNetworkAclRule request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_network_acl_rule

    const params = {
      networkAclId: data.networkACLId,
      id: data.networkACLRuleId,
      name: 'my-network-acl-rule-updated',
    };

    const response = await vpcService.updateNetworkAclRule(params);

    // end-update_network_acl_rule
    expect(response.result).not.toBeNull();

  });


  test('listSecurityGroups request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_security_groups

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.SecurityGroupsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_security_groups
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createSecurityGroup request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_security_group

    const vpcIdentityModel = {
      id: data.vpcId,
    };

    const params = {
      vpc: vpcIdentityModel,
      name: 'my-security-group',
    };

    const response = await vpcService.createSecurityGroup(params);
    // end-create_security_group
    expect(response.result).not.toBeNull();
    data.securityGroupId = response.result.id;

  });

  test('getSecurityGroup request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_security_group

    const params = {
      id: data.securityGroupId,
    };

    const response = await vpcService.getSecurityGroup(params);

    // end-get_security_group
    expect(response.result).not.toBeNull();

  });

  test('updateSecurityGroup request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_security_group

    const params = {
      id: data.securityGroupId,
      name: 'my-security-group-updated',
    };

    const response = await vpcService.updateSecurityGroup(params);

    // end-update_security_group
    expect(response.result).not.toBeNull();

  });

  test('listSecurityGroupRules request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_security_group_rules

    const params = {
      securityGroupId: data.securityGroupId,
    };

    const response = await vpcService.listSecurityGroupRules(params);

    // end-list_security_group_rules
    expect(response.result).not.toBeNull();

  });

  test('createSecurityGroupRule request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_security_group_rule

    const securityGroupRulePrototypeRemoteModel = {
      address: '192.168.3.4',
    };

    const securityGroupRulePrototypeModel = {
      direction: 'inbound',
      ip_version: 'ipv4',
      protocol: 'tcp',
      remote: securityGroupRulePrototypeRemoteModel,
      code: 0,
      type: 8,
    };

    const params = {
      securityGroupId: data.securityGroupId,
      securityGroupRulePrototype: securityGroupRulePrototypeModel,
    };

    const response = await vpcService.createSecurityGroupRule(params);
    // end-create_security_group_rule
    expect(response.result).not.toBeNull();
    data.securityGroupRuleId = response.result.id;

  });

  test('getSecurityGroupRule request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_security_group_rule

    const params = {
      securityGroupId: data.securityGroupId,
      id: data.securityGroupRuleId,
    };

    const response = await vpcService.getSecurityGroupRule(params);

    // end-get_security_group_rule
    expect(response.result).not.toBeNull();

  });

  test('updateSecurityGroupRule request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_security_group_rule

    const params = {
      securityGroupId: data.securityGroupId,
      id: data.securityGroupRuleId,
      direction: 'outbound'
    };

    const response = await vpcService.updateSecurityGroupRule(params);

    // end-update_security_group_rule
    expect(response.result).not.toBeNull();

  });

  test('listSecurityGroupTargets request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_security_group_targets

    const params = {
      securityGroupId: data.securityGroupId,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.SecurityGroupTargetsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_security_group_targets
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createSecurityGroupTargetBinding request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_security_group_target_binding

    const params = {
      securityGroupId: data.securityGroupId,
      id: data.eth2Id,
    };

    const response = await vpcService.createSecurityGroupTargetBinding(params);

    // end-create_security_group_target_binding
    expect(response.result).not.toBeNull();
    data.targetId = response.result.id;

  });

  test('getSecurityGroupTarget request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_security_group_target

    const params = {
      securityGroupId: data.securityGroupId,
      id: data.targetId,
    };

    const response = await vpcService.getSecurityGroupTarget(params);

    // end-get_security_group_target
    expect(response.result).not.toBeNull();

  });

  //Placement Group will go here
  test('listPlacementGroups request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listPlacementGroups() result:');
    // begin-list_placement_groups

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.PlacementGroupsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    
    // end-list_placement_groups
    console.log(JSON.stringify(allResults, null, 2));
  });
  test('createPlacementGroup request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createPlacementGroup() result:');
    // begin-create_placement_group

    const params = {
      strategy: 'host_spread',
      name: 'my-placement-group',
    };

    const response = await vpcService.createPlacementGroup(params);

    // end-create_placement_group
    expect(response.result).not.toBeNull();

    data.placementGroupId = response.result.id
  });
  test('getPlacementGroup request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getPlacementGroup() result:');
    // begin-get_placement_group

    const params = {
      id: data.placementGroupId,
    };

    const response = await vpcService.getPlacementGroup(params);

    // end-get_placement_group
    expect(response.result).not.toBeNull();

  });
  test('updatePlacementGroup request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updatePlacementGroup() result:');
    // begin-update_placement_group

    const params = {
      id: data.placementGroupId,
      name: 'my-placement-group-updated',
    };

    const response = await vpcService.updatePlacementGroup(params);

    // end-update_placement_group
    expect(response.result).not.toBeNull();

  });
  test('deletePlacementGroup request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_placement_group

    const params = {
      id: data.placementGroupId,
    };

    const response = await vpcService.deletePlacementGroup(params)

    // end-delete_placement_group
    expect(response.result).not.toBeNull();

  });
  test('listIkePolicies request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_ike_policies

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.IkePoliciesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_ike_policies
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createIkePolicy request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_ike_policy

    const params = {
      authenticationAlgorithm: 'sha256',
      dhGroup: 14,
      encryptionAlgorithm: 'aes128',
      ikeVersion: 1,
      name: 'my-ike-policy',
    };
    const response = await vpcService.createIkePolicy(params);

    // end-create_ike_policy
    expect(response.result).not.toBeNull();
    data.ikePolicyId = response.result.id;

  });

  test('getIkePolicy request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_ike_policy

    const params = {
      id: data.ikePolicyId,
    };

    const response = await vpcService.getIkePolicy(params);

    // end-get_ike_policy
    expect(response.result).not.toBeNull();

  });

  test('updateIkePolicy request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_ike_policy

    const response = await vpcService.updateIkePolicy({
      id: data.ikePolicyId,
      name: 'my-ike-policy-modified',
      dhGroup: 15,
    });

    // end-update_ike_policy
    expect(response.result).not.toBeNull();

  });

  test('listIkePolicyConnections request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_ike_policy_connections

    const params = {
      id: data.ikePolicyId,
    };

    const response = await vpcService.listIkePolicyConnections(params);

    // end-list_ike_policy_connections
    expect(response.result).not.toBeNull();

  });

  test('listIpsecPolicies request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_ipsec_policies

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.IpsecPoliciesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_ipsec_policies
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createIpsecPolicy request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_ipsec_policy

    const params = {
      authenticationAlgorithm: 'sha256',
      encryptionAlgorithm: 'aes128',
      pfs: 'disabled',
      keyLifetime: 3600,
      name: 'my-ipsec-policy',
    };
    const response = await vpcService.createIpsecPolicy(params);

    // end-create_ipsec_policy
    expect(response.result).not.toBeNull();
    data.ipsecPolicyId = response.result.id;

  });

  test('getIpsecPolicy request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_ipsec_policy

    const params = {
      id: data.ipsecPolicyId,
    };

    const response = await vpcService.getIpsecPolicy(params);

    // end-get_ipsec_policy
    expect(response.result).not.toBeNull();

  });

  test('updateIpsecPolicy request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_ipsec_policy

    const response = await vpcService.updateIpsecPolicy({
      id: data.ipsecPolicyId,
      name: 'my-ipsec-policy-updated',
      authenticationAlgorithm: 'sha256',
    });

    // end-update_ipsec_policy
    expect(response.result).not.toBeNull();

  });

  test('listIpsecPolicyConnections request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_ipsec_policy_connections

    const params = {
      id: data.ipsecPolicyId,
    };

    const response = await vpcService.listIpsecPolicyConnections(params);

    // end-list_ipsec_policy_connections
    expect(response.result).not.toBeNull();

  });

  test('listVpnGateways request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_vpn_gateways

    const params = {
      mode: 'route',
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.VpnGatewaysPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_vpn_gateways
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createVpnGateway request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_vpn_gateway

    const subnetIdentityModel = {
      id: data.subnetId,
    };

    const vpnGatewayPrototypeModel = {
      name: 'my-vpn-gateway',
      subnet: subnetIdentityModel,
      mode: 'route',
    };

    const params = {
      vpnGatewayPrototype: vpnGatewayPrototypeModel,
    };

    const response = await vpcService.createVpnGateway(params);

    // end-create_vpn_gateway
    expect(response.result).not.toBeNull();
    data.vpnGateway = response.result;
    data.vpnGatewayId = response.result.id;

  });

  test('getVpnGateway request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_vpn_gateway

    const params = {
      id: data.vpnGatewayId,
    };

    const response = await vpcService.getVpnGateway(params);

    // end-get_vpn_gateway
    expect(response.result).not.toBeNull();

  });

  test('updateVpnGateway request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_vpn_gateway

    const params = {
      id: data.vpnGatewayId,
      name: 'my-vpn-gateway-updated',
    };

    const response = await vpcService.updateVpnGateway(params);

    // end-update_vpn_gateway
    expect(response.result).not.toBeNull();

  });

  test('listVpnGatewayConnections request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_vpn_gateway_connections

    const params = {
      vpnGatewayId: data.vpnGatewayId,
    };

    const response = await vpcService.listVpnGatewayConnections(params);

    // end-list_vpn_gateway_connections
    expect(response.result).not.toBeNull();

  });

  test('createVpnGatewayConnection request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_vpn_gateway_connection

    const vpnGatewayConnectionIkeIdentityPrototypeModel = {
      type: 'fqdn',
      value: 'my-service.example.com',
    };
    
    const vpnGatewayConnectionPolicyModeLocalPrototypeModel = {
      cidrs: ['192.132.0.0/28'],
      ike_identities: [vpnGatewayConnectionIkeIdentityPrototypeModel],
    };
    const vpnGatewayConnectionPolicyModePeerPrototypeModel = {
      ike_identity: vpnGatewayConnectionIkeIdentityPrototypeModel,
      address: '169.21.50.5',
      cidrs: ['192.132.0.0/28'],
    };

    const vpnGatewayConnectionPrototypeModel = {
      admin_state_up: true,
      peer: vpnGatewayConnectionPolicyModePeerPrototypeModel,
      local: vpnGatewayConnectionPolicyModeLocalPrototypeModel,
      psk: 'lkj14b1oi0alcniejkso',
      name: 'my-vpn-connection',
    };
    const params = {
      vpnGatewayId: data.vpnGatewayId,
      vpnGatewayConnectionPrototype: vpnGatewayConnectionPrototypeModel,
    };
    const response = await vpcService.createVpnGatewayConnection(params);

    // end-create_vpn_gateway_connection
    expect(response.result).not.toBeNull();
    data.vpnGatewayConnectionId = response.result.id;

  });

  test('getVpnGatewayConnection request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_vpn_gateway_connection

    const params = {
      vpnGatewayId: data.vpnGatewayId,
      id: data.vpnGatewayConnectionId,
    };

    const response = await vpcService.getVpnGatewayConnection(params);

    // end-get_vpn_gateway_connection
    expect(response.result).not.toBeNull();

  });

  test('updateVpnGatewayConnection request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_vpn_gateway_connection

    const params = {
      vpnGatewayId: data.vpnGatewayId,
      id: data.vpnGatewayConnectionId,
      name: 'my-vpn-gateway-connection-updated',
      peerAddress: '192.132.5.0',
      psk: 'lkj14b1oi0alcniejkso',
    };

    const response = await vpcService.updateVpnGatewayConnection(params);

    // end-update_vpn_gateway_connection
    expect(response.result).not.toBeNull();

  });

  test('addVpnGatewayConnectiosnLocalCidr request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-add_vpn_gateway_connection_local_cidr

    const params = {
      vpnGatewayId: data.vpnGatewayId,
      id: data.vpnGatewayConnectionId,
      cidr: '192.134.0.0/28',
    };

    const response = await vpcService.addVpnGatewayConnectionsLocalCidr(params);

    // end-add_vpn_gateway_connection_local_cidr
    expect(response.result).not.toBeNull();

  });

  test('listVpnGatewayConnectionsLocalCidrs request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_vpn_gateway_connection_local_cidrs

    const params = {
      vpnGatewayId: data.vpnGatewayId,
      id: data.vpnGatewayConnectionId,
    };

    const response = await vpcService.listVpnGatewayConnectionsLocalCidrs(params);

    // end-list_vpn_gateway_connection_local_cidrs
    expect(response.result).not.toBeNull();

  });


  test('addVpnGatewayConnectionsPeerCidr request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-add_vpn_gateway_connection_peer_cidr

    const params = {
      vpnGatewayId: data.vpnGatewayId,
      id: data.vpnGatewayConnectionId,
      cidr: '192.144.0.0/28',
    };

    const response = await vpcService.addVpnGatewayConnectionsPeerCidr(params);

    // end-add_vpn_gateway_connection_peer_cidr
    expect(response.result).not.toBeNull();

  });

  test('checkVpnGatewayConnectionsLocalCidr request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-check_vpn_gateway_connection_local_cidr

    const params = {
      vpnGatewayId: data.vpnGatewayId,
      id: data.vpnGatewayConnectionId,
      cidr: '192.134.0.0/28',
    };

    const response = await vpcService.checkVpnGatewayConnectionsLocalCidr(params);

    // end-check_vpn_gateway_connection_local_cidr
    expect(response.result).not.toBeNull();

  });

  test('listVpnGatewayConnectionsPeerCidrs request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_vpn_gateway_connection_peer_cidrs

    const params = {
      vpnGatewayId: data.vpnGatewayId,
      id: data.vpnGatewayConnectionId,
    };

    const response = await vpcService.listVpnGatewayConnectionsPeerCidrs(params);

    // end-list_vpn_gateway_connection_peer_cidrs
    expect(response.result).not.toBeNull();

  });

  test('checkVpnGatewayConnectionsPeerCidr request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-check_vpn_gateway_connection_peer_cidr

    const params = {
      vpnGatewayId: data.vpnGatewayId,
      id: data.vpnGatewayConnectionId,
      cidr: '192.144.0.0/28',
    };

    const response = await vpcService.checkVpnGatewayConnectionsPeerCidr(params);

    // end-check_vpn_gateway_connection_peer_cidr
    expect(response.result).not.toBeNull();

  });

  test('listVpnServers request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listVpnServers() result:');
    // begin-list_vpn_servers

    const params = {
      limit: 10,
      sort: 'name',
    };

    const allResults = [];
    try {
      const pager = new VpcV1.VpnServersPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_vpn_servers
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createVpnServer request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createVpnServer() result:');
    // begin-create_vpn_server

    // Request models needed by this operation.

    // CertificateInstanceIdentityByCRN
    const certificateInstanceIdentityModel = {
      crn: 'crn:v1:bluemix:public:secrets-manager:us-south:a/123456:36fa422d-080d-4d83-8d2d-86851b4001df:secret:2e786aab-42fa-63ed-14f8-d66d552f4dd5',
    };

    // VPNServerAuthenticationByUsernameIdProviderByIAM
    const vpnServerAuthenticationByUsernameIdProviderModel = {
      provider_type: 'iam',
    };

    // VPNServerAuthenticationPrototypeVPNServerAuthenticationByUsernamePrototype
    const vpnServerAuthenticationPrototypeModel = {
      method: 'certificate',
      identity_provider: vpnServerAuthenticationByUsernameIdProviderModel,
    };

    // SubnetIdentityById
    const subnetIdentityModel = {
      id: data.subnetId,
    };

    const params = {
      name: 'my-vpn-server',
      certificate: certificateInstanceIdentityModel,
      clientAuthentication: [vpnServerAuthenticationPrototypeModel],
      clientIpPool: '172.16.0.0/16',
      subnets: [subnetIdentityModel],
    };
    let response;
    try {
      response = await vpcService.createVpnServer(params);
      data.vpnServerId = response.result.id;
      //console.log(JSON.stringify(response.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_vpn_server
    // data.vpnServerId = response.result.id;

  });

  test('getVpnServer request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getVpnServer() result:');
    // begin-get_vpn_server

    const params = {
      id: data.vpnServerId,
    };

    let res;
    try {
      res = await vpcService.getVpnServer(params);
      //console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_vpn_server
  });

  test('updateVpnServer request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateVpnServer() result:');
    // begin-update_vpn_server

    const params = {
      id: data.vpnServerId,
      name: 'my-vpn-server-updated',
      ifMatch: 'W/"96d225c4-56bd-43d9-98fc-d7148e5c5028"',
    };

    let res;
    try {
      res = await vpcService.updateVpnServer(params);
      //console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_vpn_server
  });

  test('getVpnServerClientConfiguration request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
        // if an error occurs, display the message and then fail the test
        originalWarn(output);
        expect(true).toBeFalsy();
      });

    originalLog('getVpnServerClientConfiguration() result:');
    // begin-get_vpn_server_client_configuration

    const params = {
      id: data.vpnServerId,
    };
    
    let res;
    try {
      res = await vpcService.getVpnServerClientConfiguration(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_vpn_server_client_configuration
  });

  test('listVpnServerClients request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listVpnServerClients() result:');
    // begin-list_vpn_server_clients

    const params = {
      vpnServerId: data.vpnServerId,
      sort: 'created_at',
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.VpnServerClientsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_vpn_server_clients
    data.vpnServerClientId = allResults[0].id;
    console.log(JSON.stringify(allResults, null, 2));
  });

  test('getVpnServerClient request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getVpnServerClient() result:');
    // begin-get_vpn_server_client

    const params = {
      vpnServerId: data.vpnServerId,
      id: data.vpnServerClientId,
    };

    let res;
    try {
      res = await vpcService.getVpnServerClient(params);
      //console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_vpn_server_client
  });

  test('disconnectVpnClient request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-disconnect_vpn_client

    const params = {
      vpnServerId: data.vpnServerId,
      id: data.vpnServerClientId,
    };

    try {
      await vpcService.disconnectVpnClient(params);
    } catch (err) {
      console.warn(err);
    }

    // end-disconnect_vpn_client
  });

  test('listVpnServerRoutes request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listVpnServerRoutes() result:');
    // begin-list_vpn_server_routes

    const params = {
      vpnServerId: data.vpnServerId,
      sort: 'name',
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.VpnServerRoutesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_vpn_server_routes
    console.log(JSON.stringify(allResults, null, 2));
  });

  test('createVpnServerRoute request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createVpnServerRoute() result:');
    // begin-create_vpn_server_route

    const params = {
      vpnServerId: data.vpnServerId,
      destination: '172.16.0.0/16',
      name: 'my-vpn-server-route'
    };

    let res;
    try {
      res = await vpcService.createVpnServerRoute(params);
      //console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_vpn_server_route
    data.vpnServerRouteId = res.result.id;

  });

  test('getVpnServerRoute request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getVpnServerRoute() result:');
    // begin-get_vpn_server_route

    const params = {
      vpnServerId: data.vpnServerId,
      id: data.vpnServerRouteId,
    };

    let res;
    try {
      res = await vpcService.getVpnServerRoute(params);
      //console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_vpn_server_route
  });

  test('updateVpnServerRoute request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateVpnServerRoute() result:');
    // begin-update_vpn_server_route

    const params = {
      vpnServerId: data.vpnServerId,
      id: data.vpnServerRouteId,
      name: 'my-vpn-server-route-updated'
    };

    let res;
    try {
      res = await vpcService.updateVpnServerRoute(params);
      //console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_vpn_server_route
  });

  test('listLoadBalancerProfiles request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_load_balancer_profiles

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.LoadBalancerProfilesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_load_balancer_profiles
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('getLoadBalancerProfile request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_load_balancer_profile

    const params = {
      name: 'network-fixed',
    };

    const response = await vpcService.getLoadBalancerProfile(params);

    // end-get_load_balancer_profile
    expect(response.result).not.toBeNull();

  });

  test('listLoadBalancers request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_load_balancers

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.LoadBalancersPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_load_balancers
    console.log(JSON.stringify(allResults, null, 2));


  });

  test('createLoadBalancer request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_load_balancer

    const dnsInstanceReference = {
      crn: 'crn:v1:bluemix:public:dns-svcs:global:a/fff1cdf3dc1e4ec692a5f78bbb2584bc:6860c359-b2e2-46fa-a944-b38c28201c6e',
    }

    const dnsZoneIdentity = {
      id: 'd66662cc-aa23-4fe1-9987-858487a61f45',
    }

    const loadBalancerDNSPrototype = {
      instance: dnsInstanceReference,
      zone: dnsZoneIdentity,
    }

    const subnetIdentityModel = {
      id: data.subnetId,
    };

    const params = {
      isPublic: false,
      subnets: [subnetIdentityModel],
      name: 'my-load-balancer',
      dns:loadBalancerDNSPrototype,
    };
    const response = await vpcService.createLoadBalancer(params);

    // end-create_load_balancer
    expect(response.result).not.toBeNull();
    data.loadBalancerId = response.result.id;

  });

  test('getLoadBalancer request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_load_balancer

    const params = {
      id: data.loadBalancerId,
    };

    const response = await vpcService.getLoadBalancer(params);

    // end-get_load_balancer
    expect(response.result).not.toBeNull();

  });

  test('updateLoadBalancer request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_load_balancer

    const dns_instance_identity_model = {
      'crn': 'crn:v1:bluemix:public:dns-svcs:global:a/fff1cdf3dc1e4ec692a5f78bbb2584bc:6860c359-b2e2-46fa-a944-b38c28201c6e',
    }
  
    const dns_zone_identity_model = {
      'id': 'd66662cc-aa23-4fe1-9987-858487a61f45',
    }
  
    const load_balancer_dns_patch_model = {
      'instance': dns_instance_identity_model,
      'zone': dns_zone_identity_model,
    }

    const params = {
      id: data.loadBalancerId,
      name: 'my-load-balancer-updated',
      dns: load_balancer_dns_patch_model,
    };

    const response = await vpcService.updateLoadBalancer(params);

    // end-update_load_balancer
    expect(response.result).not.toBeNull();

  });

  test('getLoadBalancerStatistics request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_load_balancer_statistics

    const params = {
      id: data.loadBalancerId,
    };

    const response = await vpcService.getLoadBalancerStatistics(params);

    // end-get_load_balancer_statistics
    expect(response.result).not.toBeNull();

  });

  test('listLoadBalancerListeners request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_load_balancer_listeners

    const params = {
      loadBalancerId: data.loadBalancerId,
    };

    const response = await vpcService.listLoadBalancerListeners(params);

    // end-list_load_balancer_listeners
    expect(response.result).not.toBeNull();

  });

  test('createLoadBalancerListener request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_load_balancer_listener

    const params = {
      loadBalancerId: data.loadBalancerId,
      port: 5656,
      protocol: 'http',
    };

    const response = await vpcService.createLoadBalancerListener(params);

    // end-create_load_balancer_listener
    expect(response.result).not.toBeNull();
    data.listenerId = response.result.id;

  });

  test('getLoadBalancerListener request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_load_balancer_listener

    const params = {
      loadBalancerId: data.loadBalancerId,
      id: data.listenerId,
    };

    const response = await vpcService.getLoadBalancerListener(params);

    // end-get_load_balancer_listener
    expect(response.result).not.toBeNull();

  });

  test('updateLoadBalancerListener request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_load_balancer_listener

    const params = {
      loadBalancerId: data.loadBalancerId,
      id: data.listenerId,
      port: 5666,
    };

    const response = await vpcService.updateLoadBalancerListener(params);

    // end-update_load_balancer_listener
    expect(response.result).not.toBeNull();

  });

  test('listLoadBalancerListenerPolicies request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_load_balancer_listener_policies

    const params = {
      loadBalancerId: data.loadBalancerId,
      listenerId: data.listenerId,
    };

    const response = await vpcService.listLoadBalancerListenerPolicies(params);

    // end-list_load_balancer_listener_policies
    expect(response.result).not.toBeNull();

  });

  test('createLoadBalancerListenerPolicy request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_load_balancer_listener_policy

    const params = {
      loadBalancerId: data.loadBalancerId,
      listenerId: data.listenerId,
      priority: 2,
      action: 'reject',
      name: 'my-load-balancer-listener-policy',
    };

    const response = await vpcService.createLoadBalancerListenerPolicy(params);

    // end-create_load_balancer_listener_policy
    expect(response.result).not.toBeNull();
    data.policyId = response.result.id;

  });

  test('getLoadBalancerListenerPolicy request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_load_balancer_listener_policy

    const params = {
      loadBalancerId: data.loadBalancerId,
      listenerId: data.listenerId,
      id: data.policyId,
    };

    const response = await vpcService.getLoadBalancerListenerPolicy(params);

    // end-get_load_balancer_listener_policy
    expect(response.result).not.toBeNull();

  });

  test('updateLoadBalancerListenerPolicy request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_load_balancer_listener_policy

    const params = {
      loadBalancerId: data.loadBalancerId,
      listenerId: data.listenerId,
      id: data.policyId,
      priority: 5,
      name: 'my-load-balancer-listener-policy-updated',
    };

    const response = await vpcService.updateLoadBalancerListenerPolicy(params);

    // end-update_load_balancer_listener_policy
    expect(response.result).not.toBeNull();

  });

  test('listLoadBalancerListenerPolicyRules request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_load_balancer_listener_policy_rules

    const params = {
      loadBalancerId: data.loadBalancerId,
      listenerId: data.listenerId,
      policyId: data.policyId,
    };

    const response = await vpcService.listLoadBalancerListenerPolicyRules(params);

    // end-list_load_balancer_listener_policy_rules
    expect(response.result).not.toBeNull();

  });

  test('createLoadBalancerListenerPolicyRule request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_load_balancer_listener_policy_rule

    const params = {
      loadBalancerId: data.loadBalancerId,
      listenerId: data.listenerId,
      policyId: data.policyId,
      condition: 'contains',
      type: 'hostname',
      value: 'one',
    };

    const response = await vpcService.createLoadBalancerListenerPolicyRule(params);

    // end-create_load_balancer_listener_policy_rule
    expect(response.result).not.toBeNull();
    data.policyRuleId = response.result.id;

  });

  test('getLoadBalancerListenerPolicyRule request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_load_balancer_listener_policy_rule

    const params = {
      loadBalancerId: data.loadBalancerId,
      listenerId: data.listenerId,
      policyId: data.policyId,
      id: data.policyRuleId,
    };

    const response = await vpcService.getLoadBalancerListenerPolicyRule(params);

    // end-get_load_balancer_listener_policy_rule
    expect(response.result).not.toBeNull();

  });

  test('updateLoadBalancerListenerPolicyRule request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_load_balancer_listener_policy_rule

    const params = {
      loadBalancerId: data.loadBalancerId,
      listenerId: data.listenerId,
      policyId: data.policyId,
      id: data.policyRuleId,
      condition: 'contains',
      type: 'header',
      value: 'app',
      field: 'MY-APP-HEADER',
    };

    const response = await vpcService.updateLoadBalancerListenerPolicyRule(params);

    // end-update_load_balancer_listener_policy_rule
    expect(response.result).not.toBeNull();

  });

  test('listLoadBalancerPools request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_load_balancer_pools

    const params = {
      loadBalancerId: data.loadBalancerId,
    };

    const response = await vpcService.listLoadBalancerPools(params);

    // end-list_load_balancer_pools
    expect(response.result).not.toBeNull();

  });

  test('createLoadBalancerPool request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_load_balancer_pool

    const loadBalancerPoolHealthMonitorPrototypeModel = {
      delay: 30,
      max_retries: 3,
      timeout: 30,
      type: 'http',
    };

    const params = {
      loadBalancerId: data.loadBalancerId,
      name: 'my-load-balancer-pool',
      algorithm: 'round_robin',
      protocol: 'http',
      healthMonitor: loadBalancerPoolHealthMonitorPrototypeModel,
    };

    const response = await vpcService.createLoadBalancerPool(params);

    // end-create_load_balancer_pool
    expect(response.result).not.toBeNull();
    data.poolId = response.result.id;

  });

  test('getLoadBalancerPool request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_load_balancer_pool

    const params = {
      loadBalancerId: data.loadBalancerId,
      id: data.poolId,
    };

    const response = await vpcService.getLoadBalancerPool(params);

    // end-get_load_balancer_pool
    expect(response.result).not.toBeNull();

  });

  test('updateLoadBalancerPool request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_load_balancer_pool

    const params = {
      loadBalancerId: data.loadBalancerId,
      id: data.poolId,
      name: 'my-load-balancer-pool-updated',
      sessionPersistence: 'http_cookie',
    };

    const response = await vpcService.updateLoadBalancerPool(params);

    // end-update_load_balancer_pool
    expect(response.result).not.toBeNull();

  });

  test('listLoadBalancerPoolMembers request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_load_balancer_pool_members

    const params = {
      loadBalancerId: data.loadBalancerId,
      poolId: data.poolId,
    };

    const response = await vpcService.listLoadBalancerPoolMembers(params);

    // end-list_load_balancer_pool_members
    expect(response.result).not.toBeNull();

  });

  test('createLoadBalancerPoolMember request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_load_balancer_pool_member

    const loadBalancerPoolMemberTargetPrototypeModel = {
      id: {
        address: '192.168.3.4',
      },
    };

    const params = {
      loadBalancerId: data.loadBalancerId,
      poolId: data.poolId,
      port: 80,
      target: loadBalancerPoolMemberTargetPrototypeModel,
      weight: 50,
    };

    const response = await vpcService.createLoadBalancerPoolMember(params);

    // end-create_load_balancer_pool_member
    expect(response.result).not.toBeNull();
    data.poolMemberId = response.result.id;

  });

  test('getLoadBalancerPoolMember request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_load_balancer_pool_member

    const params = {
      loadBalancerId: data.loadBalancerId,
      poolId: data.poolId,
      id: data.poolMemberId,
    };

    const response = await vpcService.getLoadBalancerPoolMember(params);

    // end-get_load_balancer_pool_member
    expect(response.result).not.toBeNull();

  });

  test('updateLoadBalancerPoolMember request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_load_balancer_pool_member

    const params = {
      loadBalancerId: data.loadBalancerId,
      poolId: data.poolId,
      id: data.poolMemberId,
      port: 1235,
      weight: 50,
    };

    const response = await vpcService.updateLoadBalancerPoolMember(params);

    // end-update_load_balancer_pool_member
    expect(response.result).not.toBeNull();

  });

  test('replaceLoadBalancerPoolMembers request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-replace_load_balancer_pool_members

    const loadBalancerPoolMemberPrototypeModel = {
      port: 1235,
      target: {
        address: '192.168.3.5'
      }
    };

    const params = {
      loadBalancerId: data.loadBalancerId,
      poolId: data.poolId,
      members: [loadBalancerPoolMemberPrototypeModel]
    };

    const response = await vpcService.replaceLoadBalancerPoolMembers(params);

    // end-replace_load_balancer_pool_members
    expect(response.result).not.toBeNull();
    data.poolMemberId = response.result.members[0].id;

  });

  test('deleteLoadBalancerPoolMember request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_load_balancer_pool_member

    const params = {
      loadBalancerId: data.loadBalancerId,
      poolId: data.poolId,
      id: data.poolMemberId,
    };

    const response = await vpcService.deleteLoadBalancerPoolMember(params);

    // end-delete_load_balancer_pool_member
    expect(response.result).not.toBeNull();

  });

  test('deleteLoadBalancerPool request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_load_balancer_pool

    const params = {
      loadBalancerId: data.loadBalancerId,
      id: data.poolId,
    };

    const response = await vpcService.deleteLoadBalancerPool(params);

    // end-delete_load_balancer_pool
    expect(response.result).not.toBeNull();

  });

  test('deleteLoadBalancerListenerPolicyRule request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_load_balancer_listener_policy_rule

    const params = {
      loadBalancerId: data.loadBalancerId,
      listenerId: data.listenerId,
      policyId: data.policyId,
      id: data.policyRuleId,
    };

    const response = await vpcService.deleteLoadBalancerListenerPolicyRule(params);

    // end-delete_load_balancer_listener_policy_rule
    expect(response.result).not.toBeNull();

  });

  test('deleteLoadBalancerListenerPolicy request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_load_balancer_listener_policy

    const params = {
      loadBalancerId: data.loadBalancerId,
      listenerId: data.listenerId,
      id: data.policyId,
    };

    const response = await vpcService.deleteLoadBalancerListenerPolicy(params);

    // end-delete_load_balancer_listener_policy
    expect(response.result).not.toBeNull();

  });

  test('deleteLoadBalancerListener request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_load_balancer_listener

    const params = {
      loadBalancerId: data.loadBalancerId,
      id: data.listenerId,
    };

    const response = await vpcService.deleteLoadBalancerListener(params);

    // end-delete_load_balancer_listener
    expect(response.result).not.toBeNull();

  });

  test('deleteLoadBalancer request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_load_balancer

    const params = {
      id: data.loadBalancerId,
    };

    const response = await vpcService.deleteLoadBalancer(params);

    // end-delete_load_balancer
    expect(response.result).not.toBeNull();

  });

  test('listEndpointGateways request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_endpoint_gateways

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.EndpointGatewaysPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_endpoint_gateways
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createEndpointGateway request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_endpoint_gateway

    const params = {
      target: {
        name: 'ibm-ntp-server',
        resource_type: 'provider_infrastructure_service',
      },
      vpc: { id: data.vpcId },
      name: 'my-endpoint-gateway',
    };

    const response = await vpcService.createEndpointGateway(params);

    // end-create_endpoint_gateway
    expect(response.result).not.toBeNull();;
    data.endpointGatewayId = response.result.id;

  });

  test('listEndpointGatewayIps request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_endpoint_gateway_ips

    const params = {
      endpointGatewayId: data.endpointGatewayId,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.EndpointGatewayIpsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_endpoint_gateway_ips
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('addEndpointGatewayIp request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-add_endpoint_gateway_ip
    const params = {
      endpointGatewayId: data.endpointGatewayId,
      id: data.subnetReservedIpId,
    };
    // console.log(JSON.stringify(params, null, 2));
    const response = await vpcService.addEndpointGatewayIp(params);

    // end-add_endpoint_gateway_ip
    expect(response.result).not.toBeNull();
    data.endpointGatewayTargetId = response.result.id;

  });

  test('getEndpointGatewayIp request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_endpoint_gateway_ip

    const params = {
      endpointGatewayId: data.endpointGatewayId,
      id: data.endpointGatewayTargetId,
    };

    const response = await vpcService.getEndpointGatewayIp(params);

    // end-get_endpoint_gateway_ip
    expect(response.result).not.toBeNull();

  });

  test('getEndpointGateway request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_endpoint_gateway

    const params = {
      id: data.endpointGatewayId,
    };

    const response = await vpcService.getEndpointGateway(params);

    // end-get_endpoint_gateway
    expect(response.result).not.toBeNull();

  });

  test('updateEndpointGateway request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_endpoint_gateway

    const params = {
      id: data.endpointGatewayId,
      name: 'my-endpoint-gateway-modified'
    };

    const response = await vpcService.updateEndpointGateway(params);

    // end-update_endpoint_gateway
    expect(response.result).not.toBeNull();

  });

  test.skip('removeEndpointGatewayIp request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-remove_endpoint_gateway_ip

    const params = {
      endpointGatewayId: data.endpointGatewayId,
      id: data.endpointGatewayTargetId,
    };

    const response = await vpcService.removeEndpointGatewayIp(params);

    // end-remove_endpoint_gateway_ip
    expect(response.result).not.toBeNull();

  });

  test('deleteVpnServerRoute request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_vpn_server_route

    const params = {
      vpnServerId: data.vpnServerId,
      id: data.vpnServerRouteId,
    };

    try {
      await vpcService.deleteVpnServerRoute(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_vpn_server_route
  });

  test('deleteVpnServerClient request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_vpn_server_client

    const params = {
      vpnServerId: data.vpnServerId,
      id: data.vpnServerClientId,
    };

    try {
      await vpcService.deleteVpnServerClient(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_vpn_server_client
  });

  test('deleteVpnServer request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_vpn_server

    const params = {
      id: data.vpnServerId,
      ifMatch: 'W/"96d225c4-56bd-43d9-98fc-d7148e5c5028"',
    };

    try {
      await vpcService.deleteVpnServer(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_vpn_server
  });

  test('deleteEndpointGateway request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_endpoint_gateway

    const params = {
      id: data.endpointGatewayId,
    };

    const response = await vpcService.deleteEndpointGateway(params);

    // end-delete_endpoint_gateway
    expect(response.result).not.toBeNull();

  });
  test('listBareMetalServerProfiles request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listBareMetalServerProfiles() result:');
    // begin-list_bare_metal_server_profiles

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.BareMetalServerProfilesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_bare_metal_server_profiles
    data.bareMetalServerProfileName = allResults[0].name;
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('getBareMetalServerProfile request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getBareMetalServerProfile() result:');
    // begin-get_bare_metal_server_profile

    const params = {
      name: data.bareMetalServerProfileName,
    };

    const response = await vpcService.getBareMetalServerProfile(params);

    // end-get_bare_metal_server_profile
    expect(response.status).toEqual(200);
    expect(response.result).not.toBeNull();

  });

  test('listBareMetalServers request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listBareMetalServers() result:');
    // begin-list_bare_metal_servers

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.BareMetalServersPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }

    // end-list_bare_metal_servers
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createBareMetalServer request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createBareMetalServer() result:');
    // begin-create_bare_metal_server

    // Request models needed by this operation.

    // ImageIdentityById
    const imageIdentityModel = {
      id: data.imageId,
    };

    // KeyIdentityById
    const keyIdentityModel = {
      id: data.keyId,
    };

    // BareMetalServerInitializationPrototype
    const bareMetalServerInitializationPrototypeModel = {
      image: imageIdentityModel,
      keys: [keyIdentityModel],
    };

    // SubnetIdentityById
    const subnetIdentityModel = {
      id: data.subnetId,
    };

    // BareMetalServerPrimaryNetworkInterfacePrototype
    const bareMetalServerPrimaryNetworkInterfacePrototypeModel = {
      subnet: subnetIdentityModel,
    }

    // BareMetalServerProfileIdentityByName
    const bareMetalServerProfileIdentityModel = {
      name: 'bmx2-48x768',
    };

    // ZoneIdentityByName
    const zoneIdentityModel = {
      name: data.zone,
    };

    const bareMetalServerPrototype = {
      initialization: bareMetalServerInitializationPrototypeModel,
      primary_network_interface: bareMetalServerPrimaryNetworkInterfacePrototypeModel,
      profile: bareMetalServerProfileIdentityModel,
      zone: zoneIdentityModel,
      name: 'my-bare-metal-server'
    }
    const params = {
      bareMetalServerPrototype: bareMetalServerPrototype,
    };
    // JSON.stringify(params, '', 2);
    const response = await vpcService.createBareMetalServer(params);
    // end-create_bare_metal_server
    data.bareMetalServerId = response.result.id;
    data.bareMetalServerDiskId = response.result.disks[0].id;
    expect(response.status).toEqual(201);
    expect(response.result).not.toBeNull();

  });

  test.skip('createBareMetalServerConsoleAccessToken request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createBareMetalServerConsoleAccessToken() result:');
    // begin-create_bare_metal_server_console_access_token

    const params = {
      bareMetalServerId: 'testString',
      consoleType: 'serial',
    };

    const response = await vpcService.createBareMetalServerConsoleAccessToken(params);

    // end-create_bare_metal_server_console_access_token
    expect(response.status).toEqual(201);
    expect(response.result).not.toBeNull();

  });

  test('listBareMetalServerDisks request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listBareMetalServerDisks() result:');
    // begin-list_bare_metal_server_disks

    const params = {
      bareMetalServerId: data.bareMetalServerId,
    };

    const response = await vpcService.listBareMetalServerDisks(params);

    // end-list_bare_metal_server_disks
    expect(response.status).toEqual(200);
    expect(response.result).not.toBeNull();

  });

  test('getBareMetalServerDisk request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getBareMetalServerDisk() result:');
    // begin-get_bare_metal_server_disk

    const params = {
      bareMetalServerId: data.bareMetalServerId,
      id: data.bareMetalServerDiskId,
    };

    const response = await vpcService.getBareMetalServerDisk(params);

    // end-get_bare_metal_server_disk
    expect(response.status).toEqual(200);
    expect(response.result).not.toBeNull();

  });

  test('updateBareMetalServerDisk request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateBareMetalServerDisk() result:');
    // begin-update_bare_metal_server_disk

    const params = {
      bareMetalServerId: data.bareMetalServerId,
      id: data.bareMetalServerDiskId,
      name: 'my-bm-updated-disk'
    };

    const response = await vpcService.updateBareMetalServerDisk(params);

    // end-update_bare_metal_server_disk
    expect(response.status).toEqual(200);
    expect(response.result).not.toBeNull();

  });

  test('listBareMetalServerNetworkInterfaces request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listBareMetalServerNetworkInterfaces() result:');
    // begin-list_bare_metal_server_network_interfaces

    const params = {
      bareMetalServerId: data.bareMetalServerId,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new VpcV1.BareMetalServerNetworkInterfacesPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_bare_metal_server_network_interfaces
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createBareMetalServerNetworkInterface request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createBareMetalServerNetworkInterface() result:');
    // begin-create_bare_metal_server_network_interface

    // Request models needed by this operation.

    // SubnetIdentityById
    const subnetIdentityModel = {
      id: data.subnetId,
    };

    // BareMetalServerNetworkInterfacePrototypeBareMetalServerNetworkInterfaceByVLANPrototype
    const bareMetalServerNetworkInterfacePrototypeModel = {
      interface_type: 'vlan',
      subnet: subnetIdentityModel,
      enableInfrastructureNat: true,
      name: 'my-bare-metal-server-network-interface',
      vlan: 4,
    };

    const params = {
      bareMetalServerId: data.bareMetalServerId,
      bareMetalServerNetworkInterfacePrototype: bareMetalServerNetworkInterfacePrototypeModel,
    };

    const response = await vpcService.createBareMetalServerNetworkInterface(params);

    // end-create_bare_metal_server_network_interface
    data.bareMetalServerNetworkInterfaceId = response.result.id;
    expect(response.status).toEqual(201);
    expect(response.result).not.toBeNull();

  });

  test('getBareMetalServerNetworkInterface request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getBareMetalServerNetworkInterface() result:');
    // begin-get_bare_metal_server_network_interface

    const params = {
      bareMetalServerId: data.bareMetalServerId,
      id: data.bareMetalServerNetworkInterfaceId,
    };

    const response = await vpcService.getBareMetalServerNetworkInterface(params);

    // end-get_bare_metal_server_network_interface
    expect(response.status).toEqual(200);
    expect(response.result).not.toBeNull();

  });

  test('updateBareMetalServerNetworkInterface request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateBareMetalServerNetworkInterface() result:');
    // begin-update_bare_metal_server_network_interface

    const params = {
      bareMetalServerId: data.bareMetalServerId,
      id: data.bareMetalServerNetworkInterfaceId,
      name: 'my-bare-metal-server-network-interface-update'
    };

    const response = await vpcService.updateBareMetalServerNetworkInterface(params);

    // end-update_bare_metal_server_network_interface
    expect(response.status).toEqual(200);
    expect(response.result).not.toBeNull();

  });

  test('addBareMetalServerNetworkInterfaceFloatingIp request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('addBareMetalServerNetworkInterfaceFloatingIp() result:');
    // begin-add_bare_metal_server_network_interface_floating_ip

    const params = {
      bareMetalServerId: data.bareMetalServerId,
      networkInterfaceId: data.bareMetalServerNetworkInterfaceId,
      id: data.floatingIpId,
    };

    const response = await vpcService.addBareMetalServerNetworkInterfaceFloatingIp(params);

    // end-add_bare_metal_server_network_interface_floating_ip
    expect(response.status).toEqual(201);
    expect(response.result).not.toBeNull();

  });

  test('listBareMetalServerNetworkInterfaceFloatingIps request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listBareMetalServerNetworkInterfaceFloatingIps() result:');
    // begin-list_bare_metal_server_network_interface_floating_ips

    const params = {
      bareMetalServerId: data.bareMetalServerId,
      networkInterfaceId: data.bareMetalServerNetworkInterfaceId,
    };

    const response = await vpcService.listBareMetalServerNetworkInterfaceFloatingIps(params);

    // end-list_bare_metal_server_network_interface_floating_ips
    expect(response.status).toEqual(200);
    expect(response.result).not.toBeNull();

  });

  test('getBareMetalServerNetworkInterfaceFloatingIp request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getBareMetalServerNetworkInterfaceFloatingIp() result:');
    // begin-get_bare_metal_server_network_interface_floating_ip

    const params = {
      bareMetalServerId: data.bareMetalServerId,
      networkInterfaceId: data.bareMetalServerNetworkInterfaceId,
      id: data.floatingIpId,
    };

    const response = await vpcService.getBareMetalServerNetworkInterfaceFloatingIp(params);

    // end-get_bare_metal_server_network_interface_floating_ip
    expect(response.status).toEqual(200);
    expect(response.result).not.toBeNull();

  });

  test('getBareMetalServer request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getBareMetalServer() result:');
    // begin-get_bare_metal_server

    const params = {
      id: data.bareMetalServerId,
    };

    const response = await vpcService.getBareMetalServer(params);

    // end-get_bare_metal_server
    expect(response.status).toEqual(200);
    expect(response.result).not.toBeNull();

  });

  test('updateBareMetalServer request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateBareMetalServer() result:');
    // begin-update_bare_metal_server

    const params = {
      id: data.bareMetalServerId,
      name: 'my-bare-metal-server-update'
    };

    const response = await vpcService.updateBareMetalServer(params);

    // end-update_bare_metal_server
    expect(response.status).toEqual(200);
    expect(response.result).not.toBeNull();

  });

  test('getBareMetalServerInitialization request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getBareMetalServerInitialization() result:');
    // begin-get_bare_metal_server_initialization

    const params = {
      id: data.bareMetalServerId,
    };

    const response = await vpcService.getBareMetalServerInitialization(params);

    // end-get_bare_metal_server_initialization
    expect(response.status).toEqual(200);
    expect(response.result).not.toBeNull();

  });

  test('restartBareMetalServer request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-restart_bare_metal_server

    const params = {
      id: data.bareMetalServerId,
    };

    const response = await vpcService.restartBareMetalServer(params);

    // end-restart_bare_metal_server
    expect(response.status).toEqual(204);

  });

  test('startBareMetalServer request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-start_bare_metal_server

    const params = {
      id: data.bareMetalServerId,
    };

    const response = await vpcService.startBareMetalServer(params);

    // end-start_bare_metal_server
    expect(response.status).toEqual(204);

  });

  test('stopBareMetalServer request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-stop_bare_metal_server

    const params = {
      id: data.bareMetalServerId,
      type: 'soft',
    };

    const response = await vpcService.stopBareMetalServer(params);

    // end-stop_bare_metal_server
    expect(response.status).toEqual(204);

  });

  test('listFlowLogCollectors request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-list_flow_log_collectors
    const params = {
      limit: 10,
    }
    const allResults = [];
    try {
      const pager = new VpcV1.FlowLogCollectorsPager(vpcService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
    } catch (err) {
      console.warn(err);
    }
    // end-list_flow_log_collectors
    console.log(JSON.stringify(allResults, null, 2));

  });

  test('createFlowLogCollector request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_flow_log_collector

    const cloudObjectStorageBucketIdentityModel = {
      name: 'my-bucket-name',
    };

    const flowLogCollectorPrototypeTargetModel = {
      id: data.subnetId,
    };

    const params = {
      storageBucket: cloudObjectStorageBucketIdentityModel,
      target: flowLogCollectorPrototypeTargetModel,
      name: 'my-flow-log-collector',
    };

    const response = await vpcService.createFlowLogCollector(params);

    // end-create_flow_log_collector
    expect(response.result).not.toBeNull();
    data.flowLogId = response.result.id;

  });

  test('getFlowLogCollector request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_flow_log_collector

    const params = {
      id: data.flowLogId,
    };

    const response = await vpcService.getFlowLogCollector(params);

    // end-get_flow_log_collector
    expect(response.result).not.toBeNull();

  });

  test('updateFlowLogCollector request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_flow_log_collector

    const params = {
      id: data.flowLogId,
      name: 'my-flow-log-collector-updated',
      active: true,
    };

    const response = await vpcService.updateFlowLogCollector(params);

    // end-update_flow_log_collector
    expect(response.result).not.toBeNull();

  });

  test('deleteFlowLogCollector request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_flow_log_collector

    const params = {
      id: data.flowLogId,
    };

    const response = await vpcService.deleteFlowLogCollector(params);

    // end-delete_flow_log_collector
    expect(response.result).not.toBeNull();

  });

  test('removeVpnGatewayConnectionPeerCidr request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-remove_vpn_gateway_connection_peer_cidr

    const params = {
      vpnGatewayId: data.vpnGatewayId,
      id: data.vpnGatewayConnectionId,
      cidrPrefix: '192.144.0.0',
      prefixLength: '28',
    };

    const response = await vpcService.removeVpnGatewayConnectionPeerCidr(params);

    // end-remove_vpn_gateway_connection_peer_cidr
    expect(response.result).not.toBeNull();

  });
  test('removeVpnGatewayConnectionLocalCidr request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-remove_vpn_gateway_connection_local_cidr

    const params = {
      vpnGatewayId: data.vpnGatewayId,
      id: data.vpnGatewayConnectionId,
      cidrPrefix: '192.134.0.0',
      prefixLength: '28',
    };

    const response = await vpcService.removeVpnGatewayConnectionLocalCidr(params);

    // end-remove_vpn_gateway_connection_local_cidr
    expect(response.result).not.toBeNull();

  });

  test('removeInstanceNetworkInterfaceFloatingIp request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-remove_instance_network_interface_floating_ip

    const params = {
      instanceId: data.instanceId,
      networkInterfaceId: data.eth2Id,
      id: data.floatingIpId,
    };

    const response = await vpcService.removeInstanceNetworkInterfaceFloatingIp(params);

    // end-remove_instance_network_interface_floating_ip
    expect(response.result).not.toBeNull();

  });
  test('deleteBareMetalServerNetworkInterface request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_bare_metal_server_network_interface

    const params = {
      bareMetalServerId: data.bareMetalServerId,
      id: data.bareMetalServerNetworkInterfaceId,
    };

    try {
      await vpcService.deleteBareMetalServerNetworkInterface(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_bare_metal_server_network_interface
  });

  test('deleteBareMetalServer request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_bare_metal_server

    const params = {
      id: data.bareMetalServerId,
    };

    try {
      await vpcService.deleteBareMetalServer(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_bare_metal_server
  });

  test('deleteSecurityGroupTargetBinding request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_security_group_target_binding

    const params = {
      securityGroupId: data.securityGroupId,
      id: data.targetId,
    };

    const response = await vpcService.deleteSecurityGroupTargetBinding(params);

    // end-delete_security_group_target_binding
    expect(response.result).not.toBeNull();

  });


  test('deleteInstanceClusterNetworkAttachment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteInstanceClusterNetworkAttachment() result:');
    // begin-delete_instance_cluster_network_attachment

    const params = {
      instanceId: data.instanceId,
      id: data.clusterNetworkAttachmentId,
    };

    let res;
    try {
      res = await vpcService.deleteInstanceClusterNetworkAttachment(params);
    } catch (err) {
      console.warn(err);
    }
    expect(res.result).not.toBeNull();
    // end-delete_instance_cluster_network_attachment
  });


  test('deleteInstanceNetworkInterface request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_instance_network_interface

    const params = {
      instanceId: data.instanceId,
      id: data.eth2Id,
    };

    const response = await vpcService.deleteInstanceNetworkInterface(params);

    // end-delete_instance_network_interface
    expect(response.result).not.toBeNull();

  });

  test('deleteInstanceVolumeAttachment request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_instance_volume_attachment

    const params = {
      instanceId: data.instanceId,
      id: data.volumeAttachmentId,
    };

    const response = await vpcService.deleteInstanceVolumeAttachment(params);

    // end-delete_instance_volume_attachment
    expect(response.result).not.toBeNull();

  });

  test('deleteVolume request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_volume

    const params = {
      id: data.volumeId,
    };

    const response = await vpcService.deleteVolume(params);

    // end-delete_volume
    expect(response.result).not.toBeNull();

  });

  test('deleteFloatingIp request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_floating_ip

    const params = {
      id: data.floatingIpId,
    };

    const response = await vpcService.deleteFloatingIp(params);

    // end-delete_floating_ip
    expect(response.result).not.toBeNull();

  });

  test('deleteBackupPolicyPlan request example', async () => {
 
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_instance

    const params = {
      backupPolicyId: data.backupPolicyId,
      id: data.backupPolicyPlanId,
    };

    const response = await vpcService.deleteBackupPolicyPlan(params);

    // end-delete_instance
    expect(response.result).not.toBeNull();

  });

  test('deleteBackupPolicy request example', async () => {
    
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_instance

    const params = {
      id: data.backupPolicyId,
    };

    const response = await vpcService.deleteBackupPolicy(params);

    // end-delete_instance
    expect(response.result).not.toBeNull();

  });

  test('deleteInstance request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_instance

    const params = {
      id: data.instanceId,
    };

    const response = await vpcService.deleteInstance(params);

    // end-delete_instance
    expect(response.result).not.toBeNull();

  });

  test('deleteKey request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_key

    const params = {
      id: data.keyId,
    };

    const response = await vpcService.deleteKey(params);

    // end-delete_key
    expect(response.result).not.toBeNull();

  });

  test('deleteImage request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_image

    const params = {
      id: data.imageId,
    };

    const response = await vpcService.deleteImage(params);

    // end-delete_image
    expect(response.result).not.toBeNull();

  });
  test('deleteSnapshotClones request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_snapshot

    const params = {
      id: data.snapshotId,
      zoneName: data.zone,
    };

    const response = vpcService.deleteSnapshotClone(params);

    // end-delete_snapshot
    expect(response.result).not.toBeNull();

  });
  test('deleteSnapshot request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_snapshot

    const params = {
      id: data.snapshotId
    };

    const response = await vpcService.deleteSnapshot(params);

    // end-delete_snapshot
    expect(response.result).not.toBeNull();

  });
  test.skip('deleteSnapshots request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_snapshots

    const params = {
      sourceVolumeId: data.volumeId,
    };

    const response = await vpcService.deleteSnapshots(params);

    // end-delete_snapshots
    expect(response.result).not.toBeNull();
    console.log(JSON.stringify(response,null,2));

  });
  test('deleteSecurityGroupRule request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    
    // begin-delete_security_group_rule

    const params = {
      securityGroupId: data.securityGroupId,
      id: data.securityGroupRuleId,
    };

    const response = await vpcService.deleteSecurityGroupRule(params);

    // end-delete_security_group_rule
    expect(response.result).not.toBeNull();

  });

  test('deleteSecurityGroup request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_security_group

    const params = {
      id: data.securityGroupId,
    };

    const response = await vpcService.deleteSecurityGroup(params);

    // end-delete_security_group
    expect(response.result).not.toBeNull();

  });

  test('deleteShareMountTarget request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteShareMountTarget() result:');
    // begin-delete_share_mount_target

    const params = {
      shareId: data.shareId,
      id: data.shareMountTargetId,
    };

    let res;
    try {
      res = await vpcService.deleteShareMountTarget(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_share_mount_target
  });

  test.skip('deleteShareSource request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_share_source

    const params = {
      shareId: data.shareId,
    };

    try {
      await vpcService.deleteShareSource(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_share_source
  });

  test('deleteShare request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteShare() result:');
    // begin-delete_share

    const params = {
      id: data.shareId,
      ifMatch: 'W/"96d225c4-56bd-43d9-98fc-d7148e5c5028"',
    };

    let res;
    try {
      res = await vpcService.deleteShare(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-delete_share
  });


  test('deleteClusterNetworkInterface request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteClusterNetworkInterface() result:');
    // begin-delete_cluster_network_interface

    const params = {
      clusterNetworkId: data.clusterNetworkId,
      id: data.clusterNetworkInterfaceId,
      ifMatch: 'W/"96d225c4-56bd-43d9-98fc-d7148e5c5028"',
    };

    let res;
    try {
      res = await vpcService.deleteClusterNetworkInterface(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    expect(res.result).not.toBeNull();

    // end-delete_cluster_network_interface
  });

  test('deleteClusterNetworkSubnetReservedIp request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteClusterNetworkSubnetReservedIp() result:');
    // begin-delete_cluster_network_subnet_reserved_ip

    const params = {
      clusterNetworkId: data.clusterNetworkId,
      clusterNetworkSubnetId: data.clusterNetworkSubnetId,
      id: data.clusterNetworkSubnetReservedIpId,
      ifMatch: 'W/"96d225c4-56bd-43d9-98fc-d7148e5c5028"',
    };

    let res;
    try {
      res = await vpcService.deleteClusterNetworkSubnetReservedIp(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    expect(res.result).not.toBeNull();

    // end-delete_cluster_network_subnet_reserved_ip
  });

  test('deleteClusterNetworkSubnet request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteClusterNetworkSubnet() result:');
    // begin-delete_cluster_network_subnet

    const params = {
      clusterNetworkId: data.clusterNetworkId,
      id: data.clusterNetworkSubnetId,
      ifMatch: 'W/"96d225c4-56bd-43d9-98fc-d7148e5c5028"',
    };

    let res;
    try {
      res = await vpcService.deleteClusterNetworkSubnet(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    expect(res.result).not.toBeNull();

    // end-delete_cluster_network_subnet
  });

  test('deleteClusterNetwork request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteClusterNetwork() result:');
    // begin-delete_cluster_network

    const params = {
      id: data.clusterNetworkId,
      ifMatch: 'W/"96d225c4-56bd-43d9-98fc-d7148e5c5028"',
    };

    let res;
    try {
      res = await vpcService.deleteClusterNetwork(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    expect(res.result).not.toBeNull();

    // end-delete_cluster_network
  });

  test('deletePublicGateway request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_public_gateway

    const params = {
      id: data.publicGatewayId,
    };

    const response = await vpcService.deletePublicGateway(params);

    // end-delete_public_gateway
    expect(response.result).not.toBeNull();

  });

  test('deleteNetworkAclRule request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_network_acl_rule

    const params = {
      networkAclId: data.networkACLId,
      id: data.networkACLRuleId,
    };

    const response = await vpcService.deleteNetworkAclRule(params);

    // end-delete_network_acl_rule
    expect(response.result).not.toBeNull();

  });

  test('deleteNetworkAcl request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_network_acl

    const params = {
      id: data.networkACLId,
    };

    const response = await vpcService.deleteNetworkAcl(params);

    // end-delete_network_acl
    expect(response.result).not.toBeNull();

  });


  test('deleteInstanceGroupMembership request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_instance_group_membership
    
    const params = {
      instanceGroupId: data.instanceGroupId,
      id: data.instanceGroupMembershipId,
    };

    const response = await vpcService.deleteInstanceGroupMembership(params);

    // end-delete_instance_group_membership
    expect(response.result).not.toBeNull();

  });

  test.skip('deleteInstanceGroupMemberships request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_instance_group_memberships

    const params = {
      instanceGroupId: data.instanceGroupId,
    };

    const response = await vpcService.deleteInstanceGroupMemberships(params);

    // end-delete_instance_group_memberships
    expect(response.result).not.toBeNull();

  });

  test('deleteInstanceGroupManagerPolicy request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_instance_group_manager_policy

    const params = {
      instanceGroupId: data.instanceGroupId,
      instanceGroupManagerId: data.instanceGroupManagerId,
      id: data.instanceGroupManagerPolicyId,
    };

    const response = await vpcService.deleteInstanceGroupManagerPolicy(params);

    // end-delete_instance_group_manager_policy
    expect(response.result).not.toBeNull();

  });

  test('deleteInstanceGroupManagerAction request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_instance_group_manager_action

    const params = {
      instanceGroupId: data.instanceGroupId,
      instanceGroupManagerId: data.instanceGroupManagerId,
      id: data.instanceGroupManagerActionId,
    };

    const response = await vpcService.deleteInstanceGroupManagerAction(params);

    // end-delete_instance_group_manager_action
    expect(response.result).not.toBeNull();

  });

  test('deleteInstanceGroupManager request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_instance_group_manager

    const params = {
      instanceGroupId: data.instanceGroupId,
      id: data.instanceGroupManagerId,
    };

    const response = await vpcService.deleteInstanceGroupManager(params);

    // end-delete_instance_group_manager
    expect(response.result).not.toBeNull();

  });

  test.skip('deleteInstanceGroupLoadBalancer request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_instance_group_load_balancer

    const params = {
      instanceGroupId: data.instanceGroupId,
    };
    const response = await vpcService.deleteInstanceGroupLoadBalancer(params);

    // end-delete_instance_group_load_balancer
    expect(response.result).not.toBeNull();

  });

  test('deleteInstanceGroup request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_instance_group

    const params = {
      id: data.instanceGroupId,
    };

    const response = await vpcService.deleteInstanceGroup(params);

    // end-delete_instance_group
    expect(response.result).not.toBeNull();

  });

  test('deleteInstanceTemplate request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_instance_template
    console.log("value of data.instanceTemplateId")
    console.log(data.instanceTemplateId)
    const params = {
      id: data.instanceTemplateId,
    };

    const response = await vpcService.deleteInstanceTemplate(params);

    // end-delete_instance_template
    expect(response.result).not.toBeNull();

  });

  test('deleteDedicatedHost request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_dedicated_host

    const params = {
      id: data.dedicatedHostId,
    };

    const response = await vpcService.deleteDedicatedHost(params);

    // end-delete_dedicated_host
    expect(response.result).not.toBeNull();

  });

  test('deleteDedicatedHostGroup request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_dedicated_host_group

    const params = {
      id: data.dedicatedHostGroupId,
    };

    const response = await vpcService.deleteDedicatedHostGroup(params);

    // end-delete_dedicated_host_group
    expect(response.result).not.toBeNull();

  });
  test('deleteIkePolicy request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_ike_policy

    const params = {
      id: data.ikePolicyId,
    };

    const response = await vpcService.deleteIkePolicy(params);

    // end-delete_ike_policy
    expect(response.result).not.toBeNull();

  });


  test('deleteIpsecPolicy request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_ipsec_policy

    const params = {
      id: data.ipsecPolicyId,
    };

    const response = await vpcService.deleteIpsecPolicy(params);

    // end-delete_ipsec_policy
    expect(response.result).not.toBeNull();

  });


  test('deleteVpnGatewayConnection request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_vpn_gateway_connection

    const params = {
      vpnGatewayId: data.vpnGatewayId,
      id: data.vpnGatewayConnectionId,
    };

    const response = await vpcService.deleteVpnGatewayConnection(params);

    // end-delete_vpn_gateway_connection
    expect(response.result).not.toBeNull();

  });

  test('deleteVpnGateway request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_vpn_gateway

    const params = {
      id: data.vpnGatewayId,
    };

    const response = await vpcService.deleteVpnGateway(params);

    // end-delete_vpn_gateway
    expect(response.result).not.toBeNull();

  });

  test('deleteSubnet request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_subnet

    const params = {
      id: data.subnetId,
    };

    const response = await vpcService.deleteSubnet(params);

    // end-delete_subnet
    expect(response.result).not.toBeNull();

  });

  test('deleteVpcRoutingTableRoute request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_vpc_routing_table_route

    const params = {
      vpcId: data.vpcId,
      routingTableId: data.vpcRoutingTableId,
      id: data.vpcRoutingTableRouteId,
    };

    const response = await vpcService.deleteVpcRoutingTableRoute(params);

    // end-delete_vpc_routing_table_route
    expect(response.result).not.toBeNull();

  });

  test('deleteVpcRoutingTable request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_vpc_routing_table

    const params = {
      vpcId: data.vpcId,
      id: data.vpcRoutingTableId,
    };

    const response = await vpcService.deleteVpcRoutingTable(params);

    // end-delete_vpc_routing_table
    expect(response.result).not.toBeNull();

  });

  test('deleteVpcAddressPrefix request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_vpc_address_prefix

    const params = {
      vpcId: data.vpcId,
      id: data.vpcAddressPrefixId,
    };

    const response = await vpcService.deleteVpcAddressPrefix(params);

    // end-delete_vpc_address_prefix
    expect(response.result).not.toBeNull();

  });

  test('deleteVpcDnsResolutionBinding request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_vpc_dns_resolution_binding

    const params = {
      vpcId: data.vpcId,
      id: data.vpcDnsResolutionId,
    };

    const response = await vpcService.deleteVpcDnsResolutionBinding(params);

    // end-delete_vpc_dns_resolution_binding
    expect(response.result).not.toBeNull();

  });

  test('deleteVpc request example', async () => {

    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_vpc

    const params = {
      id: data.vpcId,
    };

    const response = await vpcService.deleteVpc(params);

    // end-delete_vpc
    expect(response.result).not.toBeNull();

  });

});