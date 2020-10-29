import {creatorFactory, creatorTypeFactory} from '@form-create/core';

const maker = {};

useAlias(maker);
useSelect(maker);
useTree(maker);
useUpload(maker);

function useAlias(maker) {
    ['group', 'tree', 'switch', 'upload', 'autoComplete', 'checkbox', 'cascader', 'colorPicker', 'datePicker', 'frame', 'inputNumber', 'radio', 'rate', 'select'].forEach(name => {
        maker[name] = creatorFactory(name);
    });
    maker.auto = maker.autoComplete;
    maker.number = maker.inputNumber;
    maker.color = maker.colorPicker;
}

function useSelect(maker) {
    const select = 'select';
    const multiple = 'multiple';
    maker['selectMultiple'] = creatorTypeFactory(select, true, multiple);
    maker['selectOne'] = creatorTypeFactory(select, false, multiple);
}

function useTree(maker) {
    const name = 'tree';
    const types = {'treeSelected': 'selected', 'treeChecked': 'checked'};

    Object.keys(types).reduce((m, key) => {
        m[key] = creatorTypeFactory(name, types[key]);
        return m;
    }, maker);
}

function useUpload(maker) {
    const name = 'upload';
    const types = {
        image: ['image', 0],
        file: ['file', 0],
        uploadFileOne: ['file', 1],
        uploadImageOne: ['image', 1],
    };

    Object.keys(types).reduce((m, key) => {
        m[key] = creatorTypeFactory(name, m => m.props({uploadType: types[key][0], maxLength: types[key][1]}));
        return m
    }, maker);

    maker.uploadImage = maker.image;
    maker.uploadFile = maker.file;
}

export default maker;
