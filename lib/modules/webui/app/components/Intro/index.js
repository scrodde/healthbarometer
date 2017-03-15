import React from 'react';
import Formsy from 'formsy-react';
import { Link } from 'react-router-dom';

import FaHeart from 'react-icons/lib/fa/heart';

class Intro extends React.Component {
  render() {
    const { authUrl, baseUrl } = this.props;
    return (
      <div className="intro">
        <h1 className="page-title">The Health Barometer Survey</h1>
        <div className="page-content">
          <p>
            Thank you for taking your time in participating in this survey!
          </p>
          <p>
            This survey is part of my Master's Thesis at Aalto University. The thesis is
            a case study on how <a target="_blank" href="https://en.wikipedia.org/wiki/Agile_software_development">agile software development</a> processes and development portfolio
            management can improve the software (+ all types of) development processes and practices in our organisation.
          </p>

          <p>
            The survey is the first part of the The Health Barometer (HB) method. The HB method was developed in the <a target="_blank" href='http://www.soberit.hut.fi/sprg/projects/atman/'>ATMAN research
            project</a> for assessing the adequateness of an organization's practices and
            processes for what we call "development portfolio management". In short development portfolio management
            is about how to manage, prioritize, decide and allocate people and resources between ongoing and upcoming projects. With the HB
            we can get insights on what needs to be improved in our development portfolio management and hopefully thus make your and your collegues work
            smoother.
          </p>
          <p>
            The second part of the HB is to conduct semi-structured interviews. Only about 8 people will be selected for the
            interviews and they will be informed later about the practicalities.
          </p>
          <p>
            Please note that all of your answers & comments are <strong>kept strictly confidential</strong>, only me (Niklas)
            doing the analysis will see all the data. The <strong>DEADLINE</strong> for completing this survey is <strong>wednesday 22.3.2017 at 12:00</strong>.
          </p>

          <h2>Instructions</h2>
          <p>
            1) To start the survey press the "Get Started" button at the bottom of the page. You will be asked to login with your <b>@leroy-creative.com</b> account. It will take you about <strong>30 minutes</strong> to complete this survey.
          </p>
          <p>
            2) Start from the responsibilities and demographics section; check those boxes
            that fit your responsibilities. If some of your responsibilities are missing from
            the possible choices, type them into the comments space.
          </p>
          <p>
            3) Please answer the rest of the survery by evaluating how strongly you agree or
            disagree with the statements. Use the comments space to specify the context of your answer. Answer realistically, without exaggerating or "tidying things up".
            If you are unsure of whether you understood the statement, make a brief note in
            the comment field. If you understand the statement but don't know the answer,
            pick "I don't know". Also, rather answer "I don't know" than make a guess.
          </p>
          <p>
            4) You can submit the form as many times as you want. The most recent submission will be taken into account.
          </p>

          <h2>Terminology</h2>
          <p>
            <strong>THE DEVELOPMENT PORTFOLIO</strong> is the set of ongoing and upcoming activities
            that require attention from the "development people" (e.g. product development
            and/or technical resources). Common types of development activity
            types are e.g. customer-specific development projects, release-based product development projects, maintenance, deliveries, customer service, support, training, consultation, sales support, etc.
          </p>

          <p>
            <strong>DEVELOPMENT PORTFOLIO MANAGEMENT</strong> is the decision process for updating
            and revising the development portfolio. In development portfolio management,
            development activities (e.g. projects) are prioritized and resourced.
            Development portfolio management is also responsible for appropriately resourcing
            the handling of suddenly emerging urgencies (e.g reacting to an urgent support request / pitch etc.).
          </p>

          <p>
            If you encounter problems in answering the survey, whether technical or
            otherwise, do not hesitate to contact me.
            The aggregated results of the survey & the interviews will be disseminated on DD.MM. I
            will inform you later of the exact time and place.
          </p>

          <p>
            Thank you! <FaHeart style={{color: 'red'}}/><br/><br />
            Niklas<br />
            <a className="nostyle" href="tel:+358503815831">+358503815831</a><br />
            <a className="nostyle" href="mailto:niklas@agencyleroy.com">niklas@agencyleroy.com</a><br />
          </p>

          <p>
            <a className="button submit" href={`${authUrl}?redirectTo=${baseUrl}/forms/0`}>Get Started</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Intro;
