# ts-config-randomizer
Config randomizer used to generate configuration from a set of input parameters.

Recurses through your input configuration object, and checks for two scenarios:

1. If the sub-object matches _RandomizableCount_ interface, it calculates a concrete length based off of the _count_, and fills the array with mimics of the _itemDetails_ interface.
2. If the sub-object matches _RandomizableRange_ interface, it calculates a concrete value within the _minValIncl_ and _maxValIncl_ range according to the weight function. 
    - The potential values to chose from are found by starting at the _minValIncl_, and stepping by the _stepper_ amount until the _maxValIncl_ is reached

    __Note__: if the _maxValIncl_ is not an even amount of steps from the _minValIncl_ (NOT recommended), the last value before going over the max value, as well as the max value, will both be included. For example:

    ```
    1->5 by 1.5 = 1, 2.5, 4, 5
    ```

__Note__: As you will see in the example, these two interfaces can be used together. You can leverage a _RandomizableCount_ whose _itemDetails_ contains a _RandomizableRange_.

## Example Usage

The following input configuration
```
{
    a: {
        b: {
            minValIncl: 1,
            maxValIncl: 4,
            weightFnKey: "EVEN",
            stepper: 1
        },
        c: {
            d: {
                minValIncl: 0.1,
                maxValIncl: 0.5,
                stepper: 0.1,
                weightFnKey: "EVEN"
            }
        },
        e: {
            count: {
                minValIncl: 1,
                maxValIncl: 4,
                stepper: 1,
                weightFnKey: "EVEN"
            },
            itemDetails: {
                e_1: "hello",
                e_2: {
                    minValIncl: 0.6,
                    maxValIncl: 0.9,
                    stepper: 0.1,
                    weightFnKey: "EVEN"
                }
            }
        }
    }
}
```

Could produce the following when run through _deRandomize_.

```
{
    a: {
        b: 2
        c: {
            d: 0.1
        },
        e: [{
            e_1: "hello",
            e_2: 0.7
        }, {
            e_1: "hello",
            e_2: 0.6
        }]
    }
}
```


## Supported Weight Functions

1. EVEN
    - Gives every step value an even weight, so each value is equally likely.
