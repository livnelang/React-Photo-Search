import { PureComponent } from "react";
import debounce from "lodash.debounce";

export default class InfiniteScroll extends PureComponent {
    constructor(props) {
        super(props);
        this.getNexPage = this.getNexPage.bind(this);
      }


    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }


    // Binds our scroll event handler
    handleScroll = debounce(() => {
        
        // Bails early if:
        // * there's an error
        // * it's already loading
        // * there's nothing left to load
        if (this.props.loadingPhotos) return;

        // Checks that the page has scrolled to the bottom
        if (( window.innerHeight + document.documentElement.scrollTop) >= (document.documentElement.offsetHeight -200 )) {
            this.getNexPage();
        }
    }, 100);

    getNexPage() {
        this.props.loadMore();
    }

    render() {
        return null;
    } 

}
