/* eslint-disable no-console */
/**
 * (C) Copyright IBM Corp. 2020, 2021.
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
const VpcV1 = require('../../dist/vpc/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'vpc_v1.env';

const describe = authHelper.prepareTests(configFile);
const dict = {};
const generateName = (resourceType) => 'nsdk' + resourceType + Math.floor(Date.now() / 1000);

describe('VpcV1_integration', () => {
  const vpcService = VpcV1.newInstance({
    headers: {
      'Accept': 'application/json',
    },
  });

  jest.setTimeout(timeout);

  test('service', (done) => {
    expect(vpcService).not.toBeNull();
    done();
  });
  let res;
  // Geography
  test('listRegions()', (done) => {
    vpcService
      .listRegions()
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.regionName = res.result.regions[0].name;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getRegion()', (done) => {
    const params = {
      name: dict.regionName,
    };

    vpcService
      .getRegion(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listRegionZones()', (done) => {
    const params = {
      regionName: dict.regionName,
    };

    vpcService
      .listRegionZones(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.zoneName = 'us-east-2';
        dict.regionName = 'us-east';
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getRegionZone()', (done) => {
    const params = {
      regionName: dict.regionName,
      name: dict.zoneName,
    };

    vpcService
      .getRegionZone(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // Create
  test('createVpc()', async () => {
    try {
      const params = {
        name: generateName('vpc'),
      };
      res = await vpcService.createVpc(params);
      expect(res.result).not.toBeNull();
      dict.createdVpc = res.result.id;
    } catch (err) {
      console.warn(err);
    }
  });
  test('createSubnet()', (done) => {
    const vpcIdentityModel = {
      id: dict.createdVpc,
    };

    const zoneIdentityModel = {
      name: dict.zoneName,
    };

    const subnetPrototypeModel = {
      name: generateName('subnet'),
      ip_version: 'ipv4',
      vpc: vpcIdentityModel,
      ipv4_cidr_block: '10.235.0.0/24',
      zone: zoneIdentityModel,
    };

    const params = {
      subnetPrototype: subnetPrototypeModel,
    };

    vpcService
      .createSubnet(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdSubnet = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createSecurityGroup()', (done) => {
    const vpcIdentityModel = {
      id: dict.createdVpc,
    };

    const params = {
      vpc: vpcIdentityModel,
      name: generateName('my-security-group'),
    };

    vpcService
      .createSecurityGroup(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdSG = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createFloatingIp()', (done) => {
    const zoneIdentityModel = {
      name: dict.zoneName,
    };

    const floatingIpPrototypeModel = {
      name: generateName('my-floating-ip'),
      zone: zoneIdentityModel,
    };

    const params = {
      floatingIpPrototype: floatingIpPrototypeModel,
    };

    vpcService
      .createFloatingIp(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdFloatingIp = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createVolume()', (done) => {
    const zoneIdentityModel = {
      name: dict.zoneName,
    };

    const volumePrototypeModel = {
      name: generateName('my-volume'),
      profile: { name: 'general-purpose' },
      iops: 10000,
      zone: zoneIdentityModel,
      capacity: 100,
    };

    const params = {
      volumePrototype: volumePrototypeModel,
    };

    vpcService
      .createVolume(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdVolume = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // VPC and Subnet
  test('listVpcs()', async () => {
    try {
      const params = {
        limit: 1,
      };
      res = await vpcService.listVpcs(params);
      expect(res.result).not.toBeNull();
    } catch (err) {
      console.warn(err);
    }
  });
  test('getVpc()', (done) => {
    const params = {
      id: dict.createdVpc,
    };

    vpcService
      .getVpc(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateVpc()', (done) => {
    const params = {
      id: dict.createdVpc,
      name: generateName('vpc'),
    };

    vpcService
      .updateVpc(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getVpcDefaultNetworkAcl()', (done) => {
    const params = {
      id: dict.createdVpc,
    };

    vpcService
      .getVpcDefaultNetworkAcl(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getVpcDefaultSecurityGroup()', (done) => {
    const params = {
      id: dict.createdVpc,
    };

    vpcService
      .getVpcDefaultSecurityGroup(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listVpcAddressPrefixes()', (done) => {
    const params = {
      vpcId: dict.createdVpc,
      limit: 1,
    };

    vpcService
      .listVpcAddressPrefixes(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listVpcRoutes()', (done) => {
    const params = {
      vpcId: dict.createdVpc,
      zoneName: dict.zoneName,
    };

    vpcService
      .listVpcRoutes(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // test('createVpcRoute()', done => {
  //   const routeNextHopPrototypeModel = {
  //     address: '192.162.3.4',
  //   };

  //   const zoneIdentityModel = {
  //     name: dict.zoneName,
  //   };

  //   const params = {
  //     vpcId: dict.createdVpc,
  //     nextHop: routeNextHopPrototypeModel,
  //     destination: '192.168.3.0/24',
  //     zone: zoneIdentityModel,
  //     name: generateName('route'),
  //   };

  //   vpcService
  //     .createVpcRoute(params)
  //     .then(res => {
  //       dict.createdVpcRoute = res.result.id;
  //       done();
  //     })
  //     .catch(err => {
  //       console.warn(err);
  //       done(err);
  //     });
  // });
  // test('getVpcRoute()', done => {
  //   const params = {
  //     vpcId: dict.createdVpc,
  //     id: dict.createdVpcRoute,
  //   };

  //   vpcService
  //     .getVpcRoute(params)
  //     .then(res => {
  //       expect(res.result).not.toBeNull();
  //       done();
  //     })
  //     .catch(err => {
  //       console.warn(err);
  //       done(err);
  //     });
  // });
  // test('updateVpcRoute()', done => {
  //   const params = {
  //     vpcId: dict.createdVpc,
  //     id: dict.createdVpcRoute,
  //     name: generateName('route'),
  //   };

  //   vpcService
  //     .updateVpcRoute(params)
  //     .then(res => {
  //       expect(res.result).not.toBeNull();
  //       done();
  //     })
  //     .catch(err => {
  //       console.warn(err);
  //       done(err);
  //     });
  // });
  // test('deleteVpcRoute()', done => {
  //   const params = {
  //     vpcId: dict.createdVpc,
  //     id: dict.createVpcRoute,
  //   };

  //   vpcService
  //     .deleteVpcRoute(params)
  //     .then(res => {
  //       expect(res.result).not.toBeNull();
  //       done();
  //     })
  //     .catch(err => {
  //       console.warn(err);
  //       done(err);
  //     });
  // });
  test('listSubnets()', (done) => {
    const params = {
      limit: 10,
    };

    vpcService
      .listSubnets(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getSubnet()', (done) => {
    const params = {
      id: dict.createdSubnet,
    };

    vpcService
      .getSubnet(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateSubnet()', (done) => {
    const params = {
      id: dict.createdSubnet,
      name: generateName('subnet'),
    };

    vpcService
      .updateSubnet(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createNetworkAcl()', (done) => {
    const vpcIdentityModel = {
      id: dict.createdVpc,
    };

    const networkAclRulePrototypeNetworkAclContextModel = {
      name: generateName('my-rule-2'),
      action: 'allow',
      destination: '192.168.3.2/32',
      direction: 'inbound',
      source: '192.168.3.2/32',
      protocol: 'tcp',
    };

    const networkAclPrototypeModel = {
      name: generateName('my-network-acl'),
      vpc: vpcIdentityModel,
      rules: [networkAclRulePrototypeNetworkAclContextModel],
    };

    const params = {
      networkAclPrototype: networkAclPrototypeModel,
    };

    vpcService
      .createNetworkAcl(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdNetworkACL = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createPublicGateway()', (done) => {
    const vpcIdentityModel = {
      id: dict.createdVpc,
    };

    const zoneIdentityModel = {
      name: dict.zoneName,
    };

    const params = {
      vpc: vpcIdentityModel,
      zone: zoneIdentityModel,
      name: generateName('my-public-gateway'),
    };

    vpcService
      .createPublicGateway(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdPgw = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('getSubnetNetworkAcl()', (done) => {
    const params = {
      id: dict.createdSubnet,
    };

    vpcService
      .getSubnetNetworkAcl(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('replaceSubnetNetworkAcl()', (done) => {
    const params = {
      id: dict.createdSubnet,
      networkAclIdentity: {
        id: dict.createdNetworkACL,
      },
    };

    vpcService
      .replaceSubnetNetworkAcl(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('setSubnetPublicGateway()', (done) => {
    const params = {
      id: dict.createdSubnet,
      publicGatewayIdentity: {
        id: dict.createdPgw,
      },
    };

    vpcService
      .setSubnetPublicGateway(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getSubnetPublicGateway()', (done) => {
    const params = {
      id: dict.createdSubnet,
    };

    vpcService
      .getSubnetPublicGateway(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // Images
  test('listImages()', (done) => {
    const params = {
      limit: 1,
    };

    vpcService
      .listImages(params)
      .then((res) => {
        dict.imageId = res.result.images[0].id;
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test.skip('createImage()', (done) => {
    const resourceGroupIdentityModel = {
      id: 'fee82deba12e4c0fb69c3b09d1f12345',
    };

    const imageFilePrototypeModel = {
      href: 'cos://us-south/my-bucket/my-image.qcow2',
    };

    const operatingSystemIdentityModel = {
      name: 'debian-9-amd64',
    };

    const imagePrototypeModel = {
      name: 'my-image',
      resource_group: resourceGroupIdentityModel,
      file: imageFilePrototypeModel,
      operating_system: operatingSystemIdentityModel,
    };

    const params = {
      imagePrototype: imagePrototypeModel,
    };

    vpcService
      .createImage(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getImage()', (done) => {
    const params = {
      id: dict.imageId,
    };

    vpcService
      .getImage(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test.skip('updateImage()', (done) => {
    const listParams = {
      limit: 1,
      visibility: 'private',
    };

    vpcService
      .listImages(listParams)
      .then((res) => {
        dict.privateImage = res.result.images[0].id;
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
    const params = {
      id: dict.privateImage,
      name: generateName('my-image'),
    };

    vpcService
      .updateImage(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // Operating Systems
  test('listOperatingSystems()', (done) => {
    const params = {
      limit: 1,
    };

    vpcService
      .listOperatingSystems(params)
      .then((res) => {
        dict.osName = res.result.operating_systems[0].name;
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getOperatingSystem()', (done) => {
    const params = {
      name: dict.osName,
    };

    vpcService
      .getOperatingSystem(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // Keys
  test('listKeys()', (done) => {
    vpcService
      .listKeys()
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createKey()', (done) => {
    const params = {
      publicKey:
        'AAAAB3NzaC1yc2EAAAADAQABAAABAQCcPJwUpNQr0MplO6UM5mfV4vlvY0RpD6gcXqodzZIjsoG31+hQxoJVU9yQcSjahktHFs7Fk2Mo79jUT3wVC8Pg6A3//IDFkLjVrg/mQVpIf6+GxIYEtVg6Tk4pP3YNoksrugGlpJ4LCR3HMe3fBQTQqTzObbb0cSF6xhW5UBq8vhqIkhYKd3KLGJnnrwsIGcwb5BRk68ZFYhreAomvx4jWjaBFlH98HhE4wUEVvJLRy/qR/0w3XVjTSgOlhXywaAOEkmwye7kgSglegCpHWwYNly+NxLONjqbX9rHbFHUVRShnFKh2+M6XKE3HowT/3Y1lDd2PiVQpJY0oQmebiRxB astha.jain@ibm.com',
      name: generateName('key'),
      type: 'rsa',
    };

    vpcService
      .createKey(params)
      .then((res) => {
        dict.createdKey = res.result.id;
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getKey()', (done) => {
    const params = {
      id: dict.createdKey,
    };

    vpcService
      .getKey(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateKey()', (done) => {
    const params = {
      id: dict.createdKey,
      name: generateName('key-2'),
    };

    vpcService
      .updateKey(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // Snapshots
  test('listSnapshots()', async () => {
    const res = await vpcService.listSnapshots();
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('createSnapshot()', async () => {
    // Request models needed by this operation.

    // VolumeIdentityById
    const volumeIdentityModel = {
      id: dict.createdVolume,
    };
    const params = {
      source_volume: volumeIdentityModel,
      name: generateName('snap1'),
    };
    const snapshotPrototype = {
      snapshotPrototype: params,
    };
    // SnapshotPrototypeSnapshotBySourceVolume
    const res = await vpcService.createSnapshot(snapshotPrototype);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
    const params2 = {
      source_volume: volumeIdentityModel,
      name: generateName('snap2'),
    };
    const snapshotPrototype2 = {
      snapshotPrototype: params2,
    };
    const res2 = await vpcService.createSnapshot(snapshotPrototype2);
    expect(res2).toBeDefined();
    expect(res2.result).toBeDefined();
    dict.snapshotId = res2.result.id;
  });
  test('getSnapshot()', async () => {
    const params = {
      id: dict.snapshotId,
    };

    const res = await vpcService.getSnapshot(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('updateSnapshot()', async () => {
    const params = {
      id: dict.snapshotId,
      name: generateName('snap3'),
    };

    const res = await vpcService.updateSnapshot(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('deleteSnapshot()', async () => {
    const params = {
      id: dict.snapshotId,
    };

    const res = await vpcService.deleteSnapshot(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('deleteSnapshots()', async () => {
    const params = {
      sourceVolumeId: dict.createdVolume,
    };

    const res = await vpcService.deleteSnapshots(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  // Instance Profiles
  test('listInstanceProfiles()', (done) => {
    vpcService
      .listInstanceProfiles({})
      .then((res) => {
        dict.instanceProfileName = res.result.profiles[0].name;
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getInstanceProfile()', (done) => {
    const params = {
      name: dict.instanceProfileName,
    };
    vpcService
      .getInstanceProfile(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // Templates
  test('listInstanceTemplates()', (done) => {
    vpcService
      .listInstanceTemplates({})
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createInstanceTemplate()', (done) => {
    const subnetIdentityModel = {
      id: dict.createdSubnet,
    };

    const networkInterfacePrototypeModel = {
      name: generateName('nic'),
      subnet: subnetIdentityModel,
    };

    const instanceProfileIdentityModel = {
      name: dict.instanceProfileName,
    };

    const vpcIdentityModel = {
      id: dict.createdVpc,
    };

    const zoneIdentityModel = {
      name: dict.zoneName,
    };

    const imageIdentityModel = {
      id: dict.imageId,
    };

    const instanceTemplatePrototypeModel = {
      name: generateName('template'),
      profile: instanceProfileIdentityModel,
      vpc: vpcIdentityModel,
      primary_network_interface: networkInterfacePrototypeModel,
      zone: zoneIdentityModel,
      image: imageIdentityModel,
    };

    const params = {
      instanceTemplatePrototype: instanceTemplatePrototypeModel,
    };

    vpcService
      .createInstanceTemplate(params)
      .then((res) => {
        dict.createdTemplate = res.result.id;
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getInstanceTemplate()', (done) => {
    const params = {
      id: dict.createdTemplate,
    };

    vpcService
      .getInstanceTemplate(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateInstanceTemplate()', (done) => {
    const params = {
      id: dict.createdTemplate,
      name: generateName('template'),
    };

    vpcService
      .updateInstanceTemplate(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // Instances
  test('listInstances()', (done) => {
    const params = {
      limit: 1,
    };

    vpcService
      .listInstances(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createInstance()', (done) => {
    const subnetIdentityModel = {
      id: dict.createdSubnet,
    };

    const networkInterfacePrototypeModel = {
      name: generateName('network-interface'),
      subnet: subnetIdentityModel,
    };

    const instanceProfileIdentityModel = {
      name: dict.instanceProfileName,
    };

    const vpcIdentityModel = {
      id: dict.createVpc,
    };

    const zoneIdentityModel = {
      name: dict.zoneName,
    };

    const imageIdentityModel = {
      id: dict.imageId,
    };

    const instancePrototypeModel = {
      name: generateName('instance'),
      profile: instanceProfileIdentityModel,
      vpc: vpcIdentityModel,
      primary_network_interface: networkInterfacePrototypeModel,
      zone: zoneIdentityModel,
      image: imageIdentityModel,
    };

    const params = {
      instancePrototype: instancePrototypeModel,
    };

    vpcService
      .createInstance(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdInstance = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getInstance()', (done) => {
    const params = {
      id: dict.createdInstance,
    };

    vpcService
      .getInstance(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateInstance()', (done) => {
    const params = {
      id: dict.createdInstance,
      name: generateName('my-instance-2'),
    };

    vpcService
      .updateInstance(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listBackupPolicies()', (done) => {
    const params = {
      limit: 1,
    };

    vpcService
      .listBackupPolicies(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createBackupPolicy()', (done) => {
    const params = {
      matchUserTags: ['tag1', 'tag2'],
      name: 'my-backup-policy',
    };

    vpcService
      .createBackupPolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdBackupPolicy = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getBackupPolicy()', (done) => {
    const params = {
      id: dict.createdBackupPolicy,
    };

    vpcService
      .getBackupPolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateBackupPolicy()', (done) => {
    const params = {
      id: dict.createdBackupPolicy,
      name: 'my-backup-policy-updated',
    };

    vpcService
      .updateBackupPolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listBackupPolicyPlans()', (done) => {
    const params = {
      backupPolicyId: dict.createdBackupPolicy,
    };

    vpcService
      .listBackupPolicyPlans(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createBackupPolicyPlan()', (done) => {
    const params = {
      backupPolicyId: dict.createdBackupPolicy,
      name: 'my-backup-policy-plan',
      cronSpec: '40 3 * * *',
    };
    vpcService
      .createBackupPolicyPlan(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdBackupPolicyPlan = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getBackupPolicyPlan()', (done) => {
    const params = {
      backupPolicyId: dict.createdBackupPolicy,
      id: dict.createdBackupPolicyPlan,
    };

    vpcService
      .getBackupPolicyPlan(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateBackupPolicyPlan()', (done) => {
    const params = {
      backupPolicyId: dict.createdBackupPolicy,
      id: dict.createdBackupPolicyPlan,
      name: 'my-backup-policy-plan-updated',
    };

    vpcService
      .updateBackupPolicyPlan(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getInstanceInitialization()', (done) => {
    const params = {
      id: dict.createdInstance,
    };

    vpcService
      .getInstanceInitialization(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createInstanceAction()', (done) => {
    const params = {
      instanceId: dict.createdInstance,
      type: 'reboot',
      force: true,
    };

    vpcService
      .createInstanceAction(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listInstanceNetworkInterfaces()', (done) => {
    const params = {
      instanceId: dict.createdInstance,
    };

    vpcService
      .listInstanceNetworkInterfaces(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdFirstVnic = res.result.network_interfaces[0].id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createInstanceNetworkInterface()', (done) => {
    const subnetIdentityModel = {
      id: dict.createdSubnet,
    };

    const params = {
      instanceId: dict.createdInstance,
      subnet: subnetIdentityModel,
      name: generateName('network-interface'),
    };

    vpcService
      .createInstanceNetworkInterface(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdSecondVnic = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getInstanceNetworkInterface()', (done) => {
    const params = {
      instanceId: dict.createdInstance,
      id: dict.createdSecondVnic,
    };

    vpcService
      .getInstanceNetworkInterface(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateInstanceNetworkInterface()', (done) => {
    const params = {
      instanceId: dict.createdInstance,
      id: dict.createdSecondVnic,
      name: generateName('nic'),
    };

    vpcService
      .updateInstanceNetworkInterface(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('addInstanceNetworkInterfaceFloatingIp()', (done) => {
    const params = {
      instanceId: dict.createdInstance,
      networkInterfaceId: dict.createdSecondVnic,
      id: dict.createdFloatingIp,
    };

    vpcService
      .addInstanceNetworkInterfaceFloatingIp(params)
      .then((res) => {
        expect(res.result).not.toBeNull();

        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listInstanceNetworkInterfaceFloatingIps()', (done) => {
    const params = {
      instanceId: dict.createdInstance,
      networkInterfaceId: dict.createdSecondVnic,
    };

    vpcService
      .listInstanceNetworkInterfaceFloatingIps(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getInstanceNetworkInterfaceFloatingIp()', (done) => {
    const params = {
      instanceId: dict.createdInstance,
      networkInterfaceId: dict.createdSecondVnic,
      id: dict.createdFloatingIp,
    };

    vpcService
      .getInstanceNetworkInterfaceFloatingIp(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('removeInstanceNetworkInterfaceFloatingIp()', (done) => {
    const params = {
      instanceId: dict.createdInstance,
      networkInterfaceId: dict.createdSecondVnic,
      id: dict.createdFloatingIp,
    };

    vpcService
      .removeInstanceNetworkInterfaceFloatingIp(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listInstanceNetworkInterfaceReservedIps()', (done) => {
    const params = {
      instanceId: dict.createdInstance,
      networkInterfaceId: dict.createdSecondVnic,
    };
    vpcService
      .listInstanceNetworkInterfaceIps(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdFirstReservedIpNi = res.result.ips[0].id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getInstanceNetworkInterfaceReservedIp()', (done) => {
    const params = {
      instanceId: dict.createdInstance,
      networkInterfaceId: dict.createdSecondVnic,
      id: dict.createdFirstReservedIpNi,
    };

    vpcService
      .getInstanceNetworkInterfaceIp(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listInstanceVolumeAttachments()', (done) => {
    const params = {
      instanceId: dict.createdInstance,
    };

    vpcService
      .listInstanceVolumeAttachments(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createInstanceVolumeAttachment()', (done) => {
    const volumeIdentityModel = {
      id: dict.createdVolume,
    };

    const params = {
      instanceId: dict.createdInstance,
      volume: volumeIdentityModel,
      name: generateName('my-volume-attachment'),
      deleteVolumeOnInstanceDelete: true,
    };

    vpcService
      .createInstanceVolumeAttachment(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdVolAttachment = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getInstanceVolumeAttachment()', (done) => {
    const params = {
      instanceId: dict.createdInstance,
      id: dict.createdVolAttachment,
    };

    vpcService
      .getInstanceVolumeAttachment(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateInstanceVolumeAttachment()', (done) => {
    const params = {
      instanceId: dict.createdInstance,
      id: dict.createdVolAttachment,
      deleteVolumeOnInstanceDelete: false,
    };

    vpcService
      .updateInstanceVolumeAttachment(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listBareMetalServerProfiles()', (done) => {
    vpcService
      .listBareMetalServerProfiles({})
      .then((res) => {
        dict.bareMetalServerProfileName = res.result.profiles[0].name;
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getBareMetalServerProfile()', async () => {
    const params = {
      name: dict.bareMetalServerProfileName,
    };

    const res = await vpcService.getBareMetalServerProfile(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('createBareMetalServer()', async () => {
    // Request models needed by this operation.

    // ImageIdentityById
    const imageIdentityModel = {
      id: dict.imageId,
    };

    // KeyIdentityById
    const keyIdentityModel = {
      id: dict.createdKey,
    };

    // BareMetalServerInitializationPrototype
    const bareMetalServerInitializationPrototypeModel = {
      image: imageIdentityModel,
      keys: [keyIdentityModel],
      user_data: 'testString',
    };

    // SubnetIdentityById
    const subnetIdentityModel = {
      id: dict.createdSubnet,
    };

    // BareMetalServerPrimaryNetworkInterfacePrototype
    const bareMetalServerPrimaryNetworkInterfacePrototypeModel = {
      allow_ip_spoofing: true,
      allowed_vlans: [4],
      enable_infrastructure_nat: true,
      interface_type: 'pci',
      name: 'my-network-interface',
      subnet: subnetIdentityModel,
    };

    // BareMetalServerProfileIdentityByName
    const bareMetalServerProfileIdentityModel = {
      name: dict.bareMetalServerProfileName,
    };

    // ZoneIdentityByName
    const zoneIdentityModel = {
      name: dict.zoneName,
    };

    // VPCIdentityById
    const vpcIdentityModel = {
      id: dict.createdVpc,
    };

    const params = {
      initialization: bareMetalServerInitializationPrototypeModel,
      primaryNetworkInterface: bareMetalServerPrimaryNetworkInterfacePrototypeModel,
      profile: bareMetalServerProfileIdentityModel,
      zone: zoneIdentityModel,
      name: 'my-bare-metal-server2',
      // networkInterfaces: [bareMetalServerNetworkInterfacePrototypeModel],
      // resourceGroup: resourceGroupIdentityModel,
      // trustedPlatformModule: bareMetalServerTrustedPlatformModulePrototypeModel,
      vpc: vpcIdentityModel,
    };

    const res = await vpcService.createBareMetalServer(params);
    dict.createdBareMetalServerId = res.result.id;
    dict.createdBareMetalServerDiskId = res.result.disks[0].id;
    dict.createdBareMetalServerNicId = res.result.primary_network_interface.id;
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listBareMetalServers()', async () => {
    const res = await vpcService.listBareMetalServers();
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test.skip('createBareMetalServerConsoleAccessToken()', async () => {
    const params = {
      bareMetalServerId: dict.createdBareMetalServerId,
      consoleType: 'serial',
      force: false,
    };

    const res = await vpcService.createBareMetalServerConsoleAccessToken(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listBareMetalServerDisks()', async () => {
    const params = {
      bareMetalServerId: dict.createdBareMetalServerId,
    };

    const res = await vpcService.listBareMetalServerDisks(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getBareMetalServerDisk()', async () => {
    const params = {
      bareMetalServerId: dict.createdBareMetalServerId,
      id: dict.createdBareMetalServerDiskId,
    };

    const res = await vpcService.getBareMetalServerDisk(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('updateBareMetalServerDisk()', async () => {
    const params = {
      bareMetalServerId: dict.createdBareMetalServerId,
      id: dict.createdBareMetalServerDiskId,
      name: 'my-bare-metal-server-disk-updated',
    };

    const res = await vpcService.updateBareMetalServerDisk(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listBareMetalServerNetworkInterfaces()', async () => {
    const params = {
      bareMetalServerId: dict.createdBareMetalServerId,
    };

    const res = await vpcService.listBareMetalServerNetworkInterfaces(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('createBareMetalServerNetworkInterface()', async () => {
    // Request models needed by this operation.

    // SubnetIdentityById
    const subnetIdentityModel = {
      id: dict.createdSubnet,
    };

    // BareMetalServerNetworkInterfacePrototypeBareMetalServerNetworkInterfaceByVLANPrototype
    const bareMetalServerNetworkInterfacePrototypeModel = {
      allow_ip_spoofing: true,
      enable_infrastructure_nat: true,
      interface_type: 'vlan',
      name: 'my-network-interface',
      subnet: subnetIdentityModel,
      allow_interface_to_float: false,
      vlan: 4,
    };

    const params = {
      bareMetalServerId: dict.createdBareMetalServerId,
      bareMetalServerNetworkInterfacePrototype: bareMetalServerNetworkInterfacePrototypeModel,
    };

    const res = await vpcService.createBareMetalServerNetworkInterface(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getBareMetalServerNetworkInterface()', async () => {
    const params = {
      bareMetalServerId: dict.createdBareMetalServerId,
      id: dict.createdBareMetalServerNicId,
    };

    const res = await vpcService.getBareMetalServerNetworkInterface(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('updateBareMetalServerNetworkInterface()', async () => {
    const params = {
      bareMetalServerId: dict.createdBareMetalServerId,
      id: dict.createdBareMetalServerNicId,
      allowIpSpoofing: true,
      allowedVlans: [4],
      enableInfrastructureNat: true,
      name: 'my-network-interface-updated',
    };

    const res = await vpcService.updateBareMetalServerNetworkInterface(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listBareMetalServerNetworkInterfaceFloatingIps()', async () => {
    const params = {
      bareMetalServerId: dict.createdBareMetalServerId,
      networkInterfaceId: dict.createdBareMetalServerNicId,
    };

    const res = await vpcService.listBareMetalServerNetworkInterfaceFloatingIps(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('addBareMetalServerNetworkInterfaceFloatingIp()', async () => {
    const params = {
      bareMetalServerId: dict.createdBareMetalServerId,
      networkInterfaceId: dict.createdBareMetalServerNicId,
      id: dict.createdFloatingIp,
    };

    const res = await vpcService.addBareMetalServerNetworkInterfaceFloatingIp(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getBareMetalServerNetworkInterfaceFloatingIp()', async () => {
    const params = {
      bareMetalServerId: dict.createdBareMetalServerId,
      networkInterfaceId: dict.createdBareMetalServerNicId,
      id: dict.createdFloatingIp,
    };

    const res = await vpcService.getBareMetalServerNetworkInterfaceFloatingIp(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getBareMetalServer()', async () => {
    const params = {
      id: dict.createdBareMetalServerId,
    };

    const res = await vpcService.getBareMetalServer(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('updateBareMetalServer()', async () => {
    // Request models needed by this operation.

    const params = {
      id: dict.createdBareMetalServerId,
      name: 'my-bare-metal-server-updated',
    };

    const res = await vpcService.updateBareMetalServer(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getBareMetalServerInitialization()', async () => {
    const params = {
      id: dict.createdBareMetalServerId,
    };

    const res = await vpcService.getBareMetalServerInitialization(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('restartBareMetalServer()', async () => {
    const params = {
      id: dict.createdBareMetalServerId,
    };

    const res = await vpcService.restartBareMetalServer(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('startBareMetalServer()', async () => {
    const params = {
      id: dict.createdBareMetalServerId,
    };

    const res = await vpcService.startBareMetalServer(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  // mock server doesn't support
  test.skip('listBareMetalServerNetworkInterfaceReservedIps()', (done) => {
    const params = {
      bareMetalServerId: dict.createdBareMetalServerId,
      networkInterfaceId: dict.createdBareMetalServerNicId,
    };
    vpcService
      .listBareMetalServerNetworkInterfaceIps(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdBareMetalFirstReservedIpNi = res.result.ips[0].id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // mock server doesn't support
  test.skip('getBareMetalServerNetworkInterfaceReservedIp()', (done) => {
    const params = {
      bareMetalServerId: dict.createdBareMetalServerId,
      networkInterfaceId: dict.createdBareMetalServerNicId,
      id: dict.createdBareMetalFirstReservedIpNi,
    };
    vpcService
      .getBareMetalServerNetworkInterfaceIp(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('stopBareMetalServer()', async () => {
    const params = {
      id: dict.createdBareMetalServerId,
      type: 'soft',
    };

    const res = await vpcService.stopBareMetalServer(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });

  test('deleteBareMetalServer()', async () => {
    const params = {
      id: dict.createdBareMetalServerId,
    };

    const res = await vpcService.deleteBareMetalServer(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listFlowLogCollectors()', (done) => {
    const params = {
      limit: 1,
    };

    vpcService
      .listFlowLogCollectors(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createFlowLogCollector()', (done) => {
    const cloudObjectStorageBucketIdentityModel = {
      name: 'bucket-27200-lwx4cfvcue',
    };

    const flowLogCollectorPrototypeTargetModel = {
      id: dict.createdSubnet,
    };

    const params = {
      storageBucket: cloudObjectStorageBucketIdentityModel,
      target: flowLogCollectorPrototypeTargetModel,
      name: generateName('my-flow-log-collector'),
      active: false,
    };

    vpcService
      .createFlowLogCollector(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.flowlog = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getFlowLogCollector()', (done) => {
    const params = {
      id: dict.flowlog,
    };

    vpcService
      .getFlowLogCollector(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateFlowLogCollector()', (done) => {
    const params = {
      id: dict.flowlog,
      active: true,
    };

    vpcService
      .updateFlowLogCollector(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // Volume Profiles
  test('listVolumeProfiles()', (done) => {
    const params = {
      limit: 1,
    };

    vpcService
      .listVolumeProfiles(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getVolumeProfile()', (done) => {
    const params = {
      name: 'general-purpose',
    };

    vpcService
      .getVolumeProfile(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // Volumes
  test('listVolumes()', (done) => {
    const params = {
      limit: 1,
    };

    vpcService
      .listVolumes(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getVolume()', (done) => {
    const params = {
      id: dict.createdVolume,
    };

    vpcService
      .getVolume(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateVolume()', (done) => {
    const params = {
      id: dict.createdVolume,
      name: generateName('my-volume-2'),
    };

    vpcService
      .updateVolume(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // Instance Groups
  test('listInstanceGroups()', (done) => {
    const params = {
      limit: 1,
    };

    vpcService
      .listInstanceGroups(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createInstanceGroup()', (done) => {
    const instanceTemplateIdentityModel = {
      id: dict.createdTemplate,
    };

    const subnetIdentityModel = {
      id: dict.createdSubnet,
    };

    const params = {
      instanceTemplate: instanceTemplateIdentityModel,
      subnets: [subnetIdentityModel],
      name: generateName('my-instance-group'),
      membershipCount: 1,
    };

    vpcService
      .createInstanceGroup(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdInstanceGroup = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getInstanceGroup()', (done) => {
    const params = {
      id: dict.createdInstanceGroup,
    };

    vpcService
      .getInstanceGroup(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateInstanceGroup()', (done) => {
    const params = {
      id: dict.createdInstanceGroup,
      membershipCount: 2,
    };

    vpcService
      .updateInstanceGroup(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listInstanceGroupManagers()', (done) => {
    const params = {
      instanceGroupId: dict.createdInstanceGroup,
    };

    vpcService
      .listInstanceGroupManagers(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createInstanceGroupManager()', (done) => {
    const instanceGroupManagerPrototypeModel = {
      name: generateName('my-instance-group-manager'),
      management_enabled: true,
      aggregation_window: 120,
      cooldown: 210,
      max_membership_count: 2,
      min_membership_count: 3,
      manager_type: 'autoscale',
    };

    const params = {
      instanceGroupId: dict.createdInstanceGroup,
      instanceGroupManagerPrototype: instanceGroupManagerPrototypeModel,
    };

    vpcService
      .createInstanceGroupManager(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdInstanceGroupManager = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getInstanceGroupManager()', (done) => {
    const params = {
      instanceGroupId: dict.createdInstanceGroup,
      id: dict.createdInstanceGroupManager,
    };

    vpcService
      .getInstanceGroupManager(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateInstanceGroupManager()', (done) => {
    const params = {
      instanceGroupId: dict.createdInstanceGroup,
      id: dict.createdInstanceGroupManager,
      cooldown: 240,
    };

    vpcService
      .updateInstanceGroupManager(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listInstanceGroupManagerPolicies()', (done) => {
    const params = {
      instanceGroupId: dict.createdInstanceGroup,
      instanceGroupManagerId: dict.createdInstanceGroupManager,
    };

    vpcService
      .listInstanceGroupManagerPolicies(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createInstanceGroupManagerPolicy()', (done) => {
    const instanceGroupManagerPolicyPrototypeModel = {
      name: generateName('my-instance-group-manager-policy'),
      metric_type: 'cpu',
      metric_value: 38,
      policy_type: 'target',
    };

    const params = {
      instanceGroupId: dict.createdInstanceGroup,
      instanceGroupManagerId: dict.createdInstanceGroupManager,
      instanceGroupManagerPolicyPrototype: instanceGroupManagerPolicyPrototypeModel,
    };

    vpcService
      .createInstanceGroupManagerPolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdInstanceGroupManagerPolicy = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getInstanceGroupManagerPolicy()', (done) => {
    const params = {
      instanceGroupId: dict.createdInstanceGroup,
      instanceGroupManagerId: dict.createdInstanceGroupManager,
      id: dict.createdInstanceGroupManagerPolicy,
    };

    vpcService
      .getInstanceGroupManagerPolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateInstanceGroupManagerPolicy()', (done) => {
    const params = {
      instanceGroupId: dict.createdInstanceGroup,
      instanceGroupManagerId: dict.createdInstanceGroupManager,
      id: dict.createdInstanceGroupManagerPolicy,
      metricType: 'cpu',
      metricValue: 33,
      // name: generateName('igm-policy'),
    };

    vpcService
      .updateInstanceGroupManagerPolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listInstanceGroupMemberships()', (done) => {
    const params = {
      instanceGroupId: dict.createdInstanceGroup,
    };

    vpcService
      .listInstanceGroupMemberships(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.membershipId = res.result.memberships[0].id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getInstanceGroupMembership()', (done) => {
    const params = {
      instanceGroupId: dict.createdInstanceGroup,
      id: dict.membershipId,
    };

    vpcService
      .getInstanceGroupMembership(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateInstanceGroupMembership()', (done) => {
    const params = {
      instanceGroupId: dict.createdInstanceGroup,
      id: dict.membershipId,
      name: generateName('membership'),
    };

    vpcService
      .updateInstanceGroupMembership(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test.skip('deleteInstanceGroupLoadBalancer()', (done) => {
    const params = {
      instanceGroupId: dict.createdInstanceGroup,
    };

    vpcService
      .deleteInstanceGroupLoadBalancer(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteInstanceGroupMembership()', (done) => {
    const params = {
      instanceGroupId: dict.createdInstanceGroup,
      id: dict.membershipId,
    };

    vpcService
      .deleteInstanceGroupMembership(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteInstanceGroupMemberships()', (done) => {
    const params = {
      instanceGroupId: dict.createdInstanceGroup,
    };

    vpcService
      .deleteInstanceGroupMemberships(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteInstanceGroupManagerPolicy()', (done) => {
    const params = {
      instanceGroupId: dict.createdInstanceGroup,
      instanceGroupManagerId: dict.createdInstanceGroupManager,
      id: dict.createdInstanceGroupManagerPolicy,
    };

    vpcService
      .deleteInstanceGroupManagerPolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteInstanceGroupManager()', (done) => {
    const params = {
      instanceGroupId: dict.createdInstanceGroup,
      id: dict.createdInstanceGroupManager,
    };

    vpcService
      .deleteInstanceGroupManager(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteInstanceGroup()', (done) => {
    const params = {
      id: dict.createdInstanceGroup,
    };

    vpcService
      .deleteInstanceGroup(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // Public Gateways
  test('listPublicGateways()', (done) => {
    const params = {
      limit: 1,
    };

    vpcService
      .listPublicGateways(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('getPublicGateway()', (done) => {
    const params = {
      id: dict.createdPgw,
    };

    vpcService
      .getPublicGateway(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updatePublicGateway()', (done) => {
    const params = {
      id: dict.createdPgw,
      name: generateName('my-public-gateway-2'),
    };

    vpcService
      .updatePublicGateway(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listFloatingIps()', (done) => {
    const params = {
      limit: 1,
    };

    vpcService
      .listFloatingIps(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getFloatingIp()', (done) => {
    const params = {
      id: dict.createdFloatingIp,
    };

    vpcService
      .getFloatingIp(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateFloatingIp()', (done) => {
    const params = {
      id: dict.createdFloatingIp,
      name: generateName('my-floating-ip-2'),
    };

    vpcService
      .updateFloatingIp(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listNetworkAcls()', (done) => {
    const params = {
      limit: 1,
    };

    vpcService
      .listNetworkAcls(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('getNetworkAcl()', (done) => {
    const params = {
      id: dict.createdNetworkACL,
    };

    vpcService
      .getNetworkAcl(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateNetworkAcl()', (done) => {
    const params = {
      id: dict.createdNetworkACL,
      name: generateName('my-network-acl-2'),
    };

    vpcService
      .updateNetworkAcl(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // Access Control List ACL
  test('listNetworkAclRules()', (done) => {
    const params = {
      limit: 1,
      networkAclId: dict.createdNetworkACL,
    };

    vpcService
      .listNetworkAclRules(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createNetworkAclRule()', (done) => {
    const networkAclRulePrototypeModel = {
      name: generateName('my-rule-2'),
      action: 'allow',
      destination: '192.168.3.2/32',
      direction: 'inbound',
      source: '192.168.3.2/32',
      protocol: 'tcp',
      code: 0,
      type: 8,
    };

    const params = {
      networkAclId: dict.createdNetworkACL,
      networkAclRulePrototype: networkAclRulePrototypeModel,
    };

    vpcService
      .createNetworkAclRule(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdNetworkACLRule = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getNetworkAclRule()', (done) => {
    const params = {
      networkAclId: dict.createdNetworkACL,
      id: dict.createdNetworkACLRule,
    };

    vpcService
      .getNetworkAclRule(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateNetworkAclRule()', (done) => {
    const params = {
      networkAclId: dict.createdNetworkACL,
      id: dict.createdNetworkACLRule,
      code: 0,
      type: 68,
    };

    vpcService
      .updateNetworkAclRule(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteNetworkAclRule()', (done) => {
    const params = {
      networkAclId: dict.createdNetworkACL,
      id: dict.createdNetworkACLRule,
    };

    vpcService
      .deleteNetworkAclRule(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // Security Groups
  test('listSecurityGroups()', (done) => {
    const params = {
      limit: 1,
    };

    vpcService
      .listSecurityGroups(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getSecurityGroup()', (done) => {
    const params = {
      id: dict.createdSG,
    };

    vpcService
      .getSecurityGroup(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateSecurityGroup()', (done) => {
    const params = {
      id: dict.createdSG,
      name: generateName('my-security-group-2'),
    };

    vpcService
      .updateSecurityGroup(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listSecurityGroupRules()', (done) => {
    const params = {
      securityGroupId: dict.createdSG,
    };

    vpcService
      .listSecurityGroupRules(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createSecurityGroupRule()', (done) => {
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
      securityGroupId: dict.createdSG,
      securityGroupRulePrototype: securityGroupRulePrototypeModel,
    };

    vpcService
      .createSecurityGroupRule(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
        dict.createdSGRule = res.result.id;
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getSecurityGroupRule()', (done) => {
    const params = {
      securityGroupId: dict.createdSG,
      id: dict.createdSGRule,
    };

    vpcService
      .getSecurityGroupRule(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateSecurityGroupRule()', (done) => {
    const params = {
      securityGroupId: dict.createdSG,
      id: dict.createdSGRule,
      type: 38,
    };

    vpcService
      .updateSecurityGroupRule(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteSecurityGroupRule()', (done) => {
    const params = {
      securityGroupId: dict.createdSG,
      id: dict.createdSGRule,
    };

    vpcService
      .deleteSecurityGroupRule(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteSecurityGroup()', (done) => {
    const params = {
      id: dict.createdSG,
    };

    vpcService
      .deleteSecurityGroup(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // VPN Gateways
  test('listIkePolicies()', (done) => {
    const params = {
      limit: 1,
    };

    vpcService
      .listIkePolicies(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createIkePolicy()', (done) => {
    const params = {
      authenticationAlgorithm: 'md5',
      dhGroup: 2,
      encryptionAlgorithm: 'triple_des',
      ikeVersion: 1,
      name: generateName('my-ike-policy'),
      keyLifetime: 28800,
    };

    vpcService
      .createIkePolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdIkePolicy = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getIkePolicy()', (done) => {
    const params = {
      id: dict.createdIkePolicy,
    };

    vpcService
      .getIkePolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateIkePolicy()', (done) => {
    const params = {
      id: dict.createdIkePolicy,
      authenticationAlgorithm: 'md5',
      dhGroup: 2,
      encryptionAlgorithm: 'triple_des',
      ikeVersion: 1,
      keyLifetime: 28800,
    };

    vpcService
      .updateIkePolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listIkePolicyConnections()', (done) => {
    const params = {
      id: dict.createdIkePolicy,
    };

    vpcService
      .listIkePolicyConnections(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listIpsecPolicies()', (done) => {
    const params = {
      limit: 1,
    };

    vpcService
      .listIpsecPolicies(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createIpsecPolicy()', (done) => {
    const params = {
      authenticationAlgorithm: 'md5',
      encryptionAlgorithm: 'triple_des',
      pfs: 'disabled',
      name: generateName('my-ipsec-policy'),
      keyLifetime: 3600,
    };

    vpcService
      .createIpsecPolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdIpsec = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getIpsecPolicy()', (done) => {
    const params = {
      id: dict.createdIpsec,
    };

    vpcService
      .getIpsecPolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateIpsecPolicy()', (done) => {
    const params = {
      id: dict.createdIpsec,
      authenticationAlgorithm: 'md5',
      encryptionAlgorithm: 'triple_des',
      keyLifetime: 3600,
      pfs: 'disabled',
    };

    vpcService
      .updateIpsecPolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listIpsecPolicyConnections()', (done) => {
    const params = {
      id: dict.createdIpsec,
    };

    vpcService
      .listIpsecPolicyConnections(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listVpnGateways()', (done) => {
    const params = {
      limit: 1,
    };

    vpcService
      .listVpnGateways(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createVpnGateway()', (done) => {
    const subnetIdentityModel = {
      id: dict.createdSubnet,
    };

    const vpnGatewayPrototypeModel = {
      subnet: subnetIdentityModel,
      name: generateName('my-vpn-gateway'),
    };

    const params = {
      vpnGatewayPrototype: vpnGatewayPrototypeModel,
    };

    vpcService
      .createVpnGateway(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdVpnGateway = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getVpnGateway()', (done) => {
    const params = {
      id: dict.createdVpnGateway,
    };

    vpcService
      .getVpnGateway(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateVpnGateway()', (done) => {
    const params = {
      id: dict.createdVpnGateway,
      name: generateName('my-vpn-gateway'),
    };

    vpcService
      .updateVpnGateway(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listVpnGatewayConnections()', (done) => {
    const params = {
      vpnGatewayId: dict.createdVpnGateway,
    };

    vpcService
      .listVpnGatewayConnections(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createVpnGatewayConnection()', (done) => {
    const vpnGatewayConnectionPrototypeModel = {
      peerAddress: '169.21.50.5',
      psk: 'lkj14b1oi0alcniejkso',
      name: 'my-vpn-connection',
    };
    const params = {
      vpnGatewayId: dict.createdVpnGateway,
      vpnGatewayConnectionPrototype: vpnGatewayConnectionPrototypeModel,
    };

    vpcService
      .createVpnGatewayConnection(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdVpnGatewayConnection = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getVpnGatewayConnection()', (done) => {
    const params = {
      vpnGatewayId: dict.createdVpnGateway,
      id: dict.createdVpnGatewayConnection,
    };

    vpcService
      .getVpnGatewayConnection(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateVpnGatewayConnection()', (done) => {
    const vpnGatewayConnectionPatchModel = {
      adminStateUp: true,
    };

    const params = {
      vpnGatewayId: dict.createdVpnGateway,
      id: dict.createdVpnGatewayConnection,
      vpnGatewayConnectionPatch: vpnGatewayConnectionPatchModel,
    };

    vpcService
      .updateVpnGatewayConnection(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('addVpnGatewayConnectionLocalCidr()', (done) => {
    const params = {
      vpnGatewayId: dict.createdVpnGateway,
      id: dict.createdVpnGatewayConnection,
      cidrPrefix: '192.129.10.0',
      prefixLength: '28',
    };
    vpcService
      .addVpnGatewayConnectionLocalCidr(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listVpnGatewayConnectionLocalCidrs()', (done) => {
    const params = {
      vpnGatewayId: dict.createdVpnGateway,
      id: dict.createdVpnGatewayConnection,
    };

    vpcService
      .listVpnGatewayConnectionLocalCidrs(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('checkVpnGatewayConnectionLocalCidr()', (done) => {
    const params = {
      vpnGatewayId: dict.createdVpnGateway,
      id: dict.createdVpnGatewayConnection,
      cidrPrefix: '192.129.10.0',
      prefixLength: '28',
    };

    vpcService
      .checkVpnGatewayConnectionLocalCidr(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('removeVpnGatewayConnectionLocalCidr()', (done) => {
    const params = {
      vpnGatewayId: dict.createdVpnGateway,
      id: dict.createdVpnGatewayConnection,
      cidrPrefix: '192.129.10.0',
      prefixLength: '28',
    };

    vpcService
      .removeVpnGatewayConnectionLocalCidr(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('addVpnGatewayConnectionPeerCidr()', (done) => {
    const params = {
      vpnGatewayId: dict.createdVpnGateway,
      id: dict.createdVpnGatewayConnection,
      cidrPrefix: '199.129.10.0',
      prefixLength: '28',
    };

    vpcService
      .addVpnGatewayConnectionPeerCidr(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listVpnGatewayConnectionPeerCidrs()', (done) => {
    const params = {
      vpnGatewayId: dict.createdVpnGateway,
      id: dict.createdVpnGatewayConnection,
    };

    vpcService
      .listVpnGatewayConnectionPeerCidrs(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('checkVpnGatewayConnectionPeerCidr()', (done) => {
    const params = {
      vpnGatewayId: dict.createdVpnGateway,
      id: dict.createdVpnGatewayConnection,
      cidrPrefix: '199.129.10.0',
      prefixLength: '28',
    };

    vpcService
      .checkVpnGatewayConnectionPeerCidr(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('removeVpnGatewayConnectionPeerCidr()', (done) => {
    const params = {
      vpnGatewayId: dict.createdVpnGateway,
      id: dict.createdVpnGatewayConnection,
      cidrPrefix: '199.129.10.0',
      prefixLength: '28',
    };

    vpcService
      .removeVpnGatewayConnectionPeerCidr(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteIpsecPolicy()', (done) => {
    const params = {
      id: dict.createdIpsec,
    };

    vpcService
      .deleteIpsecPolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteIkePolicy()', (done) => {
    const params = {
      id: dict.createdIkePolicy,
    };

    vpcService
      .deleteIkePolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteVpnGatewayConnection()', (done) => {
    const params = {
      vpnGatewayId: dict.createdVpnGateway,
      id: dict.createdVpnGatewayConnection,
    };

    vpcService
      .deleteVpnGatewayConnection(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteVpnGateway()', (done) => {
    const params = {
      id: dict.createdVpnGateway,
    };

    vpcService
      .deleteVpnGateway(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // VPN Server
  test('listVpnServers()', (done) => {
    const params = {};

    vpcService
      .listVpnServers(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createVpnServer()', (done) => {
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
      id: dict.createdSubnet,
    };

    const params = {
      certificate: certificateInstanceIdentityModel,
      clientAuthentication: [vpnServerAuthenticationPrototypeModel],
      clientIpPool: '127.0.0.0/8',
      subnets: [subnetIdentityModel],
      name: 'my-vpn-server',
    };

    vpcService
      .createVpnServer(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdVPNServer = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getVpnServer()', (done) => {
    const params = {
      id: dict.createdVPNServer,
    };

    vpcService
      .getVpnServer(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateVpnServer()', (done) => {
    const params = {
      id: dict.createdVPNServer,
      name: 'my-reserved-ip',
    };

    vpcService
      .updateVpnServer(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getVpnServerClientConfiguration()', (done) => {
    const params = {
      id: dict.createdVPNServer,
    };

    vpcService
      .getVpnServerClientConfiguration(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listVpnServerClients()', (done) => {
    const params = {
      vpnServerId: dict.createdVPNServer,
    };

    vpcService
      .listVpnServerClients(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdVPNServerClient = res.result.clients[0].id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getVpnServerClient()', (done) => {
    const params = {
      vpnServerId: dict.createdVPNServer,
      id: dict.createdVPNServerClient,
    };

    vpcService
      .getVpnServerClient(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('disconnectVpnClient()', (done) => {
    const params = {
      vpnServerId: dict.createdVPNServer,
      id: dict.createdVPNServerClient,
    };

    vpcService
      .disconnectVpnClient(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listVpnServerRoutes()', (done) => {
    const params = {
      vpnServerId: dict.createdVPNServer,
    };

    vpcService
      .listVpnServerRoutes(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createVpnServerRoute()', (done) => {
    const params = {
      vpnServerId: dict.createdVPNServer,
      destination: '172.16.0.0/16',
      action: 'deliver',
      name: 'my-vpn-route-1',
    };
    vpcService
      .createVpnServerRoute(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdVPNServerRoute = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getVpnServerRoute()', (done) => {
    const params = {
      vpnServerId: dict.createdVPNServer,
      id: dict.createdVPNServerRoute,
    };
    vpcService
      .getVpnServerRoute(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateVpnServerRoute()', (done) => {
    const params = {
      vpnServerId: dict.createdVPNServer,
      id: dict.createdVPNServerRoute,
      name: 'my-vpn-route-2',
    };
    vpcService
      .updateVpnServerRoute(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // VPN Server Delete
  test('deleteVpnServerRoute()', (done) => {
    const params = {
      vpnServerId: dict.createdVPNServer,
      id: dict.createdVPNServerRoute,
    };
    vpcService
      .deleteVpnServerRoute(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteVpnServerClient()', (done) => {
    const params = {
      vpnServerId: dict.createdVPNServer,
      id: dict.createdVPNServerClient,
    };
    vpcService
      .deleteVpnServerClient(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteVpnServer()', (done) => {
    const params = {
      id: dict.createdVPNServer,
    };
    vpcService
      .deleteVpnServer(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  // Load Balancer
  test('listLoadBalancerProfiles()', (done) => {
    const params = {
      limit: 1,
    };

    vpcService
      .listLoadBalancerProfiles(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getLoadBalancerProfile()', (done) => {
    const params = {
      name: 'network-fixed',
    };

    vpcService
      .getLoadBalancerProfile(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listLoadBalancers()', (done) => {
    vpcService
      .listLoadBalancers({})
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createLoadBalancer()', (done) => {
    const subnetIdentityModel = {
      id: dict.createdSubnet,
    };

    const params = {
      isPublic: true,
      subnets: [subnetIdentityModel],
      name: generateName('my-load-balancer'),
    };

    vpcService
      .createLoadBalancer(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdLoadBalancer = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getLoadBalancer()', (done) => {
    const params = {
      id: dict.createdLoadBalancer,
    };

    vpcService
      .getLoadBalancer(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateLoadBalancer()', (done) => {
    const params = {
      id: dict.createdLoadBalancer,
      name: generateName('my-load-balancer-2'),
    };

    vpcService
      .updateLoadBalancer(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getLoadBalancerStatistics()', (done) => {
    const params = {
      id: dict.createdLoadBalancer,
    };

    vpcService
      .getLoadBalancerStatistics(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listLoadBalancerListeners()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
    };

    vpcService
      .listLoadBalancerListeners(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createLoadBalancerListener()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      port: 443,
      protocol: 'http',
    };

    vpcService
      .createLoadBalancerListener(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdLoadBalancerListener = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getLoadBalancerListener()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      id: dict.createdLoadBalancerListener,
    };

    vpcService
      .getLoadBalancerListener(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateLoadBalancerListener()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      id: dict.createdLoadBalancerListener,
      connectionLimit: 2000,
      port: 444,
      protocol: 'http',
    };

    vpcService
      .updateLoadBalancerListener(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listLoadBalancerListenerPolicies()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      listenerId: dict.createdLoadBalancerListener,
    };

    vpcService
      .listLoadBalancerListenerPolicies(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createLoadBalancerListenerPolicy()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      listenerId: dict.createdLoadBalancerListener,
      priority: 5,
      action: 'forward',
      name: generateName('my-policy'),
    };

    vpcService
      .createLoadBalancerListenerPolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdListenerPolicy = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getLoadBalancerListenerPolicy()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      listenerId: dict.createdLoadBalancerListener,
      id: dict.createdListenerPolicy,
    };

    vpcService
      .getLoadBalancerListenerPolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateLoadBalancerListenerPolicy()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      listenerId: dict.createdLoadBalancerListener,
      id: dict.createdListenerPolicy,
      name: generateName('my-policy-2'),
      priority: 10,
    };

    vpcService
      .updateLoadBalancerListenerPolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listLoadBalancerListenerPolicyRules()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      listenerId: dict.createdLoadBalancerListener,
      policyId: dict.createdListenerPolicy,
    };

    vpcService
      .listLoadBalancerListenerPolicyRules(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createLoadBalancerListenerPolicyRule()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      listenerId: dict.createdLoadBalancerListener,
      policyId: dict.createdListenerPolicy,
      condition: 'contains',
      type: 'header',
      value: 'testString',
      field: 'MY-APP-HEADER',
    };

    vpcService
      .createLoadBalancerListenerPolicyRule(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdListenerPolicyRule = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getLoadBalancerListenerPolicyRule()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      listenerId: dict.createdLoadBalancerListener,
      policyId: dict.createdListenerPolicy,
      id: dict.createdListenerPolicyRule,
    };

    vpcService
      .getLoadBalancerListenerPolicyRule(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateLoadBalancerListenerPolicyRule()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      listenerId: dict.createdLoadBalancerListener,
      policyId: dict.createdListenerPolicy,
      id: dict.createdListenerPolicyRule,
      condition: 'contains',
      field: 'MY-APP-HEADER',
      type: 'header',
      value: 'testString',
    };

    vpcService
      .updateLoadBalancerListenerPolicyRule(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listLoadBalancerPools()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
    };

    vpcService
      .listLoadBalancerPools(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createLoadBalancerPool()', (done) => {
    const loadBalancerPoolHealthMonitorPrototypeModel = {
      delay: 5,
      max_retries: 2,
      port: 22,
      timeout: 2,
      type: 'http',
      url_path: '/',
    };

    const loadBalancerPoolSessionPersistencePrototypeModel = {
      type: 'source_ip',
    };

    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      algorithm: 'least_connections',
      protocol: 'http',
      healthMonitor: loadBalancerPoolHealthMonitorPrototypeModel,
      sessionPersistence: loadBalancerPoolSessionPersistencePrototypeModel,
    };

    vpcService
      .createLoadBalancerPool(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdLoadBalancerPool = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getLoadBalancerPool()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      id: dict.createdLoadBalancerPool,
    };

    vpcService
      .getLoadBalancerPool(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateLoadBalancerPool()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      id: dict.createdLoadBalancerPool,
      name: generateName('my-load-balancer-pool'),
    };

    vpcService
      .updateLoadBalancerPool(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listLoadBalancerPoolMembers()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      poolId: dict.createdLoadBalancerPool,
    };

    vpcService
      .listLoadBalancerPoolMembers(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createLoadBalancerPoolMember()', (done) => {
    const loadBalancerPoolMemberTargetPrototypeModel = {
      id: {
        address: '192.168.3.4',
      },
    };

    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      poolId: dict.createdLoadBalancerPool,
      port: 80,
      target: loadBalancerPoolMemberTargetPrototypeModel,
      weight: 50,
    };

    vpcService
      .createLoadBalancerPoolMember(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdLoadBalancerPoolMember = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getLoadBalancerPoolMember()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      poolId: dict.createdLoadBalancerPool,
      id: dict.createdLoadBalancerPoolMember,
    };

    vpcService
      .getLoadBalancerPoolMember(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateLoadBalancerPoolMember()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      poolId: dict.createdLoadBalancerPool,
      id: dict.createdLoadBalancerPoolMember,
      port: 80,
      weight: 55,
    };

    vpcService
      .updateLoadBalancerPoolMember(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteLoadBalancerPoolMember()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      poolId: dict.createdLoadBalancerPool,
      id: dict.createdLoadBalancerPoolMember,
    };

    vpcService
      .deleteLoadBalancerPoolMember(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('replaceLoadBalancerPoolMembers()', (done) => {
    const loadBalancerPoolMemberPrototypeModel = {
      port: 80,
      weight: 50,
    };

    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      poolId: dict.createdLoadBalancerPool,
      members: [loadBalancerPoolMemberPrototypeModel],
    };

    vpcService
      .replaceLoadBalancerPoolMembers(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteLoadBalancerPool()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      id: dict.createdLoadBalancerPool,
    };

    vpcService
      .deleteLoadBalancerPool(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteLoadBalancerListenerPolicyRule()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      listenerId: dict.createdLoadBalancerListener,
      policyId: dict.createdListenerPolicy,
      id: dict.createdListenerPolicyRule,
    };

    vpcService
      .deleteLoadBalancerListenerPolicyRule(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteLoadBalancerListenerPolicy()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      listenerId: dict.createdLoadBalancerListener,
      id: dict.createdListenerPolicy,
    };

    vpcService
      .deleteLoadBalancerListenerPolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteLoadBalancerListener()', (done) => {
    const params = {
      loadBalancerId: dict.createdLoadBalancer,
      id: dict.createdLoadBalancerListener,
    };

    vpcService
      .deleteLoadBalancerListener(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteLoadBalancer()', (done) => {
    const params = {
      id: dict.createdLoadBalancer,
    };

    vpcService
      .deleteLoadBalancer(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listSubnetReservedIps()', (done) => {
    const params = {
      subnetId: dict.createdSubnet,
    };

    vpcService
      .listSubnetReservedIps(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createSubnetReservedIp()', (done) => {
    const params = {
      subnetId: dict.createdSubnet,
      autoDelete: false,
      name: 'my-reserved-ip',
    };

    vpcService
      .createSubnetReservedIp(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdReservedIp = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getSubnetReservedIp()', (done) => {
    const params = {
      subnetId: dict.createdSubnet,
      id: dict.createdReservedIp,
    };

    vpcService
      .getSubnetReservedIp(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateSubnetReservedIp()', (done) => {
    const params = {
      subnetId: dict.createdSubnet,
      id: dict.createdReservedIp,
      autoDelete: false,
      name: 'my-reserved-ip',
    };

    vpcService
      .updateSubnetReservedIp(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listEndpointGateways()', (done) => {
    vpcService
      .listEndpointGateways()
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createEndpointGateway()', (done) => {
    const params = {
      target: {
        name: 'ibm-ntp-server',
        resource_type: 'provider_infrastructure_service',
      },
      vpc: { id: dict.createdVpc },
      name: generateName('endpoint-gateway'),
    };

    vpcService
      .createEndpointGateway(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdEndpointGateway = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listEndpointGatewayIps()', (done) => {
    const params = {
      endpointGatewayId: dict.createdEndpointGateway,
    };

    vpcService
      .listEndpointGatewayIps(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('addEndpointGatewayIp()', (done) => {
    const params = {
      endpointGatewayId: dict.createdEndpointGateway,
      id: dict.createdReservedIp,
    };

    vpcService
      .addEndpointGatewayIp(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getEndpointGatewayIp()', (done) => {
    const params = {
      endpointGatewayId: dict.createdEndpointGateway,
      id: dict.createdReservedIp,
    };

    vpcService
      .getEndpointGatewayIp(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getEndpointGateway()', (done) => {
    const params = {
      id: dict.createdEndpointGateway,
    };

    vpcService
      .getEndpointGateway(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateEndpointGateway()', (done) => {
    const params = {
      id: dict.createdEndpointGateway,
      name: 'my-endpoint-gateway',
    };

    vpcService
      .updateEndpointGateway(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('removeEndpointGatewayIp()', (done) => {
    const params = {
      endpointGatewayId: dict.createdEndpointGateway,
      id: dict.createdReservedIp,
    };

    vpcService
      .removeEndpointGatewayIp(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteEndpointGateway()', (done) => {
    const params = {
      id: dict.createdEndpointGateway,
    };

    vpcService
      .deleteEndpointGateway(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteSubnetReservedIp()', (done) => {
    const params = {
      subnetId: dict.createdSubnet,
      id: dict.createdReservedIp,
    };

    vpcService
      .deleteSubnetReservedIp(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getVpcDefaultRoutingTable()', (done) => {
    const params = {
      id: dict.createdVpc,
    };

    vpcService
      .getVpcDefaultRoutingTable(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listVpcRoutingTables()', (done) => {
    const params = {
      vpcId: dict.createdVpc,
    };

    vpcService
      .listVpcRoutingTables(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createVpcRoutingTable()', (done) => {
    const routeNextHopPrototypeModel = {
      address: '192.168.3.4',
    };

    const zoneIdentityModel = {
      name: dict.zone,
    };

    const routePrototypeModel = {
      action: 'delegate',
      destination: '192.168.3.0/24',
      name: 'my-route-2',
      next_hop: routeNextHopPrototypeModel,
      zone: zoneIdentityModel,
    };

    const params = {
      vpcId: dict.createdVpc,
      name: 'my-routing-table-2',
      routes: [routePrototypeModel],
    };

    vpcService
      .createVpcRoutingTable(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdVpcRoutingTable = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createVpcRoutingTable2()', (done) => {
    const routeNextHopPrototypeModel = {
      address: '192.168.3.5',
    };

    const zoneIdentityModel = {
      name: dict.zone,
    };

    const routePrototypeModel = {
      action: 'delegate',
      destination: '192.168.3.0/24',
      name: 'my-route-2',
      next_hop: routeNextHopPrototypeModel,
      zone: zoneIdentityModel,
    };

    const params = {
      vpcId: dict.createdVpc,
      name: 'my-routing-table-3',
      routes: [routePrototypeModel],
    };

    vpcService
      .createVpcRoutingTable(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdVpcRoutingTable2 = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getVpcRoutingTable()', (done) => {
    const params = {
      vpcId: dict.createdVpc,
      id: dict.createdVpcRoutingTable,
    };

    vpcService
      .getVpcRoutingTable(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateVpcRoutingTable()', (done) => {
    const params = {
      vpcId: dict.createdVpc,
      id: dict.createdVpcRoutingTable,
      name: 'my-routing-table-2',
    };

    vpcService
      .updateVpcRoutingTable(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listVpcRoutingTableRoutes()', (done) => {
    const params = {
      vpcId: dict.createdVpc,
      routingTableId: dict.createdVpcRoutingTable,
    };

    vpcService
      .listVpcRoutingTableRoutes(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createVpcRoutingTableRoute()', (done) => {
    const routeNextHopPrototypeModel = {
      address: '192.168.3.4',
    };

    const zoneIdentityModel = {
      name: dict.zoneName,
    };

    const params = {
      vpcId: dict.createdVpc,
      routingTableId: dict.createdVpcRoutingTable,
      destination: '192.168.3.0/24',
      nextHop: routeNextHopPrototypeModel,
      zone: zoneIdentityModel,
      action: 'delegate',
      name: 'my-route-2',
    };

    vpcService
      .createVpcRoutingTableRoute(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdVpcRoutingTableRoute = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getVpcRoutingTableRoute()', (done) => {
    const params = {
      vpcId: dict.createdVpc,
      routingTableId: dict.createdVpcRoutingTable,
      id: dict.createdVpcRoutingTableRoute,
    };

    vpcService
      .getVpcRoutingTableRoute(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateVpcRoutingTableRoute()', (done) => {
    const params = {
      vpcId: dict.createdVpc,
      routingTableId: dict.createdVpcRoutingTable,
      id: dict.createdVpcRoutingTableRoute,
      name: 'my-route-2',
    };

    vpcService
      .updateVpcRoutingTableRoute(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listDedicatedHostGroups()', (done) => {
    vpcService
      .listDedicatedHostGroups()
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createDedicatedHostGroup()', (done) => {
    const params = {
      _class: 'mx2',
      family: 'balanced',
      zone: { name: dict.zoneName },
      name: 'my-dedicated-host-group-1',
    };

    vpcService
      .createDedicatedHostGroup(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdDHGroup = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getDedicatedHostGroup()', (done) => {
    const params = {
      id: dict.createdDHGroup,
    };

    vpcService
      .getDedicatedHostGroup(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateDedicatedHostGroup()', (done) => {
    const params = {
      id: dict.createdDHGroup,
      name: 'my-host-group-modified',
    };

    vpcService
      .updateDedicatedHostGroup(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listDedicatedHostProfiles()', (done) => {
    vpcService
      .listDedicatedHostProfiles()
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.dhProfileName = res.result.profiles[0].name;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getDedicatedHostProfile()', (done) => {
    const params = {
      name: dict.dhProfileName,
    };

    vpcService
      .getDedicatedHostProfile(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listDedicatedHosts()', (done) => {
    vpcService
      .listDedicatedHosts()
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createDedicatedHost()', (done) => {
    const dedicatedHostProfileIdentityModel = {
      name: dict.dhProfileName,
    };

    const dedicatedHostGroupIdentityModel = {
      id: dict.createdDHGroup,
    };

    const dedicatedHostPrototypeModel = {
      name: 'my-host',
      profile: dedicatedHostProfileIdentityModel,
      group: dedicatedHostGroupIdentityModel,
    };

    const params = {
      dedicatedHostPrototype: dedicatedHostPrototypeModel,
    };

    vpcService
      .createDedicatedHost(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdDH = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getDedicatedHost()', (done) => {
    const params = {
      id: dict.createdDH,
    };

    vpcService
      .getDedicatedHost(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateDedicatedHost()', (done) => {
    const params = {
      id: dict.createdDH,
      name: 'my-host-modified',
    };

    vpcService
      .updateDedicatedHost(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteDedicatedHostGroup()', (done) => {
    const params = {
      id: dict.createdDHGroup,
    };

    vpcService
      .deleteDedicatedHostGroup(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteDedicatedHost()', (done) => {
    const params = {
      id: dict.createdDH,
    };

    vpcService
      .deleteDedicatedHost(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('CreatePlacementGroup()', (done) => {
    const params = {
      strategy: 'host_spread',
      name: 'my-placement-group',
    };

    vpcService
      .createPlacementGroup(params)
      .then((res) => {
        dict.placementGroupId = res.result.id;
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('listPlacementGroups()', (done) => {
    vpcService
      .listPlacementGroups()
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getPlacementGroup()', (done) => {
    const params = {
      id: dict.placementGroupId,
    };
    vpcService
      .getPlacementGroup(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updatePlacementGroup()', (done) => {
    const params = {
      id: dict.placementGroupId,
      name: 'my-placement-group1',
    };
    vpcService
      .updatePlacementGroup(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deletePlacementGroup()', (done) => {
    const params = {
      id: dict.placementGroupId,
    };
    vpcService
      .deletePlacementGroup(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteVpcRoutingTableRoute()', (done) => {
    const params = {
      vpcId: dict.createdVpc,
      routingTableId: dict.createdVpcRoutingTable,
      id: dict.createdVpcRoutingTableRoute,
    };

    vpcService
      .deleteVpcRoutingTableRoute(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getSubnetRoutingTable()', (done) => {
    const params = {
      id: dict.createdSubnet,
    };

    vpcService
      .getSubnetRoutingTable(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('replaceSubnetRoutingTable()', (done) => {
    // Request models needed by this operation.

    // RoutingTableIdentityById
    const routingTableIdentityModel = {
      id: dict.createdVpcRoutingTable,
    };

    const params = {
      id: dict.createdSubnet,
      routingTableIdentity: routingTableIdentityModel,
    };

    vpcService
      .replaceSubnetRoutingTable(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteVpcRoutingTable()', (done) => {
    const params = {
      vpcId: dict.createdVpc,
      id: dict.createdVpcRoutingTable2,
    };
    vpcService
      .deleteVpcRoutingTable(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createVpcAddressPrefix()', (done) => {
    const zoneIdentityModel = {
      name: dict.zoneName,
    };

    const params = {
      vpcId: dict.createdVpc,
      cidr: '10.0.0.0/24',
      zone: zoneIdentityModel,
      name: generateName('address-prefix'),
      isDefault: true,
    };

    vpcService
      .createVpcAddressPrefix(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        dict.createdAddrPrefix = res.result.id;
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getVpcAddressPrefix()', (done) => {
    const params = {
      vpcId: dict.createdVpc,
      id: dict.createdAddrPrefix,
    };

    vpcService
      .getVpcAddressPrefix(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateVpcAddressPrefix()', (done) => {
    const params = {
      vpcId: dict.createdVpc,
      id: dict.createdAddrPrefix,
      name: generateName('my-address-prefix-2'),
      isDefault: false,
    };

    vpcService
      .updateVpcAddressPrefix(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteVpcAddressPrefix()', (done) => {
    const params = {
      vpcId: dict.createdVpc,
      id: dict.createdAddrPrefix,
    };

    vpcService
      .deleteVpcAddressPrefix(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteInstanceNetworkInterface()', (done) => {
    const params = {
      instanceId: dict.createdInstance,
      id: dict.createdSecondVnic,
    };

    vpcService
      .deleteInstanceNetworkInterface(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteInstanceVolumeAttachment()', (done) => {
    const params = {
      instanceId: dict.createdInstance,
      id: dict.createdVolAttachment,
    };

    vpcService
      .deleteInstanceVolumeAttachment(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteBackupPolicyPlan()', (done) => {
    const params = {
      backupPolicyId: dict.createdBackupPolicy,
      id: dict.createdBackupPolicyPlan,
    };

    vpcService
      .deleteBackupPolicyPlan(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteBackupPolicy()', (done) => {
    const params = {
      id: dict.createdBackupPolicy,
    };

    vpcService
      .deleteBackupPolicy(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteInstance()', (done) => {
    const params = {
      id: dict.createdInstance,
    };

    vpcService
      .deleteInstance(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteFloatingIp()', (done) => {
    const params = {
      id: dict.createdFloatingIp,
    };

    vpcService
      .deleteFloatingIp(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteFlowLogCollector()', (done) => {
    const params = {
      id: dict.flowlog,
    };

    vpcService
      .deleteFlowLogCollector(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteInstanceTemplate()', (done) => {
    const params = {
      id: dict.createdTemplate,
    };

    vpcService
      .deleteInstanceTemplate(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('unsetSubnetPublicGateway()', (done) => {
    const params = {
      id: dict.createdSubnet,
    };

    vpcService
      .unsetSubnetPublicGateway(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deletePublicGateway()', (done) => {
    const params = {
      id: dict.createdPgw,
    };

    vpcService
      .deletePublicGateway(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteKey()', (done) => {
    const params = {
      id: dict.createdKey,
    };

    vpcService
      .deleteKey(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteSubnet()', (done) => {
    const params = {
      id: dict.createdSubnet,
    };

    vpcService
      .deleteSubnet(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteVolume()', (done) => {
    const params = {
      id: dict.createdVolume,
    };

    vpcService
      .deleteVolume(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteVpc()', (done) => {
    const params = {
      id: dict.createdVpc,
    };

    vpcService
      .deleteVpc(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test.skip('deleteImage()', (done) => {
    const params = {
      id: dict.privateImage,
    };

    vpcService
      .deleteImage(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteNetworkAcl()', (done) => {
    const params = {
      id: dict.createdNetworkACL,
    };

    vpcService
      .deleteNetworkAcl(params)
      .then((res) => {
        expect(res.result).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
});
