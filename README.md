# ng2-dragula : Content Builder

[Online Demo](https://tmakin.github.io/ng2-dragula/)

## Intro
Experiment with ng2-dragula to create a content builder interface insipred by
[this jquery tool](http://innovastudio.com/builderdemo/example1.html)

The dragula directive and provider has been extended to allow the model to be transormed on drop

## Requirements
- Copy from source list
- Allow reorder of target list
- Remove on spill for target list
- Custom drag handle
- Transform of model type on drop

## Model Transformation
A new input has been added to the dragula directive `[dragulaModelTransform]`.
When defined this function replaces the `JSON.parse(JSON.stringify(model))` call inside
`DragulaService`. Motivation:
- Custom clone behaviour which may be necessary for complex types. the `JSON.Parse` approach will deserialize
all class instances as plain javascript objects.
- Allow transformation from one model type to another

## Other Suggestions
- Track the container/model relationships by reference rather than index.
Currently if you define a model for `listB` but not `listA` then `drake.models`
will be out of sync with `drake.containers` and can lead to confusing bugs.

## Related discussions:
[https://github.com/valor-software/ng2-dragula/issues/156](https://github.com/valor-software/ng2-dragula/issues/156)
