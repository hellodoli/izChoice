import React from 'react';
import { Container, 
  } from 'reactstrap';
import NavbarLeft from './styled/NavbarLeft';
import NavbarRight from './styled/NavbarRight';

class Header extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            dropdownAccountOpen: false
        };
    }

    toggleDropdownAccount = () => {
        this.setState(prevState => ({
            dropdownAccountOpen: !prevState.dropdownAccountOpen
        }));
    }

    render() {
        const { dropdownAccountOpen } = this.state;
        const { username } = this.props;
        return(
            <div className="header navbar">
                <Container>
                    <NavbarLeft />
                    <NavbarRight 
                        isOpen={dropdownAccountOpen}
                        toggle={this.toggleDropdownAccount}
                        username={username}
                    />
                </Container>
            </div>
        );
    }
}

export default Header;