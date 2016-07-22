# ng2-dragula : Content Builder

[Online Demo](https://tmakin.github.io/ng2-dragula/)

## Intro
Experiment with ng2-dragula to create a content builder interface insipred by
[this jquery tool](http://innovastudio.com/builderdemo/example1.html)

Apart from minor typescript annotations the source code of the ng2-dragula code has not been modified. 
Only the example code has been messed with.

## Requirements
- Copy from source list
- Allow reorder of target list
- Remove on spill for target list
- Custom drag handle
- Transform of model type on drop

## Model Transformation
Our `snippets.ts` example gets round the problem of model transformation by performing all transforms up front.
This relies on the fact that `[dragulaModel]` and the associated `ng-for` do not need to be reference the same variable, 
they just need to be the same length. 

## Suggestion 
To make the model sync more flexible it would be useful to add a hook to dragula to use a custom copy function.
Currently the copying is achived using `JSON.parse(JSON.stringify(model))` which will guarantee a deep clone 
but will potentially mangle complex types and dates.

A custom function would allow the JSON.parse implementation to be overridden and allow the model to be transformed
if required.

Ideally this would be implemented on a per-directive basis, but a global override for `DragulaService` would also be useful

## Related discussions:
[https://github.com/valor-software/ng2-dragula/issues/156](https://github.com/valor-software/ng2-dragula/issues/156)
