# 1.1.5 (2025.1.17)

[Release Link](https://github.com/Nexusoft/Nexus-Interface-Invoice-Module/releases/tag/v1.1.5)

#### Additions

- Added errors for each item if Amounts/Units drop below 0 or exceedes the maximum nexus decimal percison point. 
- Updated price source 

#### Fixes

- Fixed "No Items" error not showing up
- Fixed items becoming NaN

# 1.1.4 (2023.10.17)

[Release Link](https://github.com/Nexusoft/Nexus-Interface-Invoice-Module/releases/tag/v1.1.4)

#### Fixes

- Fixed several UI glitches.

# 1.1.3 (2023.8.15)

[Release Link](https://github.com/Nexusoft/Nexus-Interface-Invoice-Module/releases/tag/v1.1.3)

#### Fixes

- Fixed paybutton not showing up 
- Fixed several UI glitches

# 1.1.2 (2023.5.03)

[Release Link](https://github.com/Nexusoft/Nexus-Interface-Invoice-Module/releases/tag/v1.1.2)

#### Adjustments

- Changed API calls to match new Nexus Core Api. 

# 1.1.1 (2023.4.28)

[Release Link](https://github.com/Nexusoft/Nexus-Interface-Invoice-Module/releases/tag/v1.1.1)

#### Fixes

- Fixed several saving issues. 
- Fixed several crashing bugs.

# 1.1.0 (2023.4.25)

[Release Link](https://github.com/Nexusoft/Nexus-Interface-Invoice-Module/releases/tag/v1.1.0)

#### Additons

- Breaking: Now requires Nexus Interface 3.1.0
- Complete overhaul of codebase.

# 1.0.6 (2021.11.27)

[Release Link](https://github.com/Nexusoft/Nexus-Interface-Invoice-Module/releases/tag/v1.0.6)

#### Fixes

- Fixed another edge case crash when using the pay modal

# 1.0.5 (2021.10.29)

[Release Link](https://github.com/Nexusoft/Nexus-Interface-Invoice-Module/releases/tag/v1.0.5)

#### Fixes

- Fixed crashed when using the pay modal
- Fixed edge case with complex names by exclusively using addresses to send

# 1.0.4 (2021.4.16)

[Release Link](https://github.com/Nexusoft/Nexus-Interface-Invoice-Module/releases/tag/v1.0.4)

#### Fixes

- Fixed detail modal not working

# 1.0.3 (2021.3.29)

[Release Link](https://github.com/Nexusoft/Nexus-Interface-Invoice-Module/releases/tag/v1.0.3)

#### Adjustments

- Optimized UI
- Optimized Code

# 1.0.2 (2021.3.11)

[Release Link](https://github.com/Nexusoft/Nexus-Interface-Invoice-Module/releases/tag/v1.0.2)

#### Additions

- Added balances to the accounts you can use to pay an invoice

#### Adjustments

- Changed Status tag text from a `darken` to a `screen`
- Updated package-lock

#### Fixes

- Fixed issue if you were not logged in prior to opening up the module the module would crash
- Fixed issue of not being able to use a `trust` account (requires Nexus Core 5.1.x)

# 1.0.1 (2020.4.23)

[Release Link](https://github.com/Nexusoft/Nexus-Interface-Invoice-Module/releases/tag/v1.0.1)

#### Additions

- Added fiat reference in new invoice form
- Drafts now bind to the user that created them
- You can now select the account to use when paying an invoice
- Added a notice that an 1 NXS fee will be issued when making a new invoice
- Added more search functionality

#### Adjustments

- Add close to the make new invoice form
- Now handles logging in and out

#### Fixes

- Fixed spelling mistakes

# 1.0.0 (2020.3.25)

[Release Link](https://github.com/Nexusoft/Nexus-Interface-Invoice-Module/releases/tag/v1.0.0)

### First Release
