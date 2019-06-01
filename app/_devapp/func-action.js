// 1. Manager function do when dispatch
export const toggleSubMenu = ( state, e, value ) => {
    e.stopPropagation();
    if( state.markSubMenu === state.currentSubMenu ) {
        return {
            ...state,
            isOpenSubmenu: true,
            markSubMenu: value
        }
    }else {
        return {
            ...state,
            isOpenSubmenu: false,
            markSubMenu: state.currentSubMenu
        }
    }
};

export const speacialToggleSubMenu = ( state, e, value) => {
    e.stopPropagation();
    return {
        ...state,
        markSubMenu: value,
        currentSubMenu: value
    };
}

// click Link in Portal sidebar
export const load = ( state, value ) => {
    return {
        ...state,
        isOpenSubmenu: false,
        currentSubMenu: value
    };
}

// click out side and close side bar.
export const onClickOutsideHandler = ( state, e ) => {
    if( state.markSubMenu !== 'Dashboard' && !izStoreSubMenu.contains(e.target) ) {
        return {
            ...state,
            isOpenSubmenu: false,
            markSubMenu: state.currentSubMenu
        };
    }else{
        return state;
    }
}

export const closeSidebar = ( state ) => {
    return{
        ...state, 
        isOpenSubmenu: false,
        markSubMenu: state.currentSubMenu
    }
}



// Function for Pagination page
const getNumberPagination = (limit,data) => {
    const length = data.length;
    let numberPag = 0;
    if( length > limit ){
        if( length % limit === 0 ){
            numberPag = parseInt( length / limit );
        }else{
            numberPag = parseInt(( length / limit ) + 1);
        }
    }else{
        numberPag = 1;
    }
    return numberPag;
}

const slitArrayPagination = (limit,data) => {
    let arrStore = [];
    for (let i = 0; i < data.length; i++) {
        if( i % limit === 0 ){
            const temp = data.slice(i,i+limit);
            arrStore.push(temp);
        }
    }
    return arrStore;
}

const pagination = (locationSearch) => {
    // locationSearch is this.props.location.search
    const query = new URLSearchParams(locationSearch);
    const p = query.get('p');
    let result = 0;
    if( p === null ){
        result = 1;
    }else{
        result = parseInt(p);
    }
    return result;
}

export const renderIZPagination = ( data, limit, locationSearch, renderFunc, invalidRenderFunc, noRenderFunc ) => {
    const numberPag = getNumberPagination( limit, data );
    if( numberPag > 1 ) {
        const arrDataPag = slitArrayPagination( limit, data );
        const p = pagination(locationSearch);
        // số pag hợp lệ trên url
        if( p > 0 && p <= numberPag ) {
            // dùng render Pagination Item
            let arrPagination = [];
            for (let i = 1; i <= numberPag; i++) {
                arrPagination.push(i);
            }
            renderFunc( arrDataPag, arrPagination, p );
        }else{
            invalidRenderFunc('not found');
        }
    }else{
        // data ít không cần render pagination
        noRenderFunc( data );
    }
}

// Function generate random string
const rootRandom = 'a0bc1def2gh3ij4kl5mn6op7qrs8tu9vwxyz';
const rootRandomL = rootRandom.length;
export const randomID = ( length ) => {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += rootRandom.charAt( Math.floor( Math.random() * rootRandomL ) );
    }
    return result;
}
