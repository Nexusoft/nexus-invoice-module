import memoize from 'gui/memoize';

const {
  libraries: {
    React,
    emotion: { styled },
  },
} = NEXUS;

const __ = (input) => input;

const TokenRecipientName = styled.span({
  color: 'gray',
});

const Separator = styled.div(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.primary,
}));

export const getAccountOptions = memoize((myAccounts, myTokens) => {
  let options = [];

  if (myAccounts && myAccounts.length > 0) {
    options.push({
      value: 'AccountsSeparator',
      display: <Separator>{__('Accounts')}</Separator>,
      isSeparator: true,
      indent: false,
    });
    options.push(
      ...myAccounts
        .filter((acc) => acc.token === '0')
        .map((acc) => ({
          value: acc.address,
          display: `${acc.name || acc.address} (${acc.balance} ${
            acc.ticker || 'Tokens'
          })`,
          indent: true,
        }))
    );
  }
  return options;
});

export const getAccountBalance = memoize(
  (accountName, myAccounts, myTokens) => {
    const account =
      myAccounts && myAccounts.find((acc) => acc.name === accountName);
    const token = myTokens && myTokens((tkn) => tkn.name === accountName);
    return account && account.balance;
  }
);

export const getAccountInfo = memoize((accountName, myAccounts, myTokens) => {
  const account =
    myAccounts &&
    myAccounts.find(
      (acc) => acc.name === accountName || acc.address === accountName
    );
  const token =
    myTokens &&
    myTokens.find(
      (tkn) => tkn.name === accountName || tkn.address === accountName
    );
  return account || token || { balance: 0 };
});

export const getNxsFiatPrice = memoize((rawNXSvalues, fiatCurrency) => {
  if (rawNXSvalues) {
    const marketInfo = rawNXSvalues.find((e) => e.name === fiatCurrency);
    if (marketInfo) {
      return marketInfo.price;
    }
  }
  return null;
});

export const getAddressNameMap = memoize((addressBook, myTritiumAccounts) => {
  const map = {};
  if (addressBook) {
    Object.values(addressBook).forEach((contact) => {
      if (contact.addresses) {
        contact.addresses.forEach(({ address, label }) => {
          map[address] = contact.name + (label ? ' - ' + label : '');
        });
      }
    });
  }
  if (myTritiumAccounts) {
    myTritiumAccounts.forEach((element) => {
      map[element.address] = element.name;
    });
  }
  return map;
});

const Address = styled.span(({ theme }) => ({
  color: theme.mixer(0.75),
}));

export const getRecipientSuggestions = memoize(
  (addressBook, myTritiumAccounts) => {
    const suggestions = [];
    if (addressBook) {
      Object.values(addressBook).forEach((contact) => {
        if (contact.addresses) {
          contact.addresses
            .filter((e) => e.address.startsWith('a'))
            .forEach(({ address, label, isMine }) => {
              if (!isMine) {
                suggestions.push({
                  name: contact.name,
                  value: address,
                  token: '0',
                  display: (
                    <span>
                      {contact.name}
                      {label ? ' - ' + label : ''}{' '}
                      <TokenRecipientName>{'(NXS)'}</TokenRecipientName>{' '}
                      <Address>{address}</Address>
                    </span>
                  ),
                });
              }
            });
        }
      });
    }
    /*
    if (myTritiumAccounts) {
      myTritiumAccounts
        .filter(element => element.token_name === 'NXS')
        .forEach(element => {
          suggestions.push({
            name: element.name || element.address,
            value: element.address,
            token: element.token,
            display: (
              <span>
                {element.name} {'   '}
                <TokenRecipientName>{`(${element.token_name ||
                  'Tokens'})`}</TokenRecipientName>{' '}
                <Address>{element.address}</Address>
              </span>
            ),
          });
        });
    } */
    return suggestions;
  }
);

export const isMyAddress = (myAccounts, myGenesis, testAddress) => {
  if (!myGenesis || !myAccounts) return false;
  if (myGenesis === testAddress) return true;

  const foundAddress = myAccounts.find((e) => e.address === testAddress);
  if (foundAddress) return true;

  return false;
};

export const getRegisteredFieldNames = memoize((registeredFields) =>
  Object.keys(registeredFields || {})
);
