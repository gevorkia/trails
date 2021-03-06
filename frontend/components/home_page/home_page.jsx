import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SearchSuggestions from "../search/search_suggestions";

// const HomePage = () => {
//   // react hook for functional components only
//   // array destructuring assignment similar to object destructuring
//   // searchText is a getter (like this.state), setSearchText is a setter (like this.setState)
//   // React.useState is a react state hook for a single piece of state
//   const [searchText, setSearchText] = React.useState('');

const mSTP = (state) => {
  return {
    // currentUser: state.entities.session ? state.entities.session.currentUser : false,
    currentUser: state.session.currentUser
  };
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      id: "dont-display-list",
      focus: false,
    };

    this.setSearchText = this.setSearchText.bind(this);
    this.removeSearchText = this.removeSearchText.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  setSearchText(e) {
    e.preventDefault();
    this.setState({
      searchText: e.target.value,
      id: "display-search-list",
    });
  };

  removeSearchText(e) {
    this.setState({
      searchText: e.target.value,
      id: "dont-display-list",
    });
  };

  handleFocus(e) {
    e.preventDefault();

    if (this.state.focus) return;

    this.setState({ focus: true });
    this.setSearchText(e);
    // console.log("focus");
  }

  // handleBlur(e) testing
  // console.log(e.currentTarget);
  // console.log(e.target);
  // console.log(e.relatedTarget);

  handleBlur(e) {
    e.preventDefault();

    if (!this.state.focus) return;

    if (e.relatedTarget) {
      const path = e.relatedTarget.getAttribute("href")
      this.props.history.push(path);
    } else {
      this.setState({ focus: false });
      this.removeSearchText(e);
      // console.log("blur");
    }
  }

  render() {

    const { currentUser } = this.props;

    return (
      <>
        <div className="home-content">
          <div className="home-page-background">
            <div className="banner-container">
              <div className="banner-text">Find your next favorite trail</div>
              <form
                className="input-holder"
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
              >
                <div className="magnifying-glass">
                  <img
                    alt="logo"
                    src="https://cdn-assets.alltrails.com/assets/icons/search-gray-086ffadf121a7eb1f0487dcd1d7279b4.svg"
                  />
                </div>
                <input
                  className="home-search-bar"
                  type="text"
                  placeholder="Enter a park or trail name"
                  autoComplete="off"
                  aria-label="text search input"
                  // event handler that sets state to whatever user enters
                  onChange={this.setSearchText}
                  onClick={this.setSearchText}
                />
                <div className="search-suggestions">
                  <div className="suggestions-list-wrapper" id={this.state.id}>
                    {/* passing in the value of the state as a prop */}
                    <SearchSuggestions
                      searchText={this.state.searchText}
                    />
                  </div>
                </div>
                <button className="search-button">Search</button>
              </form>
            </div>
          </div>
          <div className="text-body">
            <h2>100,000+ trails. 20 million explorers. Endless memories.</h2>
            <p>
              The beauty of nature doesn’t need to be hard to find. Our goal is
              simple - build the largest collection of hand-curated trail
              guides, so you can explore the outdoors with confidence. Anytime.
              Anywhere.
            </p>
            {currentUser ? null : (
              <Link className="bottom-signup" to="/signup">
                Sign up for free
              </Link>
            )}
          </div>
        </div>
      </>
    );
  }
};

export default connect(mSTP)(HomePage);

// functional component before converting to class

// const HomePage = ({curentUser, logoutUser}) => {
//       const sessionLinks = () => (
//         <nav className="login-signup">
//           <Link to="/login">Login</Link>
//           &nbsp;or&nbsp;
//           <Link to="/signup">Sign up!</Link>
//         </nav>
//       );
//       const personalGreeting = () => (
//         <hgroup className="header-group">
//           <h2 className="header-name">Hi, {currentUser.username}!</h2>
//           <button className="header-button" onClick={logout}>
//             Log Out
//           </button>
//         </hgroup>
//       );

//     return (
//         <div>
            
//         </div>
//     )
// }

// export default HomePage