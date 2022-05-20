// Code generated by private/model/cli/gen-api/main.go. DO NOT EDIT.

// Package codeartifact provides the client and types for making API
// requests to CodeArtifact.
//
// AWS CodeArtifact is a fully managed artifact repository compatible with language-native
// package managers and build tools such as npm, Apache Maven, and pip. You
// can use CodeArtifact to share packages with development teams and pull packages.
// Packages can be pulled from both public and CodeArtifact repositories. You
// can also create an upstream relationship between a CodeArtifact repository
// and another repository, which effectively merges their contents from the
// point of view of a package manager client.
//
// AWS CodeArtifact Components
//
// Use the information in this guide to help you work with the following CodeArtifact
// components:
//
//    * Repository: A CodeArtifact repository contains a set of package versions
//    (https://docs.aws.amazon.com/codeartifact/latest/ug/welcome.html#welcome-concepts-package-version),
//    each of which maps to a set of assets, or files. Repositories are polyglot,
//    so a single repository can contain packages of any supported type. Each
//    repository exposes endpoints for fetching and publishing packages using
//    tools like the npm CLI, the Maven CLI ( mvn ), and pip .
//
//    * Domain: Repositories are aggregated into a higher-level entity known
//    as a domain. All package assets and metadata are stored in the domain,
//    but are consumed through repositories. A given package asset, such as
//    a Maven JAR file, is stored once per domain, no matter how many repositories
//    it's present in. All of the assets and metadata in a domain are encrypted
//    with the same customer master key (CMK) stored in AWS Key Management Service
//    (AWS KMS). Each repository is a member of a single domain and can't be
//    moved to a different domain. The domain allows organizational policy to
//    be applied across multiple repositories, such as which accounts can access
//    repositories in the domain, and which public repositories can be used
//    as sources of packages. Although an organization can have multiple domains,
//    we recommend a single production domain that contains all published artifacts
//    so that teams can find and share packages across their organization.
//
//    * Package: A package is a bundle of software and the metadata required
//    to resolve dependencies and install the software. CodeArtifact supports
//    npm (https://docs.aws.amazon.com/codeartifact/latest/ug/using-npm.html),
//    PyPI (https://docs.aws.amazon.com/codeartifact/latest/ug/using-python.html),
//    and Maven (https://docs.aws.amazon.com/codeartifact/latest/ug/using-maven)
//    package formats. In CodeArtifact, a package consists of: A name (for example,
//    webpack is the name of a popular npm package) An optional namespace (for
//    example, @types in @types/node) A set of versions (for example, 1.0.0,
//    1.0.1, 1.0.2, etc.) Package-level metadata (for example, npm tags)
//
//    * Package version: A version of a package, such as @types/node 12.6.9.
//    The version number format and semantics vary for different package formats.
//    For example, npm package versions must conform to the Semantic Versioning
//    specification (https://semver.org/). In CodeArtifact, a package version
//    consists of the version identifier, metadata at the package version level,
//    and a set of assets.
//
//    * Upstream repository: One repository is upstream of another when the
//    package versions in it can be accessed from the repository endpoint of
//    the downstream repository, effectively merging the contents of the two
//    repositories from the point of view of a client. CodeArtifact allows creating
//    an upstream relationship between two repositories.
//
//    * Asset: An individual file stored in CodeArtifact associated with a package
//    version, such as an npm .tgz file or Maven POM and JAR files.
//
// CodeArtifact supports these operations:
//
//    * AssociateExternalConnection: Adds an existing external connection to
//    a repository.
//
//    * CopyPackageVersions: Copies package versions from one repository to
//    another repository in the same domain.
//
//    * CreateDomain: Creates a domain
//
//    * CreateRepository: Creates a CodeArtifact repository in a domain.
//
//    * DeleteDomain: Deletes a domain. You cannot delete a domain that contains
//    repositories.
//
//    * DeleteDomainPermissionsPolicy: Deletes the resource policy that is set
//    on a domain.
//
//    * DeletePackageVersions: Deletes versions of a package. After a package
//    has been deleted, it can be republished, but its assets and metadata cannot
//    be restored because they have been permanently removed from storage.
//
//    * DeleteRepository: Deletes a repository.
//
//    * DeleteRepositoryPermissionsPolicy: Deletes the resource policy that
//    is set on a repository.
//
//    * DescribeDomain: Returns a DomainDescription object that contains information
//    about the requested domain.
//
//    * DescribePackageVersion: Returns a PackageVersionDescription (https://docs.aws.amazon.com/codeartifact/latest/APIReference/API_PackageVersionDescription.html)
//    object that contains details about a package version.
//
//    * DescribeRepository: Returns a RepositoryDescription object that contains
//    detailed information about the requested repository.
//
//    * DisposePackageVersions: Disposes versions of a package. A package version
//    with the status Disposed cannot be restored because they have been permanently
//    removed from storage.
//
//    * DisassociateExternalConnection: Removes an existing external connection
//    from a repository.
//
//    * GetAuthorizationToken: Generates a temporary authorization token for
//    accessing repositories in the domain. The token expires the authorization
//    period has passed. The default authorization period is 12 hours and can
//    be customized to any length with a maximum of 12 hours.
//
//    * GetDomainPermissionsPolicy: Returns the policy of a resource that is
//    attached to the specified domain.
//
//    * GetPackageVersionAsset: Returns the contents of an asset that is in
//    a package version.
//
//    * GetPackageVersionReadme: Gets the readme file or descriptive text for
//    a package version.
//
//    * GetRepositoryEndpoint: Returns the endpoint of a repository for a specific
//    package format. A repository has one endpoint for each package format:
//    npm pypi maven
//
//    * GetRepositoryPermissionsPolicy: Returns the resource policy that is
//    set on a repository.
//
//    * ListDomains: Returns a list of DomainSummary objects. Each returned
//    DomainSummary object contains information about a domain.
//
//    * ListPackages: Lists the packages in a repository.
//
//    * ListPackageVersionAssets: Lists the assets for a given package version.
//
//    * ListPackageVersionDependencies: Returns a list of the direct dependencies
//    for a package version.
//
//    * ListPackageVersions: Returns a list of package versions for a specified
//    package in a repository.
//
//    * ListRepositories: Returns a list of repositories owned by the AWS account
//    that called this method.
//
//    * ListRepositoriesInDomain: Returns a list of the repositories in a domain.
//
//    * PutDomainPermissionsPolicy: Attaches a resource policy to a domain.
//
//    * PutRepositoryPermissionsPolicy: Sets the resource policy on a repository
//    that specifies permissions to access it.
//
//    * UpdatePackageVersionsStatus: Updates the status of one or more versions
//    of a package.
//
//    * UpdateRepository: Updates the properties of a repository.
//
// See https://docs.aws.amazon.com/goto/WebAPI/codeartifact-2018-09-22 for more information on this service.
//
// See codeartifact package documentation for more information.
// https://docs.aws.amazon.com/sdk-for-go/api/service/codeartifact/
//
// Using the Client
//
// To contact CodeArtifact with the SDK use the New function to create
// a new service client. With that client you can make API requests to the service.
// These clients are safe to use concurrently.
//
// See the SDK's documentation for more information on how to use the SDK.
// https://docs.aws.amazon.com/sdk-for-go/api/
//
// See aws.Config documentation for more information on configuring SDK clients.
// https://docs.aws.amazon.com/sdk-for-go/api/aws/#Config
//
// See the CodeArtifact client CodeArtifact for more
// information on creating client for this service.
// https://docs.aws.amazon.com/sdk-for-go/api/service/codeartifact/#New
package codeartifact
