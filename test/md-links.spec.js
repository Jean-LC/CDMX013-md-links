const mdLinks = require('../read-file.js');
const fn = require('../fn.js');
const path = require('path')

describe('mdLinks promise', () => {

  test('Is mdLinks a function?', () => {
    expect(typeof mdLinks).toBe('function');
  });

  test('MdLinks rejects promise without data', () => {
    return mdLinks().catch(res => {
      expect(typeof res).not.toBe('array');
    });
  });

  test('MdLinks rejects promise without md file extension', () => {
    return mdLinks('test.js', false, false).catch(res => {
      expect(typeof res).not.toBe('array');
    });
  });

  test('MdLinks rejects promise if there\'s no md file with validate option', () => {
    return mdLinks('demo.js', true, false).catch(res => {
      expect(typeof res).not.toBe('object');
      expect(typeof res).toBe('string');
    });
  });

  test('MdLinks rejects promise if there\'s no md file with stats option', () => {
    return mdLinks('demo.js', false, true).catch(res => {
      expect(typeof res).not.toBe('object');
      expect(typeof res).toBe('string');
    });
  });

  test('MdLinks rejects promise if there\'s no file found with validate and stats option', () => {
    return mdLinks('demo.md', true, true).catch(res => {
      expect(typeof res).not.toBe('object');
    });
  });

  test('MdLinks returns object with validate and stats option', () => {
    return mdLinks('.\\test\\demo.md', true, true).then(res => {
      expect(typeof res).not.toBe('string');
      expect(typeof res).toBe('object');
    });
  });

  test('MdLinks returns object without validate and stats option', () => {
    return mdLinks('.\\test\\demo.md', false, false).then(res => {
      expect(typeof res).not.toBe('string');
      expect(typeof res).toBe('object');
    });
  });

  test('MdLinks returns object after reading md file with validate option', () => {
    return mdLinks('.\\test\\demo.md', true, false).then(res => {
      expect(typeof res).not.toBe('string');
      expect(typeof res).toBe('object');
    });
  });

  test('MdLinks returns object after reading md file with stats option', () => {
    return mdLinks('.\\test\\demo.md', false, true).then(res => {
      expect(typeof res).not.toBe('string');
      expect(typeof res).toBe('object');
    });
  });
})

  describe('mdLinks functions', () => {

    test('get list of links rejects without a path', () => {
      return (fn.getListOfLinks()).catch(res => {
        expect(typeof res).toBe('string')
      });
    });

    test('get list of links returns object of dirs if a dir path is sent', () => {
      return (fn.getListOfLinks('.\\test\\demo')).then(res => {
        expect(typeof res).not.toBe('string');
        expect(typeof res).toBe('object');
      });
    });

    test('get list of links rejects if it\'s not a md file with an absolute path', () => {
      return (fn.getListOfLinks(path.resolve(__dirname, 'demo.js'))).catch(res => {
        expect(typeof res).toBe('string');
        expect(typeof res).not.toBe('object');
      });
    });

    test('get list of links returns an object with the links filtered', () => {
      return (fn.getListOfLinks('.\\test\\demo-links.md')).then(res => {
        expect(typeof res).toBe('object');
        expect(typeof res).not.toBe('string');;
        expect(res.length).not.toBe('0');
        expect(res).toEqual(
          [
            {
              href: 'https://es.wikipedia.org/wiki/Markdown',
              text: 'Markdown',
              file: 'C:\\Users\\jeane\\Documents\\Laboratoria\\proyecto-4\\CDMX013-md-links\\test\\demo-links.md'
            },
            {
              href: 'https://nodejs.or',
              text: 'Node.js',
              file: 'C:\\Users\\jeane\\Documents\\Laboratoria\\proyecto-4\\CDMX013-md-links\\test\\demo-links.md'
            }
          ]
        )
      });
    });

    test('validate links returns an object with link status after getting an object', () => {
      return (fn.validateLinks(
        [
          {
            href: 'https://es.wikipedia.org/wiki/Markdown',
            text: 'Markdown',
            file: 'C:\\Users\\jeane\\Documents\\Laboratoria\\proyecto-4\\CDMX013-md-links\\test\\demo-links.md'
          },
          {
            href: 'https://nodejs.or',
            text: 'Node.js',
            file: 'C:\\Users\\jeane\\Documents\\Laboratoria\\proyecto-4\\CDMX013-md-links\\test\\demo-links.md'
          }
        ]
      )).then(res => {
        expect(typeof res).toBe('object');
        expect(typeof res).not.toBe('string');
        expect(res.length).toBe(2);
        expect(res).toEqual(
          [
            {
              status: 'OK: 200',
              href: 'https://es.wikipedia.org/wiki/Markdown',
              text: 'Markdown',
              file: 'C:\\Users\\jeane\\Documents\\Laboratoria\\proyecto-4\\CDMX013-md-links\\test\\demo-links.md'
            },
            {
              status: 'FAIL: 404',
              href: 'https://nodejs.or',
              text: 'Node.js',
              file: 'C:\\Users\\jeane\\Documents\\Laboratoria\\proyecto-4\\CDMX013-md-links\\test\\demo-links.md'
            }
          ]
        )
      });
    });

    test('stats links returns object of statistics sent without command', () => {
      expect(fn.statsLinks(
        [
          {
            status: 'OK: 200',
            href: 'https://es.wikipedia.org/wiki/Markdown',
            text: 'Markdown',
            file: 'C:\\Users\\jeane\\Documents\\Laboratoria\\proyecto-4\\CDMX013-md-links\\test\\demo-links.md'
          }
        ]
      )).toEqual(['files: 1', 'links: 1'])
    });

    test('stats links returns object of statistics sent with validate', () => {
      expect(fn.statsLinks(
        [
          {
            status: 'OK: 200',
            href: 'https://es.wikipedia.org/wiki/Markdown',
            text: 'Markdown',
            file: 'C:\\Users\\jeane\\Documents\\Laboratoria\\proyecto-4\\CDMX013-md-links\\test\\demo-links.md'
          },
          {
            status: 'FAIL: 404',
            href: 'https://nodejs.or',
            text: 'Node.js',
            file: 'C:\\Users\\jeane\\Documents\\Laboratoria\\proyecto-4\\CDMX013-md-links\\test\\demo-links.md'
          }
        ],
        true
      )).toEqual(['files: 1', 'links: 2', 'OK: 1', 'BROKEN: 1'])
    });
});
