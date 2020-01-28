import React, { Component } from 'react';
import Contact from './ContactComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect,withRouter } from 'react-router-dom';
import { connect} from 'react-redux';
import About from './AboutComponent';
import { postComment,fetchCampsites,fetchComments, fetchPromotions } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapDispatchToProps = { 
  
  fetchCampsites: () => (fetchCampsites()),
  fetchComments:()=>(fetchComments()),
  fetchPromotions:()=>(fetchPromotions()),
  resetFeedbackForm: () => (actions.reset('feedbackForm')),
  postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
};

const mapStateToProps = state => { 
  return {
     campsitess:state.campsites,
     comments : state.comments,
     partners:state.partners,
     promotions:state.promotions
  };
};

class Main extends Component {
    
  componentDidMount() {
    this.props.fetchCampsites();
    this.props.fetchPromotions();
    this.props.fetchComments();
  }
  render() {
      const HomePage = () => { 
          return (
              <Home  campsite={this.props.campsitess.campsites.filter(campsite => campsite.featured)[0]}
              campsitesLoading={this.props.campsitess.isLoading}
              campsitesErrMess={this.props.campsitess.errMess}
              promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
              promotionLoading={this.props.promotions.isLoading}
              promotionErrMess={this.props.promotions.errMess}
              partner={this.props.partners.filter(partner => partner.featured)[0]} />
          );
      }
     const CampsiteWithId =({match}) => {
          return (
        <CampsiteInfo campsite={this.props.campsitess.campsites.filter(campsite => campsite.id === 
                                 +match.params.campsiteId)[0]}
                      isLoading={this.props.campsitess.isLoading}
                      errMess={this.props.campsitess.errMess}
                      comments={this.props.comments.comments.filter(comment => comment.campsiteId ===
                                 +match.params.campsiteId)} 
                      commentsErrMess={this.props.comments.errMess}
                    
                      postComment = {this.props.postComment}
                                 />           

         );
        }

      return (
        
          <div className="App">
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={()=> <Directory  campsites={this.props.campsitess} />} />
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                    <Route exact path='/contactus' render= {() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Route exact path='/aboutus' render={() => <About partners={this.props.partners} />} />
                    <Redirect to='/home' />
              </Switch>
        
               <Footer />
          </div>
      );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));