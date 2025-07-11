[![Build Status](https://github.com/IBM/vpc-node-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/IBM/vpc-node-sdk/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/IBM/vpc-node-sdk)](https://github.com/IBM/vpc-node-sdk/releases/latest)
[![npm](https://img.shields.io/npm/v/ibm-vpc)](https://www.npmjs.com/package/ibm-vpc)
![npm](https://img.shields.io/npm/dm/ibm-vpc)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# IBM Cloud VPC Node.js SDK
Node.js client library to interact with various [VPC APIs](https://cloud.ibm.com/apidocs?category=vpc).

This SDK uses [Semantic Versioning](https://semver.org), and as such there may be backward-incompatible changes for any new `0.y.z` version.

## Table of Contents

<!--
  The TOC below is generated using the `markdown-toc` node package.

      https://github.com/jonschlinkert/markdown-toc

  You should regenerate the TOC after making changes to this file.

      npx markdown-toc -i README.md
  -->

<!-- toc -->

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Using the SDK](#using-the-sdk)
- [Questions](#questions)
- [Issues](#issues)
- [Open source @ IBM](#open-source--ibm)
- [Contributing](#contributing)
- [License](#license)

<!-- tocstop -->

<!-- --------------------------------------------------------------- -->
## Overview

The IBM Cloud VPC Node.js SDK allows developers to programmatically interact with the following
IBM Cloud services:

Service Name | Import Path
--- | ---
[VPC](https://cloud.ibm.com/apidocs/vpc?code=node) | ibm-vpc/vpc/v1

## Prerequisites
* An [IBM Cloud][ibm-cloud-onboarding] account
* Node.js version 18 or newer

[ibm-cloud-onboarding]: http://cloud.ibm.com/registration

## Installation

```sh
npm install ibm-vpc
```

## Using the SDK
For general SDK usage information, see the
[IBM Cloud SDK Common README](https://github.com/IBM/ibm-cloud-sdk-common/blob/master/README.md)

## Example set up for VPC

```node
const { IamAuthenticator } = require("ibm-vpc/auth");
const vpcV1 = require("ibm-vpc/vpc/v1");
const options = {
    authenticator: new IamAuthenticator({
        apikey: process.env.IC_API_KEY, //IBMCLOUD_API_KEY
    }),
    serviceUrl: "https://us-south.iaas.cloud.ibm.com/v1",
};

// region specific service url can be fetched using vpcV1.getServiceUrlForRegion("us-south")

const service = vpcV1.newInstance(options);
// Retrieve the list of regions for your account.
const response = service.listRegions({});
response.then(function(result) {
  result.result.regions.forEach(region => {
    regionserviceUrl = region.endpoint+"/v1";
    const regionSpecificOptions = {
      authenticator: new IamAuthenticator({
          apikey: process.env.IC_API_KEY,
      }),
      serviceUrl: regionserviceUrl,
  };
  const regionSpecificService = vpcV1.newInstance(regionSpecificOptions);  
  const instanceprofilesresponse = regionSpecificService.listInstanceProfiles({});
  instanceprofilesresponse.then(function(profileCollection) {
    console.log(profileCollection.result.profiles[0].href)
  })
})
})
// Retrieve the list of vpcs for your account.
try {
  const responses = service.listVpcs();
  responses.then(function(result) {
    result.result.vpcs.forEach(vpc => {
      console.log("vpc-id"+" "+vpc.id);
    });
  })
} catch (err) {
  console.warn(err);
}
// Retrieve the list of subnets for your account.
try {
  const responses = service.listSubnets();
  responses.then(function(result) {
    result.result.subnets.forEach(subnet => {
      console.log("subnet-id"+" "+subnet.id);
    });
  })
} catch (err) {
  console.warn(err);
}
```

## Questions
If you have difficulties using this SDK or you have a question about the IBM Cloud services,
ask a question at [Stack Overflow](http://stackoverflow.com/questions/ask?tags=ibm-cloud).

## Issues
If you encounter an issue with the SDK, you are welcome to submit
a [bug report](https://github.com/IBM/vpc-node-sdk/issues).
Before you create a new issue, search for similar issues. It's possible someone has
already reported the problem.

## Open source @ IBM
Find more open source projects on the [IBM GitHub Page](http://ibm.github.io/)

## Contributing
See [CONTRIBUTING](https://github.com/IBM/vpc-node-sdk/blob/master/CONTRIBUTING.md).

## License 

This project is released under the Apache 2.0 license.
The license's full text can be found in
[LICENSE](https://github.com/IBM/vpc-node-sdk/blob/master/LICENSE).
