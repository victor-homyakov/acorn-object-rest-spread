var assert = require('assert');
var acorn = require('../index');

function parse(code) {
  return acorn.parse(code, {
    ecmaVersion: 7,
    locations: true,
    plugins: {objectRestSpread: true}
  });
}

function assertAst(code, expectedAst) {
  let ast = parse(code);
  assert.deepEqual(ast.body, [expectedAst]);
}

// test fixtures are adapted from babylon
describe('acorn-object-rest-spread plugin', function () {
  it('should add support for spread property in variable declaration', function () {
    assertAst('let z = {...x}', {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 14,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 14
        }
      },
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 4,
          "end": 14,
          "loc": {
            "start": {
              "line": 1,
              "column": 4
            },
            "end": {
              "line": 1,
              "column": 14
            }
          },
          "id": {
            "type": "Identifier",
            "start": 4,
            "end": 5,
            "loc": {
              "start": {
                "line": 1,
                "column": 4
              },
              "end": {
                "line": 1,
                "column": 5
              }
            },
            "name": "z"
          },
          "init": {
            "type": "ObjectExpression",
            "start": 8,
            "end": 14,
            "loc": {
              "start": {
                "line": 1,
                "column": 8
              },
              "end": {
                "line": 1,
                "column": 14
              }
            },
            "properties": [
              {
                "type": "SpreadProperty",
                "start": 9,
                "end": 13,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 9
                  },
                  "end": {
                    "line": 1,
                    "column": 13
                  }
                },
                "argument": {
                  "type": "Identifier",
                  "start": 12,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 12
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "name": "x"
                }
              }
            ]
          }
        }
      ],
      "kind": "let"
    });
  });

  it('should add support for spread property in assignment expression', function () {
    assertAst('z = {x, ...y}', {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 13,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 13
        }
      },
      "expression": {
        "type": "AssignmentExpression",
        "start": 0,
        "end": 13,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 13
          }
        },
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 0,
          "end": 1,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 1
            }
          },
          "name": "z"
        },
        "right": {
          "type": "ObjectExpression",
          "start": 4,
          "end": 13,
          "loc": {
            "start": {
              "line": 1,
              "column": 4
            },
            "end": {
              "line": 1,
              "column": 13
            }
          },
          "properties": [
            {
              "type": "Property",
              "start": 5,
              "end": 6,
              "kind": "init",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 5
                },
                "end": {
                  "line": 1,
                  "column": 6
                }
              },
              "method": false,
              "shorthand": true,
              "computed": false,
              "key": {
                "type": "Identifier",
                "start": 5,
                "end": 6,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 5
                  },
                  "end": {
                    "line": 1,
                    "column": 6
                  }
                },
                "name": "x"
              },
              "value": {
                "type": "Identifier",
                "start": 5,
                "end": 6,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 5
                  },
                  "end": {
                    "line": 1,
                    "column": 6
                  }
                },
                "name": "x"
              }
            },
            {
              "type": "SpreadProperty",
              "start": 8,
              "end": 12,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 8
                },
                "end": {
                  "line": 1,
                  "column": 12
                }
              },
              "argument": {
                "type": "Identifier",
                "start": 11,
                "end": 12,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 11
                  },
                  "end": {
                    "line": 1,
                    "column": 12
                  }
                },
                "name": "y"
              }
            }
          ]
        }
      }
    });
  });

  it('should add support for spread property in object expression', function () {
    assertAst('({x, ...y, a, ...b, c})', {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 23,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 23
        }
      },
      "expression": {
        "type": "ObjectExpression",
        "start": 1,
        "end": 22,
        "loc": {
          "start": {
            "line": 1,
            "column": 1
          },
          "end": {
            "line": 1,
            "column": 22
          }
        },
        "properties": [
          {
            "type": "Property",
            "start": 2,
            "end": 3,
            "kind": "init",
            "loc": {
              "start": {
                "line": 1,
                "column": 2
              },
              "end": {
                "line": 1,
                "column": 3
              }
            },
            "method": false,
            "shorthand": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 2,
              "end": 3,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 2
                },
                "end": {
                  "line": 1,
                  "column": 3
                }
              },
              "name": "x"
            },
            "value": {
              "type": "Identifier",
              "start": 2,
              "end": 3,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 2
                },
                "end": {
                  "line": 1,
                  "column": 3
                }
              },
              "name": "x"
            }
          },
          {
            "type": "SpreadProperty",
            "start": 5,
            "end": 9,
            "loc": {
              "start": {
                "line": 1,
                "column": 5
              },
              "end": {
                "line": 1,
                "column": 9
              }
            },
            "argument": {
              "type": "Identifier",
              "start": 8,
              "end": 9,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 8
                },
                "end": {
                  "line": 1,
                  "column": 9
                }
              },
              "name": "y"
            }
          },
          {
            "type": "Property",
            "start": 11,
            "end": 12,
            "kind": "init",
            "loc": {
              "start": {
                "line": 1,
                "column": 11
              },
              "end": {
                "line": 1,
                "column": 12
              }
            },
            "method": false,
            "shorthand": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 11,
              "end": 12,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 11
                },
                "end": {
                  "line": 1,
                  "column": 12
                }
              },
              "name": "a"
            },
            "value": {
              "type": "Identifier",
              "start": 11,
              "end": 12,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 11
                },
                "end": {
                  "line": 1,
                  "column": 12
                }
              },
              "name": "a"
            }
          },
          {
            "type": "SpreadProperty",
            "start": 14,
            "end": 18,
            "loc": {
              "start": {
                "line": 1,
                "column": 14
              },
              "end": {
                "line": 1,
                "column": 18
              }
            },
            "argument": {
              "type": "Identifier",
              "start": 17,
              "end": 18,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 17
                },
                "end": {
                  "line": 1,
                  "column": 18
                }
              },
              "name": "b"
            }
          },
          {
            "type": "Property",
            "start": 20,
            "end": 21,
            "kind": "init",
            "loc": {
              "start": {
                "line": 1,
                "column": 20
              },
              "end": {
                "line": 1,
                "column": 21
              }
            },
            "method": false,
            "shorthand": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 20,
              "end": 21,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 20
                },
                "end": {
                  "line": 1,
                  "column": 21
                }
              },
              "name": "c"
            },
            "value": {
              "type": "Identifier",
              "start": 20,
              "end": 21,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 20
                },
                "end": {
                  "line": 1,
                  "column": 21
                }
              },
              "name": "c"
            }
          }
        ]
      }
    });
  });

  it('should add support for rest property in object pattern', function () {
    assertAst('let {...x} = z', {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 14,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 14
        }
      },
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 4,
          "end": 14,
          "loc": {
            "start": {
              "line": 1,
              "column": 4
            },
            "end": {
              "line": 1,
              "column": 14
            }
          },
          "id": {
            "type": "ObjectPattern",
            "start": 4,
            "end": 10,
            "loc": {
              "start": {
                "line": 1,
                "column": 4
              },
              "end": {
                "line": 1,
                "column": 10
              }
            },
            "properties": [
              {
                "type": "RestProperty",
                "start": 5,
                "end": 9,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 5
                  },
                  "end": {
                    "line": 1,
                    "column": 9
                  }
                },
                "argument": {
                  "type": "Identifier",
                  "start": 8,
                  "end": 9,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 9
                    }
                  },
                  "name": "x"
                },
                "value": {
                  "type": "Identifier",
                  "start": 8,
                  "end": 9,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 9
                    }
                  },
                  "name": "x"
                }
              }
            ]
          },
          "init": {
            "type": "Identifier",
            "start": 13,
            "end": 14,
            "loc": {
              "start": {
                "line": 1,
                "column": 13
              },
              "end": {
                "line": 1,
                "column": 14
              }
            },
            "name": "z"
          }
        }
      ],
      "kind": "let"
    });
  });
});
