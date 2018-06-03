import React from 'react';

class ProductCategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        return (
            <tr>
                <th colSpan="2">
                    {category}
                </th>
            </tr>
        );
    }
}

class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.stocked ?
            product.name :
            <span style={{ color: 'red' }}>
                {product.name}
            </span>;

        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
}

class ProductTable extends React.Component {
    render() {
        const rows = [];
        let lastCategory = null;

        this.props.products
            .filter((product => {
                return (this.props.state.inStockOnly ? product.stocked : true);
            }))
            .filter((product) => {
                const filterText = this.props.state.filterText;
                return (
                    product.name.indexOf(filterText) >= 0
                );
            })
            .forEach((product) => {
                if (product.category !== lastCategory) {
                    rows.push(
                        <ProductCategoryRow
                            category={product.category}
                            key={product.category} />
                    );
                }
                rows.push(
                    <ProductRow
                        product={product}
                        key={product.name} />
                );
                lastCategory = product.category;
            });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }
    handleFilterTextChange(event) {
        const filterText = event.target.value;
        this.props.onFilterTextChange(filterText);
    }
    handleInStockChange(event) {
        const inStockOnly = event.target.checked;
        this.props.onInStockChange(inStockOnly);
    }
    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.state.filterText}
                    onChange={this.handleFilterTextChange}
                />
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.state.inStockOnly}
                        onChange={this.handleInStockChange}
                    />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { filterText: '', inStockOnly: false };

        // This binding is necessary to make `this` work in the callback
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockChange(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        })
    }

    render() {
        return (
            <div>
                <SearchBar
                    state={this.state}
                    onFilterTextChange={this.handleFilterTextChange}
                    onInStockChange={this.handleInStockChange}
                />
                <ProductTable state={this.state} products={this.props.products} />
            </div>
        );
    }
}

export default FilterableProductTable;
