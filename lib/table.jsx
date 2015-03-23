'use strict';

var _ = require('lodash');

var React = require('react/addons'); // XXX: go back to regular react!
var cells = require('./cells');
var cx = React.addons.classSet;
var formatters = require('./formatters');
var update = React.addons.update;


module.exports = React.createClass({
    propTypes: {
        header: React.PropTypes.object,
        data: React.PropTypes.array,
        columns: React.PropTypes.array,
    },

    getDefaultProps() {
      return {
        header: {},
        data: [],
        columns: [],
      };
    },

    render() {
        var header = this.props.header;
        var data = this.props.data;
        var columns = this.props.columns;

        var props = update(this.props, {
            $merge: {
                header: undefined,
                data: undefined,
                columns: undefined,
            },
        });

        return (
            <table {...props}>
                <thead>
                    <tr>
                        {columns.map((column, i) => {
                            var columnHeader = _.transform(header, (result, v, k) => {
                                result[k] = k.indexOf('on') === 0? v.bind(null, column): v;
                            });

                            return <th
                                key={i + '-header'}
                                className={cx(column.classes)}
                                {...columnHeader}
                            >
                                {column.header}
                            </th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => <tr key={i + '-row'}>{
                        columns.map((column, j) => {
                            var property = column.property;
                            var value = row[property];
                            var cell = column.cell || [];
                            var props = {};
                            var content;

                            cell = _.isFunction(cell)? [cell]: cell;

                            content = _.reduce([value].concat(cell), (v, fn) => {
                                if(v && React.isValidElement(v.value)) {
                                    return v;
                                }

                                if(_.isPlainObject(v)) {
                                    // TODO: pass possible old values here
                                    // [value, prevprev, prev] ...
                                    return _.merge(v, {
                                        value: fn(v.value, data, i, property),
                                    });
                                }

                                var val = fn(v, data, i, property);

                                if(val.value) {
                                    return val;
                                }

                                // formatter shortcut
                                return {
                                    value: val,
                                };
                            });

                            return <td key={j + '-cell'} {...content.props}>{content.value}</td>
                        }
                    )}</tr>)}
                </tbody>
                {this.props.children}
            </table>
        );
    },
});
