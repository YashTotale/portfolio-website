<p align="center"><img alt="Icon" width="150" src="https://yashtotale.web.app/logo512.png"/></p>

<h1 align="center">Welcome to Yash's Portfolio Website 👋</h1>

<p align="center">
<a href="https://github.com/YashTotale/portfolio-v2/actions/workflows/integrate.yml"><img src="https://img.shields.io/github/workflow/status/YashTotale/portfolio-v2/Node%20CI?logo=github&logoColor=FFFFFF&labelColor=000000&label=Build&style=flat-square" alt="Build" /></a>
<a href="https://yashtotale.web.app/"><img src="https://img.shields.io/website?url=https%3A%2F%2Fyashtotale.web.app%2F&labelColor=000000&label=Website&style=flat-square" alt="Website"/></a>
<a href="https://github.com/YashTotale/portfolio-v2/actions/workflows/deploy.yml"><img src="https://img.shields.io/github/workflow/status/YashTotale/portfolio-v2/Deploy%20Website?logo=firebase&logoColor=FFFFFF&labelColor=000000&label=Deploy&style=flat-square" alt="Deploy" /></a>
<a href="https://lgtm.com/projects/g/YashTotale/portfolio-v2/context:javascript"><img src="https://img.shields.io/lgtm/grade/javascript/github/YashTotale/portfolio-v2?logo=lgtm&logoColor=FFFFFF&labelColor=000000&label=Code%20Quality&style=flat-square" alt="Code Quality" /></a>
</p>

## 📖 Contents <!-- omit in toc -->

- [🏃 Running Locally](#-running-locally)
- [🏆 Goals](#-goals)
- [🧱 Architecture](#-architecture)

## 🏃 Running Locally

1. Prerequisites

   - [Git](https://git-scm.com/), version `>=2.x`
   - [Node.JS](https://nodejs.org/en/), version `>=15.x`
   - [NPM](https://www.npmjs.com/), version `>=6.x`

2. Clone the repository

   ```shell
   git clone https://github.com/YashTotale/portfolio-v2.git
   cd portfolio-v2
   ```

3. Install dependencies

   ```shell
   npm install
   ```

4. Set up environment variables

   Please reach out to me at totaleyash@gmail.com for these 🙂. Paste them into `.env`.

5. Fetch data

   ```shell
   npm run data
   ```

6. Start local development

   ```shell
   npm start
   ```

## 🏆 Goals

As you may have noticed, this is my second attempt at a portfolio website. The [first one](https://github.com/YashTotale/portfolio-v1) was ... a total failure. **600+ commits** in, I realized that I had overcomplicated and under-planned the project. Instead of focusing on a clean and intuitive UI, I had gotten bogged down in adding relatively useless features that I thought were cool (like dynamic [Wikipedia](https://github.com/YashTotale/portfolio-v1/blob/master/src/Scripts/getTerms.ts) & [LinkedIn](https://github.com/YashTotale/portfolio-v1/blob/master/src/Scripts/getLinkedin.ts) integration). So, to avoid another failure, I set a few goals ahead of time:

### Start with a design

I used [Figma](https://figma.com/) to design almost all of the website's pages before I even started programming. This helped me quickly build an MVP of the entire website. From there, I was able to optimize and improve specific areas without losing sight of the overall picture.

### Use an efficient CMS

I used [Contentful](https://www.contentful.com/) for my headless CMS. This allowed me to separate out my website's layout and its content, reducing the amount of changes I would need to make to the code over time. Also, Contentful was a much better alternative to Google Sheets (which I used for my first portfolio website).

### Build sustainable infrastructure

If you browse through the [Components], [Pages], or [Utils] folders, you'll see quite a few patterns in each. This is on purpose: by "_patternizing_" my code, I was able to quickly add new features/pages or make edits to existing UI.

## 🧱 Architecture

### [Components]

**Components are divided into 4 folders: [Atomic], [Content], [Custom], and [Static]**

#### [Atomic]

Atomic components are those that can be used essentially anywhere. They are meant to be building blocks for layouts, with specific styling/UI to make the website consistent.

#### [Content]

Content components are meant to be UI for a specific type of content. They can be further divided into Main, Preview, Overlay/Mini/Associated.

- Main content components are to be displayed on that specific content's own page. For example, on the route `/experience/<slug>`, the Main component for that specific experience will be displayed.
- Preview content components are to be displayed on the content type's page. For example, on the route `/experience`, the Preview components for all experiences will be displayed.
- The other content components such as Overlay, Mini, and Associated are to be displayed anywhere else as "supporting" components. For example, on a specific tag's page (`/tags/<slug>`), the related experience, articles, and projects of the tag will also be displayed via Overlay components.

#### [Custom]

Custom components are extensively configured components (like a [Rich Text renderer](https://github.com/YashTotale/portfolio-v2/tree/master/src/Components/Custom/RichText)) that can be used in multiple areas of the application. They are generally not atomic as they are meant for a very specific purpose.

#### [Static]

Static components are rendered only once. They include elements like the Navbar, Footer, Sidebar, etc.

### [Pages]

Each page of the website is a folder in the [Pages] directory (except the [NotFound] page). Each of these folders contains an `index.tsx` file which contains the UI for that page.

- Every page calls a [`useAnalytics`] hook, which logs a `page_view` event to [Google Analytics](http://analytics.google.com/) if the environment is a production environment.
- Every page updates the `<head>` of the HTML using [React Helmet](https://github.com/nfl/react-helmet) based on the title of the page.

### [Utils]

Any utilities such as [functions](https://github.com/YashTotale/portfolio-v2/blob/master/src/Utils/funcs.ts), [types](https://github.com/YashTotale/portfolio-v2/blob/master/src/Utils/types.ts), [constants](https://github.com/YashTotale/portfolio-v2/blob/master/src/Utils/constants.ts), etc. are located in the [Utils] folder.

Additionally, content utilities are located in the [Content subdirectory]. Each of the files in this folder corresponds to a specific content type. They contain utilities to get, resolve, filter, and sort that specific content type.

<!-- Reference Links -->

[components]: https://github.com/YashTotale/portfolio-v2/tree/master/src/Components
[pages]: https://github.com/YashTotale/portfolio-v2/tree/master/src/Pages
[utils]: https://github.com/YashTotale/portfolio-v2/tree/master/src/Utils
[atomic]: https://github.com/YashTotale/portfolio-v2/tree/master/src/Components/Atomic
[content]: https://github.com/YashTotale/portfolio-v2/tree/master/src/Components/Content
[custom]: https://github.com/YashTotale/portfolio-v2/tree/master/src/Components/Custom
[static]: https://github.com/YashTotale/portfolio-v2/tree/master/src/Components/Static
[notfound]: https://github.com/YashTotale/portfolio-v2/blob/master/src/Pages/NotFound.tsx
[`useanalytics`]: https://github.com/YashTotale/portfolio-v2/blob/master/src/Hooks/useAnalytics.tsx
[content subdirectory]: https://github.com/YashTotale/portfolio-v2/tree/master/src/Utils/Content
