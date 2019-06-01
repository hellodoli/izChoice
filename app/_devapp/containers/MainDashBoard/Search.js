import React from 'react';
import { Form, InputGroup, InputGroupAddon, Input, 
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Button } from 'reactstrap';

export const LiveSearch = (props) => {
    const {  handleLiveSearch } = props;
    return(
        <Form className="iz-live-search-form" onSubmit={ e => e.preventDefault() }>
            <Input type="search" placeholder="Nhập thông tin ..." onChange={handleLiveSearch} required={true} />
        </Form>
    )
};

export const Search = (props) => {
    const { inputSearch, handleSearch,
        menuSearchBy, searchInfo, searchBy, search
        } = props;
    return(
        <Form className="iz-search-form" onSubmit={search}>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <UncontrolledDropdown>
                        <DropdownToggle caret> { searchBy } </DropdownToggle>
                        <DropdownMenu id="dropdownSearchCourse">
                            { menuSearchBy.length > 0 && menuSearchBy.map((item,index) =>
                                <DropdownItem key={(index+1)} active={ searchBy === item }>
                                    <div onClick={searchInfo}>{ item }</div>
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </InputGroupAddon>
                <Input
                    type="search"
                    placeholder="Nhập thông tin ..."
                    value={inputSearch}
                    onChange={handleSearch}
                />
                <InputGroupAddon addonType="append">
                    <Button type="submit" color="secondary">Tìm</Button>
                </InputGroupAddon>
            </InputGroup>
        </Form>
    )
};

export const SearchScore = (props) => {
    const { 
        list : { listSubject, listClass, listCount },
        handleInput: { subjectIDSelect, classIDSelect, countSelect },
        handleSubjectID, handleClassID, handleCount,
        search
    } = props;

    const isDisabled = ( subjectIDSelect.length > 0 && classIDSelect.length > 0 && countSelect.length > 0 )
                            ? false : true;

    return(
        <Form className="iz-search-form hight" onSubmit={ search }>
            <div className="input-group-inline custom">
                
                <div className="input-item">
                    <Input type="select" defaultValue="" required={true} onChange={ handleSubjectID }>
                        <option value="" disabled={true}>Bạn hãy chọn 1 môn học</option>
                        { listSubject.length > 0 && listSubject.map( item =>
                            <option key={ item["MaMH"] } value={ item["MaMH"] }>{ item["TenMH"] }</option>
                        )}
                    </Input>
                </div>
                
                <div className="input-item">
                    <Input type="select" defaultValue="" required={true} onChange={ handleClassID }>
                        <option value="" disabled={true}>Bạn hãy chọn 1 lớp</option>
                        { listClass.length > 0 && listClass.map( item =>
                            <option key={ item["MaLop"] } value={ item["MaLop"] }>{ item["TenLop"] }</option>
                        )}
                    </Input>
                </div>
                
                <div className="input-item">
                    <Input type="select" defaultValue="" required={true} onChange={ handleCount }>
                        <option value="" disabled={true}>Bạn hãy chọn lần thi</option>
                        { listCount.length > 0 && listCount.map( ( item, index ) =>
                            <option key={ index } value={ item["Lan"] }>{ item["Lan"] }</option>
                        )}
                    </Input>
                </div>

                <div className="input-item">
                    <Button type="submit" color="primary" disabled={isDisabled}> Tìm kiếm </Button>
                </div>

            </div>
        </Form>
    );
}