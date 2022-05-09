import React from "react";

class TestPage extends React.Component {
    state = {
        items: [
            {
                titulo: "titulo1",
                ano: "ano1",
                reso: "reso1",
            },
            {
                titulo: "titulo2",
                ano: "ano2",
                reso: "reso2",
            },
            {
                titulo: "titulo3",
                ano: "ano3",
                reso: "reso3",
            },
        ],
        updatedItems: [],
        filterTitle: "",
        filterYear: "",
        filterReso: "",
    };

    searchFilter = () => {
        return (
            <form>
                <input
                    name="filterTitle"
                    type="text"
                    value={this.filterTitle}
                    onChange={(e) => this.handleSearchFilter(e, "filterTitle")}
                />
                <input
                    name="filterYear"
                    type="text"
                    value={this.filterYear}
                    onChange={(e) => this.handleSearchFilter(e, "filterYear")}
                />
                <input
                    name="filterReso"
                    type="text"
                    value={this.filterReso}
                    onChange={(e) => this.handleSearchFilter(e, "filterReso")}
                />
            </form>
        );
    };

    handleSearchFilter = (event, key) => {
        const inputValue = event.target.value;
        this.setState({ [key]: inputValue }, () => {
            this.filterList();
        });
    };

    filterList = () => {
        const itemsUpdate = this.state.items.filter((item) => {
            var filterTitle =
                item.titulo
                    .toLowerCase()
                    .indexOf(this.state.filterTitle.toLowerCase()) > -1;
            var filterYear =
                item.ano.toLowerCase().indexOf(this.state.filterYear.toLowerCase()) >
                -1;
            var filterReso =
                item.reso.toLowerCase().indexOf(this.state.filterReso.toLowerCase()) >
                -1;
            return filterTitle && filterYear && filterReso;
        });
        this.setState({ updatedItems: itemsUpdate }, () => {
            console.log(this.state.updatedItems);
        });
    };

    renderList = () => {
        const { updatedItems } = this.state;
        return (
            <div>
                {updatedItems.map((updatedItem) => {
                    return (
                        <div>
                            {updatedItem.titulo}
                            {updatedItem.ano}
                            {updatedItem.reso}
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        return (
            <div>
                {this.searchFilter()}
                {this.renderList()}
            </div>
        );
    }
}

export default TestPage;