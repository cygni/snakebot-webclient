import React from "react";
require("../design/styles/stylesheet.scss");


class AboutPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                <h2>About</h2>
                <p>Nulla nec lectus vel erat. Sed sit amet magna ac ipsum sagittis consectetur at ac magna. Aliquam erat volutpat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquam eros non elit efficitur, ut euismod sapien eleifend. Curabitur sodales enim lacinia orci congue convallis. Nulla nec lectus vel erat venenatis finibus a at nisi. In ac leo mattis, dapibus velit at, gravida diam. Suspendisse ultrices maximus facilisis. Sed sit amet magna ac ipsum  sagittis consectetur at ac magna. Aliquam erat volutpat. Nunc eget augue quis lectus</p>
            </section>
        )
    }
}
export default AboutPage;

