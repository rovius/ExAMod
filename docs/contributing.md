# Contributing to ExAMod

🎉 Thank you for considering contributing to ExAMod! 🎉

This guide outlines the process for contributing to the plugin. Please take a moment to review this document to ensure a smooth and effective contribution process.

## How to Contribute

This guide assumes you have NodeJS and npm installed, and a Discord server with an active Lacuna Diamond subscription.

1. **Fork the Repository**

    - Click on the "Fork" button at the top-right corner of the repository to create your fork.

2. **Clone Your Fork**

    - Clone your forked repository to your local machine.
        ```bash
        git clone https://github.com/your-username/ExAMod.git
        ```

3. Install `devDependencies`

    - Install development dependencies after cloning your fork using `npm`.

4. **Create a Branch**

    - Create a new branch for your changes.
        ```bash
        git checkout -b feature/your-feature
        ```

5. **Make Changes**

    - Implement your feature or fix bugs. Ensure your changes follow the coding style of the project by running `npm run prepack` after editing `.js` files.

6. **Pack Test Files**

    - After you've finished writing and formatting code, run `npm run pack:tests` to make test files. Note that this will overwrite files in your `tests` folder. You should then import them into Lacuna's dashboard and test the functionality. If there are any errors, return to the previous step.

7. **Pack Puzzles**

    - If the test files contain no bugs, you can export them as "puzzles" to be included into the plugin. You can achieve this by running `npm run pack:puzzles`. Note that this will overwrite files in your `puzzles` folder.

8. **Commit Changes**

    - Commit your changes with descriptive commit messages.
        ```bash
        git commit -m "Add your descriptive message here"
        ```

9. **Push Changes**

    - Push your changes to your forked repository.
        ```bash
        git push origin feature/your-feature
        ```

10. **Submit a Pull Request (PR)**
    - Create a Pull Request on the original repository.
    - Provide a clear title and description for your changes.

## Development Workflow

-   **Files Location**

    -   The filters source code is located in the `src/js` folder. Most contributors will be looking for these files unless they improve the build process, in which case they'll need `src/pack-tests.js` and `src/pack-puzzles.js`. If the JSON templates ever change, they reside in the `src/json` directory, and the new ones should be placed there.

-   **Editing Environment**

    -   You can edit the filter code either in your preferred editor or in the bot dashboard.

-   **Code Formatting**

    -   You should run `npm run prepack` to format the code regardless of where it was edited.

-   **Note on Test and Puzzle Files**

    -   Files in the `tests` and `puzzles` folders should not be edited directly, and any files other than plugin files should not be placed there.

-   **Version Increment**
    -   If the change is related to the filters code, the plugin version should be increased accordingly in `package.json` and `manifest.json`.

## Reporting Issues

If you encounter bugs or have suggestions for improvement, please open an issue on the [issue tracker](https://github.com/rovius/ExAMod/issues).
